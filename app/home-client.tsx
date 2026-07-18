"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PatientHero from "@/components/patient/PatientHero";
import DoctorDirectory from "@/components/patient/DoctorDirectory";
import HowItWorks from "@/components/patient/HowItWorks";
import PatientFooter from "@/components/patient/PatientFooter";
import { CITIES, cityId as makeCityId, type CityOption, type Doctor } from "@/data/patient";
import { useDoctors } from "@/lib/api/hooks";
import { useGeolocatedCity } from "@/lib/geo";

interface HomeClientProps {
  initialSpecialtyId?: string;
  initialCityId?: string;
  initialArea?: string;
  initialQuery?: string;
  /** Server-fetched doctors for this route (see src/lib/api/server.ts's getAllDoctors).
   * Passed to BOTH useDoctors() call sites below (this component's own, and
   * DoctorDirectory's) — they share one React Query cache entry by queryKey, and
   * whichever of the two mounts/observes first is the one that actually seeds it,
   * so both need the same seed to avoid depending on render order. */
  initialDoctors?: Doctor[];
}

export default function HomeClient({
  initialSpecialtyId = "",
  initialCityId = "",
  initialArea = "",
  initialQuery = "",
  initialDoctors,
}: HomeClientProps = {}) {
  const { data: doctorsData } = useDoctors(
    initialDoctors ? { doctors: initialDoctors, notConfigured: false } : undefined
  );

  // Build city list from live API data; fall back to static list
  const dynamicCities = useMemo<CityOption[]>(() => {
    if (!doctorsData || doctorsData.notConfigured || doctorsData.doctors.length === 0) {
      return CITIES;
    }
    const map = new Map<string, CityOption>();
    for (const d of doctorsData.doctors) {
      if (!d.city || !d.state) continue;
      const id = makeCityId(d.city, d.state);
      if (!map.has(id)) map.set(id, { id, name: d.city, state: d.state });
    }
    return map.size > 0 ? Array.from(map.values()) : CITIES;
  }, [doctorsData]);

  const [city, setCity] = useState<CityOption | null>(() => {
    if (initialCityId) {
      return dynamicCities.find(c => c.id === initialCityId) || null;
    }
    return null;
  });
  const [userPicked, setUserPicked] = useState(false);
  const geo = useGeolocatedCity(dynamicCities);

  // Auto-adopt geo city once resolved (unless user already picked manually)
  useEffect(() => {
    if (userPicked) return;
    if (geo.status === "found" && geo.city) setCity(geo.city);
  }, [geo.status, geo.city, userPicked]);

  function handleCityChange(next: CityOption | null) {
    setUserPicked(true);
    setCity(next);
  }

  // Re-trigger geolocation when user clicks "Allow Location"
  const handleRequestLocation = useCallback(() => {
    // Reset picked flag so geo result can apply
    setUserPicked(false);
  }, []);

  // Search + specialty state (shared between Hero and Directory)
  const [query, setQuery] = useState(initialQuery);
  const [specialtyId, setSpecialtyId] = useState(initialSpecialtyId);

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
      <AnalyticsTracker title="Doctor Dekho — Find a Doctor Near Me | NexEagle" />

      {/* Topbar: Doctor Dekho brand + location pill */}
      <PatientTopBar
        geoStatus={geo.status}
        city={city}
        cities={dynamicCities}
        onCityChange={handleCityChange}
        onRequestLocation={handleRequestLocation}
      />

      <main className="flex-1">
        {/* Compact search section (replaces old hero) */}
        <PatientHero
          query={query}
          onQueryChange={setQuery}
          specialtyId={specialtyId}
          onSpecialtyChange={handleSpecialtySelect}
        />

        {/* Doctor grid with location banner integrated inside */}
        <DoctorDirectory
          city={city}
          cities={dynamicCities}
          area={initialArea}
          geoStatus={geo.status}
          coords={geo.coords}
          onCityChange={handleCityChange}
          query={query}
          specialtyId={specialtyId}
          initialDoctors={initialDoctors}
        />

        <HowItWorks />
      </main>

      <PatientFooter />
    </div>
  );
}
