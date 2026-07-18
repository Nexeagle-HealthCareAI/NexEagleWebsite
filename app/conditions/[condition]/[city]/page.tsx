import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/data/patient";
import HomeClient from "@/app/home-client";
import { getAllDoctors } from "@/lib/api/server";
import { filterDoctorsByCondition, filterDoctorsByLocation } from "@/lib/filters/doctorLocation";

export const revalidate = 3600;

interface PageProps {
  params: { condition: string; city: string };
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function unslugify(slug: string) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export async function generateStaticParams() {
  const { doctors } = await getAllDoctors();

  const conditionSet = new Set<string>();
  for (const d of doctors) {
    for (const f of d.focusAreas) {
      conditionSet.add(slugify(f));
    }
  }

  const params: { condition: string; city: string }[] = [];
  for (const cond of Array.from(conditionSet)) {
    for (const c of CITIES) {
      params.push({ condition: cond, city: c.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = CITIES.find((c) => c.id === params.city);
  if (!city) return { title: "Not Found" };

  const conditionName = unslugify(params.condition);
  const title = `Best Doctors for ${conditionName} in ${city.name}, ${city.state} | Book Appointment`;
  const description = `Find the best doctors specializing in ${conditionName} in ${city.name}, ${city.state}. Compare experience, ratings, and book appointments online instantly on NexEagle Doctor Dekho.`;

  return {
    title,
    description,
    alternates: { canonical: `/conditions/${params.condition}/${params.city}` },
    openGraph: { title, description, url: `/conditions/${params.condition}/${params.city}` },
  };
}

export default async function ConditionCityPage({ params }: PageProps) {
  const city = CITIES.find((c) => c.id === params.city);
  if (!city) notFound();

  const conditionName = unslugify(params.condition);

  // Server-fetched + pre-filtered so this page ships real doctor content in the
  // raw HTML — see src/lib/api/server.ts's getAllDoctors.
  const { doctors } = await getAllDoctors();
  const conditionMatched = filterDoctorsByCondition(doctors, params.condition);
  const initialDoctors = filterDoctorsByLocation(conditionMatched, {
    city: city.name,
    state: city.state,
  });

  return (
    <HomeClient
      initialQuery={conditionName}
      initialCityId={city.id}
      initialDoctors={initialDoctors}
    />
  );
}
