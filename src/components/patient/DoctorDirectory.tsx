"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useIsRestoring } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { motion, useReducedMotion } from "framer-motion";
import { Frown, Loader2, ChevronDown, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";
import DoctorCard from "./DoctorCard";
import { specialties, cityLabel } from "@/data/patient";
import type { CityOption, Doctor } from "@/data/patient";
import { usePaginatedDoctors, useSmartSearch, type SmartSearchIntent } from "@/lib/api/hooks";
import { haversineDistance, getDrivingDistances, type GeoStatus } from "@/lib/geo";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { translateSpecialty } from "@/lib/i18n/specialties";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

// Minimum visible-result count worth keeping on screen before auto-requesting another
// server page — client-side filters (specialty chip, AI merge, coords/radius, keyword)
// still run over whatever's been fetched so far, so a narrow filter over a broad
// (unfiltered-by-specialty) server page can legitimately match very few of it. Keeps
// fetching in the background until either this is met or the server runs out of pages.
const MIN_VISIBLE_BEFORE_STOP_PREFETCH = 24;

interface DoctorDirectoryProps {
  city: CityOption | null;
  cities: CityOption[];
  area?: string;
  geoStatus: GeoStatus;
  coords?: { lat: number; lon: number } | null;
  onCityChange: (city: CityOption | null) => void;
  query: string;
  specialtyId: string;
  /** Server-fetched, already-filtered doctors for this route (see src/lib/api/server.ts's
   * getAllDoctors + src/lib/filters/doctorLocation.ts). Seeds the first render — server AND
   * client hydration pass — with real content instead of an empty array. */
  initialDoctors?: Doctor[];
}

type SortKey = "relevance" | "distance" | "experience" | "patients" | "fee" | "rating";

const sortOptions: { key: SortKey; labelKey: TranslationKey }[] = [
  { key: "relevance", labelKey: "directory.sortRelevance" },
  { key: "distance", labelKey: "directory.sortDistance" },
  { key: "rating", labelKey: "directory.sortRating" },
  { key: "experience", labelKey: "directory.sortExperience" },
  { key: "fee", labelKey: "directory.sortFee" },
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
  initialDoctors,
}: DoctorDirectoryProps) {
  const { t, locale } = useTranslation();
  const [sort, setSort] = useState<SortKey>("relevance");
  const [radius, setRadius] = useState<number>(100);
  const [drivingData, setDrivingData] = useState<Record<string, { distanceKm: number, durationMin: number }>>({});
  const reducedMotion = useReducedMotion();

  // City/State are pushed server-side (the one unambiguous, always-correct filter — no
  // fallback-matching concerns, unlike specialty text) whenever a fixed city is active.
  // Live GPS "near me" browsing (coords set) has no server-side lat/lon filter, so it stays
  // unscoped here and is narrowed by the existing client-side haversine+radius filter below,
  // same as before pagination — just now applied incrementally as pages load in.
  const serverCity = !coords && city ? city.name : undefined;
  const serverState = !coords && city ? city.state : undefined;

  const hasSeedData = initialDoctors !== undefined;
  const {
    doctors: allDoctors,
    isLoading: queryIsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePaginatedDoctors({ city: serverCity, state: serverState }, initialDoctors);
  // The QueryClient persists to localStorage (see app/providers.tsx), so on a
  // repeat visit the client's very first render can already see a *restored*
  // cache — before the server ever rendered anything — while SSR always starts
  // from a clean "loading" state (no localStorage access). That mismatch (server
  // says "loading", client says "0 results") trips a hydration warning. Treat
  // "still restoring the persisted cache" as loading too, so the first client
  // render matches what the server sent — UNLESS we already seeded real content
  // server-side (`hasSeedData`), in which case the server rendered real doctor
  // cards and forcing "loading" on the client's hydration pass would flash a
  // spinner over content that's already correct, reintroducing the same class
  // of mismatch this guard was written to prevent.
  const isRestoring = useIsRestoring();
  const isLoading = queryIsLoading || (isRestoring && !hasSeedData);

  const specialtyMeta = specialties.find((s) => s.id === specialtyId);
  const specialtyName = specialtyMeta ? translateSpecialty(specialtyMeta.id, specialtyMeta.name, locale) : undefined;

  // Location (coords/area) + specialty-chip filtering — everything except the free-text
  // query, since the AI fallback below needs to re-filter from this same base rather than
  // the literal keyword match. City itself is already server-filtered above (serverCity/
  // serverState); area isn't, so it's still applied here.
  const baseFiltered = useMemo(() => {
    let list = allDoctors;
    if (coords) {
      list = list.map(d => {
        if (d.latitude != null && d.longitude != null) {
          return { ...d, distanceKm: haversineDistance(coords.lat, coords.lon, d.latitude, d.longitude) };
        }
        return { ...d, distanceKm: 999999 };
      }).filter(d => d.distanceKm! <= radius || d.distanceKm === 999999); // dynamic radius + include doctors missing GPS
    } else if (city && area) {
      list = list.filter((d) => d.area === area);
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
    if (aiIntent.specialtyIds.length > 0) {
      // Merge silently across every close-call candidate the router returned (not just the
      // top pick) — a plain headache genuinely might mean Neurology OR General Physician,
      // and forcing only #1 would hide correct doctors on ambiguous queries. Display order
      // within this wider set is handled by aiCandidateRank below, in the main sort.
      const idSet = new Set(aiIntent.specialtyIds);
      list = list.filter((d) => idSet.has(d.specialtyId));
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

  // Position of each candidate specialty in the router's own ranking (0 = top pick) — used
  // below so the merged multi-specialty result list still shows the top pick's doctors first,
  // rather than interleaving them with runner-up specialties in arbitrary order.
  const aiCandidateRank = useMemo(() => {
    if (!aiIntent || aiIntent.specialtyIds.length < 2) return null;
    const rank = new Map<string, number>();
    aiIntent.specialtyIds.forEach((id, idx) => {
      if (!rank.has(id)) rank.set(id, idx);
    });
    return rank;
  }, [aiIntent]);

  const usingAiResults = keywordFiltered.length === 0 && aiFiltered !== null && aiFiltered.length > 0;
  const aiSpecialtyMeta = aiIntent?.specialtyId ? specialties.find((s) => s.id === aiIntent.specialtyId) : undefined;
  const aiSpecialtyName = aiSpecialtyMeta ? translateSpecialty(aiSpecialtyMeta.id, aiSpecialtyMeta.name, locale) : undefined;

  const filtered = useMemo(() => {
    const base = usingAiResults && aiFiltered ? aiFiltered : keywordFiltered;
    // Inject driving data if available
    const mapped = base.map(d => {
      const drive = drivingData[d.id];
      if (drive) {
        return { ...d, distanceKm: drive.distanceKm, drivingDurationMin: drive.durationMin };
      }
      return d;
    });

    const sorted = [...mapped];
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
      default: // relevance (candidate rank when merged across specialties, then promoted, then rating/experience)
        sorted.sort((a, b) => {
          if (usingAiResults && aiCandidateRank) {
            const rankA = aiCandidateRank.get(a.specialtyId) ?? aiCandidateRank.size;
            const rankB = aiCandidateRank.get(b.specialtyId) ?? aiCandidateRank.size;
            if (rankA !== rankB) return rankA - rankB;
          }
          if (a.promoted && !b.promoted) return -1;
          if (!a.promoted && b.promoted) return 1;
          const scoreA = (a.rating ?? 0) * 10 + a.experienceYears;
          const scoreB = (b.rating ?? 0) * 10 + b.experienceYears;
          return scoreB - scoreA;
        });
    }
    return sorted;
  }, [keywordFiltered, aiFiltered, usingAiResults, aiCandidateRank, sort, drivingData]);

  // Server pages are only scoped by City/State — specialty/area/coords-radius/keyword all
  // still filter client-side over whatever's loaded so far, so a narrow filter can leave too
  // few visible results even though more doctors exist on later server pages. Keep pulling
  // pages in the background until either there's enough to fill a screen or the server is
  // genuinely out of matches — invisible to the user, just a few extra network round trips.
  useEffect(() => {
    if (isLoading || isFetchingNextPage || !hasNextPage) return;
    if (filtered.length >= MIN_VISIBLE_BEFORE_STOP_PREFETCH) return;
    fetchNextPage();
  }, [filtered.length, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  // Fetch real driving distances from OSRM for the top displayed doctors
  useEffect(() => {
    if (!coords) return;
    
    // Find doctors in the current list that have GPS but lack driving data
    const pending = filtered
      .filter(d => d.latitude != null && d.longitude != null && !drivingData[d.id])
      .slice(0, 50); // limit to 50 to respect OSRM public API limits
      
    if (pending.length === 0) return;

    const destinations = pending.map(d => ({
      id: d.id,
      lat: d.latitude!,
      lon: d.longitude!
    }));

    getDrivingDistances(coords.lat, coords.lon, destinations).then(results => {
      if (Object.keys(results).length > 0) {
        setDrivingData(prev => ({ ...prev, ...results }));
      }
    });
  }, [filtered, coords, drivingData]);

  // Debounced "search settled" tracking for the CMS "All Searches" report — fires ~800ms after
  // the last change to query/specialty/results rather than per keystroke, and only when there's
  // an actual search intent (free-text query or a specialty filter), not the default browse-all
  // state. This is the only place that knows the final result count, so it's the natural home for
  // this event rather than the search box itself (PatientHero.tsx).
  useEffect(() => {
    const q = query.trim();
    if (!q && !specialtyId) return;

    const handle = setTimeout(() => {
      // When the AI path drove the results, log what it ACTUALLY predicted (aiIntent's own
      // specialtyId) rather than the manual filter chip's specialtyId state — the two aren't
      // the same thing: the AI fallback only fires when there's no manual filter match, so
      // logging the ambient `specialtyId` here would either be empty or, worse, stale from a
      // previous manual selection. This is what feeds the 1HMS-NLP-Router feedback loop, so
      // getting the predicted value right matters.
      const loggedSpecialtyId = usingAiResults ? aiIntent?.specialtyId ?? undefined : specialtyId || undefined;

      trackEvent("search_performed", {
        specialtyId: loggedSpecialtyId,
        metadata: {
          query: q || undefined,
          resultsCount: filtered.length,
          aiUsed: usingAiResults,
          method: usingAiResults ? aiIntent?.method ?? undefined : undefined,
          confidence: usingAiResults ? aiIntent?.confidence ?? undefined : undefined,
          modelVersion: usingAiResults ? aiIntent?.modelVersion ?? undefined : undefined,
          // Full candidate set the router considered, not just the top pick — lets the
          // feedback-log correlation (CMSAPI SymptomRouterRepository) tell a genuine
          // misprediction apart from a booking that landed on a close-call runner-up we
          // deliberately showed. See CANDIDATE_MARGIN in Model_1_Doctor_Dekho.py.
          candidateSpecialtyIds:
            usingAiResults && aiIntent && aiIntent.specialtyIds.length > 1
              ? aiIntent.specialtyIds
              : undefined,
        },
      });
    }, 800);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, specialtyId, filtered.length, usingAiResults, aiIntent]);

  // ── Virtualized grid ─────────────────────────────────────────────────────
  // Renders only the rows near the viewport, regardless of how many doctors matched —
  // the DOM no longer grows with the platform's total doctor count. Tracks the same
  // 1/2/3-column breakpoints the CSS grid used (md=768px, lg=1024px) so each virtual
  // "row" holds exactly as many cards as actually render side by side.
  const [columns, setColumns] = useState(1);
  useEffect(() => {
    const compute = () => setColumns(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const rows = useMemo(() => {
    const chunks: Doctor[][] = [];
    for (let i = 0; i < filtered.length; i += columns) chunks.push(filtered.slice(i, i + columns));
    return chunks;
  }, [filtered, columns]);

  const gridParentRef = useRef<HTMLDivElement | null>(null);
  const [gridParentOffset, setGridParentOffset] = useState(0);
  useEffect(() => {
    setGridParentOffset(gridParentRef.current?.offsetTop ?? 0);
  }, [isLoading]);

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 460,
    overscan: 4,
    scrollMargin: gridParentOffset,
  });

  // Trigger the next server page as the user scrolls near the bottom of what's already
  // been fetched — separate from (and in addition to) the backfill effect above, which
  // only covers "too few results to fill a screen at all"; this covers "scrolled past
  // what's loaded so far" for the common case where a page fully renders fine on its own.
  const virtualItems = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const last = virtualItems[virtualItems.length - 1];
    if (!last) return;
    if (last.index >= rows.length - 2 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [virtualItems, rows.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section id="doctors" className="bg-slate-50/50 pb-24 pt-10 sm:pt-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Premium Result Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {specialtyName ? `${specialtyName} ${t("directory.specialists")}` : t("directory.topSpecialists")}
              {city ? (
                <span className="text-brand-teal"> {t("directory.inCity", { city: cityLabel(city) })}</span>
              ) : (
                <span className="text-slate-400 font-medium"> {t("directory.allIndiaSuffix")}</span>
              )}
            </h2>
            <p className="text-base text-slate-500 mt-2 font-medium">
              {isLoading ? (
                <span className="animate-pulse">{t("directory.loading")}</span>
              ) : (
                (() => {
                  const key = filtered.length === 1 ? "directory.resultCountSingular" : "directory.resultCountPlural";
                  const [before, after] = t(key).split("{n}");
                  return (
                    <>
                      {before}
                      <motion.span
                        key={filtered.length}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-bold text-slate-800 inline-block"
                      >
                        {filtered.length}
                      </motion.span>
                      {after}
                    </>
                  );
                })()
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
                    {[5, 10, 25, 50, 100, 250, 500].map((km) => (
                      <option key={km} value={km}>
                        {t("directory.radiusWithin", { n: km })}
                      </option>
                    ))}
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
                      {t(o.labelKey)}
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
              {aiSpecialtyName
                ? t("directory.aiHintWithSpecialty", { specialty: aiSpecialtyName, query: query.trim() })
                : t("directory.aiHintGeneric", { query: query.trim() })}
            </span>
          </div>
        )}

        {/* ── Grid ── */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-brand-teal/50 mb-4" />
            <p className="text-base font-semibold">{t("directory.findingSpecialists")}</p>
          </div>
        ) : filtered.length === 0 && smartSearch.isPending ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Sparkles className="w-10 h-10 animate-pulse text-brand-teal/50 mb-4" />
            <p className="text-base font-semibold">{t("directory.lookingBroadly")}</p>
          </div>
        ) : filtered.length > 0 ? (
          <>
            <div
              ref={gridParentRef}
              style={{ position: "relative", height: rowVirtualizer.getTotalSize() }}
            >
              {virtualItems.map((virtualRow) => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-6 sm:pb-8">
                    {rows[virtualRow.index]?.map((doctor, colIdx) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        index={colIdx}
                        reducedMotion={reducedMotion ?? false}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {isFetchingNextPage && (
              <div className="flex items-center justify-center gap-2 py-8 text-slate-400 text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-brand-teal" />
                {t("directory.loading")}
              </div>
            )}
          </>
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
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{t("directory.noMatch")}</h3>
            <p className="text-base text-slate-500 max-w-md mx-auto">
              {t("directory.noMatchDesc")}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
