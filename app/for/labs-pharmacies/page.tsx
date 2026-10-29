import type { Metadata } from "next";
import AudiencePage, { type AudienceConfig } from "@/components/site/AudiencePage";
import { LabDemo } from "@/components/site/ProductDemos";

const TITLE = "Lab & Pharmacy Software in India: LIS, Barcoded Samples, Stock & Expiry | NexEagle";
const DESCRIPTION =
  "For pathology labs and hospital pharmacies in India: 1Lab tracks barcoded samples to pathologist-approved results, and 1Pharma receives prescriptions from the doctor and warns you before stock expires.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["lab information system India", "LIS software", "pathology lab software", "pharmacy software India", "hospital pharmacy software", "medicine expiry alerts", "barcode sample tracking"],
  alternates: { canonical: "/for/labs-pharmacies" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/for/labs-pharmacies", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const c: AudienceConfig = {
  slug: "labs-pharmacies",
  crumb: "For labs and pharmacies",
  eyebrow: "For pathology labs and pharmacies",
  h1: "Fewer sample mix-ups and less stock lost to expiry",
  sub: "1Lab follows every sample from collection to an approved result. 1Pharma gets the prescription from the doctor and warns you before medicines expire.",
  points: ["Pathologist approves every result", "Expiry alerts", "On the hospital's patient record"],
  agentTitle: "1Lab Vita",
  demo: <LabDemo />,
  pose: { src: "/assets/vita/vita-present.webp", w: 753, h: 760, alt: "Vita presenting" },
  changesTitle: "What changes at the counter",
  changes: [
    { before: "Sample tubes are labelled by hand.", after: "Each sample gets a barcode at collection and is tracked to its result." },
    { before: "Abnormal values are easy to miss on a busy day.", after: "Abnormal values are flagged before the pathologist approves the report." },
    { before: "Handwritten prescriptions are misread at the pharmacy.", after: "The prescription reaches 1Pharma from the doctor's screen." },
    { before: "Expired stock is found when it's already a loss.", after: "1Pharma warns you about medicines nearing expiry." },
  ],
  products: [
    { name: "1Lab", href: "/solutions/1lab", line: "Samples, results, abnormal flags and pathologist approval", when: "Start with" },
    { name: "1Pharma", href: "/solutions/1pharma", line: "Prescriptions, dispensing, stock and expiry", when: "Start with" },
    { name: "1HMS", href: "/solutions/1hms", line: "Orders and bills on the hospital's patient record", when: "Add when ready" },
  ],
  proofTitle: "Part of NexEagle at hospitals in Bihar",
  proof: ["sparsh", "glisan"],
  faq: [
    { q: "Can a standalone lab use 1Lab without 1HMS?", a: "Yes. 1Lab works on its own. If the hospital also uses 1HMS, orders and results flow between them automatically." },
    { q: "Who approves lab results?", a: "Your pathologist. Vita flags abnormal values, but a pathologist approves every report before it's released." },
    { q: "Can 1Pharma run a standalone medical store?", a: "Yes. 1Pharma works on its own for a pharmacy or medical store, and connects to 1HMS when it sits inside a hospital." },
    { q: "How does 1Pharma handle expiry?", a: "Every batch is stored with its expiry date. Batches nearing expiry are flagged early, and dispensing suggests the oldest usable batch first." },
    { q: "What hardware do we need?", a: "A computer with a browser. For the lab, a barcode label printer; for the pharmacy, a barcode scanner helps but is optional. We help you choose and set them up." },
  ],
  schema: { name: "NexEagle for labs and pharmacies", description: DESCRIPTION, audience: "Pathology labs and pharmacies" },
  analyticsTitle: "NexEagle for Labs and Pharmacies",
};

export default function Page() {
  return <AudiencePage c={c} />;
}
