import type { LegalSection } from "./types";

export const CERTS = [
    {
      name: "DPDP Act 2023",
      description: "Personal and health data handled in line with India's Digital Personal Data Protection Act, 2023 — consent, purpose limitation and data-principal rights.",
      status: "Aligned"
    },
    {
      name: "ABDM Ready",
      description: "Built to interoperate with the Ayushman Bharat Digital Mission ecosystem (ABHA IDs, health-record linking).",
      status: "Roadmap"
    },
    {
      name: "NABH Documentation",
      description: "Workflows, audit trails and records that help hospitals meet NABH accreditation documentation requirements.",
      status: "Supported"
    },
    {
      name: "ISO 27001 Controls",
      description: "Our information-security practices are modelled on ISO 27001 controls. Formal certification is on our roadmap.",
      status: "Roadmap"
    }
  ];

export const SECURITY: LegalSection[] = [
    {
      id: "certifications",
      title: "Certifications & Compliance",
      description: "How our platform lines up with Indian healthcare data regulation and recognised security frameworks.",
      content: [
        {
          subtitle: "Enterprise Auditing Standards",
          text: "NexEagle is designed for Indian healthcare regulation first: the DPDP Act 2023, ABDM interoperability and NABH documentation needs. We sign data processing agreements with every hospital and clinic we serve, setting out exactly how patient data is handled, stored and returned. Detailed security documentation is available to customers on request."
        }
      ]
    },
    {
      id: "security-features",
      title: "Technical Security Features",
      description: "Multi-layered technical guardrails deployed across application logic and cloud networks.",
      content: [
        {
          subtitle: "Data Encryption & Transport",
          text: "We secure data using AES-256 encryption at rest and TLS 1.3 in transit. Backup sets are encrypted using unique keys managed by cloud Hardware Security Modules (HSMs)."
        },
        {
          subtitle: "Identity & Access Isolation",
          text: "Access to production clusters requires Multi-Factor Authentication (MFA). Systems enforce Role-Based Access Control (RBAC), Single Sign-On (SSO) links, and session lease management."
        },
        {
          subtitle: "Network & Infrastructure Shielding",
          text: "Our applications run on isolated Virtual Private Clouds (VPCs) hosted in Tier-III facilities. We route traffic through Web Application Firewalls (WAFs) and DDoS mitigation clusters."
        }
      ]
    },
    {
      id: "data-safeguards",
      title: "Patient Data Safeguards",
      description: "Comprehensive administrative, physical, and technical measures guarding patient data registries.",
      content: [
        {
          subtitle: "Administrative Protocol",
          text: "Includes staff security training, periodic risk assessments, a designated point of contact for data protection, and documented security incident handling procedures."
        },
        {
          subtitle: "Physical Shielding",
          text: "Covers hosting in professionally managed data centres with physical access controls, secure hardware disposal and facility access logging."
        },
        {
          subtitle: "Technical Controls",
          text: "Comprises detailed audit log archiving, system login verification, database integrity controls, and SSL/TLS transmission encryption pipelines."
        }
      ]
    },
    {
      id: "incident-response",
      title: "Incident Response Protocols",
      description: "Documented pathways to identify, isolate, resolve, and report security anomalies.",
      content: [
        {
          subtitle: "Phase 1: Detection & Triage",
          text: "Automated monitoring watches system logs and service health continuously. Anomalies raise alerts to our engineering team for immediate triage."
        },
        {
          subtitle: "Phase 2: Isolation & Containment",
          text: "Engineers apply containment parameters, isolating affected containers or disabling compromised API tokens, preserving data integrity and preventing threat propagation."
        },
        {
          subtitle: "Phase 3: Remediation & Recovery",
          text: "Vulnerable packages are updated and services restored. If a personal data breach is confirmed, we notify affected organisations promptly and support them in meeting their reporting duties under the DPDP Act."
        }
      ]
    },
    {
      id: "security-practices",
      title: "Ongoing Security Practices",
      description: "Proactive development cycles designed to keep applications resilient against emerging threats.",
      content: [
        {
          subtitle: "Penetration Testing & Security Audits",
          text: "We regularly test our applications and Cloud PACS APIs for vulnerabilities, and plan independent third-party penetration testing as we scale."
        },
        {
          subtitle: "OWASP Hardening & Vulnerability Management",
          text: "Our build pipelines run automated static code analysis (SAST) and software composition analysis (SCA) to flag vulnerable code dependencies before deployment."
        }
      ]
    },
    {
      id: "data-residency",
      title: "Data Residency & Retention",
      description: "Geographic database isolation and structured records maintenance compliance.",
      content: [
        {
          subtitle: "Local Data Sovereignty",
          text: "To support regulatory requirements, all clinical and billing data is hosted on local servers inside India. Redundant clusters are placed in isolated geographic zones for disaster recovery."
        },
        {
          subtitle: "Purging & Archival Policies",
          text: "Patient records are preserved in accordance with statutory medical records retention timelines. Once contract terms expire, clinical data is securely wiped using DoD-standard purging methods."
        }
      ]
    }
  ];
