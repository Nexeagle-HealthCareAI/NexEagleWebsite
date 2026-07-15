"use client";

import Link from "next/link";
import { ChevronRight, Phone, Mail, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function PatientFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="space-y-3">
          <Logo textSize="text-base sm:text-lg" textColor="text-white" />
          <p className="text-xs leading-relaxed font-light max-w-xs">
            Book in-clinic appointments with verified doctors near you. Powered by
            the NexEagle healthcare operating system.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Your health data stays private &amp; secure.
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="text-white text-sm font-bold">Need help booking?</h4>
          <a href="tel:+918074906808" className="flex items-center gap-2 text-xs hover:text-white transition">
            <Phone className="w-3.5 h-3.5" /> +91 80749 06808
          </a>
          <a href="mailto:info@nexeagle.com" className="flex items-center gap-2 text-xs hover:text-white transition">
            <Mail className="w-3.5 h-3.5" /> info@nexeagle.com
          </a>
        </div>

        {/* Provider CTA */}
        <div className="space-y-3 md:text-right">
          <h4 className="text-white text-sm font-bold">Are you a provider?</h4>
          <p className="text-xs font-light md:ml-auto max-w-xs">
            Equip your clinic, hospital, lab or pharmacy with AI-powered tools,
            scribes and billing.
          </p>
          <Link href="/business" className="inline-flex">
            <button className="inline-flex items-center gap-1 px-4 py-2 bg-brand-teal hover:bg-brand-teal/90 text-white text-xs font-bold rounded-lg transition shadow-md">
              Explore NexEagle OS <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* ── SEO Link Farm (Internal Silo) ── */}
      <div className="border-t border-slate-800 pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-white text-sm font-bold mb-6">Top Specialties in Major Cities</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-light">
            <div className="space-y-2 flex flex-col">
              <Link href="/specialties/general/delhi-ncr-delhi" className="hover:text-white transition">General Physicians in Delhi NCR</Link>
              <Link href="/specialties/cardiology/mumbai-maharashtra" className="hover:text-white transition">Cardiologists in Mumbai</Link>
              <Link href="/specialties/pediatrics/bengaluru-karnataka" className="hover:text-white transition">Pediatricians in Bengaluru</Link>
            </div>
            <div className="space-y-2 flex flex-col">
              <Link href="/specialties/dermatology/kolkata-west-bengal" className="hover:text-white transition">Dermatologists in Kolkata</Link>
              <Link href="/specialties/orthopedics/hyderabad-telangana" className="hover:text-white transition">Orthopedists in Hyderabad</Link>
              <Link href="/specialties/gynecology/chennai-tamil-nadu" className="hover:text-white transition">Gynecologists in Chennai</Link>
            </div>
            <div className="space-y-2 flex flex-col">
              <Link href="/conditions/diabetes/delhi-ncr-delhi" className="hover:text-white transition">Diabetes Doctors in Delhi NCR</Link>
              <Link href="/conditions/chest-pain/mumbai-maharashtra" className="hover:text-white transition">Chest Pain Treatment in Mumbai</Link>
              <Link href="/conditions/hair-fall/bengaluru-karnataka" className="hover:text-white transition">Hair Fall Treatment in Bengaluru</Link>
            </div>
            <div className="space-y-2 flex flex-col">
              <Link href="/conditions/pregnancy/kolkata-west-bengal" className="hover:text-white transition">Pregnancy Care in Kolkata</Link>
              <Link href="/conditions/knee-pain/hyderabad-telangana" className="hover:text-white transition">Knee Pain Doctors in Hyderabad</Link>
              <Link href="/conditions/toothache/chennai-tamil-nadu" className="hover:text-white transition">Toothache Treatment in Chennai</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} NexEagle. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
