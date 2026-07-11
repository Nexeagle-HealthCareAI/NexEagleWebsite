import type { Metadata } from "next";
import PricingClient from "./pricing-client";
import DeferredLiveChat from "@/components/DeferredLiveChat";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Pricing - Hospital & Clinic Software | Setup in 48 Hours",
  description: "Simple pricing for hospital and clinic management software. ₹999 per doctor per month. Works offline. Setup in 48 hours. Free trial available.",
  keywords: [
    "hospital software pricing",
    "clinic management software cost",
    "HMS pricing India",
    "affordable hospital software",
    "clinic software price",
    "per doctor pricing"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "NexEagle Healthcare Software",
  "description": "Hospital and clinic management software. Works offline. Setup in 48 hours. ₹999 per doctor per month.",
  "offers": [
    {
      "@type": "Offer",
      "name": "Per Doctor Pricing",
      "price": "999",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "999",
        "priceCurrency": "INR",
        "unitText": "MONTH"
      }
    }
  ]
};

export default function PricingPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AnalyticsTracker title="NexEagle Pricing - Setup in 48 Hours" />
      <PricingClient />
      <DeferredLiveChat />
    </main>
  );
}
