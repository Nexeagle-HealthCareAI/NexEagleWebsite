import type { Metadata } from "next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PageHero from "@/components/site/PageHero";
import LegalPage from "@/components/site/LegalPage";
import LegalCards from "@/components/site/LegalCards";
import { PRIVACY, PRIVACY_UPDATED, RIGHTS } from "@/lib/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy - NexEagle",
  description: "NexEagle Privacy Policy. Learn how we collect, use, and protect your information in line with India's Digital Personal Data Protection Act, 2023.",
  keywords: [
    "privacy policy",
    "data protection",
    "DPDP Act 2023",
    "data protection",
    "data privacy",
    "healthcare data security",
    "personal information protection"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "NexEagle Privacy Policy - Learn how we protect your data in line with India's Digital Personal Data Protection Act, 2023",
  "publisher": {
    "@type": "Organization",
    "name": "NexEagle"
  },
  "dateModified": "April 19, 2026"
};

export default function PrivacyPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AnalyticsTracker title="NexEagle Privacy Policy" />
      <PageHero
        crumb="Privacy policy"
        eyebrow="Legal"
        title="How we look after your data"
        intro="What we collect, why, where it's kept and the rights you have, in line with India's Digital Personal Data Protection Act, 2023."
        pose={{ src: "/assets/vita/vita-relax.webp", w: 725, h: 640, alt: "Vita relaxing" }}
      />
      <LegalPage sections={PRIVACY} updated={PRIVACY_UPDATED} before={<LegalCards title="Your rights" items={RIGHTS} />} contact={{ title: "Questions about your data?", body: "Write to our privacy team and we will reply within the timelines set by the DPDP Act.", email: "privacy@nexeagle.com" }} />
    </main>
  );
}
