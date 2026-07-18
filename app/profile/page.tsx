import { Metadata } from "next";
import PatientTopBar from "@/components/patient/PatientTopBar";
import { User, Settings, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile | Doctor Dekho",
  description: "Manage your Doctor Dekho profile and settings.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
      <PatientTopBar showBackButton={true} />
      
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center font-display font-bold text-2xl border border-teal-100">
            P
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-slate-900">Patient Profile</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">+91 ••••• •••••</p>
          </div>
        </div>

        {/* Action List */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 overflow-hidden">
          
          <Link href="#" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="block font-semibold text-slate-900 text-sm">Personal Information</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </Link>

          <Link href="#" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="block font-semibold text-slate-900 text-sm">Medical Records & Privacy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </Link>

          <Link href="#" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="block font-semibold text-slate-900 text-sm">App Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </Link>

          <Link href="#" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="block font-semibold text-slate-900 text-sm">Help & Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </Link>

        </div>

        {/* Logout */}
        <button className="w-full mt-6 bg-white rounded-2xl p-4 text-red-500 font-bold text-sm shadow-sm border border-red-100 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors active:scale-95">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
        
      </div>
    </main>
  );
}
