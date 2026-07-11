import type { Metadata } from "next";
import ContactClient from "./contact-client";
import DeferredLiveChat from "@/components/DeferredLiveChat";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Contact Us - Get Started with NexEagle",
  description: "Contact NexEagle for healthcare software solutions or product engineering services. Schedule a demo, request a consultation, or discuss your project with our team.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle Contact - Consult Our Team" />
      <ContactClient />
      <DeferredLiveChat />
    </main>
  );
}
