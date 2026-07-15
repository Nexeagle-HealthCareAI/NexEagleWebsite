import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { specialties, CITIES, AREAS_BY_CITY } from "@/data/patient";
import HomeClient from "@/app/home-client";

interface PageProps {
  params: { specialty: string; city: string; area: string };
}

function unslugify(slug: string) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export async function generateStaticParams() {
  const params: { specialty: string; city: string; area: string }[] = [];
  for (const s of specialties) {
    for (const c of CITIES) {
      const areas = AREAS_BY_CITY[c.id] || [];
      for (const a of areas) {
        params.push({
          specialty: s.id,
          city: c.id,
          area: a.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const specialty = specialties.find((s) => s.id === params.specialty);
  const city = CITIES.find((c) => c.id === params.city);
  if (!specialty || !city) return { title: "Not Found" };

  const areaName = unslugify(params.area);
  const title = `Top ${specialty.name}s in ${areaName}, ${city.name} | Book Appointment`;
  const description = `Find the best ${specialty.name}s in ${areaName}, ${city.name}. Compare experience, ratings, and book appointments online instantly on NexEagle Doctor Dekho.`;

  return {
    title,
    description,
    alternates: { canonical: `/specialties/${params.specialty}/${params.city}/${params.area}` },
    openGraph: { title, description, url: `/specialties/${params.specialty}/${params.city}/${params.area}` },
  };
}

export default function SpecialtyCityAreaPage({ params }: PageProps) {
  const specialty = specialties.find((s) => s.id === params.specialty);
  const city = CITIES.find((c) => c.id === params.city);
  if (!specialty || !city) notFound();

  const areaName = unslugify(params.area);

  // Note: For FAQ, area-specific FAQs can also be injected here
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the consultation fee for a ${specialty.name} in ${areaName}, ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Consultation fees for a ${specialty.name} in ${areaName}, ${city.name} typically range between ₹500 and ₹1500, depending on the doctor's experience and hospital affiliation.`
        }
      },
      {
        "@type": "Question",
        "name": `How can I find the best ${specialty.name}s in ${areaName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can use NexEagle to compare the top-rated ${specialty.name}s in ${areaName} based on patient reviews, experience, and proximity to your location.`
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
      <HomeClient initialSpecialtyId={specialty.id} initialCityId={city.id} initialArea={areaName} />
    </>
  );
}
