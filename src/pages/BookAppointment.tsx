import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DoctorCard from "@/components/appointments/DoctorCard";
import BookingDialog from "@/components/appointments/BookingDialog";
import { getDoctors } from "@/lib/api";
import type { Doctor } from "@/data/doctors";

const ALL = "all";

const BookAppointment = () => {
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const [location, setLocation] = useState(ALL);
  const [specialty, setSpecialty] = useState(ALL);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const locations = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.location))).sort(),
    [doctors]
  );
  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty))).sort(),
    [doctors]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return doctors.filter((d) => {
      const matchLocation = location === ALL || d.location === location;
      const matchSpecialty = specialty === ALL || d.specialty === specialty;
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        (d.clinic ?? "").toLowerCase().includes(q);
      return matchLocation && matchSpecialty && matchSearch;
    });
  }, [doctors, location, specialty, search]);

  const openBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDialogOpen(true);
  };

  // JSON-LD so search engines can surface the doctor directory for queries like
  // "doctors near me", "find a doctor", "book doctor appointment".
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Book a Doctor Appointment | NexEagle",
    description:
      "Find doctors near you by location and specialty and book an appointment online with NexEagle-powered clinics.",
    about: { "@type": "MedicalBusiness", name: "NexEagle" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: doctors.slice(0, 20).map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Physician",
          name: d.name,
          medicalSpecialty: d.specialty,
          ...(d.qualifications ? { description: d.qualifications } : {}),
          address: {
            "@type": "PostalAddress",
            addressLocality: d.location,
            addressCountry: "IN",
          },
          ...(d.rating !== undefined && d.reviewCount !== undefined
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: d.rating,
                  reviewCount: d.reviewCount,
                  bestRating: 5,
                },
              }
            : {}),
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Book a Doctor Appointment Online — Find Doctors Near You"
        description="Find doctors near you by location and specialty. Compare ratings, experience and fees, then book a doctor's appointment online in seconds with NexEagle."
        keywords="doctors near me, find a doctor, nearby doctors, book doctor appointment, doctor appointment online, best doctors near me, find doctors by location, book appointment with doctor, top rated doctors, consult a doctor"
        structuredData={structuredData}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 bg-gradient-to-b from-teal-50/20 via-white to-white select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 pointer-events-none rounded-full blur-[140px] z-0"></div>
        <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-5xl mx-auto text-center space-y-5">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Book an Appointment.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Filter by location and specialty, choose your doctor, and reserve a slot
            in seconds.
          </p>
        </div>
      </section>

      {/* Filters + results */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-6xl mx-auto pb-24">
        {/* Filter bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-3xl border border-slate-200/80 bg-slate-50 mb-10">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" /> Location
            </label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-11 bg-white">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Specialty
            </label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="h-11 bg-white">
                <SelectValue placeholder="All specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All specialties</SelectItem>
                {specialties.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <Search className="w-3.5 h-3.5" /> Search
            </label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Doctor, specialty, clinic..."
              className="h-11 bg-white"
            />
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-3xl border border-slate-200/80 bg-slate-50 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 px-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-2">
            <h3 className="text-xl font-bold text-slate-900">No doctors found</h3>
            <p className="text-slate-500 text-sm">
              Try changing the location or specialty filter.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-5">
              {filtered.length} doctor{filtered.length === 1 ? "" : "s"} available
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onBook={openBooking} />
              ))}
            </div>
          </>
        )}
      </section>

      <BookingDialog
        doctor={selectedDoctor}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <Footer />
    </div>
  );
};

export default BookAppointment;
