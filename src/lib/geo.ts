// ─────────────────────────────────────────────────────────────────────────────
// Browser-geolocation → Real-time Reverse Geocoding
//
// Uses the native Geolocation API to get lat/lon, then queries BigDataCloud's
// free client-side reverse geocoding endpoint to get the actual real-time
// city and state.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { cityId, type CityOption } from "@/data/patient";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export type GeoStatus = "idle" | "detecting" | "found" | "denied" | "unsupported";

/**
 * Resolves the visitor's real-time city via Geolocation + Reverse Geocoding.
 * Never blocks the page — starts at "idle"/"detecting" and settles to "found"
 * (with a city) or "denied"/"unsupported" (city stays null).
 * Also returns the raw lat/lon coordinates for advanced spatial filtering.
 */
export function useGeolocatedCity(candidates: CityOption[]): {
  status: GeoStatus;
  city: CityOption | null;
  coords: { lat: number; lon: number } | null;
  retry: () => void;
} {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [city, setCity] = useState<CityOption | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  // Bumped by retry() to re-run the effect below -- getCurrentPosition only ever fires on
  // mount/candidates-change otherwise, so clicking "Allow Location" again after a "denied"
  // status (e.g. the user had dismissed the browser's own permission prompt, not permanently
  // blocked it) would silently do nothing without this.
  const [retryNonce, setRetryNonce] = useState(0);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("detecting");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setCoords({ lat, lon });
          
          // Free, no-auth reverse geocoding API for client side
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          const data = await res.json();
          
          if (data.city && data.principalSubdivision) {
            const detectedName = data.city;
            const detectedState = data.principalSubdivision;
            
            // Check if it's already in our candidate list to reuse the exact object
            const candidate = candidates.find(c => 
              c.name.toLowerCase() === detectedName.toLowerCase() && 
              c.state.toLowerCase() === detectedState.toLowerCase()
            );
            
            if (candidate) {
              setCity(candidate);
            } else {
              // Construct a new CityOption for their real-time location!
              setCity({
                id: cityId(detectedName, detectedState),
                name: detectedName,
                state: detectedState
              });
            }
            setStatus("found");
          } else {
            // Fallback if the API doesn't return a city
            setStatus("found"); 
            setCity(null);
          }
        } catch (e) {
          console.error("Reverse geocoding failed", e);
          setStatus("denied");
        }
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    // Only re-run when the candidate set meaningfully changes (its length) or retry() is
    // called — not on every render, since candidates is a fresh array each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates.length, retryNonce]);

  const retry = () => setRetryNonce((n) => n + 1);

  return { status, city, coords, retry };
}

/**
 * Calculates the exact distance in kilometers between two lat/lon coordinates
 * using the Haversine formula.
 */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Mapbox Directions Matrix API (driving profile) caps a single request at 25 total
// coordinates -- 1 source (the visitor) + up to 24 destinations -- so batches larger than
// that are split into parallel chunked requests and merged below.
const MATRIX_CHUNK_SIZE = 24;

/**
 * Fetches real driving distances and ETAs via Mapbox's Directions Matrix API (same paid
 * account already used for the map itself -- swapped in for the free/public OSRM demo
 * server, which has no SLA and whose own usage policy disallows production traffic).
 * Safely handles batching of any number of destinations via chunked parallel requests.
 * Resolves to {} (never throws) if the token is missing or every chunk fails -- callers
 * already treat this as a best-effort enrichment on top of the haversine estimate.
 */
export async function getDrivingDistances(
  userLat: number, userLon: number,
  destinations: {id: string, lat: number, lon: number}[]
): Promise<Record<string, { distanceKm: number, durationMin: number }>> {
  if (destinations.length === 0 || !MAPBOX_TOKEN) return {};

  const chunks: (typeof destinations)[] = [];
  for (let i = 0; i < destinations.length; i += MATRIX_CHUNK_SIZE) {
    chunks.push(destinations.slice(i, i + MATRIX_CHUNK_SIZE));
  }

  const results: Record<string, { distanceKm: number, durationMin: number }> = {};

  await Promise.all(
    chunks.map(async (chunk) => {
      // Mapbox expects lon,lat per coordinate (semicolon-separated path); sources/destinations
      // index lists are comma-separated (unlike OSRM's semicolon-separated index lists).
      const coordString = [`${userLon},${userLat}`, ...chunk.map((d) => `${d.lon},${d.lat}`)].join(";");
      const destIndices = chunk.map((_, i) => i + 1).join(",");
      const url = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordString}?sources=0&destinations=${destIndices}&annotations=distance,duration&access_token=${MAPBOX_TOKEN}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.code !== "Ok") return;

        chunk.forEach((d, i) => {
          const distMeters = data.distances?.[0]?.[i];
          const durationSeconds = data.durations?.[0]?.[i];
          if (distMeters !== null && distMeters !== undefined && durationSeconds !== null && durationSeconds !== undefined) {
            results[d.id] = {
              distanceKm: distMeters / 1000,
              durationMin: Math.round(durationSeconds / 60)
            };
          }
        });
      } catch (err) {
        console.error("Mapbox Matrix API failed", err);
      }
    })
  );

  return results;
}
