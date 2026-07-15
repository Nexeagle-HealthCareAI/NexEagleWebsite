"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Mail, Phone, MapPin, ShieldAlert } from "lucide-react";

interface SubSection {
  subtitle: string;
  text: string;
}

interface Section {
  id: string;
  title: string;
  content: SubSection[];
}

const sections: Section[] = [
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
          text: "For our core clinical products (such as 1HMS and 1Rad PACS), we process protected health information (PHI) strictly as a business associate in full alignment with HIPAA regulations, NABH guidelines, and local healthcare privacy legislation. This data is segregated and shielded with enterprise-grade encryption."
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
          text: "Our software infrastructure is engineered to adhere to HIPAA, GDPR, ISO 27001, and SOC 2 Type II controls. We conduct external vulnerability assessments and code audits on a regular annual schedule."
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
          text: "We share necessary information only with vetted third-party vendors (such as AWS cloud hosting services). All vendors are subject to rigorous Business Associate Agreements (BAAs) and confidentiality constraints."
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

export default function PrivacyClient() {
  const lastUpdated = "April 19, 2026";
  const [activeSection, setActiveSection] = useState("information-we-collect");

  const rights = [
    {
      title: "Access",
      description: "Request a copy of the personal profile information we store."
    },
    {
      title: "Correction",
      description: "Request changes to outdated or inaccurate information."
    },
    {
      title: "Deletion",
      description: "Request erasure of accounts, subject to records retention laws."
    },
    {
      title: "FHIR Export",
      description: "Extract clinical data in standard interoperable formats."
    }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      // Find section currently in view
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
            Privacy Policy.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            We process data with extreme care, ensuring full transparency, user control, and compliance with healthcare guidelines.
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
                      : "text-slate-500 hover:text-slate-955 pl-0"
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

          {/* Main Policy Content */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Introduction Callout */}
            <div className="bg-slate-50 border-l-4 border-brand-teal p-6 md:p-8 rounded-r-2xl select-none">
              <p className="text-slate-700 leading-relaxed font-medium text-sm md:text-base">
                NexEagle (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is dedicated to protecting your privacy. This Privacy Policy details the policies, pipelines, and practices we use to secure personal profile datasets and clinical records processed across our primary healthcare systems (1HMS, 1Rad) and product engineering collaborations.
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
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.subtitle}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Special display for Rights grids inside the Your Rights section */}
                {sec.id === "your-rights" && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 select-none">
                    {rights.map((right, rIdx) => (
                      <div key={rIdx} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-150 transition-all duration-300 hover:border-brand-teal/30">
                        <h4 className="font-bold text-slate-900 mb-1 text-sm md:text-base">
                          {right.title}
                        </h4>
                        <p className="text-xs md:text-sm text-slate-500 leading-normal">
                          {right.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Dedicated Contact Us Section */}
            <div id="contact-us" className="scroll-mt-24 space-y-8 bg-slate-50 p-8 rounded-3xl border border-slate-200/60 select-none">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Contact Us.
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                  If you have questions about this Privacy Policy, want to report a vulnerability, or wish to exercise data rights, reach our compliance team:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Contacts</h4>
                    <a href="mailto:privacy@nexeagle.com" className="text-sm font-semibold text-slate-900 hover:text-brand-teal transition-colors block">
                      privacy@nexeagle.com
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
                    <p className="text-sm font-semibold text-slate-900">
                      NexEagle Corporate Office, Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex gap-3 items-start">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>HIPAA & NABH Notice:</strong> For regulatory audits, business associate agreement (BAA) coordination, or reporting privacy concerns under clinical compliance directives, contact our designated Data Protection Officer at <a href="mailto:privacy@nexeagle.com" className="text-brand-teal hover:underline font-medium">privacy@nexeagle.com</a>.
                </p>
              </div>
            </div>

            {/* Related Policies Links */}
            <div className="pt-6 flex flex-wrap gap-4 justify-center text-sm font-semibold select-none border-t border-slate-100">
              <Link href="/terms" className="text-slate-500 hover:text-brand-teal transition-colors">
                Terms of Service
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
