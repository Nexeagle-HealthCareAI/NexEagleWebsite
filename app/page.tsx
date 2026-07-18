import type { Metadata } from "next";
import HomeClient from "./home-client";
import { getAllDoctors } from "@/lib/api/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  // Overrides the root layout's "%s | NexEagle" template — this exact phrase
  // is what should show up for "find doctor near me"-style searches.
  title: { absolute: "NexEagle | Find Doctor Near Me" },
  description:
    "Find and book verified doctors near you — cardiologists, pediatricians, dermatologists and more — across every NexEagle-powered hospital. Compare experience, specialities and location, then reserve your slot online in under a minute. No app, no login.",
  keywords: [
    "find doctor near me",
    "book doctor appointment online",
    "doctor near me",
    "hospital appointment booking",
    "verified doctors India",
    "online appointment booking",
    "NexEagle",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "NexEagle | Find Doctor Near Me",
    description:
      "Find and book verified doctors near you across every NexEagle-powered hospital — compare specialities and experience, then reserve your slot online in under a minute.",
    url: "/",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://nexeagle.com/#website",
      name: "NexEagle",
      url: "https://nexeagle.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://nexeagle.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "MedicalOrganization",
      "@id": "https://nexeagle.com/#organization",
      name: "NexEagle",
      url: "https://nexeagle.com",
      logo: "https://nexeagle.com/assets/logo.webp",
      description:
        "NexEagle connects patients with verified doctors across its network of hospitals for online appointment booking.",
    },
  ],
};

export default async function HomePage() {
  // Fetched server-side so the homepage ships real doctor content in the raw
  // HTML — a non-JS crawler (Googlebot without rendering, Bing, AI bots) would
  // otherwise see an empty client shell. See src/lib/api/server.ts's getAllDoctors.
  const { doctors } = await getAllDoctors();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HomeClient initialDoctors={doctors} />
    </>
  );
}
