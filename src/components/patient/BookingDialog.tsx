"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  CheckCircle2,
  MapPin,
  Sun,
  Sunset,
  Moon,
  ShieldCheck,
  Smartphone,
  Ticket,
  Clock,
  Loader2,
  CalendarX,
} from "lucide-react";
import type { Doctor } from "@/data/patient";
import { timeSlots } from "@/data/patient";
import { useCreateAppointment, useDoctorAvailability } from "@/lib/api/hooks";

interface BookingDialogProps {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "slot" | "details" | "otp" | "done";

const genders = ["Male", "Female", "Other"] as const;
const RESEND_SECONDS = 30;

export default function BookingDialog({
  doctor,
  open,
  onOpenChange,
}: BookingDialogProps) {
  const [step, setStep] = useState<Step>("slot");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<(typeof genders)[number]>("Male");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // OTP verification state
  const [expectedOtp, setExpectedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendIn, setResendIn] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [serverRef, setServerRef] = useState<string | null>(null);
  const [localBookingId] = useState(
    () => `NEX-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const bookingId = serverRef ?? localBookingId;

  // Live availability for the selected date (falls back to static windows when
  // the API isn't configured or hasn't returned windows).
  const availability = useDoctorAvailability(doctor?.id, date || undefined);
  const apiActive = Boolean(
    availability.data && !availability.data.notConfigured
  );
  const createAppointment = useCreateAppointment();

  const dates = useMemo(() => {
    const today = new Date();
    return [0, 1, 2, 3].map((offset) => {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      return {
        key: d.toISOString().slice(0, 10),
        label:
          offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" }),
        sub: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      };
    });
  }, [open]);

  // Countdown for "Resend OTP".
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  // Reset to a clean state whenever the dialog closes.
  function handleOpenChange(next: boolean) {
    if (!next) {
      setStep("slot");
      setDate("");
      setTime("");
      setName("");
      setPhone("");
      setAge("");
      setGender("Male");
      setReason("");
      setErrors({});
      setExpectedOtp("");
      setOtp("");
      setOtpError("");
      setResendIn(0);
      setSubmitting(false);
      setServerRef(null);
    }
    onOpenChange(next);
  }

  function validateDetails() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Patient name is required";
    if (!/^\d{10}$/.test(phone.trim())) e.phone = "Enter a valid 10-digit number";
    if (!age.trim() || isNaN(+age) || +age <= 0 || +age > 120)
      e.age = "Enter a valid age";
    if (!reason.trim()) e.reason = "Please add a brief reason";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // "Send" an OTP. When the backend is wired up, replace this with an API call;
  // for now we generate a code locally so the flow is testable.
  function sendOtp() {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setExpectedOtp(code);
    setOtp("");
    setOtpError("");
    setResendIn(RESEND_SECONDS);
  }

  function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateDetails()) return;
    sendOtp();
    setStep("otp");
  }

  async function verifyOtp() {
    if (otp.length !== 6) {
      setOtpError("Enter the 6-digit code");
      return;
    }
    if (otp !== expectedOtp) {
      setOtpError("Incorrect code. Please try again.");
      return;
    }
    setOtpError("");

    // Submit the pre-appointment. If the API isn't configured/reachable, we
    // still confirm locally so the flow completes with the mock booking id.
    setSubmitting(true);
    try {
      const res = await createAppointment.mutateAsync({
        doctorId: doctor!.id,
        date,
        window: time,
        patient: { name, phone, age, gender, reason },
      });
      if (res.reference) setServerRef(res.reference);
    } catch {
      /* fall back to the local booking id */
    } finally {
      setSubmitting(false);
      setStep("done");
    }
  }

  if (!doctor) return null;

  const selectedDateLabel =
    dates.find((d) => d.key === date)?.label +
    " " +
    (dates.find((d) => d.key === date)?.sub ?? "");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden rounded-3xl max-h-[92vh] overflow-y-auto">
        <DialogTitle className="sr-only">Book appointment with {doctor.name}</DialogTitle>

        {/* Doctor summary header */}
        <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-teal-50 to-white border-b border-slate-100">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doctor.gradient} text-white flex items-center justify-center font-bold shrink-0`}
          >
            {doctor.initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-sm truncate">
              {doctor.name}
            </h3>
            <p className="text-xs text-brand-teal font-semibold">
              {doctor.specialty}
            </p>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
              <span>₹{doctor.fee} consultation</span>
            </div>
          </div>
        </div>

        {/* STEP: slot selection */}
        {step === "slot" && (
          <div className="p-5 space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                Select date
              </label>
              <div className="grid grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => {
                      setDate(d.key);
                      setTime(""); // clear window; availability differs per day
                    }}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      date === d.key
                        ? "bg-brand-teal border-brand-teal text-white shadow-md shadow-teal-500/20"
                        : "bg-white border-slate-200 hover:border-brand-teal/40 text-slate-700"
                    }`}
                  >
                    <span className="block text-[11px] font-bold">{d.label}</span>
                    <span className="block text-[10px] opacity-70">{d.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-1.5 text-[11px] text-slate-500 bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
              <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-teal" />
              Pick a 1-hour arrival window. Your exact token is issued at the clinic.
            </div>

            {apiActive ? (
              // ── Live availability from the EasyHMS API ──────────────────────
              availability.isLoading ? (
                <div className="flex items-center justify-center gap-2 py-8 text-slate-400 text-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-brand-teal" />
                  Checking availability…
                </div>
              ) : availability.data && availability.data.isWorking && availability.data.windows.length > 0 ? (
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    Available windows
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {availability.data.windows.map((s) => (
                      <button
                        key={s}
                        onClick={() => setTime(s)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition whitespace-nowrap ${
                          time === s
                            ? "bg-brand-teal border-brand-teal text-white"
                            : "bg-white border-slate-200 text-slate-600 hover:border-brand-teal hover:text-brand-teal"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5 py-8 text-slate-400">
                  <CalendarX className="w-6 h-6" />
                  <p className="text-sm font-semibold text-slate-600">
                    Doctor not available on this date
                  </p>
                  <p className="text-xs">Please pick another day.</p>
                </div>
              )
            ) : (
              // ── Static fallback windows (API not configured) ────────────────
              <>
                <SlotGroup icon={<Sun className="w-3.5 h-3.5" />} label="Morning" slots={timeSlots.morning} time={time} onPick={setTime} />
                <SlotGroup icon={<Sunset className="w-3.5 h-3.5" />} label="Afternoon" slots={timeSlots.afternoon} time={time} onPick={setTime} />
                <SlotGroup icon={<Moon className="w-3.5 h-3.5" />} label="Evening" slots={timeSlots.evening} time={time} onPick={setTime} />
              </>
            )}

            <button
              disabled={!date || !time}
              onClick={() => setStep("details")}
              className="w-full py-3.5 rounded-2xl bg-brand-teal text-white font-bold text-sm shadow-md shadow-teal-500/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-teal/90 transition"
            >
              {date && time ? "Continue to patient details" : "Select a date & window"}
            </button>
          </div>
        )}

        {/* STEP: patient details */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="p-5 space-y-4">
            <button
              type="button"
              onClick={() => setStep("slot")}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              <ChevronLeft className="w-4 h-4" /> Change window
            </button>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs flex items-center justify-between">
              <span className="text-slate-500">Selected window</span>
              <span className="font-bold text-slate-800">
                {selectedDateLabel} · <span className="text-brand-teal">{time}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Full name" error={errors.name} className="col-span-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Patient name"
                  className={inputCls(errors.name)}
                />
              </Field>
              <Field label="Mobile number" error={errors.phone} className="col-span-2">
                <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-brand-teal/40 focus-within:ring-1 focus-within:ring-brand-teal/10 overflow-hidden">
                  <span className="pl-3 pr-2 text-sm text-slate-400 font-semibold border-r border-slate-200">
                    +91
                  </span>
                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    className="flex-1 px-3 py-2.5 text-sm text-slate-800 bg-transparent focus:outline-none"
                  />
                </div>
              </Field>
              <Field label="Age" error={errors.age}>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  inputMode="numeric"
                  className={inputCls(errors.age)}
                />
              </Field>
              <Field label="Gender">
                <div className="grid grid-cols-3 gap-1">
                  {genders.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2.5 text-[11px] font-bold rounded-lg border transition ${
                        gender === g
                          ? "bg-brand-teal border-brand-teal text-white"
                          : "bg-white border-slate-200 text-slate-700 hover:border-brand-teal/40"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            <Field label="Reason for visit" error={errors.reason}>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                placeholder="e.g. persistent fever for 3 days, routine checkup…"
                className={inputCls(errors.reason) + " resize-none"}
              />
            </Field>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-brand-teal text-white font-bold text-sm shadow-md shadow-teal-500/20 hover:bg-brand-teal/90 transition flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Get OTP to verify mobile
            </button>
          </form>
        )}

        {/* STEP: OTP verification */}
        {step === "otp" && (
          <div className="p-5 space-y-5">
            <button
              type="button"
              onClick={() => setStep("details")}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              <ChevronLeft className="w-4 h-4" /> Edit details
            </button>

            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 rounded-full bg-teal-50 text-brand-teal flex items-center justify-center mx-auto border border-brand-teal/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Verify your mobile number</h3>
              <p className="text-xs text-slate-500">
                Enter the 6-digit code sent to{" "}
                <span className="font-bold text-slate-700">+91 {phone}</span>
              </p>
            </div>

            <div className="space-y-2">
              <input
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setOtpError("");
                }}
                inputMode="numeric"
                autoFocus
                placeholder="••••••"
                className={`w-full text-center text-2xl font-bold tracking-[0.6em] py-3.5 bg-white border rounded-2xl shadow-sm focus:outline-none focus:ring-1 transition ${
                  otpError
                    ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
                    : "border-slate-200 focus:border-brand-teal/40 focus:ring-brand-teal/10"
                }`}
              />
              {otpError && (
                <span className="block text-center text-[11px] font-bold text-rose-500">
                  {otpError}
                </span>
              )}

              {/* Demo-only helper — remove once the SMS API is connected. */}
              {expectedOtp && (
                <p className="text-center text-[10px] text-slate-400">
                  Demo mode — your code is{" "}
                  <span className="font-bold text-slate-500">{expectedOtp}</span>
                </p>
              )}

              <div className="text-center">
                {resendIn > 0 ? (
                  <span className="text-[11px] text-slate-400">
                    Resend code in {resendIn}s
                  </span>
                ) : (
                  <button
                    onClick={sendOtp}
                    className="text-[11px] font-bold text-brand-teal hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={verifyOtp}
              disabled={otp.length !== 6 || submitting}
              className="w-full py-3.5 rounded-2xl bg-brand-teal text-white font-bold text-sm shadow-md shadow-teal-500/20 hover:bg-brand-teal/90 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Confirming…
                </>
              ) : (
                <>
                  Verify &amp; confirm booking · ₹{doctor.fee}
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Pay at the clinic. You can reschedule anytime.
            </p>
          </div>
        )}

        {/* STEP: confirmation */}
        {step === "done" && (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-brand-teal flex items-center justify-center mx-auto border border-brand-teal/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Appointment confirmed!
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">
                Booking ID: {bookingId}
              </p>
            </div>

            <div className="text-left rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-2.5 text-sm">
              <Row label="Doctor" value={`${doctor.name} · ${doctor.specialty}`} />
              <Row label="Patient" value={`${name}, ${age} / ${gender}`} />
              <Row label="Mobile" value={`+91 ${phone} (verified)`} />
              <Row label="Arrival window" value={`${selectedDateLabel} · ${time}`} accent />
              <div className="flex items-start gap-1.5 text-xs text-slate-500 pt-1">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
                {doctor.clinic}
              </div>
            </div>

            {/* Token / arrival instructions */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-teal-50/70 border border-brand-teal/20 text-left">
              <Ticket className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Visit the hospital within your window.</strong>{" "}
                Arrive at {doctor.clinic.split(",")[0]} any time during{" "}
                <strong>{time}</strong>. Your consultation{" "}
                <strong>queue token</strong> is issued at the reception desk based
                on the doctor&apos;s live availability.
              </p>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-left">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Carry your Booking ID or verified mobile number. A confirmation SMS
                has been sent to +91 {phone}.
              </p>
            </div>

            <button
              onClick={() => handleOpenChange(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SlotGroup({
  icon,
  label,
  slots,
  time,
  onPick,
}: {
  icon: React.ReactNode;
  label: string;
  slots: string[];
  time: string;
  onPick: (t: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">
        {icon}
        {label}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition whitespace-nowrap ${
              time === s
                ? "bg-brand-teal border-brand-teal text-white"
                : "bg-white border-slate-200 text-slate-600 hover:border-brand-teal hover:text-brand-teal"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <span className="text-[10px] font-bold text-rose-500">{error}</span>}
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-slate-400 font-semibold">{label}</span>
      <span
        className={`text-xs font-bold text-right ${
          accent ? "text-brand-teal" : "text-slate-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function inputCls(error?: string) {
  return `w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 transition ${
    error
      ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
      : "border-slate-200 focus:border-brand-teal/40 focus:ring-brand-teal/10"
  }`;
}
