import type { Metadata } from "next";
import TeamSection from "@/components/about/TeamSection";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Clinical & Medical Advisors",
  description: "Meet the clinicians and research fellows advising NexEagle on workflows, compliance, and clinical research.",
};

export default function HealthcarePage() {
  return (
    <main className="pt-32 pb-16 bg-gradient-to-b from-teal-50/30 via-white to-white">
      <AnalyticsTracker title="Clinical & Medical Advisors - NexEagle" />
      <div className="max-w-4xl mx-auto text-center space-y-4 px-6 mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-wider">
          Clinical
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Medical & Research Advisors
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          Ensuring our software is clinically safe, user-friendly for clinicians, and scientifically validated.
        </p>
      </div>

      <div className="border-t border-slate-100/80">
        <TeamSection defaultFilter="Medical & Research" showHeader={false} />
      </div>
    </main>
  );
}
