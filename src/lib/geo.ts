// ─────────────────────────────────────────────────────────────────────────────
// Browser-geolocation → nearest known city, with no third-party geocoding API.
//
// This is deliberately an approximation, not real reverse geocoding: we only
// need "which of our directory's cities is the visitor closest to," not a
// street address, and adding a paid geocoding API (Google Maps, etc.) is a
// real infra/cost decision this file isn't the place to make unilaterally.
// Coordinates below are city-centre points for India's major metros/state
// capitals — accurate enough to pick the right city, not the right street.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { cityId, type CityOption } from "@/data/patient";

export const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  [cityId("Mumbai", "Maharashtra")]: { lat: 19.076, lon: 72.8777 },
  [cityId("Delhi NCR", "Delhi")]: { lat: 28.6139, lon: 77.209 },
  [cityId("Bengaluru", "Karnataka")]: { lat: 12.9716, lon: 77.5946 },
  [cityId("Hyderabad", "Telangana")]: { lat: 17.385, lon: 78.4867 },
  [cityId("Chennai", "Tamil Nadu")]: { lat: 13.0827, lon: 80.2707 },
  [cityId("Kolkata", "West Bengal")]: { lat: 22.5726, lon: 88.3639 },
  [cityId("Pune", "Maharashtra")]: { lat: 18.5204, lon: 73.8567 },
  [cityId("Ahmedabad", "Gujarat")]: { lat: 23.0225, lon: 72.5714 },
  [cityId("Jaipur", "Rajasthan")]: { lat: 26.9124, lon: 75.7873 },
  [cityId("Lucknow", "Uttar Pradesh")]: { lat: 26.8467, lon: 80.9462 },
  [cityId("Kanpur", "Uttar Pradesh")]: { lat: 26.4499, lon: 80.3319 },
  [cityId("Nagpur", "Maharashtra")]: { lat: 21.1458, lon: 79.0882 },
  [cityId("Indore", "Madhya Pradesh")]: { lat: 22.7196, lon: 75.8577 },
  [cityId("Bhopal", "Madhya Pradesh")]: { lat: 23.2599, lon: 77.4126 },
  [cityId("Visakhapatnam", "Andhra Pradesh")]: { lat: 17.6868, lon: 83.2185 },
  [cityId("Patna", "Bihar")]: { lat: 25.5941, lon: 85.1376 },
  [cityId("Vadodara", "Gujarat")]: { lat: 22.3072, lon: 73.1812 },
  [cityId("Ludhiana", "Punjab")]: { lat: 30.901, lon: 75.8573 },
  [cityId("Agra", "Uttar Pradesh")]: { lat: 27.1767, lon: 78.0081 },
  [cityId("Nashik", "Maharashtra")]: { lat: 19.9975, lon: 73.7898 },
  [cityId("Varanasi", "Uttar Pradesh")]: { lat: 25.3176, lon: 82.9739 },
  [cityId("Coimbatore", "Tamil Nadu")]: { lat: 11.0168, lon: 76.9558 },
  [cityId("Madurai", "Tamil Nadu")]: { lat: 9.9252, lon: 78.1198 },
  [cityId("Raipur", "Chhattisgarh")]: { lat: 21.2514, lon: 81.6296 },
  [cityId("Guwahati", "Assam")]: { lat: 26.1445, lon: 91.7362 },
  [cityId("Chandigarh", "Chandigarh")]: { lat: 30.7333, lon: 76.7794 },
  [cityId("Thiruvananthapuram", "Kerala")]: { lat: 8.5241, lon: 76.9366 },
  [cityId("Kochi", "Kerala")]: { lat: 9.9312, lon: 76.2673 },
  [cityId("Ranchi", "Jharkhand")]: { lat: 23.3441, lon: 85.3096 },
  [cityId("Bhubaneswar", "Odisha")]: { lat: 20.2961, lon: 85.8245 },
  [cityId("Kishanganj", "Bihar")]: { lat: 26.0987, lon: 87.9436 },
  [cityId("Kishanganj", "Delhi")]: { lat: 28.6139, lon: 77.209 },
};

function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Beyond this radius we don't have a good match among our known coordinates —
// showing "all" is more honest than guessing a city hundreds of km away.
const MAX_MATCH_KM = 150;

/** Nearest of `candidates` to (lat, lon), or null if nothing is close enough. */
export function nearestCity(lat: number, lon: number, candidates: CityOption[]): CityOption | null {
  let best: CityOption | null = null;
  let bestKm = Infinity;
  for (const c of candidates) {
    const coord = CITY_COORDS[c.id];
    if (!coord) continue;
    const km = haversineKm({ lat, lon }, coord);
    if (km < bestKm) {
      bestKm = km;
      best = c;
    }
  }
  return best && bestKm <= MAX_MATCH_KM ? best : null;
}

export type GeoStatus = "idle" | "detecting" | "found" | "denied" | "unsupported";

/**
 * Resolves the visitor's approximate city from `candidates` (the directory's
 * actual list of cities with doctors) via the browser Geolocation API. Never
 * blocks the page — starts at "idle"/"detecting" and settles to "found"
 * (with a city) or "denied"/"unsupported" (city stays null, caller should
 * default to showing everything, never an empty list).
 */
export function useGeolocatedCity(candidates: CityOption[]): { status: GeoStatus; city: CityOption | null } {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [city, setCity] = useState<CityOption | null>(null);

  useEffect(() => {
    if (candidates.length === 0) return;
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("detecting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const match = nearestCity(pos.coords.latitude, pos.coords.longitude, candidates);
        setCity(match);
        setStatus(match ? "found" : "denied");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
    // Only re-run when the candidate set meaningfully changes (its length),
    // not on every render — candidates is a fresh array each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates.length]);

  return { status, city };
}
