import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Award, Users2, ShieldCheck, Hourglass, BadgeCheck } from "lucide-react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PatientFooter from "@/components/patient/PatientFooter";
import BookingPanel from "@/components/patient/BookingPanel";
import { getDoctorById } from "@/lib/api/server";
import { doctors as mockDoctors, doctorSlug, parseDoctorIdFromSlug, type Doctor } from "@/data/patient";

interface PageProps {
  params: { doctorSlug: string };
}

async function resolveDoctor(slug: string): Promise<Doctor | null> {
  const doctorId = parseDoctorIdFromSlug(slug);
  const { doctor, notConfigured } = await getDoctorById(doctorId);
  if (doctor) return doctor;
  // Local dev / API not configured yet — fall back to mock data so the page
  // is still reviewable, matching the rest of the site's mock-fallback pattern.
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
    doctor.specialty && `, ${doctor.specialty}`,
    doctor.experienceYears ? ` with ${doctor.experienceYears}+ years of experience` : "",
    place && ` at ${place}`,
    ". Verify by OTP and request your slot online — free, no login required.",
  ]
    .filter(Boolean)
    .join("");
  const canonicalSlug = doctorSlug(doctor, doctor.city);

  return {
    title,
    description,
    alternates: { canonical: `/doctors/${canonicalSlug}` },
    openGraph: {
      title,
      description,
      url: `/doctors/${canonicalSlug}`,
      type: "profile",
      images: doctor.photo ? [{ url: doctor.photo }] : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: doctor.photo ? [doctor.photo] : undefined,
    },
  };
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const doctor = await resolveDoctor(params.doctorSlug);
  if (!doctor) notFound();

  const locationLine = [doctor.hospitalName, doctor.city].filter(Boolean).join(", ") || doctor.clinic;

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

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AnalyticsTracker title={`${doctor.name} — ${doctor.specialty} | NexEagle`} />

      <PatientTopBar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition mb-5"
          >
            <ChevronLeft className="w-4 h-4" /> All doctors
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 items-start">
            {/* ── Left: doctor profile (server-rendered, crawlable) ── */}
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                {doctor.photo ? (
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover shadow-md shrink-0"
                  />
                ) : (
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${doctor.gradient} text-white flex items-center justify-center font-extrabold text-2xl shadow-md shrink-0`}
                  >
                    {doctor.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                    {doctor.name}
                    {doctor.verified && <BadgeCheck className="w-5 h-5 text-brand-teal shrink-0" />}
                  </h1>
                  <p className="text-sm font-bold text-brand-teal mt-1">{doctor.specialty}</p>
                  {doctor.qualifications && <p className="text-sm text-slate-500 mt-1">{doctor.qualifications}</p>}
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    {doctor.experienceYears > 0 && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <Award className="w-3.5 h-3.5 text-slate-400" />
                        <b className="text-slate-800 font-bold">{doctor.experienceYears}</b>&nbsp;years experience
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <Users2 className="w-3.5 h-3.5 text-slate-400" />
                      Accepting patients
                    </span>
                  </div>
                </div>
              </div>

              {locationLine && (
                <section>
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2.5">Practices at</h2>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      {doctor.hospitalName && <p className="font-bold text-sm text-slate-900 truncate">{doctor.hospitalName}</p>}
                      {doctor.city && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {doctor.city}
                          {doctor.state ? `, ${doctor.state}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {doctor.about && (
                <section>
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2.5">About</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{doctor.about}</p>
                </section>
              )}

              {doctor.focusAreas.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2.5">Focus areas</h2>
                  <div className="flex flex-wrap gap-2">
                    {doctor.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <div className="flex flex-wrap gap-5 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-brand-teal" /> Hospital-verified profile
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <Hourglass className="w-4 h-4 text-brand-teal" /> Usually confirms within a few hours
                </span>
              </div>
            </div>

            {/* ── Right: booking (interactive, client) ── */}
            <div id="book" className="lg:sticky lg:top-24">
              <BookingPanel doctor={doctor} />
            </div>
          </div>
        </div>

        {/* Mobile-only sticky CTA — jumps to the booking panel without a full modal. */}
        <div className="lg:hidden sticky bottom-0 z-10 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3">
          <a
            href="#book"
            className="block w-full text-center py-3 rounded-2xl bg-brand-teal text-white font-bold text-sm shadow-md shadow-teal-500/20"
          >
            Book appointment
          </a>
        </div>
      </main>

      <PatientFooter />
    </div>
  );
}
