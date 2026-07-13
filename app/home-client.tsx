"use client";

import { useEffect, useMemo, useState } from "react";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PatientHero from "@/components/patient/PatientHero";
import SpecialtyRail from "@/components/patient/SpecialtyRail";
import DoctorDirectory from "@/components/patient/DoctorDirectory";
import HowItWorks from "@/components/patient/HowItWorks";
import PatientFooter from "@/components/patient/PatientFooter";
import { CITIES, cityId as makeCityId, type CityOption } from "@/data/patient";
import { useDoctors } from "@/lib/api/hooks";
import { useGeolocatedCity } from "@/lib/geo";

/**
 * Patient booking portal (Practo / JioHealth style).
 *
 * Two goals drive this page:
 *  1. Let patients discover and book an in-clinic appointment in seconds.
 *  2. Promote doctors — surface KPIs (rating, patients served, recommendation
 *     rate, experience) so strong doctors stand out.
 *
 * Location defaults to "all doctors" — geolocation (useGeolocatedCity) narrows
 * it to the visitor's nearest known city only once it actually resolves one;
 * denied/unsupported/still-detecting all leave it at "all," never an empty
 * filter. City/state options themselves are derived from live, publicly-listed
 * doctor data (dynamicCities below), falling back to the static mock list only
 * when the API isn't configured yet.
 */
export default function HomeClient() {
  // React Query dedupes this against DoctorDirectory's own useDoctors() call
  // (same queryKey) — this doesn't add a second network round trip.
  const { data: doctorsData } = useDoctors();

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

  // Adopt the geolocated city once it resolves — unless the visitor has
  // already made their own choice via LocationBanner, which always wins.
  useEffect(() => {
    if (userPicked) return;
    if (geo.status === "found" && geo.city) setCity(geo.city);
  }, [geo.status, geo.city, userPicked]);

  function handleCityChange(next: CityOption | null) {
    setUserPicked(true);
    setCity(next);
  }

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
      <AnalyticsTracker title="Find a Doctor Near Me — NexEagle" />

      <PatientTopBar />

      <main className="flex-1">
        <PatientHero query={query} onQueryChange={setQuery} />

        <SpecialtyRail selected={specialtyId} onSelect={handleSpecialtySelect} />

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
