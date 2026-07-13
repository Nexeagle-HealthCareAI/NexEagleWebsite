"use client";

import { Search } from "lucide-react";

interface PatientHeroProps {
  query: string;
  onQueryChange: (q: string) => void;
}

function scrollToDoctors() {
  document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
}

/** Landing hero: value prop + search. Location now lives in LocationBanner,
 *  right above the doctor grid, so it can react to geolocation independently. */
export default function PatientHero({ query, onQueryChange }: PatientHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-white">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-14 sm:pt-16 sm:pb-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
          Find a doctor near you
          <br className="hidden sm:block" />
          <span className="text-brand-teal"> &amp; book an in-clinic appointment</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Compare verified specialists near you and reserve your slot in under a
          minute. No app, no login needed.
        </p>

        {/* Search */}
        <div className="mt-7 max-w-xl mx-auto flex items-center bg-white border border-slate-200 rounded-2xl h-14 pl-4 pr-2 shadow-lg shadow-slate-200/60 focus-within:border-brand-teal/50 focus-within:ring-2 focus-within:ring-brand-teal/10 transition">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && scrollToDoctors()}
            placeholder="Search doctor, specialty, or symptom…"
            className="w-full min-w-0 bg-transparent px-3 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={scrollToDoctors}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 h-10 rounded-xl bg-brand-teal hover:bg-brand-teal/90 text-white text-sm font-bold shrink-0 transition"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
