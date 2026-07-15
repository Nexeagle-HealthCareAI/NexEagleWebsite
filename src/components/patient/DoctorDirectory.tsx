"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Frown, Loader2, ChevronDown, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";
import DoctorCard from "./DoctorCard";
import { specialties, cityLabel } from "@/data/patient";
import type { CityOption } from "@/data/patient";
import { useDoctors, useSmartSearch, type SmartSearchIntent } from "@/lib/api/hooks";
import { haversineDistance, type GeoStatus } from "@/lib/geo";
import { cn } from "@/lib/utils";

interface DoctorDirectoryProps {
  city: CityOption | null;
  cities: CityOption[];
  area?: string;
  geoStatus: GeoStatus;
  coords?: { lat: number; lon: number } | null;
  onCityChange: (city: CityOption | null) => void;
  query: string;
  specialtyId: string;
}

type SortKey = "relevance" | "distance" | "experience" | "patients" | "fee" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "distance", label: "Nearest First" },
  { key: "rating", label: "Highest Rated" },
  { key: "experience", label: "Most Experienced" },
  { key: "fee", label: "Lowest Fee" },
];

export default function DoctorDirectory({
  city,
  cities,
  area,
  geoStatus,
  coords,
  onCityChange,
  query,
  specialtyId,
}: DoctorDirectoryProps) {
  const [sort, setSort] = useState<SortKey>("relevance");
  const [radius, setRadius] = useState<number>(100);

  const { data, isLoading } = useDoctors();
  const allDoctors = data?.doctors ?? [];

  const specialtyName = specialties.find((s) => s.id === specialtyId)?.name;

  // Location (coords/city/area) + specialty-chip filtering — everything except the free-text
  // query, since the AI fallback below needs to re-filter from this same base rather than
  // the literal keyword match.
  const baseFiltered = useMemo(() => {
    let list = allDoctors;
    if (coords) {
      list = list.map(d => {
        if (d.latitude != null && d.longitude != null) {
          return { ...d, distanceKm: haversineDistance(coords.lat, coords.lon, d.latitude, d.longitude) };
        }
        return { ...d, distanceKm: 999999 };
      }).filter(d => d.distanceKm! <= radius || d.distanceKm === 999999); // dynamic radius + include doctors missing GPS
    } else if (city) {
      list = list.filter((d) => d.city === city.name && d.state === city.state);
      if (area) {
        list = list.filter((d) => d.area === area);
      }
    }
    if (specialtyId) list = list.filter((d) => d.specialtyId === specialtyId);
    return list;
  }, [allDoctors, city, area, coords, specialtyId, radius]);

  // Plain literal keyword match — instant, free, handles most real searches (doctor name,
  // specialty name, a focus-area word) with zero network cost.
  const keywordFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseFiltered;
    return baseFiltered.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.focusAreas.some((a) => a.toLowerCase().includes(q))
    );
  }, [baseFiltered, query]);

  // ── AI search fallback ──────────────────────────────────────────────────
  // Only fires when the literal keyword match above comes up empty AND the query looks
  // like more than a stray keystroke — i.e. exactly the "typed/spoke a symptom description
  // instead of a doctor/specialty name" case a plain substring match can't handle.
  const smartSearch = useSmartSearch();
  const [aiIntent, setAiIntent] = useState<SmartSearchIntent | null>(null);
  const [aiTriedForQuery, setAiTriedForQuery] = useState<string | null>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 4 || keywordFiltered.length > 0) {
      if (aiIntent) setAiIntent(null);
      return;
    }
    if (aiTriedForQuery === q) return;
    setAiTriedForQuery(q);
    smartSearch.mutate(q, {
      onSuccess: (intent) => {
        if (!intent.notConfigured) setAiIntent(intent);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, keywordFiltered.length]);

  const aiFiltered = useMemo(() => {
    if (!aiIntent) return null;
    let list = baseFiltered;
    if (aiIntent.specialtyId) {
      list = list.filter((d) => d.specialtyId === aiIntent.specialtyId);
    }
    if (aiIntent.city && aiIntent.city !== "NEAR_ME") {
      const cityQ = aiIntent.city.toLowerCase();
      const cityMatched = list.filter((d) => d.city?.toLowerCase().includes(cityQ));
      if (cityMatched.length > 0) list = cityMatched;
    }
    if (list.length === 0 && aiIntent.keywords.length > 0) {
      const kws = aiIntent.keywords.map((k) => k.toLowerCase());
      list = baseFiltered.filter((d) =>
        kws.some(
          (k) =>
            d.specialty.toLowerCase().includes(k) ||
            d.focusAreas.some((a) => a.toLowerCase().includes(k)) ||
            (d.about ?? "").toLowerCase().includes(k)
        )
      );
    }
    return list;
  }, [baseFiltered, aiIntent]);

  const usingAiResults = keywordFiltered.length === 0 && aiFiltered !== null && aiFiltered.length > 0;
  const aiSpecialtyName = aiIntent?.specialtyId ? specialties.find((s) => s.id === aiIntent.specialtyId)?.name : undefined;

  const filtered = useMemo(() => {
    const base = usingAiResults && aiFiltered ? aiFiltered : keywordFiltered;
    const sorted = [...base];
    switch (sort) {
      case "distance":
        sorted.sort((a, b) => (a.distanceKm ?? 999999) - (b.distanceKm ?? 999999));
        break;
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
  }, [keywordFiltered, aiFiltered, usingAiResults, sort]);

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
                  <motion.span
                    key={filtered.length}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-bold text-slate-800 inline-block"
                  >
                    {filtered.length}
                  </motion.span>{" "}
                  verified {filtered.length === 1 ? "expert" : "experts"} available
                </>
              )}
            </p>
          </div>

          {/* Controls Container */}
          <div className="flex items-center gap-3">
            
            {/* Radius Dropdown (Only when GPS is active) */}
            {coords && (
              <div className="relative group">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-brand-teal/40 transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4 text-brand-teal" />
                  <select
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer appearance-none pr-6"
                  >
                    <option value={5}>Within 5 km</option>
                    <option value={10}>Within 10 km</option>
                    <option value={25}>Within 25 km</option>
                    <option value={50}>Within 50 km</option>
                    <option value={100}>Within 100 km</option>
                    <option value={250}>Within 250 km</option>
                    <option value={500}>Within 500 km</option>
                  </select>
                  <div className="absolute right-3 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            )}

            {/* Premium Sort Dropdown */}
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
                <div className="absolute right-3 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── AI-enhanced results hint ── */}
        {usingAiResults && (
          <div className="flex items-center gap-2 mb-6 -mt-4 text-sm text-brand-teal font-semibold">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>
              Showing {aiSpecialtyName ?? "matching"} specialists based on &quot;{query.trim()}&quot;
            </span>
          </div>
        )}

        {/* ── Grid ── */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-brand-teal/50 mb-4" />
            <p className="text-base font-semibold">Finding the best specialists for you…</p>
          </div>
        ) : filtered.length === 0 && smartSearch.isPending ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Sparkles className="w-10 h-10 animate-pulse text-brand-teal/50 mb-4" />
            <p className="text-base font-semibold">Looking a little more broadly for you…</p>
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((doctor, i) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-32 rounded-[2rem] border border-dashed border-slate-200 bg-white shadow-sm"
          >
            <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 text-slate-300 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Frown className="w-10 h-10" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">No doctors match your criteria</h3>
            <p className="text-base text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any specialists matching your search in this area. Try adjusting your filters or searching across All India.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
