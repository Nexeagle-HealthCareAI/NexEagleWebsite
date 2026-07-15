import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, doctors as mockDoctors } from "@/data/patient";
import HomeClient from "@/app/home-client";
import { easyhmsFetch } from "@/lib/api/server";
import { mapDoctors } from "@/lib/api/mappers";
import type { DoctorsResponseDto } from "@/lib/api/types";

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
  let doctors = mockDoctors;
  try {
    const result = await easyhmsFetch<DoctorsResponseDto>("/public/doctors");
    if (!result.notConfigured && result.data) {
      doctors = mapDoctors(result.data.doctors);
    }
  } catch {}

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

export default function ConditionCityPage({ params }: PageProps) {
  const city = CITIES.find((c) => c.id === params.city);
  if (!city) notFound();

  const conditionName = unslugify(params.condition);

  return <HomeClient initialQuery={conditionName} initialCityId={city.id} />;
}
