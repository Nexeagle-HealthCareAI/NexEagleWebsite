// What Vita (the support assistant) can answer instantly. Written answers only, so every reply is
// accurate and approved; anything Vita can't match is handed to the NexEagle team.

export type Topic = {
  id: string;
  label: string; // chip text
  keywords: string[];
  answer: string;
  link?: { text: string; href: string };
  next?: string[]; // follow-up topic ids
};

export const TOPICS: Topic[] = [
  {
    id: "demo",
    label: "Book a demo",
    keywords: ["demo", "trial", "see it", "meeting", "call me", "callback", "book"],
    answer: "Happy to set that up. A demo is a 30-minute call built around your own hospital's workflow. Leave your details on the demo page and the team calls you within one working day, or message us on WhatsApp right now.",
    link: { text: "Book a demo", href: "/contact" },
    next: ["pricing", "golive", "team"],
  },
  {
    id: "pricing",
    label: "Pricing",
    keywords: ["price", "pricing", "cost", "charges", "fees", "plan", "subscription", "kitna", "rate", "budget", "afford"],
    answer: "Pricing depends on what you switch on (1HMS, 1Rad, 1Lab, 1Pharma), the size of your hospital or centre, and the number of users. The team shares a clear quote after a short call, with no surprise charges for setup or training.",
    link: { text: "Ask for a quote", href: "/contact" },
    next: ["demo", "golive"],
  },
  {
    id: "hms",
    label: "What is 1HMS?",
    keywords: ["1hms", "hms", "hospital management", "hmis", "emr", "opd", "ipd", "billing", "prescription", "his", "nursing home", "clinic software"],
    answer: "1HMS is our hospital management software and EMR: OPD tokens and appointments, IPD and wards, e-prescriptions, lab and radiology orders, pharmacy and billing on one patient record. 1HMS Vita drafts notes and prescriptions from the consultation for the doctor to sign.",
    link: { text: "See 1HMS", href: "/solutions/1hms" },
    next: ["scribe", "hindi", "golive"],
  },
  {
    id: "rad",
    label: "1Rad & AI reports",
    keywords: ["1rad", "rad", "radiology", "pacs", "dicom", "xray", "x-ray", "ct", "mri", "scan", "report", "teleradiology", "diagnostic centre", "imaging"],
    answer: "1Rad is a cloud PACS with a browser DICOM viewer. 1Rad Vita runs AI vision analysis on each study, marks regions that need a closer look and drafts a structured report. Your radiologist reviews, edits and signs it, from the centre or from home.",
    link: { text: "See 1Rad", href: "/solutions/1rad" },
    next: ["safety", "machines", "demo"],
  },
  {
    id: "lab",
    label: "1Lab (LIS)",
    keywords: ["1lab", "lab", "pathology", "lis", "sample", "blood test", "analyser", "analyzer"],
    answer: "1Lab tracks every sample by barcode from collection to approved result, flags abnormal values before the pathologist signs, and gives patients a downloadable report. It works for standalone labs and hospital labs.",
    link: { text: "See 1Lab", href: "/solutions/1lab" },
    next: ["demo", "pharma"],
  },
  {
    id: "pharma",
    label: "1Pharma",
    keywords: ["1pharma", "pharmacy", "medicine", "medical store", "stock", "inventory", "expiry", "chemist"],
    answer: "1Pharma receives prescriptions from the doctor's desk, dispenses by barcode, warns you about batches nearing expiry and adds every sale to the right bill. It works for hospital pharmacies and medical stores.",
    link: { text: "See 1Pharma", href: "/solutions/1pharma" },
    next: ["demo", "hms"],
  },
  {
    id: "patients",
    label: "Find a doctor",
    keywords: ["doctor", "appointment", "patient", "doctor dekho", "find a doctor", "symptom", "near me", "booking for me", "consult", "sick", "fever"],
    answer: "If you're a patient looking for a doctor, Vita can help on Doctor Dekho: describe how you feel, see nearby doctors with fees and open slots, and book. For an emergency, please call 112 or go to the nearest hospital.",
    link: { text: "Open Doctor Dekho", href: "https://doctordekho.nexeagle.com" },
  },
  {
    id: "scribe",
    label: "AI scribe",
    keywords: ["scribe", "voice", "dictation", "speech", "notes", "transcribe", "listen"],
    answer: "1HMS Vita listens to the consultation and drafts the case notes and prescription. The doctor reviews, edits and signs before anything is sent to the patient.",
    next: ["safety", "hindi"],
  },
  {
    id: "safety",
    label: "Is the AI safe?",
    keywords: ["safe", "safety", "accurate", "accuracy", "trust", "mistake", "error", "replace", "validated", "hallucinat"],
    answer: "Vita prepares drafts and does routine work; it never signs or releases anything. A qualified doctor or radiologist reviews and approves every note, prescription and report, and every action is logged.",
    link: { text: "How Vita works", href: "/ai" },
    next: ["data", "demo"],
  },
  {
    id: "data",
    label: "Data & security",
    keywords: ["data safe", "patient data", "data", "security", "secure", "privacy", "dpdp", "hipaa", "server", "cloud", "hosted", "backup", "encrypt", "own my data", "export"],
    answer: "Clinical and billing data is hosted in India and handled in line with the DPDP Act 2023. Every role has its own login, data is encrypted, every change is in the audit trail, and your data stays yours to export.",
    link: { text: "How we protect data", href: "/security" },
    next: ["demo"],
  },
  {
    id: "hindi",
    label: "Hindi support",
    keywords: ["hindi", "language", "bangla", "local language", "english"],
    answer: "Yes. Staff can use 1HMS in English or Hindi, and our team trains your staff in either language.",
    next: ["golive", "demo"],
  },
  {
    id: "golive",
    label: "Setup & training",
    keywords: ["setup", "set up", "install", "onboard", "training", "train", "go live", "go-live", "how long", "migrate", "migration", "existing software", "data import"],
    answer: "Our team visits your hospital, maps your current workflow, configures doctors, services and rates, brings in your existing data and trains every role on site. After go-live you have a named contact for support.",
    link: { text: "How going live works", href: "/how-it-works" },
    next: ["pricing", "demo"],
  },
  {
    id: "machines",
    label: "Our CT / X-ray machines",
    keywords: ["machine", "modality", "modalities", "equipment", "dicom bridge", "ct machine", "mri machine", "x-ray machine", "connect our scanner", "connect scanner"],
    answer: "1Rad's DICOM bridge connects DICOM-capable CT, MRI, X-ray and ultrasound machines so studies arrive automatically. Share your machine models during the demo and the team will confirm the setup.",
    next: ["demo"],
  },
  {
    id: "where",
    label: "Who uses NexEagle?",
    keywords: ["who uses", "customers", "clients", "reference", "where", "bihar", "kishanganj", "purnea", "available in", "my city"],
    answer: "NexEagle runs today at Sparsh Hospital in Kishanganj and Glisan Super Speciality Hospital in Purnea (Bihar), and at AG Smart Scan Diagnostic Centre. Our office is in Kolkata, and we work on site with hospitals across India.",
    next: ["demo", "team"],
  },
  {
    id: "team",
    label: "Who's behind NexEagle?",
    keywords: ["your team", "founder", "who founded", "company behind", "who are you", "who built", "doctors behind", "about nexeagle"],
    answer: "NexEagle was founded by doctors and engineers, including a urologist (MCh, SSKM) who checks every clinical workflow, with engineers from NIT Warangal and IIT Bombay.",
    link: { text: "Meet the team", href: "/team" },
    next: ["demo"],
  },
  {
    id: "support",
    label: "I need technical help",
    keywords: ["issue", "problem", "not working", "bug", "error", "technical help", "support team", "login", "password", "slow", "is down", "technical"],
    answer: "Sorry about that. Live hospitals have a named support contact; you can also reach the team here. Tell them your hospital name and what you see on screen.",
    next: [],
  },
  {
    id: "careers",
    label: "Jobs at NexEagle",
    keywords: ["job", "career", "hiring", "work with you", "internship", "vacancy", "apply"],
    answer: "We're hiring. Open roles and how to apply are on our careers page.",
    link: { text: "See open roles", href: "/careers" },
  },
];

