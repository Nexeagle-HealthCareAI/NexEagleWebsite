"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PatientHero from "@/components/patient/PatientHero";
import DoctorDirectory from "@/components/patient/DoctorDirectory";
import HowItWorks from "@/components/patient/HowItWorks";
import PatientFooter from "@/components/patient/PatientFooter";
import { CITIES, cityId as makeCityId, type CityOption } from "@/data/patient";
import { useDoctors } from "@/lib/api/hooks";
import { useGeolocatedCity } from "@/lib/geo";

export default function HomeClient() {
  const { data: doctorsData } = useDoctors();

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

  const [city, setCity] = useState<CityOption | null>(null);
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
          geoStatus={geo.status}
          onCityChange={handleCityChange}
          query={query}
          specialtyId={specialtyId}
        />

        <HowItWorks />
      </main>

      <PatientFooter />
    </div>
  );
}
