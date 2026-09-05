import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LabDetailClient from "@/components/labs/LabDetailClient";
import { getLabById, getAllLabs } from "@/lib/api/server";
import { labSlug, parseLabIdFromSlug, type Lab } from "@/data/labs";

interface PageProps {
  params: { labSlug: string };
}

async function resolveLab(slug: string): Promise<Lab | null> {
  const labId = parseLabIdFromSlug(slug);
  const { lab } = await getLabById(labId);
  return lab;
}

export async function generateStaticParams() {
  let slugs: string[] = [];
  try {
    const { labs } = await getAllLabs();
    slugs = labs.map((l) => labSlug(l, l.city));
  } catch {
    // If the API fails at build time, gracefully fall back to empty and let Next.js
    // generate pages dynamically on-demand -- same discipline as doctors/[doctorSlug].
  }
  return slugs.map((slug) => ({ labSlug: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lab = await resolveLab(params.labSlug);
  if (!lab) {
    return { title: "Lab not found", robots: { index: false, follow: true } };
  }
  const place = [lab.city, lab.state].filter(Boolean).join(", ");
  const title = `${lab.name}${place ? ` in ${place}` : ""} | Doctor Dekho`;
  const description = [
    lab.name,
    place ? ` in ${place}` : "",
    lab.testCategories.length > 0 ? ` — ${lab.testCategories.slice(0, 3).join(", ")}` : "",
    ". View address, contact details and get directions.",
  ].filter(Boolean).join("");
  const canonicalSlug = labSlug(lab, lab.city);

  return {
    title,
    description,
    alternates: { canonical: `/labs/${canonicalSlug}` },
    openGraph: { title, description, url: `/labs/${canonicalSlug}`, type: "website" },
  };
}

export default async function LabDetailPage({ params }: PageProps) {
  const lab = await resolveLab(params.labSlug);
  if (!lab) notFound();

  const canonicalSlug = labSlug(lab, lab.city);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: lab.name,
    description: lab.description || undefined,
    medicalSpecialty: lab.testCategories.length > 0 ? lab.testCategories : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: lab.address || undefined,
      addressLocality: lab.city || undefined,
      addressRegion: lab.state || undefined,
      postalCode: lab.pincode || undefined,
      addressCountry: "IN",
    },
    ...(lab.latitude && lab.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: lab.latitude.toString(),
            longitude: lab.longitude.toString(),
          },
        }
      : {}),
    telephone: lab.contactPhone || undefined,
    email: lab.contactEmail || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LabDetailClient lab={lab} canonicalSlug={canonicalSlug} />
    </>
  );
}
