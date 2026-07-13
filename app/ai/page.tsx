import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { BrainCircuit, Activity, FileText, Sparkles } from "lucide-react";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const WatchNexEagleAIWork = dynamic(() => import("@/components/ai/WatchNexEagleAIWork"), { ssr: false });

export const metadata: Metadata = {
  title: "NexEagle AI - Intelligent Healthcare Automation",
  description: "Experience the future of radiology with NexEagle's AI Voice-to-Report and predictive healthcare analytics.",
};

export default function NexEagleAIPage() {
  return (
    <main className="pt-24 pb-16">
      <AnalyticsTracker title="NexEagle AI Showcase" />

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
                  By converting verbal patient-doctor conversations directly into structured EMR data, clinical AI eliminates the manual &quot;typing tax&quot;, reducing charting work by up to 50% and restoring joy to practice.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                <span className="text-brand-teal font-semibold">Evidence:</span> &quot;The EHR Typing Tax &amp; Provider Burnout&quot;, <em>Annals of Internal Medicine</em>.
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
                <span className="text-brand-sky font-semibold">Evidence:</span> &quot;Clinical Decision Support Systems for Safety&quot;, <em>Journal of Patient Safety</em>.
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
                <span className="text-brand-sky font-semibold">Evidence:</span> &quot;AI-Driven Clinical Triage in Emergency Radiology&quot;, <em>Academic Radiology</em>.
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
                <span className="text-brand-teal font-semibold">Evidence:</span> &quot;Natural Language Processing in Discharge Summaries&quot;, <em>BMC Medical Informatics</em>.
              </div>
            </div>
          </div>
        </div>
      </section>

      <WatchNexEagleAIWork />
    </main>
  );
}
