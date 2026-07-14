"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Stethoscope, ArrowRight } from "lucide-react";
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
      {/* ── Patient crossover banner ─────────────────────────────────────────
          Patients who land on the B2B /os page need a clear path to the
          patient portal (/) without having to hunt around.
      ─────────────────────────────────────────────────────────────────────── */}
      <Link href="/" className="block w-full group">
        <div className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2.5 text-sm font-medium">
            <Stethoscope className="w-4 h-4 shrink-0 opacity-90" />
            <span className="opacity-90">Looking for a doctor near you?</span>
            <span className="font-bold underline underline-offset-2 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              Find &amp; Book Online
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>

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
