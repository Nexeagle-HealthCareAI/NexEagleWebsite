import type { Metadata } from "next";
import CareersClient from "./careers-client";
import DeferredLiveChat from "@/components/DeferredLiveChat";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Careers - Join the NexEaglians",
  description: "Build the clinical operating systems of tomorrow. Explore open positions for AI Engineers and Digital Marketing Specialists at NexEagle.",
  keywords: [
    "careers at nexeagle",
    "software development jobs",
    "AI engineer openings",
    "digital marketing vacancy",
    "work at nexeagle",
    "medical software developer jobs"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://nexeagle.com/careers#webpage",
      "url": "https://nexeagle.com/careers",
      "name": "Careers at NexEagle - Join the NexEaglians",
      "description": "Build the future of clinical operating systems. Explore open job positions for AI Engineers and Digital Marketing Specialists at NexEagle.",
      "isPartOf": {
        "@id": "https://nexeagle.com/#website"
      }
    }
  ]
};

export default function CareersPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle Careers - Join the Team" />
      <CareersClient />
      <DeferredLiveChat />
    </main>
  );
}
