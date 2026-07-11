import type { Metadata } from "next";
import SecurityClient from "./security-client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Security & Compliance - HIPAA, ISO 27001, SOC 2 - NexEagle",
  description: "Enterprise-grade security for healthcare data. HIPAA compliant, ISO 27001 certified, SOC 2 Type II audited. Learn about our comprehensive security measures, data encryption, compliance standards, and 24/7 monitoring.",
  keywords: [
    "HIPAA compliant",
    "ISO 27001",
    "SOC 2",
    "healthcare security",
    "data encryption",
    "compliance certifications",
    "healthcare data protection",
    "enterprise security",
    "GDPR compliant",
    "security audit"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Security & Compliance",
  "description": "Enterprise-grade security for healthcare data. HIPAA compliant, ISO 27001 certified, SOC 2 Type II audited",
  "publisher": {
    "@type": "Organization",
    "name": "NexEagle",
    "certification": [
      "HIPAA Compliant",
      "ISO 27001 Certified",
      "SOC 2 Type II",
      "GDPR Compliant"
    ]
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
