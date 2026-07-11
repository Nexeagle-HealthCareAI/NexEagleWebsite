"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

/** Sticky Practo/Jio-style header: brand + provider CTA. Location & search live in the hero. */
export default function PatientTopBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-5">
        <Link href="/" className="flex items-center shrink-0 select-none">
          <Logo textSize="text-base sm:text-lg md:text-xl" />
        </Link>

        <Link href="/os" className="shrink-0">
          <button className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-teal-50 hover:bg-brand-teal text-brand-teal hover:text-white border border-brand-teal/30 hover:border-brand-teal text-xs font-bold transition-all duration-300 shadow-sm">
            <span className="hidden md:inline">For Doctors &amp; Hospitals</span>
            <span className="md:hidden">For Providers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </header>
  );
}
