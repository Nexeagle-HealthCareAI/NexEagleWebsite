import type { Metadata } from "next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PageHero from "@/components/site/PageHero";
import LegalPage from "@/components/site/LegalPage";
import LegalCards from "@/components/site/LegalCards";
import { CERTS, SECURITY } from "@/lib/legal/security";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AnalyticsTracker title="NexEagle Security & Compliance" />
      <PageHero
        crumb="Security"
        eyebrow="Security & compliance"
        title="Patient data, protected at every step"
        intro="How we keep hospital and patient data safe: who can see what, how it's stored, where it lives and how we respond if something goes wrong."
        pose={{ src: "/assets/vita/vita-think.webp", w: 466, h: 640, alt: "Vita thinking" }}
      />
      <LegalPage sections={SECURITY} before={<LegalCards title="Compliance at a glance" items={CERTS.map((c) => ({ title: c.name, description: c.description, tag: c.status }))} />} contact={{ title: "Found a security issue?", body: "Tell us privately and our team will look into it straight away.", email: "security@nexeagle.com" }} />
    </main>
  );
}
