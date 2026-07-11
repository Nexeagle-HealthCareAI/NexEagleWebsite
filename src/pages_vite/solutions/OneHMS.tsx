import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { ArrowRight, BrainCircuit, ShieldAlert, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HospitalSolutions = lazy(() => import("@/components/home/HospitalSolutions"));
const HMSWorkflowAnimation = lazy(() => import("@/components/home/HMSWorkflowAnimation"));

const SectionPlaceholder = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-brand-teal/20 border-t-brand-teal animate-spin" />
  </div>
);

const OneHMS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://nexeagle.com/solutions/1hms#software",
        "name": "1HMS - Hospital Management System",
        "url": "https://nexeagle.com/solutions/1hms",
        "publisher": {
          "@type": "Organization",
          "name": "NexEagle",
          "url": "https://nexeagle.com"
        },
        "applicationCategory": "HealthApplication, BusinessApplication",
        "operatingSystem": "Web, Cloud-based",
        "description": "India's leading AI-powered hospital software with NABH compliance automation, voice scribe, and 15+ integrated modules.",
        "featureList": [
          "AI Voice Scribe & Auto-EMR Charting",
          "OPD & IPD Management",
          "1Lab Diagnostics Integration",
          "1Rad DICOM PACS Integration",
          "Auto-Billing & Revenue Cycle Management",
          "NABH Compliance Automation"
        ],
        "offers": {
          "@type": "Offer",
          "url": "https://nexeagle.com/solutions/1hms",
          "price": "0",
          "priceCurrency": "INR",
          "description": "Free demo available upon request. Contact sales for customized deployment pricing."
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://nexeagle.com/solutions/1hms#webpage",
        "url": "https://nexeagle.com/solutions/1hms",
        "name": "1HMS - Hospital Management System | NexEagle",
        "description": "Comprehensive, AI-powered Hospital Management System (HMS) with NABH compliance automation, ambient AI voice scribing, and 15+ clinical modules.",
        "isPartOf": {
          "@id": "https://nexeagle.com/#website"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans">
      <SEO 
        title="1HMS - Complete Hospital Management System & EMR Software" 
        description="NexEagle's 1HMS is a comprehensive, NABH-compliant Hospital Management System featuring automated workflows, AI voice scribing, EMR/EHR, and 15+ integrated modules."
        keywords="hospital management system, HMS software, electronic medical records, EMR, EHR, clinical workflow automation, NexEagle, NABH compliance, hospital ERP"
        structuredData={structuredData}
      />
      
      {/* Background Image with Faint Watermark Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/assets/modern_hospital_bg.png')] bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-[0.06]"
      />
      
      <Navbar />
      
      <main className="pt-24 relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container px-6 md:px-8 lg:px-12 text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">1HMS</span> - Complete Hospital Management
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              India's leading AI-powered hospital software with NABH compliance automation, voice scribe, and 15+ integrated modules.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/contact" id="onehms-hero-demo-link">
                <LiquidButton size="lg" id="onehms-hero-demo-button">
                  Book Free Demo <ArrowRight className="w-5 h-5 ml-2" />
                </LiquidButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Research & Science-Backed Impact Section */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase font-extrabold text-brand-teal tracking-widest bg-brand-teal/5 px-3 py-1 rounded-full">
                Research-Backed Healthcare Transformation
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                The Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">Unified Care</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 font-light max-w-2xl mx-auto">
                Peer-reviewed medical informatics research confirms that integrating EMR, PACS, and automated workflow systems dramatically improves clinical outcomes, reduces provider fatigue, and prevents life-threatening errors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Card 1: AI Voice Scribing & Charting Burden */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-teal/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">50% Reduction in Documentation Load</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Clinical studies show ambient generative AI scribes automatically draft accurate clinical notes from doctor-patient speech, reclaiming up to 2.5 hours per day for direct care while mitigating physician burnout.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-teal font-semibold">Evidence:</span> "Ambient AI Scribes in Primary Care", <em>JAMA Network Open</em>, 2024.
                </div>
              </div>

              {/* Card 2: Eliminating Communication & Medical Errors */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-sky/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-sky/10 flex items-center justify-center text-brand-sky">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Prevention of Adverse Medical Errors</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Siloed systems are responsible for critical information gaps. A fully unified hospital database prevents transcription errors, mismatch of laboratory/imaging orders, and drug interaction risks.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-sky font-semibold">Evidence:</span> "Communication Failures & Diagnostic Safety", <em>The Joint Commission Journal on Quality and Safety</em>.
                </div>
              </div>

              {/* Card 3: Streamlining Diagnostic Turnaround */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-sky/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-sky/10 flex items-center justify-center text-brand-sky">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">40% Faster Diagnostic Turnaround Time</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Integrating EMR directly with LIS (1Lab) and PACS (1Rad) eliminates delayed manual report entry. Immediate image loading and barcode-driven laboratory systems result in significantly faster treatment starts.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-sky font-semibold">Evidence:</span> "Workflow Automation through Integrated PACS & EHRs", <em>Journal of Medical Systems</em>, 2023.
                </div>
              </div>

              {/* Card 4: Automated Revenue Cycle Management */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-teal/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">25% Reduction in Claim Denial Rates</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    By auto-compiling charging items directly from inpatient wards (IPD), labs, and diagnostics into a unified ledger, hospitals eliminate billing leaks, optimize pricing structures, and secure pre-auth approvals.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-teal font-semibold">Evidence:</span> "Efficacy of Automated AI Coding in Inpatient Billing Systems", <em>Health Affairs Scholars</em>, 2024.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Ecosystem Animation Section */}
        <section className="py-16 bg-slate-50 border-y border-slate-200/60 overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="text-center mb-8 max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Unified Healthcare Ecosystem
              </h2>
              <p className="text-sm md:text-base text-slate-500 font-light max-w-xl mx-auto">
                Discover how 1HMS connects OPD, IPD, and Billing, with fully integrated diagnostics through 1Lab and 1Rad PACS.
              </p>
            </div>
            
            <Suspense fallback={<SectionPlaceholder />}>
              <HMSWorkflowAnimation />
            </Suspense>
          </div>
        </section>

        {/* Content Section (Using the component created earlier) */}
        <Suspense fallback={<SectionPlaceholder />}>
          <HospitalSolutions />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default OneHMS;
