import type { LegalSection } from "./types";

export const TERMS_UPDATED = "April 19, 2026";

export const TERMS_INTRO = "These Terms of Service (\"Terms\") set out the rights, service levels and rules of conduct for the clinical portals and engineering products managed by NexEagle. By creating portal credentials or signing a Statement of Work with us, you agree to these Terms.";

export const TERMS: LegalSection[] = [
    {
      id: "acceptance-of-terms",
      title: "Acceptance of Terms",
      content: [
        {
          text: "By accessing or using NexEagle's software systems, including our clinical management products (1HMS, 1Rad PACS) and product engineering consultation services, you agree to be bound by these Terms of Service, all applicable laws, and local healthcare regulations. If you disagree with any portion of these provisions, you are prohibited from utilizing our software or consulting resources."
        },
        {
          text: "These terms form a legally binding agreement between you (or the healthcare institution you represent) and NexEagle. We reserve the right to amend these terms at any time, and your continued usage of our endpoints following changes constitutes binding acceptance of the updated agreement."
        }
      ]
    },
    {
      id: "services-description",
      title: "Services Description",
      content: [
        {
          subtitle: "Clinical SaaS platforms",
          text: "NexEagle develops cloud-native clinical software architectures. This includes our hospital management suite (1HMS) and medical imaging PACS networks (1Rad). These services are licensed on a recurring subscription basis as detailed in specific institutional contracts."
        },
        {
          subtitle: "Consulting & Product Engineering",
          text: "We offer professional engineering services, including software development, custom medical integrations, clinical workflow audits, and AI application designs. Scope, deliverables, and service levels are governed by separate Statements of Work (SOWs) and Service Level Agreements (SLAs)."
        },
        {
          subtitle: "System Availability & SLAs",
          text: "We target a 99.9% application uptime for our clinical platforms. Uptime measurements exclude pre-scheduled maintenance windows, emergency security patches, or outages stemming from upstream cloud server provider failures."
        }
      ]
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      content: [
        {
          subtitle: "Workspace Credentials",
          text: "You are responsible for securing all administrator and staff login credentials. Any activity occurring under your organization's sub-domains or API tokens is your legal responsibility. You must report any suspected token leaks or credential compromises immediately."
        },
        {
          subtitle: "Clinical Data Responsibility",
          text: "You are solely responsible for the precision, legitimacy, and clinical validity of the records entered into our systems. NexEagle provides database structures and voice-activated helper tools, but does not dictate, modify, or validate medical records, which are the absolute responsibility of licensed medical professionals."
        },
        {
          subtitle: "Compliance Protocols",
          text: "You must operate all clinical software in compliance with the DPDP Act 2023, applicable medical laws, and patient consent requirements. You must not enter clinical records or PHI into unauthorized sandboxes or testing environments."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content: [
        {
          subtitle: "NexEagle Ownership",
          text: "The clinical platforms, custom speech-to-text algorithms, vector embedding models, visual assets, layouts, source code, and configurations are the sole property of NexEagle. Access licenses do not grant any ownership rights, proprietary code transfers, or redistribution rights."
        },
        {
          subtitle: "Software License Grant",
          text: "Subject to complete compliance with subscription fees, we grant you a limited, non-exclusive, non-transferable, revocable license to access our platform dashboards solely for your internal clinic or hospital operations."
        },
        {
          subtitle: "Institutional Data Ownership",
          text: "You retain absolute ownership of all patient records, medical scans, files, and billing information compiled within your clinical workspace. NexEagle acts strictly as a data processor on your behalf under a data processing agreement."
        }
      ]
    },
    {
      id: "payment-terms",
      title: "Payment Terms",
      content: [
        {
          subtitle: "Subscription Fees",
          text: "Subscription and licensing fees are billed in advance based on the cycle defined in your contract. All pricing packages are exclusive of statutory taxes (such as GST or VAT), which will be added to invoices accordingly."
        },
        {
          subtitle: "Default & Suspension",
          text: "Invoices remaining unpaid for more than 15 days past their due date will result in a payment default. NexEagle reserves the right to suspend API access, voice engine support, and portal dashboards if defaults are not resolved."
        },
        {
          subtitle: "Refund Policy",
          text: "Subscription licenses are non-refundable. For custom development or engineering projects, refund limits are strictly governed by the specific terms laid out in the active Statement of Work."
        }
      ]
    },
    {
      id: "termination",
      title: "Termination",
      content: [
        {
          subtitle: "Contract Cancellation",
          text: "You may terminate subscription agreements in writing under the notice timeline defined in your contract. Account data remains extractable for 30 days following contract termination."
        },
        {
          subtitle: "Immediate Termination",
          text: "We reserve the right to suspend or terminate accounts immediately if terms are breached, if software is reverse-engineered, or if account activities present immediate security risks to patient data registries."
        },
        {
          subtitle: "Survival clauses",
          text: "All clauses relating to intellectual property ownership, liability caps, clinical disclaimers, and dispute resolution will survive contract termination."
        }
      ]
    }
];

TERMS.push(
  {
    id: "warranties-and-disclaimers",
    title: "Warranties and disclaimers",
    content: [
      { subtitle: "Service warranties", text: "", items: [
        "We warrant that clinical platforms will perform substantially in accordance with official user documentation.",
        "We implement industry-standard technical measures (AES-256, TLS 1.3) to protect workspace databases.",
        "We continuously validate voice engines against clinical vocabulary sets to ensure accuracy.",
        "We design our core products to support DPDP Act obligations and NABH documentation requirements.",
      ] },
      { subtitle: "Disclaimers of warranty", text: "", items: [
        "Software services are provided on an \"as is\" and \"as available\" basis without warranty of any kind.",
        "We do not warrant that clinical portals will be completely error-free or run without momentary latency.",
        "NexEagle is not a medical provider. We do not make clinical diagnoses or direct patient care pathways.",
        "Licensed clinicians must verify all medical notes, dosages, and reports before finalizing clinical records.",
      ] },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    description: "This section defines the limits of NexEagle's liability. These exclusions are a basis of our pricing and service delivery.",
    content: [
      { text: "To the maximum extent permitted by applicable laws, NexEagle shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of hospital revenues, data anomalies, or intangible losses resulting from:", items: [
        "Your access to or use of, or inability to access or use, our services.",
        "Any conduct or patient medical decisions made by clinical operators.",
        "Data corruption, system latency, or external connection outages.",
        "Unauthorized database access stemming from compromised workspace logins.",
      ] },
      { text: "Our cumulative aggregate liability for all claims arising from or relating to these terms or our services shall not exceed the total subscription fees paid by you in the 12 months preceding the initial claim." },
    ],
  },
  {
    id: "dispute-resolution",
    title: "Governing law and disputes",
    content: [
      { subtitle: "Governing law", text: "These terms shall be governed by and interpreted in accordance with the laws of India. The competent courts located at Kolkata, West Bengal, India shall have exclusive jurisdiction to try any disputes arising under this agreement." },
      { subtitle: "Arbitration", text: "If informal discussions fail to resolve a claim, the dispute shall be referred to and resolved by binding arbitration conducted under the provisions of the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Kolkata, India, and proceedings shall be conducted in English." },
    ],
  },
);
