import type { Metadata } from "next";
import { Bot, Building2, Cable, Eye, FileText, Globe2, LayoutDashboard, Monitor, Receipt, Share2, ShieldCheck, Users } from "lucide-react";
import ProductPage, { type ProductConfig } from "@/components/site/ProductPage";
import { STEPS, type Step } from "@/lib/journeySteps";
import { RadDemo } from "@/components/home-v2/AgentsSection";
import { RAD_APP_URL } from "@/lib/site";

const TITLE = "Cloud PACS & AI Radiology Reporting Software in India | 1Rad by NexEagle";
const DESCRIPTION =
  "1Rad is a cloud PACS and RIS for diagnostic centres and hospitals in India: browser DICOM viewer, AI vision analysis, AI-drafted radiology reports, teleradiology, referral tracking and imaging billing.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["cloud PACS India", "PACS software", "RIS PACS", "AI radiology reporting", "radiology reporting software", "AI radiology India", "teleradiology software", "DICOM viewer", "diagnostic centre software", "radiology referral management", "imaging centre billing software"],
  alternates: { canonical: "/solutions/1rad" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/solutions/1rad", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const CENTRE_DAY: Step = {
  agent: "1Rad Vita",
  avatar: "/assets/vita/avatar-think.webp",
  title: "A referral walks in and the books stay straight",
  body: "Front desk registers the patient against the referring doctor, the study goes to the right machine's worklist, and billing and referral credit are recorded on the spot.",
  inn: { title: "Comes in", items: ["Referral from Dr. Ramesh", "Patient at the front desk", "CT chest ordered"] },
  vita: { title: "Vita does", items: ["Registers and bills the study", "Sends it to the CT worklist", "Credits the referring doctor"] },
  out: { title: "Your team gets", items: ["Study waiting in PACS", "Referral tracked for payout", "Status on the operations board"] },
};

const REPORT_OUT: Step = {
  agent: "1Rad Vita",
  avatar: "/assets/vita/avatar-think.webp",
  title: "Signed reports go out without chasing",
  body: "Once the radiologist signs, the report and images reach the referring doctor and the patient, and the operations board shows what is still pending.",
  inn: { title: "Comes in", items: ["Report signed by radiologist", "Referring doctor's details", "Patient's phone number"] },
  vita: { title: "Vita does", items: ["Shares report and images", "Updates the board to Delivered", "Flags studies still pending"] },
  out: { title: "Your team gets", items: ["Doctor has the report", "Patient can download it", "No phone calls to chase"] },
};

const c: ProductConfig = {
  slug: "1rad",
  name: "1Rad",
  category: "Cloud PACS & AI radiology reporting",
  dot: "bg-[#1599db]",
  pose: { src: "/assets/vita/vita-think.webp", w: 466, h: 640, alt: "1Rad Vita thinking" },
  h1: "Cloud PACS where AI drafts the report and your radiologist signs",
  sub: "Every study from every machine in one browser viewer. 1Rad Vita runs AI vision analysis, marks what needs a closer look and drafts a structured report, so radiologists report faster, at the centre or from home.",
  points: ["Works with your existing machines", "Report from anywhere", "Images hosted in India"],
  agentTitle: "1Rad Vita",
  app: { name: "1Rad Flow", url: RAD_APP_URL },
  demo: <RadDemo />,
  modulesTitle: "Everything a diagnostic centre runs on",
  modulesIntro: "From the front desk to the signed report, for one centre or several branches, on one dashboard.",
  modules: [
    { Icon: Monitor, title: "Zero-install DICOM viewer", body: "Open X-ray, CT, MRI and ultrasound studies in the browser, with hanging protocols and measurement tools." },
    { Icon: Eye, title: "AI vision analysis", body: "1Rad Vita looks at each study as it arrives and marks regions that need a closer look." },
    { Icon: FileText, title: "AI-drafted reports", body: "A structured first-draft report the radiologist edits and signs. Nothing is released without a signature." },
    { Icon: Bot, title: "Ask RadAI", body: "Ask questions about a study or your centre's work in plain language, right inside 1Rad." },
    { Icon: Globe2, title: "Teleradiology", body: "Radiologists report securely from home or another city, on any device." },
    { Icon: LayoutDashboard, title: "Operations board", body: "Every patient from expected to arrived, scanned, reported and delivered, on one live board." },
    { Icon: Users, title: "Referral management", body: "Track referring doctors, their patients and commission payouts, with no separate register." },
    { Icon: Receipt, title: "Imaging billing", body: "Invoices, TPA claims and collections recorded as studies are booked." },
    { Icon: Building2, title: "Multiple centres", body: "Run several branches and modalities from one central dashboard." },
    { Icon: Cable, title: "DICOM bridge", body: "Connects your existing DICOM machines to the cloud, so studies arrive without manual uploads." },
    { Icon: Share2, title: "Report delivery", body: "Signed reports and images reach the referring doctor and the patient without phone calls." },
    { Icon: ShieldCheck, title: "Secure and India-hosted", body: "Encrypted storage in India, role-based access and a full audit trail." },
  ],
  stepsTitle: "How a study moves through 1Rad",
  stepsIntro: "From the front desk to a signed report, 1Rad Vita keeps the study moving and your team informed.",
  steps: [CENTRE_DAY, STEPS[2], REPORT_OUT],
  worksWith: [
    { name: "1HMS", href: "/solutions/1hms", line: "Scan orders arrive from the doctor's consultation" },
    { name: "1Lab", href: "/solutions/1lab", line: "Lab results sit next to imaging in one record" },
    { name: "1Pharma", href: "/solutions/1pharma", line: "Contrast and consumables on the same bill" },
    { name: "Doctor Dekho", href: "https://doctordekho.nexeagle.com", line: "Patients find your centre and book a scan" },
  ],
  faq: [
    { q: "Does 1Rad AI replace the radiologist?", a: "No. 1Rad Vita analyses each study, marks regions that need a closer look and prepares a first-draft report. A qualified radiologist always reviews, edits and signs the report before it is released." },
    { q: "Can we connect our existing CT, MRI and X-ray machines?", a: "Yes. 1Rad's DICOM bridge connects DICOM-capable machines to the cloud, so studies arrive automatically. We check your machines during the demo." },
    { q: "Can radiologists report from home?", a: "Yes. The viewer runs in the browser, so radiologists can open studies and sign reports from anywhere, which suits teleradiology." },
    { q: "Can we run several centres on one account?", a: "Yes. 1Rad supports multiple branches and modalities on one central dashboard." },
    { q: "Does 1Rad track referrals and commissions?", a: "Yes. Each study is linked to its referring doctor, and referral credit and payouts are tracked for you." },
    { q: "Where are images stored?", a: "Studies and reports are stored encrypted on servers in India, with role-based access and a full audit trail." },
    { q: "Is there a desktop app?", a: "1Rad runs in the browser, and a desktop app is available for reporting workstations." },
  ],
  schema: {
    name: "NexEagle 1Rad",
    category: "Cloud PACS, RIS, AI radiology reporting, teleradiology",
    description: DESCRIPTION,
  },
  analyticsTitle: "1Rad - Cloud PACS & RIS | NexEagle",
};

export default function Page() {
  return <ProductPage c={c} />;
}
