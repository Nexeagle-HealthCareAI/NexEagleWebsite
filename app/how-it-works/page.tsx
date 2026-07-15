import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "How It Works - Fast Onboarding & Onboarding Guide",
  description: "Learn how easy it is to go live with NexEagle's clinic and hospital management tools. In under 24 hours, we set up your OPD, train your staff, and configure your automated billing.",
  keywords: [
    "hospital software onboarding",
    "clinic ERP deployment",
    "NexEagle setup",
    "go live clinical software"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://nexeagle.com/how-it-works#webpage",
      "url": "https://nexeagle.com/how-it-works",
      "name": "How It Works - Fast Onboarding & Deployment | NexEagle",
      "description": "Learn how easy it is to go live with NexEagle's clinic and hospital management tools. In under 24 hours, we set up your OPD, train your staff, and configure your automated billing.",
      "isPartOf": {
        "@id": "https://nexeagle.com/#website"
      }
    }
  ]
};

export default function HowItWorksPage() {
  return (
    <main className="py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="How It Works - Fast Onboarding Guide" />
      <div className="max-w-4xl mx-auto text-center space-y-4 pt-16">
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-teal-100 text-tech-cyan text-sm font-semibold">
          How it works
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Go live in a day</h1>
        <p className="text-base md:text-lg text-brand-navy/70 max-w-3xl mx-auto">
          We set up your OPD, train staff, and enable reminders so you can start seeing patients without paperwork chaos.
        </p>
        <div className="flex justify-center pt-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-tech-cyan to-tech-electric text-white">
            <Link href="/contact">Schedule onboarding</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
