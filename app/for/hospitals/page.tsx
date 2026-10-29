import type { Metadata } from "next";
import AudiencePage, { type AudienceConfig } from "@/components/site/AudiencePage";
import { LogList } from "@/components/home-v2/AgentsSection";

const TITLE = "Hospital Management Software for Small & Mid-Sized Hospitals in India | NexEagle";
const DESCRIPTION =
  "For hospitals and nursing homes in India: registration, OPD, wards, lab, radiology, pharmacy and billing on one patient record, with Vita AI agents doing the paperwork. Set up and trained on site by our team, in English or Hindi.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["hospital management software India", "HMS for small hospitals", "nursing home software", "hospital billing software", "IPD software", "hospital software Bihar", "NABH documentation software"],
  alternates: { canonical: "/for/hospitals" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/for/hospitals", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const LOG = [
  { t: "09:05", a: "Registered Sunita D. at reception, IPD admission opened" },
  { t: "09:12", a: "Bed 204 allotted, ward nurse notified" },
  { t: "11:40", a: "CBC and chest X-ray orders sent to 1Lab and 1Rad" },
  { t: "14:15", a: "Medicines dispensed by 1Pharma, added to the bill" },
  { t: "17:30", a: "Discharge summary drafted for Dr. Kumar to sign" },
  { t: "17:32", a: "Final bill ready, every service already on it" },
];

const c: AudienceConfig = {
  slug: "hospitals",
  crumb: "For hospitals",
  eyebrow: "For hospitals and nursing homes",
  h1: "One record from reception to discharge, and every charge on the bill",
  sub: "Registration, OPD, wards, lab, radiology, pharmacy and billing work on the same patient record. Our team sets it up in your hospital and trains every role on site.",
  points: ["Built for 10 to 100 beds", "Set up and trained on site", "Data hosted in India"],
  agentTitle: "1HMS Vita",
  demo: <LogList log={LOG} />,
  pose: { src: "/assets/vita/vita-present.webp", w: 753, h: 760, alt: "Vita presenting" },
  changesTitle: "What changes in your hospital",
  changes: [
    { before: "Patient details are typed again at every counter.", after: "A patient is registered once, and every department works on the same record." },
    { before: "Services given in the ward or lab never reach the bill.", after: "Every service lands on the patient's bill as it happens." },
    { before: "Discharge waits hours for the final bill.", after: "The bill is built during the stay, so it's ready with the discharge summary." },
    { before: "NABH paperwork is a scramble before every assessment.", after: "Records, checklists and audit trails are kept as work happens." },
    { before: "You learn the day's numbers the next morning, if at all.", after: "Daily OPD, admissions, collections and doctor-wise reports on your phone." },
  ],
  products: [
    { name: "1HMS", href: "/solutions/1hms", line: "Registration, OPD, IPD, EMR and billing on one record", when: "Start with" },
    { name: "1Lab", href: "/solutions/1lab", line: "Samples tracked from collection to approved result", when: "Add when ready" },
    { name: "1Rad", href: "/solutions/1rad", line: "Cloud PACS with AI-drafted reports your radiologist signs", when: "Add when ready" },
    { name: "1Pharma", href: "/solutions/1pharma", line: "Prescriptions, stock and expiry at the pharmacy counter", when: "Add when ready" },
  ],
  proofTitle: "Running every day in hospitals in Kishanganj and Purnea",
  proof: ["sparsh", "glisan"],
  faq: [
    { q: "Can we start with just billing and registration?", a: "Yes. Many hospitals start with registration, OPD and billing, then add wards, EMR, lab, radiology and pharmacy as staff get comfortable." },
    { q: "Can you bring in data from our current software?", a: "In most cases, yes. We import patient lists, rates, stock and other records from your current system or spreadsheets, and check what's possible during the first visit." },
    { q: "How do you train our staff?", a: "On site, role by role, in English or Hindi. Reception, nurses, doctors, lab, pharmacy and accounts each learn only the screens they use." },
    { q: "What happens after go-live?", a: "Our team is with you on go-live day, and after that you have a named contact who knows your hospital, plus WhatsApp and phone support." },
    { q: "Where is our data stored?", a: "On servers in India, handled in line with the DPDP Act 2023, with role-based logins and a full audit trail." },
  ],
  schema: { name: "NexEagle for hospitals and nursing homes", description: DESCRIPTION, audience: "Hospitals and nursing homes" },
  analyticsTitle: "NexEagle for Hospitals",
};

export default function Page() {
  return <AudiencePage c={c} />;
}
