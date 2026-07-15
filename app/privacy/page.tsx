import type { Metadata } from "next";
import PrivacyClient from "./privacy-client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Privacy Policy - NexEagle",
  description: "NexEagle Privacy Policy. Learn how we collect, use, and protect your information in compliance with HIPAA, GDPR, ISO 27001, and other data protection regulations.",
  keywords: [
    "privacy policy",
    "data protection",
    "HIPAA compliance",
    "GDPR",
    "data privacy",
    "healthcare data security",
    "personal information protection"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "NexEagle Privacy Policy - Learn how we protect your data in compliance with HIPAA, GDPR, ISO 27001, and other regulations",
  "publisher": {
    "@type": "Organization",
    "name": "NexEagle"
  },
  "dateModified": "April 19, 2026"
};

export default function PrivacyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle Privacy Policy" />
      <PrivacyClient />
    </main>
  );
}
