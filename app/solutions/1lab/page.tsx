import type { Metadata } from "next";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "1Lab - Cloud LIS & Pathology Laboratory Management System",
  description: "NexEagle's 1Lab is an advanced Laboratory Information System (LIS) with barcode tracking, auto-analyzers integration, custom PDF reports, and patient notifications.",
  keywords: [
    "laboratory information system",
    "LIS software",
    "pathology lab system",
    "diagnostic lab ERP",
    "lab report automation",
    "barcode tracking",
    "auto-analyzers"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://nexeagle.com/solutions/1lab#software",
      "name": "1Lab - Laboratory Management System",
      "url": "https://nexeagle.com/solutions/1lab",
      "publisher": {
        "@type": "Organization",
        "name": "NexEagle",
        "url": "https://nexeagle.com"
      },
      "applicationCategory": "HealthApplication, BusinessApplication",
      "operatingSystem": "Web, Cloud-based",
      "description": "Cloud-native Laboratory Information System (LIS) with barcode sample tracking, bidirectional machine interfacing, and patient report portals.",
      "featureList": [
        "Barcode Sample Registration & Tracking",
        "Auto-Analyzer Bidirectional Interface",
        "Custom Pathology PDF Report Generation",
        "Patient SMS & WhatsApp Report Alerts",
        "Diagnostic Workflow Dashboards"
      ],
      "offers": {
        "@type": "Offer",
        "url": "https://nexeagle.com/solutions/1lab",
        "price": "0",
        "priceCurrency": "INR",
        "description": "Flexible subscription models for individual laboratories and hospital diagnostics network."
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://nexeagle.com/solutions/1lab#webpage",
      "url": "https://nexeagle.com/solutions/1lab",
      "name": "1Lab - Cloud Laboratory Information System (LIS) | NexEagle",
      "description": "Optimize your diagnostics with 1Lab. pathology workflow automation, automated instrument interfaces, and online patient reports.",
      "isPartOf": {
        "@id": "https://nexeagle.com/#website"
      }
    }
  ]
};

export default function OneLabPage() {
  return (
    <main className="pt-24 flex items-center justify-center min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="1Lab - Laboratory Information System | NexEagle" />
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          <span className="text-brand-iris">1Lab</span>
        </h1>
        <p className="text-xl text-muted-foreground">Laboratory Management System page coming soon...</p>
      </div>
    </main>
  );
}
