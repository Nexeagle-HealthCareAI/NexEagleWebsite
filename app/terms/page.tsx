import type { Metadata } from "next";
import TermsClient from "./terms-client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Terms of Service - NexEagle",
  description: "NexEagle Terms of Service. Legal terms and conditions for using our healthcare products (1HMS, 1Rad PACS) and product engineering services.",
  keywords: [
    "terms of service",
    "legal terms",
    "service agreement",
    "terms and conditions",
    "user agreement",
    "healthcare software terms"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service",
  "description": "NexEagle Terms of Service - Legal terms and conditions for using our healthcare products and engineering services",
  "publisher": {
    "@type": "Organization",
    "name": "NexEagle"
  },
  "dateModified": "April 19, 2026"
};

export default function TermsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle Terms of Service" />
      <TermsClient />
    </main>
  );
}
