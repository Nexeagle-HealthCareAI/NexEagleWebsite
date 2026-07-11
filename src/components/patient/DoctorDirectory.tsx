"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, Search, Frown, Loader2 } from "lucide-react";
import DoctorCard from "./DoctorCard";
import BookingDialog from "./BookingDialog";
import { doctors as mockDoctors, specialties, cityLabel } from "@/data/patient";
import type { Doctor, CityOption } from "@/data/patient";
import { useDoctors } from "@/lib/api/hooks";

interface DoctorDirectoryProps {
  city: CityOption;
  query: string;
  specialtyId: string;
}

// Rating-based sort/relevance is phase 2 (once the API returns real ratings).
type SortKey = "relevance" | "experience" | "patients" | "fee";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "patients", label: "Most patients served" },
  { key: "experience", label: "Most experienced" },
  { key: "fee", label: "Lowest fee" },
];

export default function DoctorDirectory({
  city,
  query,
  specialtyId,
}: DoctorDirectoryProps) {
  const [sort, setSort] = useState<SortKey>("relevance");
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Real doctors from the EasyHMS API; falls back to mock data until the API
  // env is configured or if the request fails, so the portal always renders.
  const { data, isLoading } = useDoctors();
  const usingApi = Boolean(data && !data.notConfigured && data.doctors.length);
  const allDoctors = usingApi ? data!.doctors : mockDoctors;

  const specialtyName = specialties.find((s) => s.id === specialtyId)?.name;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // The API key is scoped to one hospital, so only filter by city for mock data.
    // Match on (city, state) together — city name alone isn't unique (see
    // src/data/patient.ts), so never compare `d.city === city.name` on its own.
    let list = usingApi
      ? [...allDoctors]
      : allDoctors.filter((d) => d.city === city.name && d.state === city.state);

    if (specialtyId) list = list.filter((d) => d.specialtyId === specialtyId);
    if (q) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.focusAreas.some((a) => a.toLowerCase().includes(q))
      );
    }

    const sorted = [...list];
    switch (sort) {
      case "patients":
        sorted.sort((a, b) => b.patientsServed - a.patientsServed);
        break;
      case "experience":
        sorted.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case "fee":
        sorted.sort((a, b) => a.fee - b.fee);
        break;
      default:
        // relevance: by patients served
        sorted.sort((a, b) => b.patientsServed - a.patientsServed);
    }
    return sorted;
  }, [allDoctors, usingApi, city.id, query, specialtyId, sort]);

  function handleBook(doctor: Doctor) {
    setBookingDoctor(doctor);
    setBookingOpen(true);
  }

  return (
    <section id="doctors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
      {/* Heading + result count */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {specialtyName ? `${specialtyName} doctors` : "Available doctors"} in {cityLabel(city)}
          </h2>
          <p className="text-sm text-slate-500">
            {filtered.length} verified {filtered.length === 1 ? "doctor" : "doctors"} ready to consult
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-transparent focus:outline-none cursor-pointer text-slate-700"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-7 h-7 animate-spin text-brand-teal" />
          <p className="text-sm font-semibold mt-3">Loading doctors…</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            {query ? <Search className="w-6 h-6" /> : <Frown className="w-6 h-6" />}
          </div>
          <p className="font-bold text-slate-700">No doctors match your filters</p>
          <p className="text-sm text-slate-500 mt-1">
            Try a different specialty or city.
          </p>
        </div>
      )}

      <BookingDialog
        doctor={bookingDoctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </section>
  );
}
