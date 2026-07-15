"use client";

import { useMemo, useState } from "react";
import { Frown, Loader2, MapPin, ChevronDown, SlidersHorizontal } from "lucide-react";
import DoctorCard from "./DoctorCard";
import { specialties, cityLabel } from "@/data/patient";
import type { CityOption } from "@/data/patient";
import { useDoctors } from "@/lib/api/hooks";
import type { GeoStatus } from "@/lib/geo";
import { cn } from "@/lib/utils";

interface DoctorDirectoryProps {
  city: CityOption | null;
  cities: CityOption[];
  geoStatus: GeoStatus;
  onCityChange: (city: CityOption | null) => void;
  query: string;
  specialtyId: string;
}

type SortKey = "relevance" | "experience" | "patients" | "fee" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "rating", label: "Highest Rated" },
  { key: "experience", label: "Most Experienced" },
  { key: "fee", label: "Lowest Fee" },
];

export default function DoctorDirectory({
  city,
  cities,
  geoStatus,
  onCityChange,
  query,
  specialtyId,
}: DoctorDirectoryProps) {
  const [sort, setSort] = useState<SortKey>("relevance");

  const { data, isLoading } = useDoctors();
  const allDoctors = data?.doctors ?? [];

  const specialtyName = specialties.find((s) => s.id === specialtyId)?.name;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = city
      ? allDoctors.filter((d) => d.city === city.name && d.state === city.state)
      : allDoctors;

    if (specialtyId) list = list.filter((d) => d.specialtyId === specialtyId);
    if (q) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.focusAreas.some((a) => a.toLowerCase().includes(q))
      );
    }

    const sorted = [...list];
    switch (sort) {
      case "rating":
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "experience":
        sorted.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case "fee":
        sorted.sort((a, b) => (a.fee ?? 9999) - (b.fee ?? 9999));
        break;
      default: // relevance (promoted first, then rating, then experience)
        sorted.sort((a, b) => {
          if (a.promoted && !b.promoted) return -1;
          if (!a.promoted && b.promoted) return 1;
          const scoreA = (a.rating ?? 0) * 10 + a.experienceYears;
          const scoreB = (b.rating ?? 0) * 10 + b.experienceYears;
          return scoreB - scoreA;
        });
    }
    return sorted;
  }, [allDoctors, city, query, specialtyId, sort]);

  return (
    <section id="doctors" className="bg-slate-50/50 pb-24 pt-10 sm:pt-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Premium Result Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {specialtyName ? `${specialtyName} Specialists` : "Top Specialists"}
              {city ? (
                <span className="text-brand-teal"> in {cityLabel(city)}</span>
              ) : (
                <span className="text-slate-400 font-medium"> — All India</span>
              )}
            </h2>
            <p className="text-base text-slate-500 mt-2 font-medium">
              {isLoading ? (
                <span className="animate-pulse">Loading top doctors…</span>
              ) : (
                <>
                  <span className="font-bold text-slate-800">{filtered.length}</span>{" "}
                  verified {filtered.length === 1 ? "expert" : "experts"} available
                </>
              )}
            </p>
          </div>

          {/* Premium Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm font-semibold text-slate-400">Sort by:</span>
            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-brand-teal/40 transition-colors cursor-pointer">
                <SlidersHorizontal className="w-4 h-4 text-brand-teal" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer appearance-none pr-6"
                >
                  {sortOptions.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-brand-teal/50 mb-4" />
            <p className="text-base font-semibold">Finding the best specialists for you…</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 rounded-[2rem] border border-dashed border-slate-200 bg-white shadow-sm">
            <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 text-slate-300 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Frown className="w-10 h-10" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">No doctors match your criteria</h3>
            <p className="text-base text-slate-500 max-w-md mx-auto">
              We couldn't find any specialists matching your search in this area. Try adjusting your filters or searching across All India.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
