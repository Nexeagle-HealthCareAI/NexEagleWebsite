import type { Metadata } from "next";
import TeamSection from "@/components/about/TeamSection";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Founding Team",
  description: "Meet the founders and clinical leaders driving NexEagle's vision to shape the future of healthcare software.",
};

export default function LeadershipPage() {
  return (
    <main className="pt-32 pb-16 bg-gradient-to-b from-teal-50/30 via-white to-white">
      <AnalyticsTracker title="Founding Team - NexEagle" />
      <div className="max-w-4xl mx-auto text-center space-y-4 px-6 mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold uppercase tracking-wider">
          Founders
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Founding Team
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          The team guiding NexEagle forward—uniting engineering speed with deep clinical experience.
        </p>
      </div>

      <div className="border-t border-slate-100/80">
        <TeamSection defaultFilter="Founding Team" showHeader={false} />
      </div>
    </main>
  );
}
