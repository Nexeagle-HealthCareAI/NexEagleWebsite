// Plain-language guides for hospital owners. Every fact here comes from the linked source and is
// dated. Recheck `checked` and the sources before changing a figure: these schemes change often.

export type Guide = {
  slug: string;
  title: string;
  short: string;
  description: string;
  checked: string; // ISO date the facts were last checked
  answer: string; // the one-paragraph answer, shown first
  sections: { h: string; p?: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } }[];
  ask: string[]; // questions to ask a software vendor
  sources: { title: string; url: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "abdm-milestones",
    title: "ABDM milestones M1, M2 and M3: what they mean for your hospital",
    short: "ABDM milestones",
    description:
      "A plain-language guide to Ayushman Bharat Digital Mission (ABDM) integration milestones M1, M2 and M3 for hospital software in India, and what to ask your software vendor.",
    checked: "2026-10-29",
    answer:
      "ABDM milestones show how far your hospital software is connected to India's national digital health network. M1 lets you create and verify a patient's ABHA health ID. M2 lets you share your records with other providers when the patient consents. M3 lets you fetch a patient's records from other providers with their consent.",
    sections: [
      {
        h: "The three milestones",
        table: {
          head: ["Milestone", "What your hospital can do", "Where you see it"],
          rows: [
            ["M1: ABHA", "Create and verify a patient's ABHA health ID, and register patients by scanning their ABHA QR code (Scan and Share)", "Reception"],
            ["M2: Share records", "Link visits, reports and prescriptions to the patient's ABHA and share them, encrypted, when the patient consents", "Records leave your hospital with consent"],
            ["M3: Fetch records", "Request consent and pull the patient's records from other hospitals and labs into your system", "Doctors see outside history"],
          ],
        },
      },
      {
        h: "How software gets certified",
        p: [
          "A software company builds the integration in ABDM's sandbox, passes the National Health Authority's functional testing and a WASA security audit, and gives a demo. It then receives production credentials.",
          "According to NHA guidance reported by integrators, going live requires at least two milestones, so most hospital systems complete M1 and M2 first. Claims processing through the National Health Claims Exchange (NHCX) is a separate track.",
        ],
      },
      {
        h: "Why it matters to you",
        list: [
          "Patients who already have an ABHA number can register by scanning a QR code, which shortens reception queues.",
          "Government digital health incentives are paid for records linked to ABHA (see our DHIS guide).",
          "NABH certification of hospital software requires a valid ABDM M3 certificate (see our NABH guide).",
        ],
      },
    ],
    ask: [
      "Which milestones are live in production today, not just in the sandbox?",
      "Can I see Scan and Share working at a reception desk?",
      "Can you show me the certificate or the NHA approval?",
    ],
    sources: [
      { title: "ABDM integration milestones explained (Nirmitee)", url: "https://nirmitee.io/blog/abdm-integration-milestones-m1-m2-m3-m4-multi-software-guide" },
      { title: "ABDM milestone-certified hospital software (MocDoc)", url: "https://mocdoc.com/blog/abdm-milestone-certified-hospital-software" },
    ],
  },
  {
    slug: "nabh-digital-health",
    title: "NABH Digital Health Standards: certification for hospital software and hospitals",
    short: "NABH Digital Health",
    description:
      "What NABH's Digital Health Standards mean for hospitals in India: certification of HIS and EMR software (Basic and Advanced), digital health accreditation for hospitals, eligibility, validity and fees.",
    checked: "2026-10-29",
    answer:
      "NABH now assesses digital health in two ways. It certifies hospital software (HIS and EMR systems) at Basic or Advanced level, and it separately accredits or certifies hospitals on their digital maturity. Both are valid for two years.",
    sections: [
      {
        h: "Certification of hospital software",
        p: [
          "NABH's Digital Health Standards for HIS/EMR Systems (1st edition, September 2024) assess whether software supports safe, secure and interoperable care, in line with ABDM and the DPDP Act.",
        ],
        table: {
          head: ["Point", "What NABH states"],
          rows: [
            ["Levels", "Basic and Advanced"],
            ["Eligibility", "At least three deployments in operational hospitals in India, and a valid ABDM M3 compliance certificate"],
            ["Process", "Application, technical evaluation, demonstration and testing (including by NABH-approved testing agencies), closing any gaps, committee review"],
            ["Validity", "Two years"],
            ["Fees (two years, plus 18% GST)", "Basic: ₹50,000 for HIS or EMR, ₹75,000 for both. Advanced: ₹1,00,000 for HIS or EMR, ₹1,50,000 for both"],
          ],
        },
      },
      {
        h: "What is assessed",
        p: [
          "Certified products are reported against areas including access and continuity of care, care of patients, management of medication, digital application controls, digital operations, human resources, finance and procurement, and information management.",
        ],
      },
      {
        h: "Digital health accreditation for hospitals",
        p: [
          "For hospitals, NABH describes maturity levels (Core, Commitment, Achievement and Excellence) leading to Silver, Gold or Platinum accreditation. Certification covers Core and Commitment, leading to Silver. Both are valid for two years.",
          "NABH's FAQ does not say hospitals must use NABH-certified software, but certified software makes the hospital's own assessment easier to prepare for.",
        ],
      },
    ],
    ask: [
      "Is your software NABH certified, at which level, and until when?",
      "If not yet, do you hold ABDM M3, which NABH requires first?",
      "Which NABH records and audit trails does the software keep for us?",
    ],
    sources: [
      { title: "NABH Digital Health Standards, HIS/EMR Systems", url: "https://nabh.co/programmes/digital-health-standards-his-emr-systems/" },
      { title: "NABH FAQs on Digital Health Standards", url: "https://nabh.co/faqs-digital-health-standards/" },
      { title: "Example NABH software certificate listing", url: "https://nabh.co/software/karexpert-technologies/" },
    ],
  },
  {
    slug: "dhis-incentive",
    title: "Digital Health Incentive Scheme (DHIS): who qualifies and how it works",
    short: "DHIS incentives",
    description:
      "A plain-language guide to the National Health Authority's Digital Health Incentive Scheme (DHIS) for hospitals, diagnostic centres and software companies in India, and why to check current rates before planning on it.",
    checked: "2026-10-29",
    answer:
      "The Digital Health Incentive Scheme pays hospitals, diagnostic centres and their software companies for digital health records they create and link to patients' ABHA health IDs. Facilities need 10 or more beds and registration in ABDM's Health Facility Registry. Rates and terms have been revised and extended several times, so check the current terms before counting on it.",
    sections: [
      {
        h: "Who can earn",
        list: [
          "Hospitals, nursing homes and clinics with 10 or more beds registered in ABDM's Health Facility Registry",
          "Laboratories and radiology diagnostic centres",
          "Digital solution companies whose ABDM-enabled software those facilities use",
        ],
      },
      {
        h: "How it works",
        p: [
          "The National Health Authority announced the scheme in December 2022. Incentives are based on the number of digital health transactions (records created and linked to ABHA) above a base level. When announced, a facility or software company could earn up to ₹4 crore.",
          "The NHA has since revised rates and extended the scheme more than once. Treat any figure you see, including in old articles, as out of date until you have checked the current terms on the ABDM website.",
        ],
      },
      {
        h: "What you need in place",
        list: [
          "Registration in the Health Facility Registry",
          "Software that is live with ABDM milestones, so records link to ABHA (see our ABDM guide)",
          "Staff creating or verifying ABHA at registration as part of the routine",
        ],
      },
    ],
    ask: [
      "Is your software live with ABDM, so our records count towards DHIS?",
      "Can the software show us how many ABHA-linked records we create each month?",
      "Who claims the incentive, and how is it shared?",
    ],
    sources: [
      { title: "Incentive scheme announced (ThePrint, Dec 2022)", url: "https://theprint.in/india/incentive-scheme-announced-to-boost-digital-health-transactions-under-ayushman-bharat/1277541/" },
      { title: "NHA extends the scheme (Lokmat Times)", url: "https://www.lokmattimes.com/politics/national-health-authority-extends-incentive-scheme-under-ayushman-bharat-digital-mission" },
      { title: "DHIS financial incentive policy (NHA)", url: "https://abdm.gov.in:8081/uploads/Financial_Incentive_Policy_DHIS_e96a62fd28.pdf" },
    ],
  },
];
