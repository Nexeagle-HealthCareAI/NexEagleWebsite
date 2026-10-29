"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Mail, MapPin, Phone } from "lucide-react";
import { WHATSAPP } from "@/components/site/PageHero";

const INTERESTS = ["1HMS hospital software", "1Rad PACS & AI reports", "1Lab", "1Pharma", "Vita for patients", "Not sure yet"];
const ROLES = ["Hospital owner / director", "Doctor", "Administrator / manager", "Radiologist / diagnostic centre", "Other"];

const field = "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-[0.98rem] text-[#0e2343] outline-none transition-colors placeholder:text-slate-400 focus:border-[#1ea99b] focus:ring-4 focus:ring-[#1ea99b]/15";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", hospital: "", city: "", role: ROLES[0], message: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggle = (i: string) => setInterests((xs) => (xs.includes(i) ? xs.filter((x) => x !== i) : [...xs, i]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@nexeagle.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Demo request: ${form.hospital || form.name}${form.city ? `, ${form.city}` : ""}`,
          name: form.name,
          phone: form.phone,
          email: form.email,
          hospital: form.hospital,
          city: form.city,
          role: form.role,
          interested_in: interests.join(", ") || "Not specified",
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="pb-20 sm:pb-28" aria-label="Contact NexEagle">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
        {/* Form */}
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(14,35,67,0.35)] sm:p-9 lg:col-span-7">
          <AnimatePresence mode="wait">
            {state === "sent" ? (
              <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1ea99b] text-white">
                  <Check className="h-8 w-8" strokeWidth={3} />
                </motion.span>
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.02em] text-[#0e2343]">Thanks, {form.name.split(" ")[0] || "we've got it"}.</h2>
                <p className="mx-auto mt-3 max-w-md text-slate-600">We&apos;ll call you within one working day to set up your demo. Need us sooner? Message us on WhatsApp.</p>
                <a href={WHATSAPP("Hi NexEagle, I just sent a demo request.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex h-12 items-center rounded-full bg-[#25d366] px-6 font-semibold text-[#073b1f]">Message on WhatsApp</a>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={false} exit={{ opacity: 0 }} className="space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343] sm:text-3xl">Book a demo</h2>
                  <p className="mt-1.5 text-slate-600">A 30-minute call, around your own hospital&apos;s workflow.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#0e2343]">Your name</span><input required className={field} value={form.name} onChange={set("name")} autoComplete="name" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#0e2343]">Phone / WhatsApp</span><input required type="tel" className={field} value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+91" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#0e2343]">Hospital or centre</span><input className={field} value={form.hospital} onChange={set("hospital")} autoComplete="organization" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#0e2343]">City</span><input className={field} value={form.city} onChange={set("city")} autoComplete="address-level2" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#0e2343]">Email <span className="font-normal text-slate-400">(optional)</span></span><input type="email" className={field} value={form.email} onChange={set("email")} autoComplete="email" /></label>
                  <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#0e2343]">You are</span>
                    <select className={field} value={form.role} onChange={set("role")}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
                  </label>
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-[#0e2343]">Interested in</legend>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((i) => {
                      const on = interests.includes(i);
                      return (
                        <button type="button" key={i} onClick={() => toggle(i)} aria-pressed={on} className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${on ? "border-[#1ea99b] bg-[#1ea99b] text-white" : "border-slate-300 bg-white text-[#0e2343] hover:border-[#1ea99b]"}`}>
                          {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          <span className={on ? "text-white" : "text-[#0e2343]"}>{i}</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label className="block"><span className="mb-1.5 block text-sm font-medium text-[#0e2343]">Anything we should know? <span className="font-normal text-slate-400">(optional)</span></span>
                  <textarea rows={3} className={`${field} h-auto py-3`} value={form.message} onChange={set("message")} placeholder="Number of beds, current software, what you'd like to fix first…" />
                </label>
                {state === "error" && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">That didn&apos;t send. Please try again, or call or WhatsApp us on +91 80749 06808.</p>}
                <button type="submit" disabled={state === "sending"} className="h-[3.25rem] w-full rounded-full bg-[#0e2343] font-semibold text-white transition-colors hover:bg-[#13305c] disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Request my demo"}
                </button>
                <p className="text-center text-xs text-slate-500">We use these details only to contact you about NexEagle.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Other ways */}
        <aside className="space-y-4 lg:col-span-5">
          <a href={WHATSAPP("Hi NexEagle, I'd like a demo for my hospital.")} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-[#25d366]/10 p-5 transition-colors hover:bg-[#25d366]/20">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25d366] text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>
            </span>
            <span><span className="block font-display text-lg font-semibold text-[#0e2343]">WhatsApp us</span><span className="block text-sm text-slate-600">Fastest reply, in English or Hindi</span></span>
          </a>
          <a href="tel:+918074906808" className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition-colors hover:border-[#1ea99b]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1ea99b]/10 text-[#12857a]"><Phone className="h-5 w-5" /></span>
            <span><span className="block font-display text-lg font-semibold text-[#0e2343]">+91 80749 06808</span><span className="block text-sm text-slate-600">Call us</span></span>
          </a>
          <a href="mailto:info@nexeagle.com" className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition-colors hover:border-[#1ea99b]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1ea99b]/10 text-[#12857a]"><Mail className="h-5 w-5" /></span>
            <span><span className="block font-display text-lg font-semibold text-[#0e2343]">info@nexeagle.com</span><span className="block text-sm text-slate-600">Email us</span></span>
          </a>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <MapPin className="h-5 w-5 text-[#12857a]" />
              <p className="mt-3 font-semibold text-[#0e2343]">Kolkata, West Bengal</p>
              <p className="mt-1 text-sm text-slate-600">Our team also works on site with hospitals in Bihar. Visits by appointment.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <Clock className="h-5 w-5 text-[#12857a]" />
              <p className="mt-3 font-semibold text-[#0e2343]">Mon–Fri 9–6, Sat 10–4</p>
              <p className="mt-1 text-sm text-slate-600">Closed Sunday. Live hospitals have a named support contact.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="font-display font-semibold text-[#0e2343]">What happens next</p>
            <ol className="mt-3 space-y-2.5 text-sm text-slate-600">
              {["We call you within one working day.", "A 30-minute demo around your workflow.", "If it fits, we visit your hospital and plan go-live."].map((s, i) => (
                <li key={s} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0e2343] text-xs font-semibold text-white">{i + 1}</span><span className="pt-0.5 text-slate-600">{s}</span></li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
