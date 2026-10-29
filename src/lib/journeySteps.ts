// Shared journey steps (plain data, usable from server and client components).

export type Col = { title: string; items: string[] };
export type Step = { agent: string; avatar: string; title: string; body: string; inn: Col; vita: Col; out: Col };

export const STEPS: Step[] = [
  {
    agent: "1HMS Vita",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "Checked in from the booking",
    body: "The patient booked with Vita, so their details are already there. Reception confirms in a click and hands over the token. No forms, no second queue.",
    inn: { title: "Comes in", items: ["Booking from Doctor Dekho", "Patient's phone number", "Doctor and time slot"] },
    vita: { title: "Vita does", items: ["Finds the patient record", "Fills in registration", "Places them in the queue"] },
    out: { title: "Your team gets", items: ["OPD token A-14", "Live queue on screen", "Doctor notified"] },
  },
  {
    agent: "1HMS Vita",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "The doctor talks, the notes write themselves",
    body: "The AI scribe listens to the consultation and drafts the notes and prescription. The doctor reviews, edits and signs, and the patient gets it on WhatsApp.",
    inn: { title: "Comes in", items: ["Doctor–patient conversation", "Vitals from the nurse", "Past visits"] },
    vita: { title: "Vita does", items: ["Transcribes the consultation", "Drafts notes and prescription", "Prepares lab and scan orders"] },
    out: { title: "Your team gets", items: ["Rx signed by the doctor", "Sent to patient on WhatsApp", "Orders in lab and radiology"] },
  },
  {
    agent: "1Rad Vita",
    avatar: "/assets/vita/avatar-think.webp",
    title: "1Rad Vita reads the scan first",
    body: "The study arrives from the scanner. Vita runs AI vision analysis, marks what needs a closer look and drafts the report. The radiologist reviews and signs, from anywhere.",
    inn: { title: "Comes in", items: ["X-ray from the scanner", "Doctor's clinical note", "Earlier studies"] },
    vita: { title: "Vita does", items: ["AI vision analysis", "Marks regions to review", "Drafts a structured report"] },
    out: { title: "Your team gets", items: ["Radiologist reviews and signs", "Report back to the doctor", "Images in cloud PACS"] },
  },
  {
    agent: "1HMS Vita + 1Lab",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "Samples tracked from collection to result",
    body: "Every sample is followed from the collection desk to the approved result. Abnormal values are flagged before the report reaches the doctor.",
    inn: { title: "Comes in", items: ["CBC and glucose ordered", "Sample LB-2291 collected", "Machine readings"] },
    vita: { title: "Vita does", items: ["Tracks each sample's status", "Flags abnormal values", "Notifies the doctor"] },
    out: { title: "Your team gets", items: ["Approved result", "Added to the patient record", "Report the patient can download"] },
  },
  {
    agent: "1HMS Vita + 1Pharma",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "Medicines and the bill are already waiting",
    body: "The pharmacy sees the prescription before the patient arrives, stock updates itself, and every service used along the way is already on one bill.",
    inn: { title: "Comes in", items: ["Signed prescription", "Services used today", "Stock levels"] },
    vita: { title: "Vita does", items: ["Reserves the medicines", "Adds everything to one bill", "Sets a follow-up reminder"] },
    out: { title: "Your team gets", items: ["Medicines ready at the counter", "One bill: ₹1,140", "Reminder in 7 days"] },
  },
];
