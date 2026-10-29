import type { Metadata } from "next";
import CareersClient from "./careers-client";
import PageHero from "@/components/site/PageHero";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: { absolute: "Careers at NexEagle: AI Engineer & Marketing Jobs in Kolkata / Remote" },
  description: "Build the clinical operating systems of tomorrow. Explore open positions for AI Engineers and Digital Marketing Specialists at NexEagle.",
  keywords: [
    "careers at nexeagle",
    "software development jobs",
    "AI engineer openings",
    "digital marketing vacancy",
    "work at nexeagle",
    "medical software developer jobs"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    ...[
      { t: "AI Engineer", d: "Build Vita, NexEagle's healthcare AI agents: the clinical scribe, workflow automation in 1HMS and radiology report drafting in 1Rad. Python, LLMs, RAG; 2-4 years." },
      { t: "Digital Marketing Specialist", d: "Grow NexEagle among hospitals and diagnostic centres in India through SEO, content, LinkedIn and performance campaigns; 1-3 years B2B SaaS." },
    ].map((j) => ({
      "@type": "JobPosting",
      title: j.t,
      description: j.d,
      datePosted: "2026-10-01",
      employmentType: "FULL_TIME",
      hiringOrganization: { "@type": "Organization", name: "NexEagle", sameAs: "https://nexeagle.com", logo: "https://nexeagle.com/assets/logo.webp" },
      jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressRegion: "West Bengal", addressCountry: "IN" } },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: { "@type": "Country", name: "India" },
    })),
    {
      "@type": "AboutPage",
      "@id": "https://nexeagle.com/careers#webpage",
      "url": "https://nexeagle.com/careers",
      "name": "Careers at NexEagle - Join the NexEaglians",
      "description": "Build the future of clinical operating systems. Explore open job positions for AI Engineers and Digital Marketing Specialists at NexEagle.",
      "isPartOf": {
        "@id": "https://nexeagle.com/#website"
      }
    }
  ]
};

export default function CareersPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle Careers - Join the Team" />
      <PageHero
        crumb="Careers"
        eyebrow="Careers"
        title="Build the software hospitals run on"
        intro="Small team, real hospitals, real impact. What you build is used every day by doctors, radiologists and reception staff in Bihar and beyond. Based in Kolkata, with remote roles."
        pose={{ src: "/assets/vita/vita-coffee.webp", w: 538, h: 640, alt: "Vita with a cup of coffee" }}
      />
      <CareersClient />
    </main>
  );
}
