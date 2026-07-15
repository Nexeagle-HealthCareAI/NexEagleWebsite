"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck, MapPin, Award, CalendarCheck, Star,
  Clock, Users, ThumbsUp, Languages, ArrowRight,
} from "lucide-react";
import type { Doctor } from "@/data/patient";
import { doctorSlug, formatCount } from "@/data/patient";

interface DoctorCardProps {
  doctor: Doctor;
  /** Grid index — used to stagger entrance animations. */
  index?: number;
}

export default function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const clinicLabel = doctor.hospitalName ?? doctor.clinic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/doctors/${doctorSlug(doctor, doctor.city)}`}
        className="group relative bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.18)] hover:border-brand-teal/40 active:scale-[0.98] transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-1"
      >
        {/* Promoted badge */}
        {doctor.promoted && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            Featured
          </div>
        )}
        {/* Gradient mesh */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />

        <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">

          {/* ─────────────────────────────────────
              § 1  IDENTITY
              Avatar · Name · Specialty · Quals · Rating
          ───────────────────────────────────── */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              {doctor.photo ? (
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-slate-100"
                />
              ) : (
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${doctor.gradient} text-white flex items-center justify-center font-display font-bold text-2xl shadow-[0_6px_18px_rgba(0,0,0,0.10)] border border-white/20`}>
                  {doctor.initials}
                </div>
              )}
              {doctor.verified && (
                <span className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-white shadow flex items-center justify-center">
                  <BadgeCheck className="w-3.5 h-3.5 text-brand-teal" />
                </span>
              )}
            </div>

            {/* Text block */}
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="font-display font-bold text-slate-900 text-base leading-snug group-hover:text-brand-teal transition-colors duration-300 line-clamp-1">
                {doctor.name}
              </h3>
              <p className="text-[11px] font-bold text-brand-teal mt-0.5 tracking-wide">{doctor.specialty}</p>
              {doctor.qualifications && (
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{doctor.qualifications}</p>
              )}
              {/* Rating */}
              {doctor.rating !== undefined && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100/60">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-amber-700 text-[11px]">{doctor.rating.toFixed(1)}</span>
                  </div>
                  {doctor.reviewCount !== undefined && (
                    <span className="text-[10px] text-slate-400">({doctor.reviewCount.toLocaleString()})</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ─────────────────────────────────────
              § 2  QUICK-SCAN ROW
              Exp · Wait time · Clinic
          ───────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 pb-4 border-b border-slate-100/80">
            {doctor.experienceYears > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <Award className="w-3.5 h-3.5 text-brand-teal" />
                <b className="text-slate-800">{doctor.experienceYears}+</b> yrs exp
              </span>
            )}
            {doctor.waitTimeMins !== undefined && (
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                ~<b className="text-slate-800">{doctor.waitTimeMins}</b> min wait
              </span>
            )}
            {clinicLabel && (
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium min-w-0">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{clinicLabel}</span>
              </span>
            )}
          </div>

          {/* ─────────────────────────────────────
              § 3  SOCIAL PROOF
              Patients served · Recommendation bar
          ───────────────────────────────────── */}
          {(doctor.patientsServed !== undefined || doctor.recommendationPct !== undefined) && (
            <div className="mt-4 space-y-2.5">
              {doctor.patientsServed !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                  <span className="text-[11px] text-slate-500">
                    <b className="text-slate-800">{formatCount(doctor.patientsServed)}</b> patients treated
                  </span>
                </div>
              )}
              {doctor.recommendationPct !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                      <ThumbsUp className="w-3 h-3 text-emerald-500" />
                      Patient recommendation
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">{doctor.recommendationPct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${doctor.recommendationPct}%` }}
                      transition={{ duration: 0.9, delay: index * 0.07 + 0.35, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────
              § 4  ABOUT SNIPPET
          ───────────────────────────────────── */}
          {doctor.about && (
            <p className="mt-4 text-[11.5px] text-slate-500 leading-relaxed line-clamp-2">
              {doctor.about}
            </p>
          )}

          {/* ─────────────────────────────────────
              § 5  TAGS + LANGUAGES
          ───────────────────────────────────── */}
          <div className="mt-4 space-y-2">
            {doctor.focusAreas.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {doctor.focusAreas.slice(0, 3).map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-500 text-[10px] font-semibold"
                  >
                    {area}
                  </span>
                ))}
                {doctor.focusAreas.length > 3 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-400 text-[10px] font-semibold">
                    +{doctor.focusAreas.length - 3}
                  </span>
                )}
              </div>
            )}
            {doctor.languages && doctor.languages.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <Languages className="w-3 h-3 text-slate-300 shrink-0" />
                <span className="text-[10px] text-slate-400 font-medium">
                  {doctor.languages.join(" · ")}
                </span>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────
              § 6  FOOTER
              Next-available · Fee · CTA
          ───────────────────────────────────── */}
          <div className="mt-auto pt-5">
            {/* Next-available + fee */}
            <div className="flex items-center justify-between gap-3 mb-3">
              {doctor.nextAvailable ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  {/* Pulsing live dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {doctor.nextAvailable}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  Accepting patients
                </span>
              )}

              <div className="text-right shrink-0">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Fee</span>
                {doctor.fee !== undefined ? (
                  <span className="font-display text-base font-bold text-slate-900">₹{doctor.fee}</span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">—</span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-brand-teal text-white text-sm font-bold shadow-[0_4px_14px_0_rgba(15,23,42,0.18)] group-hover:shadow-[0_8px_25px_-5px_rgba(20,184,166,0.4)] transition-all duration-500 flex items-center justify-center gap-2">
              Book Appointment
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatDelay: 0.4 }}
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
}
