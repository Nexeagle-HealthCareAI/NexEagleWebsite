import type { Metadata } from "next";
import { BarChart3, BedDouble, CalendarClock, FileSignature, FlaskConical, Languages, Mic, Pill, Receipt, ShieldCheck, Stethoscope, BellRing } from "lucide-react";
import ProductPage, { type ProductConfig } from "@/components/site/ProductPage";
import { STEPS } from "@/lib/journeySteps";
import { ScribeDemo } from "@/components/site/ProductDemos";
import { HMS_APP_URL } from "@/lib/site";

const TITLE = "Hospital Management Software (HMS) & EMR for Indian Hospitals | 1HMS by NexEagle";
const DESCRIPTION =
  "1HMS is hospital management software and EMR for hospitals, nursing homes and clinics in India: OPD, IPD, e-prescriptions, AI voice scribe, lab and radiology orders, pharmacy and billing. English and Hindi, set up on site.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["hospital management software", "hospital management system India", "HMS for small hospitals", "HMIS", "EMR software India", "OPD management software", "IPD management", "hospital billing software", "AI voice scribe", "e-prescription software", "nursing home software", "hospital software Bihar"],
  alternates: { canonical: "/solutions/1hms" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/solutions/1hms", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const c: ProductConfig = {
  slug: "1hms",
  name: "1HMS",
  category: "Hospital management software & EMR",
  dot: "bg-[#1ea99b]",
  pose: { src: "/assets/vita/vita-coffee.webp", w: 538, h: 640, alt: "1HMS Vita with a cup of coffee" },
  h1: "Hospital management software that does the paperwork for you",
  sub: "OPD, IPD, prescriptions, lab and radiology orders, pharmacy and billing on one patient record. 1HMS Vita handles the typing, so your doctors and staff spend their time on patients.",
  points: ["Set up and taught on site", "English and Hindi", "Data hosted in India"],
  agentTitle: "1HMS Vita",
  app: { name: "1HMS Flow", url: HMS_APP_URL },
  demo: <ScribeDemo />,
  modulesTitle: "Everything a hospital day needs, in one place",
  modulesIntro: "Start with OPD and billing, and switch on IPD, lab, radiology and pharmacy when you are ready. Every module shares the same patient record.",
  modulesStartWith: "core",
  modules: [
    { Icon: CalendarClock, core: true, title: "OPD and appointments", body: "Online and walk-in bookings, OPD tokens and a live queue screen for your waiting area." },
    { Icon: Mic, title: "AI voice scribe", body: "1HMS Vita listens to the consultation and drafts notes and the prescription for the doctor to sign." },
    { Icon: FileSignature, title: "EMR and e-prescriptions", body: "Clear digital prescriptions the patient receives by SMS or WhatsApp, with every visit in one history." },
    { Icon: BedDouble, title: "IPD and wards", body: "Admissions, beds, ward care and discharge summaries, on the same record as the OPD visit." },
    { Icon: Receipt, core: true, title: "Billing and insurance", body: "One bill per patient that collects every service automatically, including insurance and TPA billing." },
    { Icon: FlaskConical, title: "Lab and radiology orders", body: "Orders go straight to 1Lab and 1Rad, and results come back into the patient record." },
    { Icon: Pill, title: "Pharmacy", body: "Prescriptions reach 1Pharma before the patient does, and sales land on the right bill." },
    { Icon: BellRing, title: "Follow-up reminders", body: "Automatic reminders for follow-ups, tests and reviews, so fewer patients miss their next visit." },
    { Icon: BarChart3, title: "Reports", body: "Daily OPD count, doctor-wise patients, collections and trends, without building spreadsheets." },
    { Icon: ShieldCheck, title: "A login for every role", body: "Reception, doctors, nurses, billing and admin each see only what they need, with a full audit trail." },
    { Icon: Languages, title: "English and Hindi", body: "Staff can work in the language they are comfortable with. Training is given in either." },
    { Icon: Stethoscope, title: "NABH documentation support", body: "Records, checklists and audit trails that help you prepare for NABH accreditation." },
  ],
  stepsTitle: "How a patient moves through 1HMS",
  stepsIntro: "At each counter, 1HMS Vita takes what comes in and hands your team something ready to use.",
  steps: [STEPS[0], STEPS[1], STEPS[4]],
  worksWith: [
    { name: "1Rad", href: "/solutions/1rad", line: "Cloud PACS with AI-drafted radiology reports" },
    { name: "1Lab", href: "/solutions/1lab", line: "Samples tracked from collection to approved result" },
    { name: "1Pharma", href: "/solutions/1pharma", line: "Prescriptions, stock and expiry in one counter" },
    { name: "Doctor Dekho", href: "https://doctordekho.nexeagle.com", line: "Patients find you, book and arrive with their details" },
  ],
  faq: [
    { q: "Is 1HMS suitable for small hospitals and nursing homes?", a: "Yes. 1HMS is built for small and mid-sized hospitals, nursing homes and clinics in India. You can start with OPD and billing and add IPD, lab, radiology and pharmacy as you grow." },
    { q: "Does the AI write prescriptions without the doctor?", a: "No. 1HMS Vita drafts notes and the prescription from the consultation, but the doctor always reviews, edits and signs before anything reaches the patient." },
    { q: "Can my staff use 1HMS in Hindi?", a: "Yes. 1HMS works in English and Hindi, and we train your staff in either language." },
    { q: "How do patients get their prescription?", a: "Once the doctor signs, the prescription can be printed, downloaded or sent to the patient by SMS or WhatsApp." },
    { q: "Do you help us set it up?", a: "Yes. Our team visits your hospital, configures doctors, services and rates, brings in your existing data, trains every role on site and supports you after go-live." },
    { q: "Does 1HMS help with NABH?", a: "1HMS keeps the records, checklists and audit trails that NABH assessors look for, which makes preparing for accreditation easier. Accreditation itself is granted to the hospital by NABH." },
    { q: "Where is our data stored?", a: "Clinical and billing data is hosted in India, handled in line with the DPDP Act 2023, and protected with role-based access, encryption and an audit trail." },
  ],
  schema: {
    name: "NexEagle 1HMS",
    category: "Hospital management system (HMS), EMR",
    description: DESCRIPTION,
  },
  analyticsTitle: "1HMS - Hospital Management System | NexEagle",
};

export default function Page() {
  return <ProductPage c={c} />;
}
