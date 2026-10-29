import type { LegalSection } from "./types";

export const PRIVACY_UPDATED = "April 19, 2026";

export const PRIVACY: LegalSection[] = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      content: [
        {
          subtitle: "Information You Provide",
          text: "When you use our services, contact us, or create an account, we collect personal information such as your name, email address, phone number, company name, professional credentials, and any other details you choose to provide."
        },
        {
          subtitle: "Automatically Collected Information",
          text: "We automatically collect certain information about your device and browser, including IP addresses, operating system types, browser configurations, referring URLs, and telemetry regarding your interaction with our services via cookies and web beacons."
        },
        {
          subtitle: "Healthcare Data & PHI",
          text: "For our core clinical products (such as 1HMS and 1Rad PACS), we process protected health information (PHI) strictly as a data processor on behalf of the hospital or clinic, in line with the Digital Personal Data Protection Act, 2023 and applicable Indian healthcare record-keeping rules. This data is segregated and shielded with enterprise-grade encryption."
        }
      ]
    },
    {
      id: "how-we-use-information",
      title: "How We Use Information",
      content: [
        {
          subtitle: "Service Provision",
          text: "We process your information to deliver, support, and optimize our medical management systems, process transactions, and handle customer service tickets."
        },
        {
          subtitle: "Administrative Communication",
          text: "We use your contact coordinates to transmit technical alerts, security warnings, deployment schedules, and administrative notifications related to your active workspaces."
        },
        {
          subtitle: "Aggregated Analytics",
          text: "We analyze system metrics to diagnose bottlenecks, design updates, and measure overall usability. All performance analytics are processed using strictly anonymized and aggregated datasets."
        },
        {
          subtitle: "Regulatory Compliance",
          text: "We process personal data where required to satisfy tax laws, cooperate with statutory authorities, enforce agreements, or protect the safety and security of patients and clinicians."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption & Hardening",
          text: "We enforce end-to-end data encryption using TLS 1.3 for data in transit and AES-256 for data at rest. Access to production environments is limited via role-based access control (RBAC), multi-factor authentication, and strict virtual private cloud (VPC) segregation."
        },
        {
          subtitle: "Industry Standards",
          text: "Our infrastructure is designed around the DPDP Act 2023, with security practices modelled on recognised frameworks such as ISO 27001. We regularly review our code and systems for vulnerabilities."
        },
        {
          subtitle: "Incident Management",
          text: "In the event of a verified security incident or potential breach of data integrity, we will notify affected administrators and regulatory bodies within 72 hours, taking immediate remediation steps to isolate the vector."
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Data Sharing & Disclosure",
      content: [
        {
          subtitle: "Sub-processors & Vendors",
          text: "We share necessary information only with vetted third-party vendors (such as AWS cloud hosting services). All vendors are bound by data processing and confidentiality agreements."
        },
        {
          subtitle: "Corporate Transactions",
          text: "If NexEagle is involved in a corporate restructuring, merger, or asset sale, clinical and user information may be transferred. We will provide prominent notice on this page before data transfers occur."
        },
        {
          subtitle: "No Commercial Selling",
          text: "We do not sell, lease, rent, or trade your personal information or patient databases to third parties for marketing or profiling purposes."
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You hold the right to request a structured export of the personal information we process. Healthcare data can be extracted in standard HL7 and FHIR structures to prevent vendor lock-in."
        },
        {
          subtitle: "Correction & Deletion",
          text: "You can request corrections to inaccurate personal records or request deletion of data files, subject to statutory records-retention requirements imposed by medical councils or tax authorities."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      content: [
        {
          subtitle: "Cookie Preferences",
          text: "We use essential cookies to maintain user sessions and security context. You can configure your browser to block cookies; however, disabling them may impair the usability of certain portal dashboards."
        }
      ]
    },
    {
      id: "website-analytics",
      title: "Website Analytics (nexeagle.com and Doctor Dekho)",
      content: [
        {
          subtitle: "What We Record",
          text: "When you browse nexeagle.com or Doctor Dekho we record the pages you open, the page that referred you and any campaign tags, your browser's user agent, and an approximate location (country, region, city) worked out from your IP address. On Doctor Dekho we also record the searches you run, the doctor profiles you open, the booking steps you reach and the steps of signing in. Your IP address is shortened before it is stored (the last part is removed)."
        },
        {
          subtitle: "Mobile Numbers",
          text: "When you sign in on Doctor Dekho, the sign-in steps are recorded with a masked copy of your mobile number (for example 98XXXXXX10) and a one-way keyed code that lets us count repeat sign-ins without storing the number itself."
        },
        {
          subtitle: "What Hospitals See",
          text: "When you search for, or open the page of, a doctor or hospital on Doctor Dekho, that hospital can see that its page was searched for or viewed, together with the search text. No name or phone number is attached to these records."
        },
        {
          subtitle: "Visit Grouping",
          text: "Activity is grouped by a random visit identifier kept in your browser. It expires after 30 minutes without activity, so separate visits are not linked to each other."
        },
        {
          subtitle: "Location Lookup",
          text: "Approximate location is looked up on our own servers using MaxMind GeoLite2 data. Until that is in place, the IP address is sent to the ip-api.com service for the lookup."
        },
        {
          subtitle: "How Long We Keep It",
          text: "Page-view and activity records are deleted 12 months after they are made. Records of interest in a hospital or doctor are deleted after 24 months."
        },
        {
          subtitle: "Your Choice",
          text: "Website analytics is on by default. Choose \"Decline\" in the notice, or \"Tracking choices\" in the site footer, to switch it off for that website in that browser; this also deletes the visit identifier. nexeagle.com and Doctor Dekho each keep their own choice."
        }
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: [
        {
          subtitle: "Retention Timeline",
          text: "We retain account profile details for as long as your organization maintains an active contract. Patient clinical histories are preserved in accordance with institutional guidelines and statutory medical storage laws."
        }
      ]
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      content: [
        {
          subtitle: "Cross-Border Protocols",
          text: "Your information is primarily stored on secured servers located within India. In cases where cross-border transfers are necessary, we implement standard contractual clauses to guarantee equal protection."
        }
      ]
    },
    {
      id: "childrens-privacy",
      title: "Children's Privacy",
      content: [
        {
          subtitle: "Age Thresholds",
          text: "Our enterprise services are not intended for individuals under 18. If a parent or guardian discovers that a minor has submitted personal profile details, contact us and we will delete the data immediately."
        }
      ]
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      content: [
        {
          subtitle: "Amendments",
          text: "We may revise this policy to reflect regulatory changes. We will notify you of modifications by publishing the new terms on this page and updating the modification date above."
        }
      ]
    }
];

export const RIGHTS = [
  { title: "Access", description: "Request a copy of the personal information we store." },
  { title: "Correction", description: "Request changes to outdated or inaccurate information." },
  { title: "Deletion", description: "Request erasure, subject to medical records retention laws." },
  { title: "Export", description: "Get a copy of your clinical data in a standard format." },
];
