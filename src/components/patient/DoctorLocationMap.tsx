"use client";

import { Navigation } from "lucide-react";
import { useNavigation } from "@/components/navigation/NavigationProvider";
import { useTranslation } from "@/lib/i18n/I18nContext";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface DoctorLocationMapProps {
  latitude: number;
  longitude: number;
  /** Shown in the navigation overlay's title and used to label the image for screen readers. */
  label: string;
  /** Full address, used by the navigation overlay's header. */
  address?: string;
  className?: string;
}

// A static Mapbox preview image, not the full mapbox-gl JS map -- this renders on every doctor
// detail page (a public, SEO-crawled, high-traffic route), and a single fixed pin has no need
// for pan/zoom/interactivity, so shipping ~200KB of map JS here would be pure waste. Tapping the
// image opens the in-page navigation overlay (see NavigationProvider), which is where the
// interactive map + route + turn-by-turn steps actually load -- only for visitors who ask for them.
export default function DoctorLocationMap({ latitude, longitude, label, address, className }: DoctorLocationMapProps) {
  const { openNavigation } = useNavigation();
  const { t } = useTranslation();
  if (!MAPBOX_TOKEN) return null;

  const zoom = 15;
  const src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+2563eb(${longitude},${latitude})/${longitude},${latitude},${zoom},0/640x320@2x?access_token=${MAPBOX_TOKEN}`;

  return (
    <button
      type="button"
      onClick={() => openNavigation({ name: label, latitude, longitude, address })}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-slate-200/80 text-left ${className ?? ""}`}
      aria-label={`${t("booking.directions")}: ${label}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external, dynamically-generated Mapbox image; next/image would need a remote-pattern allowlist for no real benefit here */}
      <img
        src={src}
        alt={`Map showing the location of ${label}`}
        className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-md group-hover:bg-brand-teal group-hover:text-white transition-colors">
        <Navigation className="w-3.5 h-3.5" />
        {t("booking.directions")}
      </span>
    </button>
  );
}
