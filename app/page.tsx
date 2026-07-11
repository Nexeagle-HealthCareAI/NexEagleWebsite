"use client";

import { useState } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PatientHero from "@/components/patient/PatientHero";
import SpecialtyRail from "@/components/patient/SpecialtyRail";
import DoctorDirectory from "@/components/patient/DoctorDirectory";
import HowItWorks from "@/components/patient/HowItWorks";
import PatientFooter from "@/components/patient/PatientFooter";
import { CITIES } from "@/data/patient";

/**
 * Patient booking portal (Practo / JioHealth style).
 *
 * Two goals drive this page:
 *  1. Let patients discover and book an in-clinic appointment in seconds.
 *  2. Promote doctors — surface KPIs (rating, patients served, recommendation
 *     rate, experience) so strong doctors stand out.
 *
 * Shared filter state (city / search query / specialty) lives here and flows
 * down to the hero (location + search) and doctor directory. Booking state is
 * local to the directory. Data comes from src/data/patient.ts — swap for API
 * calls later.
 */
export default function PatientBookingPage() {
  const [cityId, setCityId] = useState(CITIES[0].id);
  const city = CITIES.find((c) => c.id === cityId) ?? CITIES[0];
  const [query, setQuery] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");

  function handleSpecialtySelect(id: string) {
    setSpecialtyId(id);
    if (id) {
      setTimeout(
        () =>
          document
            .getElementById("doctors")
            ?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      <AnalyticsTracker title="Book a Doctor — NexEagle Health" />

      <PatientTopBar />

      <main className="flex-1">
        <PatientHero
          city={city}
          onCityChange={setCityId}
          query={query}
          onQueryChange={setQuery}
        />

        <SpecialtyRail selected={specialtyId} onSelect={handleSpecialtySelect} />

        <DoctorDirectory city={city} query={query} specialtyId={specialtyId} />

        <HowItWorks />
      </main>

      <PatientFooter />
    </div>
  );
}
