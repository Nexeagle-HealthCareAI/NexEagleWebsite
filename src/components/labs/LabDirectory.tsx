"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Frown, Loader2, Search } from "lucide-react";
import LabCard from "./LabCard";
import type { Lab } from "@/data/labs";
import { usePaginatedLabs } from "@/lib/api/hooks";

interface LabDirectoryProps {
  /** Server-fetched labs for this route (see src/lib/api/server.ts's getAllLabs). Seeds the
   * first render -- server AND client hydration pass -- with real content instead of an
   * empty grid while the client's own fetch is in flight. */
  initialLabs?: Lab[];
}

// Deliberately simpler than DoctorDirectory.tsx: a plain paginated grid with basic city/state
// and text-search filtering. Skips virtualization, haversine radius search, and the AI
// smart-search fallback -- that machinery earns its cost for a large, constantly-scrolled
// doctor directory; a much smaller labs dataset doesn't need it yet (see the plan's Out of Scope).
export default function LabDirectory({ initialLabs }: LabDirectoryProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const cities = useMemo(() => {
    const set = new Set((initialLabs ?? []).map((l) => l.city).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [initialLabs]);

  const { labs, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, notConfigured } = usePaginatedLabs(
    { city: cityFilter || undefined, search: query || undefined },
    initialLabs
  );

  const showEmptyState = !isLoading && labs.length === 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">Find a Pathology Lab</h1>
          <p className="text-sm text-slate-500 mt-1">Diagnostic labs and testing centres near you.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search labs..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            />
          </div>
          {cities.length > 0 && (
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            >
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {notConfigured && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Showing sample labs -- live data isn't configured for this environment.
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading labs...
        </div>
      ) : showEmptyState ? (
        <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400">
          <Frown className="w-10 h-10 mb-3" />
          <p className="font-medium text-slate-500">No labs found</p>
          <p className="text-sm">Try a different city or search term.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {labs.map((lab, index) => (
              <LabCard key={lab.id} lab={lab} index={index % 3} reducedMotion={reducedMotion} />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-brand-teal/40 hover:text-brand-teal transition-colors disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "Load more labs"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
