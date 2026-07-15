import type { Metadata } from "next";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "1Pharma - Retail Pharmacy & Hospital Inventory Management System",
  description: "NexEagle's 1Pharma is an advanced Pharmacy Information System supporting automated inventory controls, batch expiry alerts, barcode dispensing, and billing integration.",
  keywords: [
    "pharmacy management system",
    "pharmacy software",
    "hospital inventory ERP",
    "batch tracking",
    "medicine dispensing software",
    "pharmacy POS",
    "pharmacy billing"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://nexeagle.com/solutions/1pharma#software",
      "name": "1Pharma - Pharmacy Information System",
      "url": "https://nexeagle.com/solutions/1pharma",
      "publisher": {
        "@type": "Organization",
        "name": "NexEagle",
        "url": "https://nexeagle.com"
      },
      "applicationCategory": "HealthApplication, BusinessApplication",
      "operatingSystem": "Web, Cloud-based",
      "description": "Enterprise pharmacy inventory software featuring smart batch tracking, expiry date alerts, POS barcode checkout, and instant billing syncing.",
      "featureList": [
        "Batch & Expiry Date Management",
        "Barcode Prescription Dispensing",
        "Hospital Inventory Sync & Auto-Reordering",
        "Pharmacy POS & Billing Terminal Integration",
        "Supplier & Procurement Databases"
      ],
      "offers": {
        "@type": "Offer",
        "url": "https://nexeagle.com/solutions/1pharma",
        "price": "0",
        "priceCurrency": "INR",
        "description": "Flexible subscription models for retail pharmacy stores and hospital chain pharmacies."
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://nexeagle.com/solutions/1pharma#webpage",
      "url": "https://nexeagle.com/solutions/1pharma",
      "name": "1Pharma - Retail Pharmacy & Hospital Inventory System | NexEagle",
      "description": "Supercharge your medicine dispensing workflows and stock controls with 1Pharma. Integrated inventory, automated expiries, and pharmacy POS.",
      "isPartOf": {
        "@id": "https://nexeagle.com/#website"
      }
    }
  ]
};

export default function OnePharmaPage() {
  return (
    <main className="pt-24 flex items-center justify-center min-h-[60vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="1Pharma - Pharmacy Management System | NexEagle" />
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          <span className="text-brand-sky">1Pharma</span>
        </h1>
        <p className="text-xl text-muted-foreground">Pharmacy Management System page coming soon...</p>
      </div>
    </main>
  );
}
