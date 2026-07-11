import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import TeamSection from "@/components/about/TeamSection";
import AboutCTA from "@/components/about/AboutCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Team - NexEagle | Healthcare IT & Product Engineers",
  description: "Meet the NexEaglians—our founding team of clinicians, software developers, and research advisors building the next generation of healthcare platforms (1HMS, 1Rad, 1Lab, 1Pharma).",
  keywords: [
    "software development company",
    "custom software development",
    "healthcare software",
    "hospital management system",
    "medical software developers",
    "NexEagle team"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "NexEagle",
    "url": "https://nexeagle.com",
    "description": "Meet the NexEaglians. A dedicated group of clinicians, engineers, and product builders designing the future of healthcare software.",
    "founder": [
      {
        "@type": "Person",
        "name": "Md Tasquil Noori",
        "jobTitle": "Tech Lead"
      },
      {
        "@type": "Person",
        "name": "Dr Md Taquedis Noori",
        "jobTitle": "Medical Advisor"
      },
      {
        "@type": "Person",
        "name": "Md Aquib",
        "jobTitle": "Product Manager"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kolkata",
      "addressCountry": "IN"
    }
  }
};

export default function TeamPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="Team - NexEagle | Healthcare IT & Product Engineers" />
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <TeamSection />
      <AboutCTA />
    </main>
  );
}
