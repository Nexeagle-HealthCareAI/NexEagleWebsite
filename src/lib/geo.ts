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
 */
export function useGeolocatedCity(candidates: CityOption[]): { status: GeoStatus; city: CityOption | null } {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [city, setCity] = useState<CityOption | null>(null);

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
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
    // Only re-run when the candidate set meaningfully changes (its length),
    // not on every render — candidates is a fresh array each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates.length]);

  return { status, city };
}
