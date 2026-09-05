"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, MapPin, Phone, ArrowRight } from "lucide-react";
import type { Lab } from "@/data/labs";
import { labSlug, getLabDirectionsUrl } from "@/data/labs";

interface LabCardProps {
  lab: Lab;
  /** Position within its row -- used to stagger entrance animations, same convention as DoctorCard. */
  index?: number;
  reducedMotion?: boolean;
}

// Visual conventions copied from DoctorCard.tsx (rounded-[2rem] card, brand-teal accents,
// slate-* neutrals, font-display headings) minus the doctor-specific sections this doesn't
// need: no featured ribbon/discount badge/availability badge/fee/booking CTA -- a lab listing
// is discoverability only (see the plan's Out of Scope).
const LabCard = forwardRef<HTMLDivElement, LabCardProps>(function LabCard(
  { lab, index = 0, reducedMotion = false },
  ref
) {
  const directionsUrl = getLabDirectionsUrl(lab);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.42, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/labs/${labSlug(lab, lab.city)}`}
        className="group relative bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.18)] hover:border-brand-teal/40 active:scale-[0.98] transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-1"
      >
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />

        <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
          {/* Identity */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.10)] border border-white/20">
              <FlaskConical className="w-9 h-9" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="font-display font-bold text-slate-900 text-base leading-snug group-hover:text-brand-teal transition-colors duration-300 line-clamp-1">
                {lab.name}
              </h3>
              {lab.registrationNumber && (
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">Reg No: {lab.registrationNumber}</p>
              )}
            </div>
          </div>

          {/* Address block */}
          {(lab.address || lab.city) && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
              <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                {lab.address && <p className="text-[11px] text-slate-600 leading-snug">{lab.address}</p>}
                {(lab.city || lab.state) && (
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {[lab.city, lab.state, lab.pincode].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
              {directionsUrl && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(directionsUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="shrink-0 text-[10px] font-bold text-brand-teal hover:text-teal-700 underline underline-offset-2 mt-0.5 whitespace-nowrap cursor-pointer"
                  title="Get Directions"
                >
                  Directions ↗
                </button>
              )}
            </div>
          )}

          {/* About snippet */}
          {lab.description && (
            <p className="mt-4 text-[11.5px] text-slate-500 leading-relaxed line-clamp-2">{lab.description}</p>
          )}

          {/* Test category chips */}
          {lab.testCategories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {lab.testCategories.slice(0, 4).map((category) => (
                <span
                  key={category}
                  className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-500 text-[10px] font-semibold"
                >
                  {category}
                </span>
              ))}
              {lab.testCategories.length > 4 && (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 text-[10px] font-semibold">
                  +{lab.testCategories.length - 4}
                </span>
              )}
            </div>
          )}

          {lab.contactPhone && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Phone className="w-3 h-3 text-slate-300 shrink-0" />
              {lab.contactPhone}
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto pt-5">
            <div className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-brand-teal text-white text-sm font-bold shadow-[0_4px_14px_0_rgba(15,23,42,0.18)] group-hover:shadow-[0_8px_25px_-5px_rgba(20,184,166,0.4)] transition-all duration-500 flex items-center justify-center gap-2">
              View Details
              <motion.span
                animate={reducedMotion ? {} : { x: [0, 4, 0] }}
                transition={reducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatDelay: 0.4 }}
                className="opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default LabCard;
