import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { ArrowRight, Bot, BrainCircuit, Activity, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WatchNexEagleAIWork = lazy(() => import("@/components/ai/WatchNexEagleAIWork"));

const SectionPlaceholder = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-brand-teal/20 border-t-brand-teal animate-spin" />
  </div>
);

const NexEagleAI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="NexEagle AI - Intelligent Healthcare Automation" 
        description="Experience the future of radiology with NexEagle's AI Voice-to-Report and predictive healthcare analytics."
      />
      <Navbar />
      
      <main className="pt-24 pb-16">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-sky/10 to-transparent pointer-events-none"></div>
          
          <div className="container px-6 md:px-8 lg:px-12 text-center max-w-4xl mx-auto space-y-8 relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-sky to-brand-iris">NexEagle AI</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform the way your hospital operates. Our AI analyzes voice dictations, creates instant reports, and powers predictive clinical decisions.
            </p>
          </div>
        </section>

        {/* Why Use AI in Hospital Workflows Section */}
        <section className="py-16 bg-slate-50 border-y border-slate-200/60 overflow-hidden">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Why Integrate AI in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">Hospital Workflows?</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 font-light max-w-2xl mx-auto">
                Research shows that clinical workflows are bottlenecked by heavy manual documentation, operational administration, and severe clinician burnout. AI transforms hospital management from reactive to predictive.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Card 1: Burnout Reduction */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-teal/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Combating Clinical Burnout</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    By converting verbal patient-doctor conversations directly into structured EMR data, clinical AI eliminates the manual "typing tax", reducing charting work by up to 50% and restoring joy to practice.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-teal font-semibold">Evidence:</span> "The EHR Typing Tax & Provider Burnout", <em>Annals of Internal Medicine</em>.
                </div>
              </div>

              {/* Card 2: Clinical Error Prevention */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-sky/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-sky/10 flex items-center justify-center text-brand-sky">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Reducing Diagnostic & Prescription Errors</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    AI co-pilots act as real-time safety nets. By cross-referencing patient records, lab values, and radiological findings, clinical algorithms flag adverse drug events and subtle diagnostic oversights.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-sky font-semibold">Evidence:</span> "Clinical Decision Support Systems for Safety", <em>Journal of Patient Safety</em>.
                </div>
              </div>

              {/* Card 3: Intelligent Triage */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-sky/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-sky/10 flex items-center justify-center text-brand-sky">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Accelerated Patient Triage</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Automated scan sweeps instantly flag acute emergencies (like stroke signs or critical nodules) and prioritize them on radiologist worklists, reducing critical patient time-to-treatment by 30%.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-sky font-semibold">Evidence:</span> "AI-Driven Clinical Triage in Emergency Radiology", <em>Academic Radiology</em>.
                </div>
              </div>

              {/* Card 4: Administrative Speed */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-brand-teal/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Optimized Discharge & Throughput</h3>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    AI auto-compiles clinical discharge notes and structures inpatient summaries, reducing insurer pre-authorization delays and speeding up hospital discharge operations by 20%.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  <span className="text-brand-teal font-semibold">Evidence:</span> "Natural Language Processing in Discharge Summaries", <em>BMC Medical Informatics</em>.
                </div>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionPlaceholder />}>
          <WatchNexEagleAIWork />
        </Suspense>



      </main>
      <Footer />
    </div>
  );
};

export default NexEagleAI;
