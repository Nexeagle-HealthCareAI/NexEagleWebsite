import type { Metadata } from "next";
import Hero from "@/components/home-v2/Hero";
import PatientJourney from "@/components/home-v2/PatientJourney";
import AgentsSection from "@/components/home-v2/AgentsSection";
import HomeFAQ from "@/components/home-v2/HomeFAQ";
import { ClientsStrip, ClosingCTA, DataTrust, GoLive } from "@/components/home-v2/Sections";
import BeforeAfter from "@/components/home-v2/BeforeAfter";
import TeamStrip from "@/components/home-v2/TeamStrip";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { SITE_URL, DOCTORDEKHO_URL } from "@/lib/site";
import { ENTITY_SUMMARY, FAQ } from "@/lib/homeContent";

// Server component: every section is in the initial HTML for search engines and AI crawlers;
// interactive parts (3D hero, tabs, AI demo) hydrate on the client.
const TITLE = "AI Hospital Management Software & AI Radiology Reporting in India | NexEagle";
const DESCRIPTION =
  "NexEagle Vita AI agents: hospital management software (HMS & EMR) for Indian hospitals and clinics, cloud PACS with AI radiology reporting, LIS and pharmacy. Live in Kishanganj and Purnea, Bihar.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "hospital management software India",
    "hospital management software for small hospitals",
    "HMIS India",
    "EMR software India",
    "AI hospital software",
    "AI agents for hospitals",
    "AI radiology reporting India",
    "radiology reporting software",
    "cloud PACS India",
    "teleradiology software",
    "lab information system",
    "pharmacy management software",
    "hospital software Bihar",
    "hospital software Kishanganj",
    "hospital software Purnea",
    "Vita AI agent",
    "NexEagle",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "NexEagle Vita AI agents for hospitals in India" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og/home.png"] },
};

const ORG = { "@id": `${SITE_URL}/#organization` };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "NexEagle",
      description: ENTITY_SUMMARY,
      inLanguage: "en-IN",
      publisher: ORG,
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: ORG,
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/solutions/1hms#software`,
      name: "NexEagle 1HMS",
      alternateName: ["1HMS Vita", "NexEagle hospital management software"],
      applicationCategory: "HealthApplication",
      applicationSubCategory: "Hospital management system (HMS), EMR",
      operatingSystem: "Web",
      url: `${SITE_URL}/solutions/1hms`,
      description:
        "Hospital management software and EMR for Indian hospitals and clinics: registration, OPD queues, IPD, prescriptions, billing and reports, with 1HMS Vita AI agents automating check-in, prescription drafting, orders and billing. Available in English and Hindi.",
      areaServed: { "@type": "Country", name: "India" },
      publisher: ORG,
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/solutions/1rad#software`,
      name: "NexEagle 1Rad",
      alternateName: ["1Rad Vita", "NexEagle cloud PACS"],
      applicationCategory: "HealthApplication",
      applicationSubCategory: "Cloud PACS, radiology reporting, teleradiology",
      operatingSystem: "Web",
      url: `${SITE_URL}/solutions/1rad`,
      description:
        "Cloud PACS with a browser-based DICOM viewer. 1Rad Vita runs AI vision analysis on each study, marks regions to review and drafts a structured radiology report that the radiologist reviews and signs, from anywhere.",
      areaServed: { "@type": "Country", name: "India" },
      publisher: ORG,
    },
    {
      "@type": "Service",
      name: "Vita for patients: find a doctor and book",
      provider: ORG,
      url: DOCTORDEKHO_URL,
      areaServed: { "@type": "Country", name: "India" },
      description: "Symptom-based doctor matching, appointment booking, WhatsApp confirmation and directions to the clinic, on Doctor Dekho.",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title="NexEagle - AI-Powered Healthcare Operating System" />
      <Hero />
      <ClientsStrip />
      <AgentsSection />
      <BeforeAfter />
      <PatientJourney />
      <TeamStrip />
      <GoLive />
      <DataTrust />
      <HomeFAQ />
      <ClosingCTA />
    </main>
  );
}
