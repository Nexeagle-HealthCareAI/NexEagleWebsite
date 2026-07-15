"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Mail, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: "1HMS" | "1Rad" | "NexEagle AI" | "Security & Setup";
  tags: string[];
}

export default function FAQsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { label: "All Questions", value: "All" },
    { label: "1HMS (Hospital)", value: "1HMS" },
    { label: "1Rad (Radiology & PACS)", value: "1Rad" },
    { label: "NexEagle AI", value: "NexEagle AI" },
    { label: "Security & Setup", value: "Security & Setup" }
  ];

  const faqList: FAQItem[] = [
    // 1HMS
    {
      question: "What modules are included in the 1HMS platform?",
      answer: "1HMS is a unified hospital management system that includes modules for OPD Consultations, IPD Ward Allocations, EMR record hubs, Auto-Billing, TPA Insurance pre-authorization workflows, and integrated Pharmacy/Laboratory networks. All modules operate under a single source of truth.",
      category: "1HMS",
      tags: ["EMR", "OPD", "IPD", "Billing"]
    },
    {
      question: "Can 1HMS work offline or during internet dropouts?",
      answer: "Yes. 1HMS features robust local offline caching. Clinicians can draft and save OPD consult sheets even during active internet outages. The software securely buffers data locally and synchronizes it automatically with the cloud database when connectivity is restored.",
      category: "1HMS",
      tags: ["offline", "sync", "caching", "reliability"]
    },
    {
      question: "How long does it take to deploy 1HMS in a hospital?",
      answer: "Our standard setup takes less than 48 hours. This includes deploying the secure cloud workspace, setting up doctor profiles, configuring clinic departments, and customizing basic prescription and billing templates.",
      category: "1HMS",
      tags: ["setup", "deployment", "timeline"]
    },
    // 1Rad
    {
      question: "What is Cloud PACS and how does it render DICOM files?",
      answer: "1Rad's Cloud PACS is a cloud-native picture archiving and communication system. It allows radiologists, technicians, and clinicians to view and sweep heavy CT, MRI, and X-ray slices instantly in a web browser on any device, without installing desktop software.",
      category: "1Rad",
      tags: ["PACS", "DICOM", "imaging", "viewer"]
    },
    {
      question: "Does 1Rad support speech-to-text voice dictation?",
      answer: "Yes. 1Rad integrates NexEagle AI's speech-to-text engine specifically trained on clinical radiology terminology. Radiologists can dictate complex reports directly into the system, auto-generating structured templates in real-time.",
      category: "1Rad",
      tags: ["dictation", "radiology", "voice", "AI"]
    },
    // NexEagle AI
    {
      question: "What specific workflows does NexEagle AI automate?",
      answer: "NexEagle AI acts as a voice-activated clinical copilot. It listens to doctor consultations to draft structured e-prescriptions, auto-generates patient discharge summaries, suggests relevant diagnostic checklists, and fills out insurer pre-authorization forms.",
      category: "NexEagle AI",
      tags: ["assistant", "AI", "workflow", "copilot"]
    },
    {
      question: "Is NexEagle AI clinically safe and validated?",
      answer: "Absolutely. NexEagle AI's clinical models are curated and continuously validated by our clinical advisory board. Our algorithms are trained to prevent medical hallucinations, ensuring high clinical accuracy and alignment with NABH guidelines.",
      category: "NexEagle AI",
      tags: ["validation", "safety", "NABH", "compliance"]
    },
    // Security & Setup
    {
      question: "Is our clinical data secure and HIPAA compliant?",
      answer: "Yes. NexEagle uses enterprise-grade secure hosting. We encrypt all data in transit using HTTPS/TLS 1.3 and at rest using AES-256. The system complies with HIPAA and NABH security standards, offering role-based access control and detailed activity audit logs.",
      category: "Security & Setup",
      tags: ["HIPAA", "security", "encryption", "compliance"]
    },
    {
      question: "Who owns the patient records entered into the platform?",
      answer: "You do. Your clinic or hospital owns 100% of the patient clinical files and billing records. NexEagle acts strictly as a secure processor. You can export your data in standardized HL7/FHIR formats at any time.",
      category: "Security & Setup",
      tags: ["data-ownership", "export", "HL7", "FHIR"]
    }
  ];

  // Filtering Logic
  const filteredFaqs = faqList.filter((item) => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      activeCategory === "All" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-32 pb-24">
      {/* Hero & Search Header */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-teal-50/30 via-white to-white select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 pointer-events-none rounded-full blur-[140px] z-0"></div>
        
        <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about our unified clinical systems, deployment, data security, and AI integrations.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative max-w-xl mx-auto w-full pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions, keywords, or features (e.g. offline, PACS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 focus:border-brand-teal/40 rounded-full text-slate-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-teal/20 transition-all text-sm md:text-base font-normal placeholder-slate-400"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs Filter */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-5xl mx-auto mb-12 relative z-10 select-none">
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-full border border-slate-200/80 overflow-x-auto scrollbar-none whitespace-nowrap md:justify-center w-full max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 shrink-0 ${
                activeCategory === cat.value
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/50 scale-[1.02]"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/55"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Accordions List */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-3xl mx-auto relative z-10">
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-200/80 bg-white rounded-2xl hover:border-brand-teal/40 hover:shadow-[0_8px_20px_rgba(20,184,166,0.03)] transition-all duration-300 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-bold text-slate-900 hover:text-brand-teal py-5 text-base md:text-lg select-none">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5 pt-1 space-y-4">
                  <p className="leading-relaxed font-normal text-sm md:text-base">
                    {faq.answer}
                  </p>
                  
                  {/* Tags List */}
                  <div className="flex flex-wrap gap-1.5 pt-2 select-none">
                    {faq.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-50 border border-slate-100 text-slate-500 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 space-y-3 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800">No matching questions found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Try searching for general keywords like &quot;EMR&quot;, &quot;voice&quot;, &quot;setup&quot;, or adjust your category tab filter.
            </p>
          </div>
        )}
      </section>

      {/* Sales/Contact CTA Banner */}
      <section className="container px-6 md:px-8 lg:px-12 max-w-5xl mx-auto mt-20 select-none">
        <div className="relative p-10 md:p-14 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 text-white overflow-hidden shadow-xl shadow-teal-900/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto md:mx-0">
              <Mail className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-3xl font-extrabold tracking-tight">Still have questions?</h3>
            <p className="text-teal-100 leading-relaxed font-light text-base sm:text-lg">
              Can&apos;t find what you&apos;re looking for? Reach out to our clinical onboarding advisors or schedule a demo.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              asChild
              size="lg"
              className="px-8 py-6 text-base font-semibold bg-white text-slate-900 hover:bg-slate-50 rounded-full shadow-lg shadow-black/5 hover:translate-y-[-2px] transition-all duration-300"
            >
              <Link href="/contact">
                Talk to Sales
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </main>
  );
}
