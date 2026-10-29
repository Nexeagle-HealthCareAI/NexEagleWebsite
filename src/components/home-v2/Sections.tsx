"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FileLock2, History, KeyRound, MapPin, Phone, ServerCog, UserCheck } from "lucide-react";
import { Photo } from "./Photo";
import { FlyingVita } from "./FlyingVita";
import { useEffect, useState } from "react";

/* ── Live customers (real) ──────────────────────────────────────────────────────── */
const CLIENTS = [
  { name: "Sparsh Hospital", place: "Kishanganj", url: "https://sparshhospitalkishanganj.com/", logo: "/assets/sparsh_logo_resized.png" },
  { name: "Glisan Super Speciality Hospital", place: "Purnea", url: "https://www.facebook.com/p/Glisan-Super-Speciality-Hospital-Purnea-61576274793889/" },
  { name: "AG Smart Scan Diagnostic Centre", place: "Diagnostics & imaging", url: "https://share.google/2ADNkQXtrRt4w6ewv" },
];

export function ClientsStrip() {
  return (
    <section aria-label="Hospitals using NexEagle" className="border-y border-slate-200/70 bg-white/60">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:gap-10 lg:px-12">
        <p className="shrink-0 text-sm text-slate-500">Running today at</p>
        <ul className="grid gap-3 sm:grid-cols-3 md:flex md:flex-1 md:justify-between md:gap-8">
          {CLIENTS.map((c) => (
            <li key={c.name}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1ea99b]">
                <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                  {c.logo ? (
                    <Image src={c.logo} alt="" width={40} height={40} className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="font-display text-sm font-bold text-[#0e2343]">{c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
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
    <section className="bg-[#0e2343] py-20 text-white sm:py-28" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <h2 id="trust-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl">
            Your patients&apos; data stays in India
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Patients trust you with their records. These are the protections every NexEagle hospital gets.
          </p>
          <Link href="/security" className="mt-8 inline-flex h-12 items-center rounded-full border border-white/25 px-6 font-semibold transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]">
            How we protect data
          </Link>
          <Image src="/assets/vita/vita-relax.webp" alt="Vita relaxing on a cushion" width={725} height={640} sizes="240px" className="mt-12 hidden h-auto w-[240px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] lg:block" />
        </div>
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {TRUST.map(({ Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-[#4fd1c1]" />
              <span>
                <span className="block font-display text-lg font-semibold text-white">{title}</span>
                <span className="mt-1 block leading-relaxed text-slate-300">{body}</span>
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
          Book a demo and we&apos;ll walk through your own workflow, from registration to discharge. Prefer to talk? Call us.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="inline-flex h-[3.25rem] items-center justify-center rounded-full bg-white px-7 font-semibold text-[#0e2343] transition-colors hover:bg-[#e9f6f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Book a demo
          </Link>
          <a href="tel:+918074906808" className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/40 px-7 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <Phone className="h-4 w-4" />
            +91 80749 06808
          </a>
        </div>
      </div>
    </section>
  );
}
