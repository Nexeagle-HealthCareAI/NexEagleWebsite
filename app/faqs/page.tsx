import type { Metadata } from "next";
import FAQsClient from "./faqs-client";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) - Healthcare Software Suite",
  description: "Find answers to common questions about NexEagle's integrated clinical operating system, including 1HMS EMR, 1Rad PACS, LIS setup, and HIPAA compliance security.",
  keywords: [
    "healthcare IT FAQs",
    "hospital software support",
    "Cloud PACS questions",
    "LIS integration FAQs",
    "HIPAA security answers",
    "NexEagle help"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What modules are included in the 1HMS platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1HMS is a unified hospital management system that includes modules for OPD Consultations, IPD Ward Allocations, EMR record hubs, Auto-Billing, TPA Insurance pre-authorization workflows, and integrated Pharmacy/Laboratory networks. All modules operate under a single source of truth."
      }
    },
    {
      "@type": "Question",
      "name": "Can 1HMS work offline or during internet dropouts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. 1HMS features robust local offline caching. Clinicians can draft and save OPD consult sheets even during active internet outages. The software securely buffers data locally and synchronizes it automatically with the cloud database when connectivity is restored."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to deploy 1HMS in a hospital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our standard setup takes less than 48 hours. This includes deploying the secure cloud workspace, setting up doctor profiles, configuring clinic departments, and customizing basic prescription and billing templates."
      }
    },
    {
      "@type": "Question",
      "name": "What is Cloud PACS and how does it render DICOM files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1Rad's Cloud PACS is a cloud-native picture archiving and communication system. It allows radiologists, technicians, and clinicians to view and sweep heavy CT, MRI, and X-ray slices instantly in a web browser on any device, without installing desktop software."
      }
    },
    {
      "@type": "Question",
      "name": "Does 1Rad support speech-to-text voice dictation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. 1Rad integrates NexEagle AI's speech-to-text engine specifically trained on clinical radiology terminology. Radiologists can dictate complex reports directly into the system, auto-generating structured templates in real-time."
      }
    },
    {
      "@type": "Question",
      "name": "What specific workflows does NexEagle AI automate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NexEagle AI acts as a voice-activated clinical copilot. It listens to doctor consultations to draft structured e-prescriptions, auto-generates patient discharge summaries, suggests relevant diagnostic checklists, and fills out insurer pre-authorization forms."
      }
    },
    {
      "@type": "Question",
      "name": "Is NexEagle AI clinically safe and validated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. NexEagle AI's clinical models are curated and continuously validated by our clinical advisory board. Our algorithms are trained to prevent medical hallucinations, ensuring high clinical accuracy and alignment with NABH guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "Is our clinical data secure and HIPAA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NexEagle uses enterprise-grade secure hosting. We encrypt all data in transit using HTTPS/TLS 1.3 and at rest using AES-256. The system complies with HIPAA and NABH security standards, offering role-based access control and detailed activity audit logs."
      }
    },
    {
      "@type": "Question",
      "name": "Who owns the patient records entered into the platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do. Your clinic or hospital owns 100% of the patient clinical files and billing records. NexEagle acts strictly as a secure processor. You can export your data in standardized HL7/FHIR formats at any time."
      }
    }
  ]
};

export default function FAQsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle FAQs" />
      <FAQsClient />
    </main>
  );
}
