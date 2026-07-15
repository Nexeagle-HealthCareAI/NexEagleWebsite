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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the consultation fee for a ${specialty.name} in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Consultation fees for a ${specialty.name} in ${city.name} typically range between ₹500 and ₹1500, depending on the doctor's experience and hospital affiliation.`
        }
      },
      {
        "@type": "Question",
        "name": `How can I find the best ${specialty.name}s in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can use NexEagle to compare the top-rated ${specialty.name}s in ${city.name} based on patient reviews, experience, and proximity to your location.`
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
      <HomeClient initialSpecialtyId={specialty.id} initialCityId={city.id} />
    </>
  );
}
