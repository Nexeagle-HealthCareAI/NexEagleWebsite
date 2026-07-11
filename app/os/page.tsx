"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/home/TrustedBy";

// Dynamic imports with ssr: false for safety
const HealthcareChallenges = dynamic(() => import("@/components/home/HealthcareChallenges"), {
  loading: () => <SectionPlaceholder />,
  ssr: false,
});
const FeaturesSection = dynamic(() => import("@/components/home/FeaturesSection"), {
  loading: () => <SectionPlaceholder />,
  ssr: false,
});
const ProductEcosystem = dynamic(() => import("@/components/home/ProductEcosystem"), {
  loading: () => <SectionPlaceholder />,
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => <SectionPlaceholder />,
  ssr: false,
});
const DeferredLiveChat = dynamic(() => import("@/components/DeferredLiveChat"), {
  ssr: false,
});

const SectionPlaceholder = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-brand-teal/20 border-t-brand-teal animate-spin" />
  </div>
);

export default function NexEagleOSPage() {
  useEffect(() => {
    // Add analytics tracking for page views
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "GA_MEASUREMENT_ID", {
        page_title: "NexEagle OS - AI-Powered Healthcare Operating System",
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <main>
      <Hero />
      <TrustedBy />
      <HealthcareChallenges />
      <FeaturesSection />
      <ProductEcosystem />
      <Testimonials />
      <DeferredLiveChat />
    </main>
  );
}
