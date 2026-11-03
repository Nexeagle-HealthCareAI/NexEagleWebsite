"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, FileLock2, History, KeyRound, MapPin, Phone, Milestone, ServerCog, UserCheck, Users } from "lucide-react";
import { Photo } from "./Photo";
import { FlyingVita } from "./FlyingVita";
import { useEffect, useState } from "react";
import { CUSTOMERS } from "@/lib/customers";

/* ── Live customers (real) ──────────────────────────────────────────────────────── */
const CLIENTS = CUSTOMERS.map((c) => ({ name: c.name, place: c.place ?? c.type, url: c.url, logo: c.logo, initials: c.initials }));

export function ClientsStrip() {
  return (
    <section aria-label="Hospitals using NexEagle" className="border-y border-slate-200/70 bg-white/60">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:gap-10 lg:px-12">
        <p className="shrink-0 text-sm text-slate-500">Running today in Kishanganj and Purnea, Bihar</p>
        <ul className="grid gap-3 sm:grid-cols-3 md:flex md:flex-1 md:justify-between md:gap-8">
          {CLIENTS.map((c) => (
            <li key={c.name}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1ea99b]">
                <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {c.logo ? (
                    <Image src={c.logo} alt="" width={40} height={40} className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="font-display text-sm font-bold text-[#0e2343]">{c.initials}</span>
                  )}
                </span>
                <span className="leading-tight">
                  <span className="block font-semibold text-[#0e2343] group-hover:text-[#12857a]">{c.name}</span>
                  <span className="block text-sm text-slate-500">{c.place}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Onboarding: a real sequence, so numbered ───────────────────────────────────── */
const GO_LIVE = [
  { title: "We visit and map your workflow", body: "Our team sees how your OPD, wards, counters and departments run today." },
  { title: "We set it up and bring your data in", body: "Doctors, services, rates, stock and existing records are configured for you." },
  { title: "We train every role on site", body: "Reception, doctors, nurses, lab, pharmacy and accounts, in English or Hindi." },
  { title: "You go live, we stay close", body: "A named contact supports your staff through the first weeks and after." },
];

export function GoLive() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[#f4f8f8] py-20 sm:py-28" aria-labelledby="golive-title">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="golive-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl lg:col-span-6">
            Going live is our job, not your staff&apos;s
          </h2>
          <div className="flex items-end gap-5 lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-slate-600">
              Software only helps once people use it. We do the setup and the training in your hospital, so day one feels normal.
            </p>
            <Image src="/assets/vita/vita-coffee.webp" alt="Vita with a cup of coffee, ready to help" width={538} height={640} sizes="130px" className="hidden h-auto w-[110px] shrink-0 sm:block lg:w-[130px]" />
          </div>
        </div>
        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}
          className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          <motion.span
            aria-hidden
            variants={{ hidden: { scaleX: reduce ? 1 : 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } } }}
            className="absolute left-0 right-0 top-[1.15rem] hidden h-px origin-left bg-[#1ea99b]/50 lg:block"
          />
          {GO_LIVE.map((s, i) => (
            <motion.li
              key={s.title}
              variants={{ hidden: reduce ? {} : { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="relative"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[#0e2343] font-display text-sm font-semibold text-white ring-8 ring-[#f4f8f8]">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-[#0e2343]">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ── Data protection ────────────────────────────────────────────────────────────── */
const TRUST = [
  { Icon: MapPin, title: "Hosted in India", body: "Clinical and billing data is stored on servers in India." },
  { Icon: FileLock2, title: "DPDP Act aligned", body: "Built around India's Digital Personal Data Protection Act, 2023." },
  { Icon: UserCheck, title: "A login for every role", body: "Reception, doctors, billing and admin each see only what they need." },
  { Icon: History, title: "Full audit trail", body: "Every view and change to a record is logged with who and when." },
  { Icon: KeyRound, title: "Encrypted", body: "Data is encrypted in transit and at rest." },
  { Icon: ServerCog, title: "Your data stays yours", body: "Export your records whenever you need to. No lock-in." },
];

export function DataTrust() {
  return (
    <section className="bg-[#f4f8f8] py-20 sm:py-28" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <h2 id="trust-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">
            Your patients&apos; data stays in India
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Patients trust you with their records. These are the protections every NexEagle hospital gets.
          </p>
          <Link href="/trust" className="mt-8 inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-6 font-semibold text-[#0e2343] transition-[border-color,transform] hover:border-[#1ea99b] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]">
            How we protect data
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {TRUST.map(({ Icon, title, body }) => (
            <li key={title} data-spot className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1ea99b]/10 text-[#12857a]"><Icon className="h-5 w-5" /></span>
              <span>
                <span className="block font-display text-lg font-semibold text-[#0e2343]">{title}</span>
                <span className="mt-1 block leading-relaxed text-slate-600">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Vita hovering over the closing banner: a few powered beats, then a glide, on a loop. */
function CTAFlight() {
  const [glide, setGlide] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setGlide((g) => !g), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]">
      <FlyingVita mode={glide ? "glide" : "flap"} beat={0.6} />
    </div>
  );
}

const SMALL_STEPS = [
  { key: "guide", label: "Read a 5-minute guide", href: "/guides", Icon: BookOpen },
  { key: "golive", label: "See how going live works", href: "/how-it-works", Icon: Milestone },
  { key: "reference", label: "Talk to a hospital that uses it", href: "/customers", Icon: Users },
];

/* ── Closing call to action over a full-bleed photo ─────────────────────────────── */
export function ClosingCTA() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="cta-title">
      {/* Vita flies in when the banner scrolls into view */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 160, y: -40, rotate: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[-6%] top-6 z-0 w-[210px] sm:right-[-2%] sm:w-[320px] lg:right-[3%] lg:top-[12%] lg:w-[min(40vw,540px)]"
      >
        <CTAFlight />
      </motion.div>
      <Photo k="corridor" sizes="100vw" className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(14,35,67,0.92)_0%,rgba(14,35,67,0.78)_45%,rgba(14,35,67,0.35)_100%)]" />
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-24 pt-44 sm:px-8 sm:py-32 lg:px-12">
        <h2 id="cta-title" className="max-w-2xl font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl">
          See NexEagle running in a hospital like yours
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
          Book a 30-minute demo around your own workflow, or ask us anything on WhatsApp first. No obligation either way.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/contact" data-track="cta_book_demo" className="inline-flex h-[3.25rem] items-center justify-center rounded-full bg-white px-7 font-semibold text-[#0e2343] transition-[background-color,transform] hover:bg-[#e9f6f4] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Book a demo
          </Link>
          <a href="https://wa.me/918074906808?text=Hi%20NexEagle%2C%20I%20have%20a%20question%20about%20your%20hospital%20software." target="_blank" rel="noopener noreferrer" data-track="cta_whatsapp" className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#25d366] px-7 font-semibold text-[#073b1f] transition-[background-color,transform] hover:bg-[#3ee07a] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>
            Ask on WhatsApp
          </a>
        </div>
        <p className="mt-5 text-sm text-slate-300">
          Prefer to talk?{" "}
          <a href="tel:+918074906808" data-track="cta_call" className="inline-flex items-center gap-1.5 py-2 font-semibold text-white underline-offset-4 hover:underline">
            <Phone className="h-3.5 w-3.5" />
            +91 80749 06808
          </a>
        </p>

        {/* Smaller steps for anyone not ready for a demo yet */}
        <div className="mt-12 max-w-3xl border-t border-white/15 pt-6">
          <p className="text-sm font-medium text-slate-300">Not ready for a demo yet?</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SMALL_STEPS.map((st) => (
              <li key={st.href}>
                <Link href={st.href} data-track={`cta_step_${st.key}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white backdrop-blur transition-[background-color,border-color,transform] hover:border-white/50 hover:bg-white/10 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <st.Icon className="h-4 w-4 text-[#5fd6c9]" />
                  <span className="text-white">{st.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="h-4 w-4 text-[#5fd6c9]" />
            <span className="text-slate-300">Running every day in hospitals in Kishanganj and Purnea, Bihar</span>
          </p>
        </div>
      </div>
    </section>
  );
}
