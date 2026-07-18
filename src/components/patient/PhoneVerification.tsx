"use client";

import { useState } from "react";
import { Phone, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

interface PhoneVerificationProps {
  onVerified: () => void;
}

export default function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setError(null);
    setIsLoading(true);
    
    // Simulate API call to send OTP
    await new Promise(r => setTimeout(r, 1200));
    
    setIsLoading(false);
    setStep("otp");
  };

  const handleVerifyOtp = async (val: string) => {
    setOtp(val);
    if (val.length === 4) {
      setError(null);
      setIsLoading(true);
      
      // Simulate API verification
      await new Promise(r => setTimeout(r, 1500));
      
      setIsLoading(false);
      // For mockup purposes, any 4-digit code works
      onVerified();
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200/60 max-w-md w-full mx-auto">
      {step === "phone" ? (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <Phone className="w-6 h-6 text-brand-teal" />
            </div>
            <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">
              Find Past Appointments
            </h2>
            <p className="text-sm text-slate-500 max-w-[280px] mx-auto">
              Enter the phone number you used to book your previous appointments.
            </p>
          </div>

          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  +91
                </span>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter mobile number"
                  className={cn(
                    "w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 font-medium placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all",
                    error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-brand-teal"
                  )}
                  autoFocus
                />
              </div>
              {error && <p className="text-xs text-red-500 font-medium pl-1">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={isLoading || phone.length < 10}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-teal text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:bg-teal-600 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-sky-100">
              <ShieldCheck className="w-6 h-6 text-sky-500" />
            </div>
            <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">
              Verify Number
            </h2>
            <p className="text-sm text-slate-500 max-w-[280px] mx-auto">
              Enter the 4-digit code sent to <span className="font-semibold text-slate-700">+91 {phone}</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={handleVerifyOtp}
              disabled={isLoading}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-14 sm:w-14 sm:h-16 text-xl rounded-l-xl font-bold border-slate-200" />
                <InputOTPSlot index={1} className="w-12 h-14 sm:w-14 sm:h-16 text-xl font-bold border-slate-200" />
                <InputOTPSlot index={2} className="w-12 h-14 sm:w-14 sm:h-16 text-xl font-bold border-slate-200" />
                <InputOTPSlot index={3} className="w-12 h-14 sm:w-14 sm:h-16 text-xl rounded-r-xl font-bold border-slate-200" />
              </InputOTPGroup>
            </InputOTP>

            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-brand-teal font-medium">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Verifying...
              </div>
            )}
            
            <button 
              onClick={() => setStep("phone")}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Change phone number
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
