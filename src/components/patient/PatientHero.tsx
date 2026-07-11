"use client";

import { Search, MapPin, Building2, ChevronDown } from "lucide-react";
import { STATES, citiesInState, cityLabel, type CityOption } from "@/data/patient";

interface PatientHeroProps {
  city: CityOption;
  onCityChange: (cityId: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
}

function scrollToDoctors() {
  document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
}

/** Landing hero: value prop, State → City/District filter, and search. */
export default function PatientHero({
  city,
  onCityChange,
  query,
  onQueryChange,
}: PatientHeroProps) {
  const citiesForState = citiesInState(city.state);

  function handleStateChange(nextState: string) {
    // Switching state must land on a valid city within it — never keep the old
    // city id, since a city id is only meaningful paired with its own state.
    const firstCity = citiesInState(nextState)[0];
    if (firstCity) onCityChange(firstCity.id);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-white">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-14 sm:pt-16 sm:pb-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
          Find a doctor &amp; book an
          <br className="hidden sm:block" />
          <span className="text-brand-teal"> in-clinic appointment</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Compare verified specialists in {cityLabel(city)} and reserve your
          slot in under a minute. No app, no login needed.
        </p>

        {/* State + City/District filter — two steps, not one long "Name, State"
            list. A bare town name isn't unique (e.g. two "Kishanganj"s), so we
            resolve it the way an address actually works: state, then district. */}
        <div className="mt-7 max-w-xl mx-auto grid grid-cols-2 gap-2.5">
          <LocationSelect
            icon={<MapPin className="w-4 h-4 text-brand-teal shrink-0" />}
            label="State"
            value={city.state}
            onChange={handleStateChange}
            options={STATES.map((s) => ({ value: s, label: s }))}
          />
          <LocationSelect
            icon={<Building2 className="w-4 h-4 text-brand-teal shrink-0" />}
            label="City / District"
            value={city.id}
            onChange={onCityChange}
            options={citiesForState.map((c) => ({ value: c.id, label: c.name }))}
          />
        </div>

        {/* Search */}
        <div className="mt-3 max-w-xl mx-auto flex items-center bg-white border border-slate-200 rounded-2xl h-14 pl-4 pr-2 shadow-lg shadow-slate-200/60 focus-within:border-brand-teal/50 focus-within:ring-2 focus-within:ring-brand-teal/10 transition">
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

interface LocationSelectProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

/** Native <select> — the OS's own picker is the most reliable control on touch. */
function LocationSelect({ icon, label, value, onChange, options }: LocationSelectProps) {
  return (
    <div className="relative flex items-center bg-white border border-slate-200 rounded-xl h-11 pl-3 pr-7 shadow-sm hover:border-brand-teal/30 transition text-left">
      {icon}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="appearance-none bg-transparent flex-1 min-w-0 h-full pl-2 text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer truncate"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
    </div>
  );
}
