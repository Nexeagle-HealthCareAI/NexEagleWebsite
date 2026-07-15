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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What does a ${specialty.name} do?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A ${specialty.name} specializes in ${specialty.blurb.toLowerCase()}. They diagnose, treat, and help manage conditions related to this field.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I book an appointment with a ${specialty.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can book an appointment instantly through NexEagle. Simply select your location, compare top ${specialty.name}s, and choose a time slot that works for you.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient initialSpecialtyId={specialty.id} />
    </>
  );
}
