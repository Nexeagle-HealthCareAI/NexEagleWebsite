"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { usePatientAuth } from "@/hooks/usePatientAuth";

interface PhoneVerificationProps {
  onVerified: () => void;
}

const RESEND_COOLDOWN_SECONDS = 30;

export default function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  const { sendOtp, verifyOtp } = usePatientAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  const doSendOtp = async () => {
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError(null);
    const res = await sendOtp.mutateAsync(phone);
    if (!res.success) {
      setError(res.message);
      return;
    }
    setOtp("");
    setStep("otp");
    setResendIn(RESEND_COOLDOWN_SECONDS);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    void doSendOtp();
  };

  const handleVerifyOtp = async (val: string) => {
    setOtp(val);
    if (val.length !== 6) return;
    setError(null);
    const res = await verifyOtp.mutateAsync({ mobile: phone, otp: val });
    if (!res.success) {
      setError(res.message);
      setOtp("");
      return;
    }
    onVerified();
  };

  const isLoading = sendOtp.isPending || verifyOtp.isPending;

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200/60 max-w-md w-full mx-auto">
      {step === "phone" ? (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <Phone className="w-6 h-6 text-brand-teal" />
            </div>
            <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight">
              Log In With WhatsApp
            </h2>
            <p className="text-sm text-slate-500 max-w-[280px] mx-auto">
              We&apos;ll send a one-time code to this number on WhatsApp to show your appointments from any device.
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
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
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
              disabled={isLoading || phone.length !== 10}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-teal text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(20,184,166,0.3)] hover:bg-teal-600 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Send OTP via WhatsApp</span>
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
              Enter the 6-digit code sent on WhatsApp to <span className="font-semibold text-slate-700">+91 {phone}</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleVerifyOtp}
              disabled={isLoading}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-10 h-12 sm:w-12 sm:h-14 text-lg rounded-l-xl font-bold border-slate-200" />
                <InputOTPSlot index={1} className="w-10 h-12 sm:w-12 sm:h-14 text-lg font-bold border-slate-200" />
                <InputOTPSlot index={2} className="w-10 h-12 sm:w-12 sm:h-14 text-lg font-bold border-slate-200" />
                <InputOTPSlot index={3} className="w-10 h-12 sm:w-12 sm:h-14 text-lg font-bold border-slate-200" />
                <InputOTPSlot index={4} className="w-10 h-12 sm:w-12 sm:h-14 text-lg font-bold border-slate-200" />
                <InputOTPSlot index={5} className="w-10 h-12 sm:w-12 sm:h-14 text-lg rounded-r-xl font-bold border-slate-200" />
              </InputOTPGroup>
            </InputOTP>

            {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}

            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-brand-teal font-medium">
                <RefreshCw className="w-4 h-4 animate-spin" />
                {verifyOtp.isPending ? "Verifying..." : "Sending..."}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={() => { setStep("phone"); setError(null); }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Change phone number
              </button>
              <span className="text-slate-200">|</span>
              <button
                onClick={() => void doSendOtp()}
                disabled={resendIn > 0 || isLoading}
                className="text-xs font-semibold text-brand-teal hover:text-teal-700 transition-colors disabled:text-slate-300"
              >
                {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
