import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  Award,
  BadgeCheck,
  Users2,
  ShieldCheck,
} from "lucide-react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PatientFooter from "@/components/patient/PatientFooter";
import BookingPanel from "@/components/patient/BookingPanel";
import ReviewsSection from "@/components/patient/ReviewsSection";
import { RatingBadge } from "@/components/patient/StarRating";
import { getDoctorById } from "@/lib/api/server";
import {
  doctors as mockDoctors,
  doctorSlug,
  parseDoctorIdFromSlug,
  type Doctor,
} from "@/data/patient";

interface PageProps {
  params: { doctorSlug: string };
}

async function resolveDoctor(slug: string): Promise<Doctor | null> {
  const doctorId = parseDoctorIdFromSlug(slug);
  const { doctor, notConfigured } = await getDoctorById(doctorId);
  if (doctor) return doctor;
  if (notConfigured) return mockDoctors.find((d) => d.id === doctorId) ?? null;
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doctor = await resolveDoctor(params.doctorSlug);
  if (!doctor) {
    return { title: "Doctor not found", robots: { index: false, follow: true } };
  }
  const place = [doctor.hospitalName, doctor.city].filter(Boolean).join(", ");
  const title = `${doctor.name} — ${doctor.specialty}${place ? ` in ${doctor.city}` : ""} | Book Appointment`;
  const description = [
    `Book an appointment with ${doctor.name}`,
    doctor.qualifications && `(${doctor.qualifications})`,
    `, ${doctor.specialty}`,
    doctor.experienceYears ? ` — ${doctor.experienceYears}+ years experience` : "",
    place ? ` at ${place}` : "",
    ". Verify by OTP. No login required.",
  ].filter(Boolean).join("");
  const canonicalSlug = doctorSlug(doctor, doctor.city);
  return {
    title,
    description,
    alternates: { canonical: `/doctors/${canonicalSlug}` },
    openGraph: { title, description, url: `/doctors/${canonicalSlug}`, type: "profile", images: doctor.photo ? [{ url: doctor.photo }] : undefined },
    twitter: { card: "summary", title, description, images: doctor.photo ? [doctor.photo] : undefined },
  };
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const doctor = await resolveDoctor(params.doctorSlug);
  if (!doctor) notFound();

  const locationLine =
    [doctor.hospitalName, doctor.city].filter(Boolean).join(", ") || doctor.clinic;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    description: doctor.about || undefined,
    image: doctor.photo || undefined,
    medicalSpecialty: doctor.specialty,
    ...(doctor.hospitalName
      ? {
          worksFor: {
            "@type": "MedicalOrganization",
            name: doctor.hospitalName,
            address: {
              "@type": "PostalAddress",
              addressLocality: doctor.city || undefined,
              addressRegion: doctor.state || undefined,
              addressCountry: "IN",
            },
          },
        }
      : {}),
  };

  // Fallback-only example reviews, shown by ReviewsSection just when the real reviews API
  // isn't configured (dev environments without EASYHMS_API_BASE_URL/KEY) — real doctors now
  // get genuine reviews/ratings from the backend, so this is no longer conditioned on
  // doctor.rating (a real doctor can legitimately have a rating without being a mock).
  const seedReviews = [
    {
      reviewId: "seed-1",
      authorName: "Priya S.",
      rating: 5,
      comment: "Very thorough consultation. Explained everything clearly and patiently.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      helpfulCount: 4,
    },
    {
      reviewId: "seed-2",
      authorName: "Rahul M.",
      rating: 4,
      comment: "Good doctor, short wait time. Highly recommend for follow-ups.",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      helpfulCount: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title={`${doctor.name} — ${doctor.specialty} | NexEagle Doctor Dekho`} />

      {/* Patient topbar (no geo props needed on this page) */}
      <PatientTopBar />

      <main className="flex-1 pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-teal transition mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> All Doctors
          </Link>

          {/* ── DESKTOP / TABLET: 2/3 + 1/3 grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">

            {/* ───────── LEFT: Doctor Info (2/3) ───────── */}
            <div className="space-y-6">

              {/* Doctor identity card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6">
                <div className="flex gap-5 items-start">
                  {/* Avatar */}
                  {doctor.photo ? (
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover shadow-md shrink-0"
                    />
                  ) : (
                    <div
                      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${doctor.gradient} text-white flex items-center justify-center font-extrabold text-3xl shadow-md shrink-0`}
                    >
                      {doctor.initials}
                    </div>
                  )}

                  {/* Identity */}
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
                      {doctor.name}
                      {doctor.verified && (
                        <BadgeCheck className="w-5 h-5 text-brand-teal shrink-0" />
                      )}
                    </h1>
                    <p className="text-sm font-bold text-brand-teal mt-1">{doctor.specialty}</p>
                    {doctor.qualifications && (
                      <p className="text-sm text-slate-500 mt-0.5">{doctor.qualifications}</p>
                    )}

                    {/* Rating */}
                    {doctor.rating !== undefined && (
                      <div className="mt-2">
                        <RatingBadge rating={doctor.rating} reviewCount={doctor.reviewCount} size="md" />
                      </div>
                    )}

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      {doctor.experienceYears > 0 && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                          <Award className="w-3.5 h-3.5 text-brand-teal" />
                          <b className="text-slate-800">{doctor.experienceYears}</b> years experience
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <Users2 className="w-3.5 h-3.5 text-slate-400" />
                        Accepting patients
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                        Verified profile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Book CTA moved to fixed bottom bar */}
              </div>

              {/* Practices at */}
              {locationLine && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5">
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">
                    Practices At
                  </h2>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      {doctor.hospitalName && (
                        <p className="font-bold text-sm text-slate-900 truncate">{doctor.hospitalName}</p>
                      )}
                      {doctor.city && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {doctor.city}{doctor.state ? `, ${doctor.state}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* About */}
              {doctor.about && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5">
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">About</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{doctor.about}</p>
                </div>
              )}

              {/* Focus areas */}
              {doctor.focusAreas.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5">
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">Focus Areas</h2>
                  <div className="flex flex-wrap gap-2">
                    {doctor.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100 text-xs font-semibold"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5">
                <ReviewsSection
                  doctorId={doctor.id}
                  doctorName={doctor.name}
                  seedReviews={seedReviews}
                />
              </div>
            </div>

            {/* ───────── RIGHT: Booking Panel (1/3) ───────── */}
            <div id="book" className="lg:sticky lg:top-24">
              <BookingPanel doctor={doctor} />
            </div>
          </div>
        </div>
      </main>

      <PatientFooter />

      {/* ── MOBILE FIXED BOTTOM CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-4 py-4 pb-6 sm:pb-4 flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom-full duration-500">
        <div className="flex-1">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consultation Fee</span>
          {doctor.fee !== undefined ? (
            <span className="font-display text-lg font-bold text-slate-900">₹{doctor.fee}</span>
          ) : (
            <span className="text-[11px] font-bold text-emerald-600">Accepting patients</span>
          )}
        </div>
        <a
          href="#book"
          className="flex-1 flex items-center justify-center py-3.5 rounded-2xl bg-brand-teal text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:bg-brand-teal/90 active:scale-[0.98] transition-all"
        >
          Book Appointment
        </a>
      </div>
    </div>
  );
}
