import { Navigation } from "lucide-react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface DoctorLocationMapProps {
  latitude: number;
  longitude: number;
  directionsUrl: string;
  label?: string;
  className?: string;
}

// A static Mapbox preview image, not the full mapbox-gl JS map -- this renders on every doctor
// detail page (a public, SEO-crawled, high-traffic route), and a single fixed pin has no need
// for pan/zoom/interactivity, so shipping ~200KB of map JS here would be pure waste. Tapping the
// image hands off to the visitor's own Google/Apple Maps app for actual turn-by-turn directions,
// same as the "Get Directions" button next to it -- see getDirectionsUrl() in data/patient.ts.
export default function DoctorLocationMap({ latitude, longitude, directionsUrl, label, className }: DoctorLocationMapProps) {
  if (!MAPBOX_TOKEN) return null;

  const zoom = 15;
  const src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+2563eb(${longitude},${latitude})/${longitude},${latitude},${zoom},0/640x320@2x?access_token=${MAPBOX_TOKEN}`;

  return (
    <a
      href={directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl border border-slate-200/80 ${className ?? ""}`}
      aria-label={label ? `Get directions to ${label}` : "Get directions"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external, dynamically-generated Mapbox image; next/image would need a remote-pattern allowlist for no real benefit here */}
      <img
        src={src}
        alt={label ? `Map showing the location of ${label}` : "Clinic location map"}
        className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-md group-hover:bg-brand-teal group-hover:text-white transition-colors">
        <Navigation className="w-3.5 h-3.5" />
        Get Directions
      </span>
    </a>
  );
}
