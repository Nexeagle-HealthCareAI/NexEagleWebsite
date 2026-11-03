import type { Metadata } from "next";
import ContactClient from "./contact-client";
import PageHero from "@/components/site/PageHero";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: { absolute: "Book a Demo of NexEagle Hospital Software | Contact NexEagle" },
  description: "Book a demo of NexEagle 1HMS hospital management software, 1Rad cloud PACS with AI radiology reporting, 1Lab or 1Pharma. Call or WhatsApp +91 80749 06808, or email info@nexeagle.com.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact healthcare software company",
    "schedule demo",
    "product consultation",
    "NexEagle contact",
    "healthcare technology support"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "NexEagle",
    "url": "https://nexeagle.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+918074906808",
      "email": "info@nexeagle.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "IN"
    }
  }
};

export default function ContactPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AnalyticsTracker title="NexEagle Contact - Consult Our Team" />
      <PageHero
        crumb="Contact"
        eyebrow="Talk to us"
        title="See NexEagle running in a hospital like yours"
        intro="Tell us a little about your hospital or centre and we'll set up a demo around how you work today. Prefer to talk now? WhatsApp or call us."
        pose={{ src: "/assets/vita/vita-present.webp", w: 753, h: 760, alt: "Vita waving hello" }}
      />
      <ContactClient />
    </main>
  );
}
