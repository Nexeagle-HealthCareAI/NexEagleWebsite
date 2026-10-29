import type { Metadata } from "next";
import AudiencePage, { type AudienceConfig } from "@/components/site/AudiencePage";
import { RadDemo } from "@/components/home-v2/AgentsSection";

const TITLE = "Software for Diagnostic & Imaging Centres in India: Cloud PACS & AI Reporting | NexEagle";
const DESCRIPTION =
  "For diagnostic and imaging centres in India: 1Rad cloud PACS, a browser DICOM viewer, AI-drafted reports your radiologist reviews and signs, referral tracking and imaging billing. Add 1Lab for pathology.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["diagnostic centre software India", "imaging centre software", "cloud PACS India", "AI radiology reporting", "radiology report drafting", "referral tracking software", "teleradiology software"],
  alternates: { canonical: "/for/diagnostic-centres" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/for/diagnostic-centres", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const c: AudienceConfig = {
  slug: "diagnostic-centres",
  crumb: "For diagnostic centres",
  eyebrow: "For diagnostic and imaging centres",
  h1: "Reports out sooner, with your radiologist signing every one",
  sub: "1Rad keeps every study in a cloud PACS, drafts a structured first report for your radiologist to review and sign, and keeps referrals and billing straight.",
  points: ["Radiologist signs every report", "Read from the centre or from home", "X-ray, CT, MRI, ultrasound"],
  agentTitle: "1Rad Vita",
  demo: <RadDemo />,
  pose: { src: "/assets/vita/vita-think.webp", w: 466, h: 640, alt: "Vita thinking" },
  changesTitle: "What changes at your centre",
  changes: [
    { before: "Studies sit on one workstation, and films and CDs cost money.", after: "Every study is in the cloud PACS and opens in a web browser." },
    { before: "The radiologist types each report from scratch.", after: "Vita drafts a structured first report and marks regions to check. The radiologist edits and signs." },
    { before: "Reporting waits until the radiologist is at the centre.", after: "Your radiologist can review and sign from anywhere." },
    { before: "Referral payouts are worked out in a notebook.", after: "Each study is recorded against its referring doctor as it's billed." },
  ],
  products: [
    { name: "1Rad", href: "/solutions/1rad", line: "Cloud PACS, DICOM viewer, AI-drafted reports, referrals and billing", when: "Start with" },
    { name: "1Lab", href: "/solutions/1lab", line: "Pathology on the same patient record and the same bill", when: "Add when ready" },
    { name: "1HMS", href: "/solutions/1hms", line: "If your centre sits inside a hospital or runs OPD", when: "Add when ready" },
  ],
  proofTitle: "Reporting live at AG Smart Scan Diagnostic Centre",
  proof: ["agsmart"],
  faq: [
    { q: "Does the AI replace the radiologist?", a: "No. Vita drafts a first report and marks regions worth a closer look. Your radiologist reviews, edits and signs every report before it goes out." },
    { q: "Can we connect our existing machines?", a: "Yes, if they are DICOM-capable. 1Rad's DICOM bridge sends studies to the cloud automatically. We check your machines during the demo." },
    { q: "Can our radiologist report from home?", a: "Yes. Studies open in a web browser, so the radiologist can review and sign from anywhere with a secure login." },
    { q: "Can we run several centres on one account?", a: "Yes. 1Rad supports several branches and modalities on one central dashboard." },
  ],
  schema: { name: "NexEagle for diagnostic and imaging centres", description: DESCRIPTION, audience: "Diagnostic and imaging centres" },
  analyticsTitle: "NexEagle for Diagnostic Centres",
};

export default function Page() {
  return <AudiencePage c={c} />;
}
