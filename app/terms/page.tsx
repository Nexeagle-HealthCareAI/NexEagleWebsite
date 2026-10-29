import type { Metadata } from "next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PageHero from "@/components/site/PageHero";
import LegalPage from "@/components/site/LegalPage";
import { TERMS, TERMS_INTRO, TERMS_UPDATED } from "@/lib/legal/terms";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AnalyticsTracker title="NexEagle Terms of Service" />
      <PageHero
        crumb="Terms of service"
        eyebrow="Legal"
        title="Terms of service"
        intro="The rules for using NexEagle products and services, written to be read."
      />
      <LegalPage sections={TERMS} updated={TERMS_UPDATED} intro={TERMS_INTRO} contact={{ title: "Questions about these terms?", body: "Our legal team is happy to explain anything here before you sign.", email: "legal@nexeagle.com" }} />
    </main>
  );
}
