'use client';

import { useEffect, useState } from "react";
import { Phone, ArrowRight, ShieldCheck, RefreshCw, ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { usePatientAuth } from "@/hooks/usePatientAuth";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RESEND_COOLDOWN_SECONDS = 30;

export default function LoginPage() {
  const router = useRouter();
  const { sendOtp, verifyOtp, isLoggedIn } = usePatientAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    // If already logged in, redirect to profile immediately
    if (isLoggedIn) {
      router.replace("/profile");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  useEffect(() => {
    trackEvent("login_initiated");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    trackEvent("otp_sent", { mobile: phone });
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
      trackEvent("otp_verify_failed", { mobile: phone });
      setError(res.message);
      setOtp("");
      return;
    }
    trackEvent("otp_verified", { mobile: phone });
    router.push("/profile");
  };

  const isLoading = sendOtp.isPending || verifyOtp.isPending;

  return (
    <div className="min-h-screen bg-[#FFE135] flex flex-col md:flex-row">
      {/* 2/3 Banner Side */}
      <div className="w-full md:w-2/3 relative h-64 md:h-screen border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden bg-black flex items-center justify-center p-8">
        <Image
          src="/assets/login-banner.jpg"
          alt="NexEagle Login"
          fill
          className="object-cover opacity-90 mix-blend-screen"
          priority
        />
        {/* Optional overlay content */}
        <div className="absolute inset-0 bg-black/20" />
        <Link 
          href="/" 
          className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-[#FFE135] border-4 border-black text-black px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      {/* 1/3 Form Side */}
      <div className="w-full md:w-1/3 min-h-screen md:min-h-0 bg-white flex flex-col justify-center p-8 lg:p-12">
        <div className="max-w-sm mx-auto w-full">
          {step === "phone" ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#FFE135] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <Phone className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-black text-black uppercase tracking-tight">
                  Log In
                </h2>
                <p className="text-base font-bold text-gray-600">
                  We'll send a one-time code to this number on WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-black text-black text-lg">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter mobile number"
                      className={cn(
                        "w-full pl-14 pr-4 py-4 bg-white border-4 rounded-none text-black font-black text-lg placeholder:font-bold focus:outline-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                        error ? "border-red-500 focus:border-red-600 focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "border-black focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      )}
                      autoFocus
                    />
                  </div>
                  {error && <p className="text-sm text-red-600 font-bold bg-red-100 border-2 border-red-600 p-2 mt-2">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || phone.length !== 10}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#FFE135] border-4 border-black text-black font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD700] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#FFE135] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <ShieldCheck className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-black text-black uppercase tracking-tight">
                  Verify
                </h2>
                <p className="text-base font-bold text-gray-600">
                  Enter the 6-digit code sent on WhatsApp to <span className="text-black bg-[#FFE135] px-1">+91 {phone}</span>
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={handleVerifyOtp}
                  disabled={isLoading}
                  autoFocus
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="w-12 h-14 sm:w-12 sm:h-14 text-xl font-black bg-white border-4 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" />
                    <InputOTPSlot index={1} className="w-12 h-14 sm:w-12 sm:h-14 text-xl font-black bg-white border-4 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" />
                    <InputOTPSlot index={2} className="w-12 h-14 sm:w-12 sm:h-14 text-xl font-black bg-white border-4 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" />
                    <InputOTPSlot index={3} className="w-12 h-14 sm:w-12 sm:h-14 text-xl font-black bg-white border-4 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" />
                    <InputOTPSlot index={4} className="w-12 h-14 sm:w-12 sm:h-14 text-xl font-black bg-white border-4 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" />
                    <InputOTPSlot index={5} className="w-12 h-14 sm:w-12 sm:h-14 text-xl font-black bg-white border-4 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" />
                  </InputOTPGroup>
                </InputOTP>

                {error && <p className="text-sm text-red-600 font-bold bg-red-100 border-2 border-red-600 p-2 text-center">{error}</p>}

                {isLoading && (
                  <div className="flex justify-center items-center gap-2 text-base text-black font-black bg-[#FFE135] border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {verifyOtp.isPending ? "Verifying..." : "Sending..."}
                  </div>
                )}

                <div className="flex flex-col gap-4 mt-4">
                  <button
                    onClick={() => void doSendOtp()}
                    disabled={resendIn > 0 || isLoading}
                    className="w-full py-3 bg-white border-4 border-black text-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
                  </button>
                  <button
                    onClick={() => { setStep("phone"); setError(null); }}
                    className="w-full py-3 bg-black text-white font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-900 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Change Phone Number
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
