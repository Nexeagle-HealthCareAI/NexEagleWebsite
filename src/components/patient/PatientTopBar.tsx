"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, Locate, ArrowRight, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { CityOption } from "@/data/patient";
import { cityLabel } from "@/data/patient";
import type { GeoStatus } from "@/lib/geo";
import { cn } from "@/lib/utils";

interface PatientTopBarProps {
  /** Geolocation detection status */
  geoStatus?: GeoStatus;
  /** Currently selected city */
  city?: CityOption | null;
  /** All available cities for manual selection */
  cities?: CityOption[];
  /** Called when user selects a city or clears location */
  onCityChange?: (city: CityOption | null) => void;
  /** Called when user explicitly allows location detection */
  onRequestLocation?: () => void;
}

export default function PatientTopBar({
  geoStatus = "idle",
  city = null,
  cities = [],
  onCityChange,
  onRequestLocation,
}: PatientTopBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const detecting = geoStatus === "detecting" || geoStatus === "idle";
  const denied = geoStatus === "denied" || geoStatus === "unsupported";

  function handleLocationClick() {
    if (denied) {
      setShowPrompt(true);
    } else if (!city && !detecting) {
      onRequestLocation?.();
    } else {
      setShowDropdown((v) => !v);
    }
  }

  function handleCitySelect(c: CityOption | null) {
    onCityChange?.(c);
    setShowDropdown(false);
  }

  // If we don't pass geoStatus (like on the detail page), we can simplify the display.
  // But we always want the TopBar to look premium.
  const hasLocationProps = onCityChange !== undefined;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* ── Left: Logo + Brand Title ── */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 select-none group">
            <Logo textSize="text-base sm:text-xl" />
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="w-px h-6 bg-slate-200/60" />
              <span className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-sky-500 tracking-tight text-lg group-hover:opacity-80 transition-opacity">
                Doctor Dekho
              </span>
            </div>
          </Link>

          {/* ── Right: Location pill + Provider CTA ── */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Location pill (Glassmorphic) */}
            {hasLocationProps && (
              <div className="relative">
                <button
                  onClick={handleLocationClick}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-md text-xs sm:text-sm font-semibold transition-all duration-300",
                    detecting
                      ? "border-brand-teal/20 bg-teal-50/50 text-brand-teal"
                      : city
                      ? "border-brand-teal/30 bg-white/60 text-brand-teal hover:bg-white hover:shadow-sm"
                      : denied
                      ? "border-amber-200/50 bg-amber-50/50 text-amber-700 hover:bg-amber-100/50"
                      : "border-slate-200/50 bg-white/60 text-slate-600 hover:border-brand-teal/30 hover:bg-white"
                  )}
                >
                  {detecting ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                      <span className="hidden sm:inline font-medium">Detecting…</span>
                      <span className="sm:hidden font-medium">…</span>
                    </>
                  ) : city ? (
                    <>
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="max-w-[100px] sm:max-w-[160px] truncate font-medium">
                        {cityLabel(city)}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-50" />
                    </>
                  ) : denied ? (
                    <>
                      <Locate className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:inline font-medium">Allow Location</span>
                      <span className="sm:hidden">📍</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="hidden sm:inline font-medium">All India</span>
                      <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-50 sm:hidden" />
                    </>
                  )}
                </button>

                {/* City dropdown */}
                {showDropdown && cities.length > 0 && (
                  <div className="absolute top-full right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 py-2 max-h-[60vh] overflow-y-auto ring-1 ring-black/5">
                    <button
                      onClick={() => handleCitySelect(null)}
                      className={cn(
                        "w-full text-left px-5 py-3 text-sm transition-colors duration-200",
                        !city ? "text-brand-teal bg-teal-50/50 font-bold" : "text-slate-600 font-medium hover:bg-slate-50"
                      )}
                    >
                      🌍 All India
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-3" />
                    {cities.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleCitySelect(c)}
                        className={cn(
                          "w-full text-left px-5 py-3 text-sm transition-colors duration-200 flex items-center gap-3",
                          city?.id === c.id
                            ? "text-brand-teal bg-teal-50/50 font-bold"
                            : "text-slate-600 font-medium hover:bg-slate-50"
                        )}
                      >
                        <MapPin className={cn("w-4 h-4 shrink-0", city?.id === c.id ? "text-brand-teal" : "text-slate-400")} />
                        {cityLabel(c)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Provider CTA */}
            <Link href="/business" className="shrink-0">
              <button className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-teal hover:bg-teal-500 text-white text-sm font-bold transition-all duration-300 shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] hover:-translate-y-0.5">
                <span>For Hospitals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 text-brand-teal border border-teal-100 hover:bg-teal-100 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Allow Location prompt overlay ── */}
      {showPrompt && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl space-y-5 animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100/50 flex items-center justify-center shadow-inner">
                <MapPin className="w-7 h-7 text-brand-teal" />
              </div>
              <button
                onClick={() => setShowPrompt(false)}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">
                Find doctors near you
              </h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                Allow location access to automatically show the best specialists in your city.
                You can always pick a city manually later.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  onRequestLocation?.();
                  setShowPrompt(false);
                }}
                className="w-full py-3.5 rounded-xl bg-brand-teal text-white font-semibold text-sm shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:bg-brand-teal/90 hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] transition-all duration-300"
              >
                Allow Location
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="w-full py-3.5 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
              >
                Choose City Manually
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
