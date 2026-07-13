"use client";

import { MapPin } from "lucide-react";
import type { CityOption } from "@/data/patient";
import { cityLabel } from "@/data/patient";
import type { GeoStatus } from "@/lib/geo";

interface LocationBannerProps {
  status: GeoStatus;
  city: CityOption | null;
  cities: CityOption[];
  onSelect: (city: CityOption | null) => void;
}

const ALL_VALUE = "__all__";

/**
 * "Showing doctors near {city}" / "Showing all doctors" banner, backed by
 * useGeolocatedCity. Defaults to showing everyone while detecting and whenever
 * location isn't available — never narrows the list without a resolved city.
 */
export default function LocationBanner({ status, city, cities, onSelect }: LocationBannerProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === ALL_VALUE) {
      onSelect(null);
      return;
    }
    const match = cities.find((c) => c.id === e.target.value);
    if (match) onSelect(match);
  }

  const detecting = status === "detecting" || status === "idle";

  return (
    <div className="flex items-center gap-2 px-4 sm:px-0 py-2.5 text-xs text-slate-600 bg-slate-50 sm:bg-transparent border-b sm:border-0 border-slate-100">
      {detecting ? (
        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse shrink-0" />
      ) : (
        <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
      )}
      <span className="min-w-0 truncate">
        {detecting ? (
          "Detecting your location…"
        ) : city ? (
          <>
            Showing doctors near <b className="font-bold text-slate-900">{cityLabel(city)}</b>
          </>
        ) : (
          "Showing all doctors"
        )}
      </span>
      <select
        value={city?.id ?? ALL_VALUE}
        onChange={handleChange}
        aria-label="Choose your location"
        className="ml-auto shrink-0 bg-transparent text-xs font-bold text-brand-teal focus:outline-none cursor-pointer"
      >
        <option value={ALL_VALUE}>All locations</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {cityLabel(c)}
          </option>
        ))}
      </select>
    </div>
  );
}
