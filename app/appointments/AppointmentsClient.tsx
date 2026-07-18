"use client";

import { useState } from "react";
import PatientTopBar from "@/components/patient/PatientTopBar";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGuestAppointments } from "@/hooks/useGuestAppointments";
import PhoneVerification from "@/components/patient/PhoneVerification";

export default function AppointmentsClient() {
  const { hasAppointments, isLoaded, addAppointmentId } = useGuestAppointments();
  const [showVerification, setShowVerification] = useState(false);

  // We wait for local storage to load to prevent hydration mismatch flashes
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
        <PatientTopBar showBackButton={true} />
        <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-10 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  const handleVerified = () => {
    // For mockup purposes: simulate finding a past appointment and adding it
    addAppointmentId("mock-apt-123");
    setShowVerification(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
      <PatientTopBar showBackButton={true} />
      
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        
        {/* Header */}
        {!showVerification && (
          <h1 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight mb-6">
            My Appointments
          </h1>
        )}
        
        {showVerification ? (
          <div className="py-10">
            <PhoneVerification onVerified={handleVerified} />
          </div>
        ) : hasAppointments ? (
          <div className="space-y-4">
            {/* Example Mock Appointment Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wide uppercase">
                  Confirmed
                </span>
                <span className="text-xs font-semibold text-slate-500">Tomorrow</span>
              </div>
              
              <h3 className="font-display font-bold text-slate-900 text-base">Dr. Sarah Jenkins</h3>
              <p className="text-xs text-brand-teal font-medium mb-3">Cardiology</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tue, 24 Jul 2026</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>10:30 AM</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">Apollo Hospital, Jubilee Hills, Hyderabad</span>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link href="#" className="text-sm font-bold text-brand-teal hover:text-teal-600 transition-colors">
                  View Details
                </Link>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            
            {/* Add more cards here if iterating over appointmentIds */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm px-6">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
              <Calendar className="w-7 h-7 text-slate-300" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-2">No upcoming appointments</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
              You haven&apos;t booked any appointments on this device yet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link 
                href="/"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(15,23,42,0.18)] hover:bg-slate-800 transition-colors w-full sm:w-auto"
              >
                Find a Doctor
              </Link>
              <button 
                onClick={() => setShowVerification(true)}
                className="px-6 py-3 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto"
              >
                Verify Phone Number
              </button>
            </div>
            
            <p className="text-xs text-slate-400 mt-6 max-w-[250px]">
              Looking for a past booking? Verify your phone number to restore history.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
