"use client";

import { useState } from "react";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PhoneVerification from "@/components/patient/PhoneVerification";
import { User, Shield, HelpCircle, LogOut, ChevronRight, LogIn } from "lucide-react";
import Link from "next/link";
import { usePatientAuth } from "@/hooks/usePatientAuth";

export default function ProfileClient() {
  const { isLoggedIn, mobile, isLoading, logout } = usePatientAuth();
  const [showVerification, setShowVerification] = useState(false);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
        <PatientTopBar showBackButton={true} />
        <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-10 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
      <PatientTopBar showBackButton={true} />

      <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {showVerification ? (
          <div className="py-10">
            <PhoneVerification onVerified={() => setShowVerification(false)} />
          </div>
        ) : !isLoggedIn ? (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm px-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center mb-4 border border-teal-100">
              <User className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2">You&apos;re not logged in</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              Log in with WhatsApp to see your profile and appointments from any device.
            </p>
            <button
              onClick={() => setShowVerification(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-teal text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:bg-teal-600 transition-colors"
            >
              <LogIn className="w-4 h-4" /> Log In With WhatsApp
            </button>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center font-display font-bold text-2xl border border-teal-100">
                {mobile ? mobile.slice(-2) : "P"}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-display font-bold text-slate-900">Patient Profile</h1>
                <p className="text-sm text-slate-500 font-medium mt-0.5">
                  {mobile ? `+91 ${mobile}` : "Logged in"}
                </p>
              </div>
            </div>

            {/* Action List */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 overflow-hidden">
              <Link href="/profile/personal-information" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-slate-900 text-sm">Personal Information</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              <Link href="/appointments" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-slate-900 text-sm">My Appointments</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              <a href="mailto:info@nexeagle.com" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors active:bg-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-slate-900 text-sm">Help & Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </a>
            </div>

            {/* Logout */}
            <button
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="w-full mt-6 bg-white rounded-2xl p-4 text-red-500 font-bold text-sm shadow-sm border border-red-100 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors active:scale-95 disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {logout.isPending ? "Signing out..." : "Sign Out"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
