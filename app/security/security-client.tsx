"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Clock, Mail, Phone, MapPin, AlertTriangle, ShieldCheck, Server, Key, Database, Users } from "lucide-react";

interface SubSection {
  subtitle?: string;
  text: string;
  items?: string[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  content: SubSection[];
}

export default function SecurityClient() {
  const [activeSection, setActiveSection] = useState("certifications");

  const certifications = [
    {
      name: "HIPAA Compliant",
      description: "Adheres to the Health Insurance Portability and Accountability Act standards for safeguarding PHI.",
      status: "Compliant"
    },
    {
      name: "GDPR Compliant",
      description: "Meets the General Data Protection Regulation criteria for personal data security and privacy.",
      status: "Compliant"
    },
    {
      name: "ISO 27001 Certified",
      description: "International standard for information security management systems (ISMS) implementation.",
      status: "Certified"
    },
    {
      name: "SOC 2 Type II",
      description: "Audited for security, availability, and processing integrity of client data systems.",
      status: "Certified"
    }
  ];

  const sections: Section[] = useMemo(() => [
    {
      id: "certifications",
      title: "Certifications & Compliance",
      description: "We validate our application boundaries against international audits and clinical compliance mandates.",
      content: [
        {
          subtitle: "Enterprise Auditing Standards",
          text: "NexEagle underwent rigorous verification audits to validate data handling security across our core EHR and PACS products. We maintain standard business associate agreements (BAAs) with clinical organizations to guarantee technical safety under HIPAA guidelines."
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
      id: "hipaa-safeguards",
      title: "HIPAA Compliance Safeguards",
      description: "Comprehensive administrative, physical, and technical measures guarding patient data registries.",
      content: [
        {
          subtitle: "Administrative Protocol",
          text: "Includes mandatory staff security training, formal risk assessment cycles, designated data protection officers, and formal security incident handling procedures."
        },
        {
          subtitle: "Physical Shielding",
          text: "Covers hosting in ISO 27001 certified AWS/Azure facilities, hardware disposal pipelines, automated physical facility logging, and biometric access restrictions."
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
          text: "Our Security Operations Center (SOC) monitors system logs around the clock. Any anomaly triggers immediate alarms and spins up an incident response squad."
        },
        {
          subtitle: "Phase 2: Isolation & Containment",
          text: "Engineers apply containment parameters, isolating affected containers or disabling compromised API tokens, preserving data integrity and preventing threat propagation."
        },
        {
          subtitle: "Phase 3: Remediation & Recovery",
          text: "Vulnerable packages are updated and services restored. If a confirmed data breach of PHI occurs, we notify affected organizations within 72 hours."
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
          text: "We engage external CREST-certified auditors annually to conduct grey-box penetration tests across our applications and Cloud PACS APIs."
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
  ], []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      // Find section in view
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      // Check contact section separately
      const contactEl = document.getElementById("contact-us");
      if (contactEl && scrollPosition >= contactEl.offsetTop) {
        setActiveSection("contact-us");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Navbar gap
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="pt-32 pb-24">
      {/* Header Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-teal-50/20 via-white to-white select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 pointer-events-none rounded-full blur-[140px] z-0"></div>
        
        <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Security & Compliance.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            We deploy multi-layered cryptographic controls, system isolation parameters, and continuous audits to shield clinical data networks.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center pt-2">
            {certifications.map((cert, index) => (
              <div key={index} className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
                {cert.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Ribbon for Mobile/Tablets */}
      <div className="lg:hidden sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/60 py-3 select-none">
        <div className="container px-6 flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap w-full">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleLinkClick(sec.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeSection === sec.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {sec.title}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick("contact-us")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeSection === "contact-us"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Content Section with Sticky Sidebar Grid */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-5xl mx-auto mt-12 md:mt-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-16">
          
          {/* Sticky Sidebar for Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 space-y-2 select-none border-l-2 border-slate-100 pl-4 py-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleLinkClick(sec.id)}
                  className={`block w-full text-left py-2 text-sm font-medium transition-all duration-200 relative ${
                    activeSection === sec.id
                      ? "text-brand-teal font-semibold pl-1"
                      : "text-slate-500 hover:text-slate-950 pl-0"
                  }`}
                >
                  {activeSection === sec.id && (
                    <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
                  )}
                  {sec.title}
                </button>
              ))}
              <button
                onClick={() => handleLinkClick("contact-us")}
                className={`block w-full text-left py-2 text-sm font-medium transition-all duration-200 relative ${
                  activeSection === "contact-us"
                    ? "text-brand-teal font-semibold pl-1"
                    : "text-slate-500 hover:text-slate-950 pl-0"
                }`}
              >
                {activeSection === "contact-us" && (
                  <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
                )}
                Contact Us
              </button>
            </div>
          </aside>

          {/* Main Security Content */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Introduction Callout */}
            <div className="bg-slate-50 border-l-4 border-brand-teal p-6 md:p-8 rounded-r-2xl select-none">
              <p className="text-slate-700 leading-relaxed font-medium text-sm md:text-base">
                Security is not an afterthought at NexEagle—it is built directly into our baseline architectures. We realize the critical sensitivity of clinical records and PACS data registries, enforcing technical parameters that guarantee protection across data transitions, storage volumes, and user nodes.
              </p>
            </div>

            {/* Loop through Sections */}
            {sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="scroll-mt-24 space-y-6 border-b border-slate-100 pb-10 last:border-0 last:pb-0">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {sec.title}.
                  </h2>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {sec.content.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      {item.subtitle && (
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-slate-650 leading-relaxed text-sm md:text-base font-normal">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Certifications grid sub-display */}
                {sec.id === "certifications" && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 select-none">
                    {certifications.map((cert, cIdx) => (
                      <div key={cIdx} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-200/60 transition-all duration-300 hover:border-brand-teal/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900 text-sm md:text-base">
                            {cert.name}
                          </h4>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-teal-50 border border-brand-teal/20 text-brand-teal rounded-md">
                            {cert.status}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-slate-500 leading-normal">
                          {cert.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Special display for Technical features icon list */}
                {sec.id === "security-features" && (
                  <div className="grid sm:grid-cols-3 gap-4 pt-4 select-none">
                    <div className="p-5 bg-slate-50/40 rounded-2xl border border-slate-200/50">
                      <Server className="w-5 h-5 text-brand-teal mb-3" />
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm uppercase tracking-wider mb-2">Infrastructure</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Tier-III hosting, DDoS protection, Web Application Firewalls (WAF), and isolated VPC private subnets.</p>
                    </div>
                    <div className="p-5 bg-slate-50/40 rounded-2xl border border-slate-200/50">
                      <Key className="w-5 h-5 text-brand-teal mb-3" />
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm uppercase tracking-wider mb-2">Access Management</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">MFA controls, Role-Based Access Control (RBAC), SSO setups, and encrypted lease validations.</p>
                    </div>
                    <div className="p-5 bg-slate-50/40 rounded-2xl border border-slate-200/50">
                      <ShieldCheck className="w-5 h-5 text-brand-teal mb-3" />
                      <h4 className="font-bold text-slate-900 text-xs md:text-sm uppercase tracking-wider mb-2">Cryptography</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">AES-256 database backups, TLS 1.3 data streams, and hardware security modules (HSM).</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Dedicated Contact Us Section */}
            <div id="contact-us" className="scroll-mt-24 space-y-8 bg-slate-50 p-8 rounded-3xl border border-slate-200/60 select-none">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Contact Security.
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                  If you detect a vulnerability, suspect system latency concerns, or need assistance executing security documentation, contact our operations desk:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security Hotline</h4>
                    <a href="mailto:security@nexeagle.com" className="text-sm font-semibold text-slate-950 hover:text-brand-teal transition-colors block">
                      security@nexeagle.com
                    </a>
                    <a href="mailto:privacy@nexeagle.com" className="text-sm text-slate-500 hover:text-brand-teal transition-colors block">
                      privacy@nexeagle.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operational Desk</h4>
                    <a href="tel:+918074906808" className="text-sm font-semibold text-slate-950 hover:text-brand-teal transition-colors block">
                      +91 8074906808
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start sm:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Corporate Location</h4>
                    <p className="text-sm font-semibold text-slate-950">
                      NexEagle Corporate Office, Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Vulnerability Disclosure Guidelines:</strong> For system penetration disclosures or reporting application flaws under coordinated disclosure conditions, contact our operations desk at <a href="mailto:security@nexeagle.com" className="text-brand-teal hover:underline font-medium">security@nexeagle.com</a>. We validate and triage alerts within 24 hours.
                </p>
              </div>
            </div>

            {/* Related Policies Links */}
            <div className="pt-6 flex flex-wrap gap-4 justify-center text-sm font-semibold select-none border-t border-slate-100">
              <Link href="/privacy" className="text-slate-500 hover:text-brand-teal transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/terms" className="text-slate-500 hover:text-brand-teal transition-colors">
                Terms of Service
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/contact" className="text-slate-500 hover:text-brand-teal transition-colors">
                Schedule Demo
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
