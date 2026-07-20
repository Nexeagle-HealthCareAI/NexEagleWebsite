// ─────────────────────────────────────────────────────────────────────────────
// Browser-geolocation → Real-time Reverse Geocoding
//
// Uses the native Geolocation API to get lat/lon, then queries BigDataCloud's
// free client-side reverse geocoding endpoint to get the actual real-time
// city and state.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { cityId, type CityOption } from "@/data/patient";

export type GeoStatus = "idle" | "detecting" | "found" | "denied" | "unsupported";

/**
 * Resolves the visitor's real-time city via Geolocation + Reverse Geocoding.
 * Never blocks the page — starts at "idle"/"detecting" and settles to "found"
 * (with a city) or "denied"/"unsupported" (city stays null).
 * Also returns the raw lat/lon coordinates for advanced spatial filtering.
 */
export function useGeolocatedCity(candidates: CityOption[]): { status: GeoStatus; city: CityOption | null; coords: { lat: number; lon: number } | null } {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [city, setCity] = useState<CityOption | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

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
    // Only re-run when the candidate set meaningfully changes (its length),
    // not on every render — candidates is a fresh array each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates.length]);

  return { status, city, coords };
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

/**
 * Fetches real driving distances and ETAs using the free OSRM public API.
 * Safely handles batching (up to 50 destinations at once).
 */
export async function getDrivingDistances(
  userLat: number, userLon: number, 
  destinations: {id: string, lat: number, lon: number}[]
): Promise<Record<string, { distanceKm: number, durationMin: number }>> {
  if (destinations.length === 0) return {};
  
  // OSRM expects lon,lat format
  const coords = [`${userLon},${userLat}`];
  const destIndices: number[] = [];
  
  destinations.forEach((d, i) => {
    coords.push(`${d.lon},${d.lat}`);
    destIndices.push(i + 1); // +1 because user is index 0
  });

  const coordString = coords.join(";");
  const destString = destIndices.join(";");
  
  const url = `https://router.project-osrm.org/table/v1/driving/${coordString}?sources=0&destinations=${destString}&annotations=distance,duration`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.code !== "Ok") return {};
    
    const results: Record<string, { distanceKm: number, durationMin: number }> = {};
    destinations.forEach((d, i) => {
      const distMeters = data.distances[0][i];
      const durationSeconds = data.durations[0][i];
      if (distMeters !== null && distMeters !== undefined) {
        results[d.id] = {
          distanceKm: distMeters / 1000,
          durationMin: Math.round(durationSeconds / 60)
        };
      }
    });
    return results;
  } catch (err) {
    console.error("OSRM failed", err);
    return {};
  }
}
