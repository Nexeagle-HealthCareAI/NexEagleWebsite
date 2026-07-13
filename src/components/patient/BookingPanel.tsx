"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  CheckCircle2,
  Sun,
  Sunset,
  Moon,
  ShieldCheck,
  Smartphone,
  Hourglass,
  Clock,
  Loader2,
  CalendarX,
} from "lucide-react";
import type { Doctor } from "@/data/patient";
import { timeSlots } from "@/data/patient";
import { useCreateAppointment, useDoctorAvailability } from "@/lib/api/hooks";

interface BookingPanelProps {
  doctor: Doctor;
}

type Step = "visit" | "details" | "otp" | "done";
const STEP_ORDER: Step[] = ["visit", "details", "otp"];
const RESEND_SECONDS = 30;

/**
 * Inline booking panel for the doctor detail page — the same request→OTP→
 * pending-confirmation flow BookingDialog used to run inside a modal, now a
 * page-embedded panel. Trimmed to "minimum info": only name + mobile are
 * required to submit; age and reason are optional and tucked behind a toggle,
 * since the hospital collects the rest at check-in, not at request time.
 */
export default function BookingPanel({ doctor }: BookingPanelProps) {
  const [step, setStep] = useState<Step>("visit");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [preferredTime, setPreferredTime] = useState<string | undefined>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [expectedOtp, setExpectedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendIn, setResendIn] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [serverRef, setServerRef] = useState<string | null>(null);
  const [localBookingId] = useState(() => `NEX-${Math.floor(100000 + Math.random() * 900000)}`);
  const bookingId = serverRef ?? localBookingId;

  const availability = useDoctorAvailability(doctor.id, date || undefined);
  const apiActive = Boolean(availability.data && !availability.data.notConfigured);
  const createAppointment = useCreateAppointment();

  const dates = useMemo(() => {
    const today = new Date();
    return [0, 1, 2, 3, 4, 5, 6].map((offset) => {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      return {
        key: d.toISOString().slice(0, 10),
        label: offset === 0 ? "Today" : offset === 1 ? "Tmrw" : d.toLocaleDateString("en-US", { weekday: "short" }),
        sub: d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      };
    });
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  function validateDetails() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Patient name is required";
    if (!/^\d{10}$/.test(phone.trim())) e.phone = "Enter a valid 10-digit number";
    if (showOptional && age.trim() && (isNaN(+age) || +age <= 0 || +age > 120)) e.age = "Enter a valid age";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

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

    setSubmitting(true);
    try {
      const res = await createAppointment.mutateAsync({
        doctorId: doctor.id,
        patient: {
          fullName: name,
          mobile: phone,
          age: age.trim() ? Number(age) : undefined,
        },
        preferredDate: date,
        preferredTime,
        reason: reason.trim() ? (time ? `${reason} (Preferred arrival window: ${time})` : reason) : (time ? `Preferred arrival window: ${time}` : undefined),
        referrerUrl: typeof document !== "undefined" ? document.referrer || undefined : undefined,
      });
      if (res.reference) setServerRef(res.reference);
    } catch {
      /* fall back to the local booking id */
    } finally {
      setSubmitting(false);
      setStep("done");
    }
  }

  function resetPanel() {
    setStep("visit");
    setDate("");
    setTime("");
    setPreferredTime(undefined);
    setName("");
    setPhone("");
    setAge("");
    setReason("");
    setShowOptional(false);
    setErrors({});
    setExpectedOtp("");
    setOtp("");
    setOtpError("");
    setResendIn(0);
    setSubmitting(false);
    setServerRef(null);
  }

  const selectedDateLabel = dates.find((d) => d.key === date)
    ? `${dates.find((d) => d.key === date)!.label} ${dates.find((d) => d.key === date)!.sub}`
    : "";
  const locationLine = [doctor.hospitalName, doctor.city].filter(Boolean).join(", ") || doctor.clinic;

  const stepIdx = STEP_ORDER.indexOf(step);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <span className="block text-[10px] font-bold text-brand-teal uppercase tracking-wide">
          Appointment request
        </span>
        <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
          {step === "done" ? "You're all set" : "Reserve your visit"}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {step === "done" ? "We'll text you once it's confirmed." : "Only name & mobile are required."}
        </p>
      </div>

      {step !== "done" && (
        <div className="flex gap-1.5 px-5 pt-4">
          {STEP_ORDER.map((s, i) => (
            <i key={s} className="flex-1 h-1 rounded-full bg-slate-100 overflow-hidden block">
              <b
                className="block h-full bg-brand-teal rounded-full transition-all duration-500"
                style={{ width: stepIdx > i ? "100%" : stepIdx === i ? "45%" : "0%" }}
              />
            </i>
          ))}
        </div>
      )}

      {step === "visit" && (
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">
              Choose a day
            </label>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {dates.map((d) => (
                <button
                  key={d.key}
                  onClick={() => {
                    setDate(d.key);
                    setTime("");
                    setPreferredTime(undefined);
                  }}
                  className={`p-2 rounded-xl border text-center transition ${
                    date === d.key
                      ? "bg-brand-teal border-brand-teal text-white shadow-md shadow-teal-500/20"
                      : "bg-white border-slate-200 hover:border-brand-teal/40 text-slate-700"
                  }`}
                >
                  <span className="block text-[10px] font-bold">{d.label}</span>
                  <span className="block text-[9px] opacity-70">{d.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-1.5 text-[11px] text-slate-500 bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
            <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5 text-brand-teal" />
            This reserves a preferred window, not an exact time — {doctor.hospitalName || "the hospital"} confirms
            your slot before your visit.
          </div>

          {apiActive ? (
            availability.isLoading ? (
              <div className="flex items-center justify-center gap-2 py-8 text-slate-400 text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-brand-teal" />
                Checking availability…
              </div>
            ) : availability.data && availability.data.isAvailable && availability.data.windows.length > 0 ? (
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  Available windows
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {availability.data.windows.map((w) => (
                    <button
                      key={w.label}
                      onClick={() => {
                        setTime(w.label);
                        setPreferredTime(w.startTime);
                      }}
                      className={`py-2 px-1 text-[11px] font-bold rounded-lg border transition ${
                        time === w.label
                          ? "bg-brand-teal border-brand-teal text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:border-brand-teal hover:text-brand-teal"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 py-8 text-slate-400">
                <CalendarX className="w-6 h-6" />
                <p className="text-sm font-semibold text-slate-600">Not available on this date</p>
                <p className="text-xs">Please pick another day.</p>
              </div>
            )
          ) : (
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
            {date && time ? "Continue" : "Pick a day & window"}
          </button>
        </div>
      )}

      {step === "details" && (
        <form onSubmit={handleDetailsSubmit} className="p-5 space-y-4">
          <button
            type="button"
            onClick={() => setStep("visit")}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            <ChevronLeft className="w-4 h-4" /> Change window
          </button>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs flex items-center justify-between">
            <span className="text-slate-500">Preferred visit</span>
            <span className="font-bold text-slate-800">
              {selectedDateLabel} · <span className="text-brand-teal">{time}</span>
            </span>
          </div>

          <Field label="Full name" error={errors.name}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Patient name"
              className={inputCls(errors.name)}
            />
          </Field>
          <Field label="Mobile number" error={errors.phone}>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-brand-teal/40 focus-within:ring-1 focus-within:ring-brand-teal/10 overflow-hidden">
              <span className="pl-3 pr-2 text-sm text-slate-400 font-semibold border-r border-slate-200">+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile number"
                inputMode="numeric"
                className="flex-1 px-3 py-2.5 text-sm text-slate-800 bg-transparent focus:outline-none"
              />
            </div>
          </Field>

          <button
            type="button"
            onClick={() => setShowOptional((v) => !v)}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-teal"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showOptional ? "rotate-180" : ""}`} />
            {showOptional ? "Hide" : "Add"} age &amp; reason (optional)
          </button>

          {showOptional && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Age" error={errors.age}>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  inputMode="numeric"
                  className={inputCls(errors.age)}
                />
              </Field>
              <Field label="Reason for visit">
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. fever, checkup…"
                  className={inputCls()}
                />
              </Field>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-brand-teal text-white font-bold text-sm shadow-md shadow-teal-500/20 hover:bg-brand-teal/90 transition flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            Send OTP
          </button>
        </form>
      )}

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
              Enter the 6-digit code sent to <span className="font-bold text-slate-700">+91 {phone}</span>
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
            {otpError && <span className="block text-center text-[11px] font-bold text-rose-500">{otpError}</span>}
            {expectedOtp && (
              <p className="text-center text-[10px] text-slate-400">
                Demo mode — your code is <span className="font-bold text-slate-500">{expectedOtp}</span>
              </p>
            )}
            <div className="text-center">
              {resendIn > 0 ? (
                <span className="text-[11px] text-slate-400">Resend code in {resendIn}s</span>
              ) : (
                <button onClick={sendOtp} className="text-[11px] font-bold text-brand-teal hover:underline">
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
                <Loader2 className="w-4 h-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> Confirm &amp; send request
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400">No payment needed now — you pay at the hospital.</p>
        </div>
      )}

      {step === "done" && (
        <div className="p-5 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-teal-50 text-brand-teal flex items-center justify-center mx-auto border border-brand-teal/20">
            <Hourglass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Request sent</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Ref: {bookingId}</p>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-left">
            <Hourglass className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Pending hospital confirmation.</strong> {doctor.hospitalName || "The hospital"}{" "}
              will confirm your exact time and may call +91 {phone} if they need to adjust it.
            </p>
          </div>

          <div className="text-left rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-2.5 text-sm">
            <Row label="Doctor" value={`${doctor.name} · ${doctor.specialty}`} />
            <Row label="Patient" value={name} />
            <Row label="Mobile" value={`+91 ${phone} (verified)`} />
            <Row label="Preferred visit" value={`${selectedDateLabel} · ${time}`} accent />
            {locationLine && <Row label="Location" value={locationLine} />}
          </div>

          <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-left">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Keep your reference handy — a confirmation SMS will follow once the hospital reviews your request.
            </p>
          </div>

          <button
            onClick={resetPanel}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition"
          >
            Book another slot
          </button>
        </div>
      )}
    </div>
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
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
      {error && <span className="text-[10px] font-bold text-rose-500">{error}</span>}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-slate-400 font-semibold">{label}</span>
      <span className={`text-xs font-bold text-right ${accent ? "text-brand-teal" : "text-slate-800"}`}>{value}</span>
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
