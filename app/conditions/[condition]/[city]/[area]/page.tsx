import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, AREAS_BY_CITY, doctors as mockDoctors } from "@/data/patient";
import HomeClient from "@/app/home-client";
import { easyhmsFetch } from "@/lib/api/server";
import { mapDoctors } from "@/lib/api/mappers";
import type { DoctorsResponseDto } from "@/lib/api/types";

interface PageProps {
  params: { condition: string; city: string; area: string };
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

  const params: { condition: string; city: string; area: string }[] = [];
  for (const cond of Array.from(conditionSet)) {
    for (const c of CITIES) {
      const areas = AREAS_BY_CITY[c.id] || [];
      for (const a of areas) {
        params.push({
          condition: cond,
          city: c.id,
          area: slugify(a),
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = CITIES.find((c) => c.id === params.city);
  if (!city) return { title: "Not Found" };

  const conditionName = unslugify(params.condition);
  const areaName = unslugify(params.area);
  
  const title = `Best Doctors for ${conditionName} in ${areaName}, ${city.name} | Book Appointment`;
  const description = `Find the best doctors specializing in ${conditionName} in ${areaName}, ${city.name}. Compare experience, ratings, and book appointments online instantly on NexEagle Doctor Dekho.`;

  return {
    title,
    description,
    alternates: { canonical: `/conditions/${params.condition}/${params.city}/${params.area}` },
    openGraph: { title, description, url: `/conditions/${params.condition}/${params.city}/${params.area}` },
  };
}

export default function ConditionCityAreaPage({ params }: PageProps) {
  const city = CITIES.find((c) => c.id === params.city);
  if (!city) notFound();

  const conditionName = unslugify(params.condition);
  const areaName = unslugify(params.area);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Which are the best doctors for ${conditionName} in ${areaName}, ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `NexEagle lists the top-rated specialists for ${conditionName} in ${areaName}, ${city.name}. You can filter by patient reviews and experience to find the right doctor for you.`
        }
      },
      {
        "@type": "Question",
        "name": `How quickly can I consult a doctor for ${conditionName} in ${areaName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Many doctors in ${areaName} offer same-day appointments. You can view real-time availability and book your slot instantly on NexEagle.`
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
      <HomeClient initialQuery={conditionName} initialCityId={city.id} initialArea={areaName} />
    </>
  );
}
