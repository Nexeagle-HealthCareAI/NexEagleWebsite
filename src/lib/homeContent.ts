// Single source for homepage facts used in visible copy, FAQ, JSON-LD and llms.txt, so search
// engines and AI answer engines always read the same, consistent statements about NexEagle.

export const ENTITY_SUMMARY =
  "NexEagle is an Indian healthcare AI company. Its Vita AI agents help patients find the right doctor, book appointments and reach the clinic (on Doctor Dekho); automate the hospital workflow in 1HMS, its hospital management software and EMR; and in 1Rad, its cloud PACS, run AI vision analysis on scans and draft radiology reports for the radiologist to sign. 1Lab (LIS) and 1Pharma (pharmacy) share the same patient record.";

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is NexEagle?",
    a: "NexEagle builds AI software for hospitals, clinics and diagnostic centres in India. Its products are 1HMS (hospital management software and EMR), 1Rad (cloud PACS with AI radiology reporting), 1Lab (laboratory information system) and 1Pharma (pharmacy and inventory), all sharing one patient record and run by Vita AI agents.",
  },
  {
    q: "What are Vita AI agents?",
    a: "Vita is NexEagle's family of AI agents. Vita for patients matches symptoms to the right doctor, books the appointment and gives directions to the clinic. 1HMS Vita automates hospital work such as check-in, OPD queues, prescription drafting, orders and billing. 1Rad Vita runs AI vision analysis on scans and drafts radiology reports.",
  },
  {
    q: "Which is good hospital management software for small hospitals in India?",
    a: "Small and mid-sized hospitals in India need software that covers OPD, IPD, billing, pharmacy and lab in one place, works in English and Hindi, and is set up on site. NexEagle 1HMS is built for this: our team configures it, moves your data in and trains every role in your hospital before go-live.",
  },
  {
    q: "Does 1Rad AI replace the radiologist?",
    a: "No. 1Rad Vita analyses each study, marks regions that need a closer look and prepares a first-draft report. A qualified radiologist always reviews, edits and signs the report before it is released to the doctor or patient.",
  },
  {
    q: "Can radiologists report from home with 1Rad?",
    a: "Yes. 1Rad is a cloud PACS with a browser-based DICOM viewer, so radiologists can open studies and sign reports from the hospital, from home or from another city, which suits teleradiology.",
  },
  {
    q: "Is patient data stored in India?",
    a: "Yes. Clinical and billing data is hosted in India, handled in line with India's Digital Personal Data Protection Act, 2023, and protected with role-based access, encryption and a full audit trail.",
  },
  {
    q: "Does NexEagle work in Hindi?",
    a: "Yes. Staff can use 1HMS in English or Hindi, and training is given in either language.",
  },
  {
    q: "Where is NexEagle used today?",
    a: "NexEagle runs at Sparsh Hospital in Kishanganj and Glisan Super Speciality Hospital in Purnea (Bihar), and at AG Smart Scan Diagnostic Centre. It is available to hospitals and diagnostic centres across India.",
  },
  {
    q: "How do we get started?",
    a: "Book a demo. Our team visits your hospital, maps your current workflow, sets up the software with your doctors, services and rates, trains your staff on site and supports you after go-live.",
  },
];
