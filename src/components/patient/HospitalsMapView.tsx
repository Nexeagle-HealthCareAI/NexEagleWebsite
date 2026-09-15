"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Search, LocateFixed, Navigation, MapPin, Building2 } from "lucide-react";
import type { PublicHospital } from "@/lib/api/mappers";
import { haversineDistance } from "@/lib/geo";
import { cn } from "@/lib/utils";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const INDIA_CENTER: [number, number] = [78.9629, 20.5937];

interface HospitalWithDistance extends PublicHospital {
  distanceKm?: number;
}

interface HospitalsMapViewProps {
  hospitals: PublicHospital[];
}

// Patient-facing "hospitals near me" directory: an interactive Mapbox map (worth the JS weight
// here, unlike the single-pin static preview on a doctor's own page — this view's whole point is
// panning/zooming/exploring many pins at once) + a synced list, sortable by distance once the
// visitor shares their location. Only hospitals with a GPS pin set (HospitalBrandingConfig.tsx)
// get a marker; hospitals without one still show in the list so nothing silently disappears.
export default function HospitalsMapView({ hospitals }: HospitalsMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const [query, setQuery] = useState("");
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mappable = useMemo(() => hospitals.filter((h) => h.latitude != null && h.longitude != null), [hospitals]);

  const withDistance: HospitalWithDistance[] = useMemo(() => {
    const list = hospitals.map((h) => {
      if (!userCoords || h.latitude == null || h.longitude == null) return h as HospitalWithDistance;
      return { ...h, distanceKm: haversineDistance(userCoords.lat, userCoords.lon, h.latitude, h.longitude) };
    });
    if (userCoords) {
      list.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
    }
    return list;
  }, [hospitals, userCoords]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return withDistance;
    return withDistance.filter(
      (h) => h.name.toLowerCase().includes(q) || h.city?.toLowerCase().includes(q) || h.state?.toLowerCase().includes(q)
    );
  }, [withDistance, query]);

  // Initialize the map + one marker per geolocated hospital, once.
  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: INDIA_CENTER,
      zoom: 4,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    mappable.forEach((h) => {
      const el = document.createElement("div");
      el.className = "hospital-map-pin";
      el.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="#0d9488" stroke="white" stroke-width="1.5"><path d="M12 21s-7-6.5-7-11.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5" fill="white"/></svg>`;
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([h.longitude as number, h.latitude as number])
        .addTo(map);

      el.addEventListener("click", () => setSelectedId(h.id));
      markersRef.current.set(h.id, marker);
    });

    if (mappable.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      mappable.forEach((h) => bounds.extend([h.longitude as number, h.latitude as number]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 12, duration: 0 });
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to + pop up the selected hospital (from either a marker click or a list-item click).
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const hospital = hospitals.find((h) => h.id === selectedId);
    if (!hospital || hospital.latitude == null || hospital.longitude == null) return;

    map.flyTo({ center: [hospital.longitude, hospital.latitude], zoom: 14, duration: 800 });

    popupRef.current?.remove();
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`;
    popupRef.current = new mapboxgl.Popup({ offset: 20, closeButton: true })
      .setLngLat([hospital.longitude, hospital.latitude])
      .setHTML(
        `<div style="font-family:inherit;min-width:160px">
          <p style="font-weight:700;font-size:13px;margin:0 0 4px">${hospital.name}</p>
          ${hospital.city ? `<p style="font-size:11px;color:#64748b;margin:0 0 8px">${[hospital.city, hospital.state].filter(Boolean).join(", ")}</p>` : ""}
          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="font-size:11px;font-weight:700;color:#0d9488;text-decoration:underline">Get Directions →</a>
        </div>`
      )
      .addTo(map);
  }, [selectedId, hospitals]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location detection isn't supported by this browser.");
      return;
    }
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setIsLocating(false);
      },
      () => {
        setLocationError("Couldn't get your location — check your browser's permission for this site.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 lg:gap-6 h-[calc(100vh-11rem)] min-h-[420px]">
      {/* ── List panel ── */}
      <div className="flex flex-col gap-3 min-h-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hospitals by name or city..."
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal"
          />
        </div>

        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={isLocating}
          className="inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-brand-teal/30 bg-teal-50/50 text-brand-teal text-xs font-bold hover:bg-teal-50 transition-colors disabled:opacity-60"
        >
          <LocateFixed className="w-3.5 h-3.5" />
          {isLocating ? "Detecting…" : userCoords ? "Sorted by distance from you" : "Use my location to sort by distance"}
        </button>
        {locationError && <p className="text-[11px] text-amber-600">{locationError}</p>}

        <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
          {filtered.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">No hospitals match your search.</p>
          )}
          {filtered.map((h) => {
            const hasPin = h.latitude != null && h.longitude != null;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => hasPin && setSelectedId(h.id)}
                className={cn(
                  "w-full text-left p-3.5 rounded-2xl border bg-white transition-all",
                  selectedId === h.id ? "border-brand-teal shadow-md ring-1 ring-brand-teal/20" : "border-slate-200/80 hover:border-slate-300 hover:shadow-sm",
                  !hasPin && "cursor-default opacity-80"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center shrink-0">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-slate-900 truncate">{h.name}</p>
                    {(h.city || h.state) && (
                      <p className="text-xs text-slate-500 mt-0.5">{[h.city, h.state].filter(Boolean).join(", ")}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      {h.distanceKm !== undefined && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-teal bg-teal-50 px-1.5 py-0.5 rounded-md">
                          <MapPin className="w-2.5 h-2.5" />
                          {h.distanceKm < 1 ? "< 1" : h.distanceKm.toFixed(1)} km away
                        </span>
                      )}
                      {!hasPin && (
                        <span className="text-[10px] font-semibold text-slate-400">Map location not set</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 pl-12">
                  <Link
                    href={`/hospitals/${slugify(h.name)}`}
                    className="text-[11px] font-bold text-slate-600 hover:text-brand-teal underline underline-offset-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View doctors
                  </Link>
                  {hasPin && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${h.latitude},${h.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-teal hover:text-teal-700 underline underline-offset-2"
                    >
                      <Navigation className="w-3 h-3" />
                      Directions
                    </a>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Map panel ── */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm min-h-[320px]">
        {MAPBOX_TOKEN ? (
          <div ref={mapContainerRef} className="w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50 text-sm text-slate-400 p-6 text-center">
            Map preview unavailable — the site's Mapbox token isn't configured yet. You can still browse hospitals from the list.
          </div>
        )}
      </div>
    </div>
  );
}
