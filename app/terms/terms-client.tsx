"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Mail, Phone, MapPin, Scale, ShieldAlert, CheckCircle, AlertTriangle } from "lucide-react";

interface SubSection {
  subtitle?: string;
  text: string;
}

interface Section {
  id: string;
  title: string;
  content: SubSection[];
}

export default function TermsClient() {
  const lastUpdated = "April 19, 2026";
  const [activeSection, setActiveSection] = useState("acceptance-of-terms");

  const sections: Section[] = [
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
          text: "You must operate all clinical software in compliance with HIPAA, local medical laws, and patient consent directives. You must not enter clinical records or PHI into unauthorized sandboxes or testing environments."
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
          text: "You retain absolute ownership of all patient records, medical scans, files, and billing information compiled within your clinical workspace. NexEagle acts strictly as a secure data processor under standard Business Associate conditions."
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

  const warranties = [
    {
      title: "Service Warranties",
      items: [
        "We warrant that clinical platforms will perform substantially in accordance with official user documentation.",
        "We implement industry-standard technical measures (AES-256, TLS 1.3) to protect workspace databases.",
        "We continuously validate voice engines against clinical vocabulary sets to ensure accuracy.",
        "We maintain regulatory compliance guidelines (HIPAA & NABH) across core product codebases."
      ]
    },
    {
      title: "Disclaimers of Warranty",
      items: [
        "Software services are provided on an \"as is\" and \"as available\" basis without warranty of any kind.",
        "We do not warrant that clinical portals will be completely error-free or run without momentary latency.",
        "NexEagle is not a medical provider. We do not make clinical diagnoses or direct patient care pathways.",
        "Licensed clinicians must verify all medical notes, dosages, and reports before finalizing clinical records."
      ]
    }
  ];

  const liabilityItems = [
    "Your access to or use of, or inability to access or use, our services.",
    "Any conduct or patient medical decisions made by clinical operators.",
    "Data corruption, system latency, or external connection outages.",
    "Unauthorized database access stemming from compromised workspace logins."
  ];

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

      // Check warranties section
      const warrantiesEl = document.getElementById("warranties-and-disclaimers");
      if (warrantiesEl && scrollPosition >= warrantiesEl.offsetTop && scrollPosition < warrantiesEl.offsetTop + warrantiesEl.offsetHeight) {
        setActiveSection("warranties-and-disclaimers");
      }

      // Check liability section
      const liabilityEl = document.getElementById("limitation-of-liability");
      if (liabilityEl && scrollPosition >= liabilityEl.offsetTop && scrollPosition < liabilityEl.offsetTop + liabilityEl.offsetHeight) {
        setActiveSection("limitation-of-liability");
      }

      // Check dispute section
      const disputesEl = document.getElementById("dispute-resolution");
      if (disputesEl && scrollPosition >= disputesEl.offsetTop && scrollPosition < disputesEl.offsetTop + disputesEl.offsetHeight) {
        setActiveSection("dispute-resolution");
      }

      // Check contact section
      const contactEl = document.getElementById("contact-us");
      if (contactEl && scrollPosition >= contactEl.offsetTop) {
        setActiveSection("contact-us");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            Terms of Service.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            These terms outline the rules, obligations, and system disclaimers governing the use of NexEagle's systems.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Last updated: {lastUpdated}</span>
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
            onClick={() => handleLinkClick("warranties-and-disclaimers")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeSection === "warranties-and-disclaimers"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Warranties
          </button>
          <button
            onClick={() => handleLinkClick("limitation-of-liability")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeSection === "limitation-of-liability"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Liability
          </button>
          <button
            onClick={() => handleLinkClick("dispute-resolution")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              activeSection === "dispute-resolution"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Disputes
          </button>
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
                onClick={() => handleLinkClick("warranties-and-disclaimers")}
                className={`block w-full text-left py-2 text-sm font-medium transition-all duration-200 relative ${
                  activeSection === "warranties-and-disclaimers"
                    ? "text-brand-teal font-semibold pl-1"
                    : "text-slate-500 hover:text-slate-955 pl-0"
                }`}
              >
                {activeSection === "warranties-and-disclaimers" && (
                  <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
                )}
                Warranties
              </button>
              <button
                onClick={() => handleLinkClick("limitation-of-liability")}
                className={`block w-full text-left py-2 text-sm font-medium transition-all duration-200 relative ${
                  activeSection === "limitation-of-liability"
                    ? "text-brand-teal font-semibold pl-1"
                    : "text-slate-500 hover:text-slate-955 pl-0"
                }`}
              >
                {activeSection === "limitation-of-liability" && (
                  <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
                )}
                Limitation of Liability
              </button>
              <button
                onClick={() => handleLinkClick("dispute-resolution")}
                className={`block w-full text-left py-2 text-sm font-medium transition-all duration-200 relative ${
                  activeSection === "dispute-resolution"
                    ? "text-brand-teal font-semibold pl-1"
                    : "text-slate-500 hover:text-slate-955 pl-0"
                }`}
              >
                {activeSection === "dispute-resolution" && (
                  <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
                )}
                Dispute Resolution
              </button>
              <button
                onClick={() => handleLinkClick("contact-us")}
                className={`block w-full text-left py-2 text-sm font-medium transition-all duration-200 relative ${
                  activeSection === "contact-us"
                    ? "text-brand-teal font-semibold pl-1"
                    : "text-slate-500 hover:text-slate-955 pl-0"
                }`}
              >
                {activeSection === "contact-us" && (
                  <span className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-teal rounded-full"></span>
                )}
                Contact Us
              </button>
            </div>
          </aside>

          {/* Main Terms Content */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Introduction Callout */}
            <div className="bg-slate-50 border-l-4 border-brand-teal p-6 md:p-8 rounded-r-2xl select-none">
              <p className="text-slate-700 leading-relaxed font-medium text-sm md:text-base">
                These Terms of Service ("Terms") dictate the rights, service levels, and codes of conduct regarding clinical portals and engineering products managed by NexEagle. By creating portal credentials or executing Statements of Work with us, you agree to these legal conditions.
              </p>
            </div>

            {/* Loop through Sections */}
            {sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="scroll-mt-24 space-y-6 border-b border-slate-100 pb-10 last:border-0 last:pb-0">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {sec.title}.
                </h2>
                <div className="space-y-6">
                  {sec.content.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      {item.subtitle && (
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Warranties & Disclaimers Section */}
            <div id="warranties-and-disclaimers" className="scroll-mt-24 space-y-8 border-b border-slate-100 pb-10">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Warranties and Disclaimers.
              </h2>
              
              <div className="space-y-8">
                {warranties.map((warranty, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      {warranty.title}
                    </h3>
                    <ul className="space-y-3">
                      {warranty.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="shrink-0 mt-1 select-none">
                            {index === 0 ? (
                              <CheckCircle className="w-4 h-4 text-brand-teal" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                            )}
                          </div>
                          <span className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Limitation of Liability Section */}
            <div id="limitation-of-liability" className="scroll-mt-24 space-y-6 border-b border-slate-100 pb-10">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Limitation of Liability.
              </h2>

              <div className="bg-amber-50/50 border-l-4 border-amber-500 p-6 rounded-r-2xl select-none space-y-2">
                <p className="text-slate-900 leading-relaxed font-extrabold text-sm uppercase tracking-wider">
                  Caution: Read Carefully
                </p>
                <p className="text-slate-600 leading-relaxed text-xs md:text-sm">
                  This section defines the boundary lines of NexEagle's software liabilities. These exclusions are core foundations of our pricing and service delivery structures.
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                To the maximum extent permitted by applicable laws, NexEagle shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of hospital revenues, data anomalies, or intangible losses resulting from:
              </p>

              <ul className="space-y-3 pl-2">
                {liabilityItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-600 text-sm md:text-base font-normal">
                    <span className="text-brand-teal font-extrabold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal pt-2">
                Our cumulative aggregate liability for all claims arising from or relating to these terms or our services shall not exceed the total subscription fees paid by you in the 12 months preceding the initial claim.
              </p>
            </div>

            {/* Dispute Resolution Section */}
            <div id="dispute-resolution" className="scroll-mt-24 space-y-6 border-b border-slate-100 pb-10">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Dispute Resolution.
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Governing Jurisdiction
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                    These terms shall be governed by and interpreted in accordance with the laws of India. The competent courts located at Kolkata, West Bengal, India shall have exclusive jurisdiction to try any disputes arising under this agreement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-955 mb-2">
                    Arbitration Protocols
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                    If informal discussions fail to resolve a claim, the dispute shall be referred to and resolved by binding arbitration conducted under the provisions of the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be Kolkata, India, and proceedings shall be conducted in English.
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Contact Us Section */}
            <div id="contact-us" className="scroll-mt-24 space-y-8 bg-slate-50 p-8 rounded-3xl border border-slate-200/60 select-none">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Contact Us.
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                  If you have questions about these Terms of Service, subscription invoicing default warnings, or legal rights, please contact our legal desk:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Contacts</h4>
                    <a href="mailto:legal@nexeagle.com" className="text-sm font-semibold text-slate-900 hover:text-brand-teal transition-colors block">
                      legal@nexeagle.com
                    </a>
                    <a href="mailto:info@nexeagle.com" className="text-sm text-slate-500 hover:text-brand-teal transition-colors block">
                      info@nexeagle.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Phone</h4>
                    <a href="tel:+918074906808" className="text-sm font-semibold text-slate-900 hover:text-brand-teal transition-colors block">
                      +91 8074906808
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start sm:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Postal Location</h4>
                    <p className="text-sm font-semibold text-slate-950">
                      NexEagle Corporate Office, Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex gap-3 items-start">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>HIPAA & SLA Notice:</strong> For enterprise Business Associate Agreement (BAA) signoffs or custom SLA requirements, contact our contracting department directly at <a href="mailto:legal@nexeagle.com" className="text-brand-teal hover:underline font-medium">legal@nexeagle.com</a>.
                </p>
              </div>
            </div>

            {/* Related Policies Links */}
            <div className="pt-6 flex flex-wrap gap-4 justify-center text-sm font-semibold select-none border-t border-slate-100">
              <Link href="/privacy" className="text-slate-500 hover:text-brand-teal transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/security" className="text-slate-500 hover:text-brand-teal transition-colors">
                Security Systems
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
