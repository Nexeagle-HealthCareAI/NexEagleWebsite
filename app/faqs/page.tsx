import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import HomeFAQ from "@/components/home-v2/HomeFAQ";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { FAQ } from "@/lib/homeContent";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "FAQs: NexEagle Hospital Software, 1Rad AI Reporting, Vita AI Agents" },
  description: "Answers about NexEagle: 1HMS hospital management software, 1Rad cloud PACS and AI radiology reports, 1Lab, 1Pharma, Vita AI agents, pricing, setup, Hindi support and patient data security in India.",
  alternates: { canonical: "/faqs" },
};

const GROUPS: { title: string; intro: string; items: { q: string; a: string }[] }[] = [
  { title: "About NexEagle", intro: "Who we are, where we work and how to start.", items: FAQ },
  {
    title: "1HMS hospital software",
    intro: "OPD, IPD, prescriptions and billing.",
    items: [
      { q: "What does 1HMS include?", a: "OPD tokens and appointments, IPD and wards, EMR and e-prescriptions, lab and radiology orders, pharmacy, billing including insurance and TPA, follow-up reminders and reports, all on one patient record." },
      { q: "Does the AI write prescriptions without the doctor?", a: "No. 1HMS Vita drafts notes and the prescription from the consultation, and the doctor reviews, edits and signs before anything reaches the patient." },
      { q: "Can we start with just OPD and billing?", a: "Yes. Many hospitals start with OPD and billing and add IPD, lab, radiology and pharmacy later. Everything stays on the same record." },
    ],
  },
  {
    title: "1Rad radiology",
    intro: "Cloud PACS and AI-drafted reports.",
    items: [
      { q: "Does 1Rad work with our existing machines?", a: "1Rad's DICOM bridge connects DICOM-capable CT, MRI, X-ray and ultrasound machines. Share your models during the demo and we'll confirm." },
      { q: "Who signs the report?", a: "Always your radiologist. 1Rad Vita prepares a first draft and marks regions to review; nothing is released without a radiologist's signature." },
      { q: "Can we run several centres?", a: "Yes. Multiple branches and modalities run from one dashboard, with referral tracking and imaging billing." },
    ],
  },
  {
    title: "Pricing, setup and support",
    intro: "What it costs and how we work with you.",
    items: [
      { q: "How much does NexEagle cost?", a: "Pricing depends on the products you use, the size of your hospital or centre and the number of users. We share a clear quote after a short call, with setup and training included in the plan we agree." },
      { q: "How do we get help after go-live?", a: "Every live hospital has a named support contact, and you can reach our team any time through Vita Customer Support on this website, WhatsApp or phone." },
      { q: "Who owns our data?", a: "You do. Your hospital owns its patient and billing records; NexEagle processes them on your behalf, hosted in India, and you can export them when you need to." },
    ],
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faqs#faq`,
    mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title="NexEagle FAQs" />
      <PageHero
        crumb="FAQs"
        eyebrow="FAQs"
        title="Questions hospitals ask us"
        intro="Can't find your answer? Ask Vita Customer Support (bottom right) for an instant reply, or talk to our team."
        pose={{ src: "/assets/vita/vita-think.webp", w: 466, h: 640, alt: "Vita thinking" }}
      />
      {GROUPS.map((g) => (
        <div key={g.title} className="border-t border-slate-200/70">
          <HomeFAQ items={g.items} title={g.title} intro={g.intro} vita={false} />
        </div>
      ))}
      <ClosingCTA />
    </main>
  );
}
