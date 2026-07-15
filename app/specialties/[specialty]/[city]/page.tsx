import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { specialties, CITIES } from "@/data/patient";
import HomeClient from "@/app/home-client";

interface PageProps {
  params: { specialty: string; city: string };
}

export async function generateStaticParams() {
  const params: { specialty: string; city: string }[] = [];
  for (const s of specialties) {
    for (const c of CITIES) {
      params.push({ specialty: s.id, city: c.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const specialty = specialties.find((s) => s.id === params.specialty);
  const city = CITIES.find((c) => c.id === params.city);
  if (!specialty || !city) return { title: "Not Found" };

  const title = `Top ${specialty.name}s in ${city.name}, ${city.state} | Book Appointment`;
  const description = `Find the best ${specialty.name}s in ${city.name}, ${city.state}. Compare experience, ratings, and book appointments online instantly on NexEagle Doctor Dekho.`;

  return {
    title,
    description,
    alternates: { canonical: `/specialties/${params.specialty}/${params.city}` },
    openGraph: { title, description, url: `/specialties/${params.specialty}/${params.city}` },
  };
}

export default function SpecialtyCityPage({ params }: PageProps) {
  const specialty = specialties.find((s) => s.id === params.specialty);
  const city = CITIES.find((c) => c.id === params.city);
  if (!specialty || !city) notFound();

  return <HomeClient initialSpecialtyId={specialty.id} initialCityId={city.id} />;
}
