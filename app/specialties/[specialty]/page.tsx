import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { specialties } from "@/data/patient";
import HomeClient from "@/app/home-client";

interface PageProps {
  params: { specialty: string };
}

export async function generateStaticParams() {
  return specialties.map((s) => ({
    specialty: s.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const specialty = specialties.find((s) => s.id === params.specialty);
  if (!specialty) return { title: "Not Found" };

  const title = `Top ${specialty.name}s Near You | Book Appointment`;
  const description = `Find the best ${specialty.name}s near you. Compare experience, ratings, and book appointments online instantly on NexEagle Doctor Dekho.`;

  return {
    title,
    description,
    alternates: { canonical: `/specialties/${params.specialty}` },
    openGraph: { title, description, url: `/specialties/${params.specialty}` },
  };
}

export default function SpecialtyPage({ params }: PageProps) {
  const specialty = specialties.find((s) => s.id === params.specialty);
  if (!specialty) notFound();

  return <HomeClient initialSpecialtyId={specialty.id} />;
}
