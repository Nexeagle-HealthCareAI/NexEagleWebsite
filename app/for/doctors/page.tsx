import type { Metadata } from "next";
import AudiencePage, { type AudienceConfig } from "@/components/site/AudiencePage";
import { ScribeDemo } from "@/components/site/ProductDemos";
import { DOCTORDEKHO_URL } from "@/lib/site";

const TITLE = "Clinic Software for Doctors in India: AI Prescriptions, OPD & Online Booking | NexEagle";
const DESCRIPTION =
  "For doctors in private practice and small clinics in India: Vita drafts notes and e-prescriptions for you to check and sign, patients book you on Doctor Dekho, and follow-up reminders go out automatically. English and Hindi.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["clinic management software India", "software for doctors", "e-prescription software", "AI prescription writing", "OPD software for clinics", "doctor appointment booking software", "clinic software Hindi"],
  alternates: { canonical: "/for/doctors" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/for/doctors", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const c: AudienceConfig = {
  slug: "doctors",
  crumb: "For doctors and clinics",
  eyebrow: "For doctors and clinics",
  h1: "Spend the consultation with your patient, not the keyboard",
  sub: "Vita drafts your notes and prescriptions for you to check and sign. Patients find and book you on Doctor Dekho, and follow-ups are remembered for you.",
  points: ["You sign every prescription", "Works for a single clinic", "English and Hindi"],
  agentTitle: "1HMS Vita",
  demo: <ScribeDemo />,
  pose: { src: "/assets/vita/vita-coffee.webp", w: 538, h: 640, alt: "Vita with a cup of coffee" },
  changesTitle: "What changes in your OPD",
  changes: [
    { before: "You write or type every prescription between patients.", after: "Vita drafts the note and prescription from the consultation. You check, edit and sign." },
    { before: "Patients lose paper prescriptions and old reports.", after: "Every visit sits in one history, and the patient gets the prescription on WhatsApp or SMS." },
    { before: "Patients forget to come back for review.", after: "Follow-up and test reminders go out automatically." },
    { before: "Bookings come by phone and the waiting room is guesswork.", after: "Patients book online or walk in, get a token and see a live queue." },
  ],
  products: [
    { name: "1HMS", href: "/solutions/1hms", line: "OPD, appointments, e-prescriptions, AI scribe and billing", when: "Start with" },
    { name: "Doctor Dekho", href: DOCTORDEKHO_URL, line: "Patients find you by symptom, book and get directions to your clinic", when: "Start with" },
    { name: "1Lab", href: "/solutions/1lab", line: "If you run a collection centre or in-house lab", when: "Add when ready" },
    { name: "1Pharma", href: "/solutions/1pharma", line: "If you run a pharmacy counter at the clinic", when: "Add when ready" },
  ],
  proofTitle: "Doctors use it every day in Bihar",
  proof: ["sparsh", "glisan"],
  faq: [
    { q: "Can I use NexEagle in a single-doctor clinic?", a: "Yes. Start with OPD, prescriptions and billing in 1HMS. You can add a lab or pharmacy counter later." },
    { q: "Does the AI decide the treatment?", a: "No. Vita drafts the note and prescription from what you say. You review, edit and sign before anything reaches the patient." },
    { q: "Can I work in Hindi?", a: "Yes. 1HMS works in English and Hindi, and we train your staff in either." },
    { q: "How do patients find me on Doctor Dekho?", a: "Patients describe their symptoms and Doctor Dekho suggests the right specialty and nearby doctors with timings and fees. Contact us to set up your clinic's profile." },
    { q: "Do I need to buy new computers?", a: "No. NexEagle runs in a web browser on the computer or tablet you already have." },
  ],
  schema: { name: "NexEagle for doctors and clinics", description: DESCRIPTION, audience: "Doctors and clinics" },
  analyticsTitle: "NexEagle for Doctors and Clinics",
};

export default function Page() {
  return <AudiencePage c={c} />;
}
