"use client";

import Link from "next/link";
import { BadgeCheck, MapPin, Award, CalendarCheck, Star } from "lucide-react";
import type { Doctor } from "@/data/patient";
import { doctorSlug } from "@/data/patient";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link
      href={`/doctors/${doctorSlug(doctor, doctor.city)}`}
      className="group relative bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)] hover:border-brand-teal/40 active:scale-[0.98] active:shadow-inner transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-1"
    >
      {/* Promoted badge */}
      {doctor.promoted && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          Featured
        </div>
      )}

      {/* Optional: Add a subtle gradient mesh at the top of the card */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50/80 to-transparent pointer-events-none" />

      <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
        {/* ── Header: avatar + identity ── */}
        <div className="flex items-start gap-5">
          <div className="relative shrink-0">
            {doctor.photo ? (
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-[88px] h-[88px] rounded-[1.5rem] object-cover shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-slate-100"
              />
            ) : (
              <div
                className={`w-[88px] h-[88px] rounded-[1.5rem] bg-gradient-to-br ${doctor.gradient} text-white flex items-center justify-center font-display font-bold text-3xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-white/20`}
              >
                {doctor.initials}
              </div>
            )}
            {/* Verified ring */}
            {doctor.verified && (
              <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white border-[3px] border-white shadow-sm flex items-center justify-center">
                <BadgeCheck className="w-4 h-4 text-brand-teal" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <h3 className="font-display font-bold text-slate-900 text-lg leading-tight truncate group-hover:text-brand-teal transition-colors duration-300">
              {doctor.name}
            </h3>
            <p className="text-sm font-semibold text-brand-teal mt-1 tracking-wide">
              {doctor.specialty}
            </p>
            {doctor.qualifications && (
              <p className="text-xs text-slate-500 mt-1 truncate">
                {doctor.qualifications}
              </p>
            )}

            {/* Premium Rating Display */}
            {doctor.rating !== undefined && (
              <div className="flex items-center gap-1.5 mt-2.5">
                <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100/50">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-bold text-amber-700 text-xs">{doctor.rating.toFixed(1)}</span>
                </div>
                {doctor.reviewCount !== undefined && (
                  <span className="text-[11px] font-medium text-slate-400">({doctor.reviewCount} reviews)</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-600 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80">
          {doctor.experienceYears > 0 && (
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-4 h-4 text-brand-teal shrink-0" />
              <span>
                <b className="text-slate-900 font-bold">{doctor.experienceYears}+</b> yrs exp
              </span>
            </span>
          )}
          {(doctor.hospitalName || doctor.clinic) && (
            <span className="flex items-center gap-1.5 min-w-0 font-medium">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{doctor.hospitalName ?? doctor.clinic}</span>
            </span>
          )}
        </div>

        {/* ── About (2-line clamp) ── */}
        {doctor.about && (
          <p className="mt-5 text-sm text-slate-500 leading-relaxed line-clamp-2">
            {doctor.about}
          </p>
        )}

        {/* ── Focus area tags ── */}
        {doctor.focusAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {doctor.focusAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="px-3 py-1 rounded-full bg-white border border-slate-200/80 text-slate-600 text-[11px] font-semibold shadow-sm"
              >
                {area}
              </span>
            ))}
            {doctor.focusAreas.length > 3 && (
              <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[11px] font-semibold">
                +{doctor.focusAreas.length - 3}
              </span>
            )}
          </div>
        )}

        {/* ── Footer: Full width CTA ── */}
        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-3 mb-4">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Consultation Fee
              </span>
              {doctor.fee !== undefined ? (
                <span className="font-display text-xl font-bold text-slate-900">
                  ₹{doctor.fee}
                </span>
              ) : (
                <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                  <CalendarCheck className="w-4 h-4" />
                  Accepting patients
                </span>
              )}
            </div>
            {doctor.fee !== undefined && (
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">At Clinic</span>
            )}
          </div>

          <div className="w-full py-3.5 rounded-xl bg-slate-900 group-hover:bg-brand-teal text-white text-center text-sm font-bold shadow-[0_4px_14px_0_rgba(15,23,42,0.2)] group-hover:shadow-[0_8px_25px_-5px_rgba(20,184,166,0.4)] transition-all duration-500">
            Book Appointment
          </div>
        </div>
      </div>
    </Link>
  );
}
