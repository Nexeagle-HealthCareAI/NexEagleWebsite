import type { Metadata } from "next";
import { ScanLine, BellRing, ClipboardCheck, Cpu, FileText, FlaskConical, Gauge, Receipt, ShieldCheck } from "lucide-react";
import ProductPage, { type ProductConfig } from "@/components/site/ProductPage";
import { STEPS, type Step } from "@/lib/journeySteps";
import { LabDemo } from "@/components/site/ProductDemos";

const TITLE = "Laboratory Information System (LIS) for Pathology Labs | 1Lab by NexEagle";
const DESCRIPTION =
  "1Lab is a cloud laboratory information system for pathology labs and hospital labs in India: barcode sample tracking, analyser integration, abnormal value flags, pathologist approval and PDF reports for patients.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["laboratory information system", "LIS software India", "pathology lab software", "lab management software", "diagnostic lab software", "barcode sample tracking", "lab analyser integration", "lab report software"],
  alternates: { canonical: "/solutions/1lab" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/solutions/1lab", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const WALK_IN: Step = {
  agent: "1Lab Vita",
  avatar: "/assets/vita/avatar-coffee.webp",
  title: "A walk-in patient, a barcoded sample, no mix-ups",
  body: "The collection desk registers the test, prints a barcode for each tube, and from then on every step is tracked against that barcode.",
  inn: { title: "Comes in", items: ["Walk-in for a thyroid profile", "Doctor's request slip", "Payment at the desk"] },
  vita: { title: "Vita does", items: ["Registers and bills the tests", "Prints barcode labels", "Sends tubes to the right bench"] },
  out: { title: "Your team gets", items: ["Every tube traceable", "Turnaround timer running", "No handwritten labels"] },
};

const c: ProductConfig = {
  slug: "1lab",
  name: "1Lab",
  category: "Laboratory information system",
  dot: "bg-[#8a6fe0]",
  pose: { src: "/assets/vita/vita-present.webp", w: 753, h: 760, alt: "1Lab Vita presenting" },
  h1: "Lab software that tracks every sample to an approved result",
  sub: "Barcoded samples, results straight from your analysers, abnormal values flagged before anyone signs, and reports the patient can download. For standalone pathology labs and hospital labs.",
  points: ["Barcode tracking", "Analyser integration", "Data hosted in India"],
  agentTitle: "1Lab Vita",
  demo: <LabDemo />,
  modulesTitle: "From the collection desk to the signed report",
  modulesIntro: "Every sample has one barcode and one status, so nobody has to walk to the bench to ask where a result is.",
  modules: [
    { Icon: ScanLine, title: "Barcode sample tracking", body: "A label for every tube, so each sample is traceable from collection to result." },
    { Icon: Cpu, title: "Analyser integration", body: "Results flow in from supported analysers, with no retyping of values." },
    { Icon: Gauge, title: "Reference ranges and flags", body: "Age and sex-wise ranges, with abnormal and critical values flagged for attention." },
    { Icon: ClipboardCheck, title: "Pathologist approval", body: "Results are released only after the pathologist reviews and approves them." },
    { Icon: FileText, title: "Branded PDF reports", body: "Clean reports on your lab's letterhead, ready to print, download or share." },
    { Icon: BellRing, title: "Patient notifications", body: "Patients are told when their report is ready, and doctors see it in their records." },
    { Icon: FlaskConical, title: "Quality control", body: "QC runs and calibration records kept alongside the work they cover." },
    { Icon: Receipt, title: "Billing and packages", body: "Tests and health packages billed at the desk, or added to the hospital bill in 1HMS." },
    { Icon: ShieldCheck, title: "Secure and India-hosted", body: "Encrypted storage in India, a login for every role and a full audit trail." },
  ],
  stepsTitle: "How a sample moves through 1Lab",
  stepsIntro: "From the collection desk to the doctor's screen, every step is recorded once.",
  steps: [WALK_IN, STEPS[3]],
  worksWith: [
    { name: "1HMS", href: "/solutions/1hms", line: "Test orders arrive from the consultation" },
    { name: "1Rad", href: "/solutions/1rad", line: "Imaging and lab results side by side" },
    { name: "1Pharma", href: "/solutions/1pharma", line: "One bill for tests and medicines" },
    { name: "Doctor Dekho", href: "https://doctordekho.nexeagle.com", line: "Patients find your lab and book a test" },
  ],
  faq: [
    { q: "Can 1Lab work for a standalone pathology lab?", a: "Yes. 1Lab works on its own for pathology and diagnostic labs, and connects to 1HMS when the lab is part of a hospital." },
    { q: "Which analysers does 1Lab connect to?", a: "1Lab connects to analysers that support standard interfaces. Tell us your machines during the demo and we will confirm the setup." },
    { q: "Are abnormal values flagged automatically?", a: "Yes. Results are checked against reference ranges, and values outside the range are flagged before the pathologist approves the report." },
    { q: "Can patients download their reports?", a: "Yes. Approved reports are available as PDFs on your lab's letterhead, and patients are notified when they are ready." },
    { q: "Do we need special hardware?", a: "A computer with a browser and a barcode label printer for samples. We help you choose and set up both." },
  ],
  schema: {
    name: "NexEagle 1Lab",
    category: "Laboratory information system (LIS)",
    description: DESCRIPTION,
  },
  analyticsTitle: "1Lab - Laboratory Information System | NexEagle",
};

export default function Page() {
  return <ProductPage c={c} />;
}
