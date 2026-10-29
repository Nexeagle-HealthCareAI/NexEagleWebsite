import type { Metadata } from "next";
import SecurityClient from "./security-client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Security & Compliance - DPDP, ABDM, NABH",
  description: "How NexEagle protects healthcare data: encryption, access controls, India-hosted data, and alignment with the DPDP Act 2023, ABDM and NABH documentation needs.",
  keywords: [
    "DPDP Act 2023",
    "ABDM",
    "NABH",
    "healthcare security",
    "data encryption",
    "compliance certifications",
    "healthcare data protection",
    "enterprise security",
    "India data residency",
    "hospital data security"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Security & Compliance",
  "description": "How NexEagle protects healthcare data, with India-hosted data and alignment with the DPDP Act 2023, ABDM and NABH.",
  "publisher": {
    "@type": "Organization",
    "name": "NexEagle"
  }
};

export default function SecurityPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle Security & Compliance" />
      <SecurityClient />
    </main>
  );
}
