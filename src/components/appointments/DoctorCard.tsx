import { MapPin, Languages, IndianRupee, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/data/doctors";

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`;

const DoctorCard = ({ doctor, onBook }: DoctorCardProps) => {
  return (
    <div className="flex flex-col p-6 rounded-3xl border border-slate-200 bg-white hover:border-brand-teal/40 hover:shadow-[0_12px_30px_rgba(20,184,166,0.06)] transition-all">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 shrink-0 rounded-2xl bg-teal-50 border border-brand-teal/15 flex items-center justify-center text-brand-teal font-black text-lg">
          {initials(doctor.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-slate-900 truncate">{doctor.name}</h3>
          <p className="text-sm text-brand-teal font-semibold">{doctor.specialty}</p>
          {doctor.qualifications && (
            <p className="text-xs text-slate-500 truncate">{doctor.qualifications}</p>
          )}
        </div>
      </div>

      {/* Rating + reviews */}
      {doctor.rating !== undefined && (
        <div className="mt-4 flex items-center gap-2">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-100">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-slate-900">
              {doctor.rating.toFixed(1)}
            </span>
          </div>
          {doctor.reviewCount !== undefined && (
            <span className="text-xs text-slate-500">
              {doctor.reviewCount} reviews
            </span>
          )}
        </div>
      )}

      <div className="mt-4 space-y-2.5 text-sm text-slate-600 flex-1">
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">
            {doctor.clinic ? `${doctor.clinic}, ` : ""}
            {doctor.location}
          </span>
        </p>
        {doctor.experienceYears !== undefined && (
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            {doctor.experienceYears} yrs experience
          </p>
        )}
        {doctor.patientsTreated !== undefined && (
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-900">
              {compact(doctor.patientsTreated)}+
            </span>
            patients treated
          </p>
        )}
        {doctor.languages && doctor.languages.length > 0 && (
          <p className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{doctor.languages.join(", ")}</span>
          </p>
        )}
        {doctor.fee !== undefined && (
          <p className="flex items-center gap-1 font-semibold text-slate-900">
            <IndianRupee className="w-4 h-4 text-slate-400 shrink-0" />
            {doctor.fee}
            <span className="font-normal text-slate-500">/ consultation</span>
          </p>
        )}
      </div>

      <Button
        onClick={() => onBook(doctor)}
        className="mt-6 w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full"
      >
        Book Appointment
      </Button>
    </div>
  );
};

export default DoctorCard;
