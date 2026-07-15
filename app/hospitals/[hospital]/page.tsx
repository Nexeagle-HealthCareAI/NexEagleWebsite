import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctors as mockDoctors } from "@/data/patient";
import HomeClient from "@/app/home-client";
import { easyhmsFetch } from "@/lib/api/server";
import { mapDoctors } from "@/lib/api/mappers";
import type { DoctorsResponseDto } from "@/lib/api/types";

interface PageProps {
  params: { hospital: string };
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

  const hospitalSet = new Set<string>();
  for (const d of doctors) {
    if (d.hospitalName) {
      hospitalSet.add(slugify(d.hospitalName));
    }
  }

  return Array.from(hospitalSet).map(hospital => ({ hospital }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const hospitalName = unslugify(params.hospital);
  
  const title = `Top Doctors in ${hospitalName} | Book Appointment Online`;
  const description = `Find and book appointments with the best doctors practicing at ${hospitalName}. Compare verified reviews, experience, and book instantly on NexEagle Doctor Dekho.`;

  return {
    title,
    description,
    alternates: { canonical: `/hospitals/${params.hospital}` },
    openGraph: { title, description, url: `/hospitals/${params.hospital}` },
  };
}

export default function HospitalPage({ params }: PageProps) {
  const hospitalName = unslugify(params.hospital);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Which are the best doctors available at ${hospitalName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `NexEagle lists top-rated specialists available at ${hospitalName}. You can filter by specialty, read patient reviews, and book online.`
        }
      },
      {
        "@type": "Question",
        "name": `How can I book an appointment at ${hospitalName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can view the real-time availability of doctors at ${hospitalName} and book your slot instantly on NexEagle Doctor Dekho without any phone calls.`
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
      <HomeClient initialQuery={hospitalName} />
    </>
  );
}