TOPICS.push(
  {
    id: "contact",
    label: "Contact details",
    keywords: ["contact", "phone number", "phone", "email", "address", "office", "call you", "reach you", "whatsapp number", "number"],
    answer: "You can call or WhatsApp us on +91 80749 06808, or email info@nexeagle.com. Our office is in Kolkata (visits by appointment), open Monday to Friday 9 to 6 and Saturday 10 to 4.",
    link: { text: "Contact page", href: "/contact" },
    next: ["demo"],
  },
  {
    id: "hello",
    label: "Hello",
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening"],
    answer: "Hello! I can tell you about 1HMS, 1Rad, 1Lab and 1Pharma, pricing, setup, or how we protect patient data. What would you like to know?",
    next: ["hms", "rad", "pricing", "demo"],
  },
);

export const STARTERS = ["demo", "pricing", "hms", "rad", "data", "support"];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whole-word matching: short keywords (≤3 letters, like "ct" or "lab") must match a whole word;
// longer ones may be followed by an ending ("price" matches "prices"). Ties and no-match go to the team.
export function matchTopic(text: string): Topic | null {
  const t = text.toLowerCase();
  let best: { topic: Topic; score: number } | null = null;
  for (const topic of TOPICS) {
    let score = 0;
    for (const k of topic.keywords) {
      const re = new RegExp(k.length <= 3 ? `\\b${esc(k)}\\b` : `\\b${esc(k)}`, "i");
      if (re.test(t)) score += k.includes(" ") || k.length > 4 ? 2 : 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { topic, score };
  }
  return best?.topic ?? null;
}
