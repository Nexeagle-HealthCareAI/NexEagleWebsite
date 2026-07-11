"use client";

import {
  Stethoscope,
  Baby,
  HeartPulse,
  Sparkles,
  Bone,
  Flower2,
  Smile,
  Ear,
  type LucideIcon,
} from "lucide-react";
import { specialties } from "@/data/patient";

const iconMap: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  baby: Baby,
  heartPulse: HeartPulse,
  sparkles: Sparkles,
  bone: Bone,
  flower: Flower2,
  smile: Smile,
  ear: Ear,
};

interface SpecialtyRailProps {
  selected: string;
  onSelect: (specialtyId: string) => void;
}

/** Horizontal rail of specialties — the primary "browse by need" entry point. */
export default function SpecialtyRail({ selected, onSelect }: SpecialtyRailProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Consult by specialty
          </h2>
          <p className="text-sm text-slate-500">Pick a department to see doctors</p>
        </div>
        {selected && (
          <button
            onClick={() => onSelect("")}
            className="text-xs font-bold text-brand-teal hover:underline"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
        {specialties.map((spec) => {
          const Icon = iconMap[spec.icon] ?? Stethoscope;
          const isActive = selected === spec.id;
          return (
            <button
              key={spec.id}
              onClick={() => onSelect(isActive ? "" : spec.id)}
              className={`group flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? "border-brand-teal bg-teal-50/60 shadow-md"
                  : "border-transparent hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${spec.accent}`}
              >
                <Icon className="w-6 h-6" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 text-center leading-tight">
                {spec.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
