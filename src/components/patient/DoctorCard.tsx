"use client";

import {
  BadgeCheck,
  MapPin,
  Clock,
  Users,
  Languages,
  ArrowRight,
} from "lucide-react";
import type { Doctor } from "@/data/patient";
import { formatCount } from "@/data/patient";

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

/**
 * Doctor promotion card — the core discovery unit of the portal.
 * Ratings/recommendation KPIs land in phase 2; for now this surfaces patients
 * served, experience and wait time so patients can still pick with confidence.
 */
export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-brand-teal/30 transition-all duration-300 flex flex-col">
      {/* Header: avatar + identity */}
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          {doctor.photo ? (
            <img
              src={doctor.photo}
              alt={doctor.name}
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl object-cover shadow-md"
            />
          ) : (
            <div
              className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-gradient-to-br ${doctor.gradient} text-white flex items-center justify-center font-extrabold text-xl shadow-md`}
            >
              {doctor.initials}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">
              {doctor.name}
            </h3>
            {doctor.verified && (
              <BadgeCheck className="w-4 h-4 text-brand-teal shrink-0" />
            )}
          </div>
          <p className="text-xs font-bold text-brand-teal uppercase tracking-wide">
            {doctor.specialty}
          </p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">
            {doctor.qualifications}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {doctor.experienceYears} years experience
          </p>
        </div>
      </div>

      {/* KPI strip — doctor performance at a glance */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Kpi
          icon={<Users className="w-3.5 h-3.5 text-brand-teal" />}
          value={formatCount(doctor.patientsServed)}
          label="patients served"
        />
        <Kpi
          icon={<Clock className="w-3.5 h-3.5 text-brand-teal" />}
          value={`~${doctor.waitTimeMins}m`}
          label="avg. wait time"
        />
      </div>

      {/* Focus areas */}
      <div className="flex flex-wrap gap-1.5 mt-4">
        {doctor.focusAreas.slice(0, 4).map((area) => (
          <span
            key={area}
            className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium"
          >
            {area}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="mt-4 space-y-1.5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{doctor.clinic}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{doctor.languages.join(", ")}</span>
        </div>
      </div>

      {/* Footer: fee + availability + CTA */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            Consultation
          </span>
          <span className="text-lg font-extrabold text-slate-900">
            ₹{doctor.fee}
          </span>
          <span className="block text-[11px] font-semibold text-emerald-600">
            Next: {doctor.nextAvailable}
          </span>
        </div>
        <button
          onClick={() => onBook(doctor)}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-brand-teal hover:bg-brand-teal/90 text-white text-sm font-bold shadow-md shadow-teal-500/20 hover:shadow-lg transition-all group-hover:translate-y-[-1px]"
        >
          Book
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Kpi({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 px-2 py-2.5 text-center">
      <div className="flex items-center justify-center gap-1">
        {icon}
        <span className="text-sm font-extrabold text-slate-900">{value}</span>
      </div>
      <span className="block text-[10px] text-slate-500 font-medium mt-0.5 leading-tight">
        {label}
      </span>
    </div>
  );
}
