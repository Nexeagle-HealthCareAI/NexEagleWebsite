"use client";

// "What it looks like inside your hospital": five cards that stick and stack as you scroll.
// Each card is a pure animation of one step: what comes in, what Vita does, what your team gets,
// with the steps lighting up in order and data flowing between the columns.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MotionConfig, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

type Col = { title: string; items: string[] };
type Step = { agent: string; avatar: string; title: string; body: string; inn: Col; vita: Col; out: Col };

const STEPS: Step[] = [
  {
    agent: "1HMS Vita",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "Checked in from the booking",
    body: "The patient booked with Vita, so their details are already there. Reception confirms in a click and hands over the token. No forms, no second queue.",
    inn: { title: "Comes in", items: ["Booking from Doctor Dekho", "Patient's phone number", "Doctor and time slot"] },
    vita: { title: "Vita does", items: ["Finds the patient record", "Fills in registration", "Places them in the queue"] },
    out: { title: "Your team gets", items: ["OPD token A-14", "Live queue on screen", "Doctor notified"] },
  },
  {
    agent: "1HMS Vita",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "The doctor talks, the notes write themselves",
    body: "The AI scribe listens to the consultation and drafts the notes and prescription. The doctor reviews, edits and signs, and the patient gets it on WhatsApp.",
    inn: { title: "Comes in", items: ["Doctor–patient conversation", "Vitals from the nurse", "Past visits"] },
    vita: { title: "Vita does", items: ["Transcribes the consultation", "Drafts notes and prescription", "Prepares lab and scan orders"] },
    out: { title: "Your team gets", items: ["Rx signed by the doctor", "Sent to patient on WhatsApp", "Orders in lab and radiology"] },
  },
  {
    agent: "1Rad Vita",
    avatar: "/assets/vita/avatar-think.webp",
    title: "1Rad Vita reads the scan first",
    body: "The study arrives from the scanner. Vita runs AI vision analysis, marks what needs a closer look and drafts the report. The radiologist reviews and signs, from anywhere.",
    inn: { title: "Comes in", items: ["X-ray from the scanner", "Doctor's clinical note", "Earlier studies"] },
    vita: { title: "Vita does", items: ["AI vision analysis", "Marks regions to review", "Drafts a structured report"] },
    out: { title: "Your team gets", items: ["Radiologist reviews and signs", "Report back to the doctor", "Images in cloud PACS"] },
  },
  {
    agent: "1HMS Vita + 1Lab",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "Samples tracked from collection to result",
    body: "Every sample is followed from the collection desk to the approved result. Abnormal values are flagged before the report reaches the doctor.",
    inn: { title: "Comes in", items: ["CBC and glucose ordered", "Sample LB-2291 collected", "Machine readings"] },
    vita: { title: "Vita does", items: ["Tracks each sample's status", "Flags abnormal values", "Notifies the doctor"] },
    out: { title: "Your team gets", items: ["Approved result", "Added to the patient record", "Report the patient can download"] },
  },
  {
    agent: "1HMS Vita + 1Pharma",
    avatar: "/assets/vita/avatar-coffee.webp",
    title: "Medicines and the bill are already waiting",
    body: "The pharmacy sees the prescription before the patient arrives, stock updates itself, and every service used along the way is already on one bill.",
    inn: { title: "Comes in", items: ["Signed prescription", "Services used today", "Stock levels"] },
    vita: { title: "Vita does", items: ["Reserves the medicines", "Adds everything to one bill", "Sets a follow-up reminder"] },
    out: { title: "Your team gets", items: ["Medicines ready at the counter", "One bill: ₹1,140", "Reminder in 7 days"] },
  },
];

const TONE = {
  inn: { panel: "bg-slate-100", head: "text-slate-500", on: "ring-slate-300" },
  vita: { panel: "bg-[#1ea99b]", head: "text-white/85", on: "ring-white" },
  out: { panel: "bg-[#0e2343]", head: "text-white/70", on: "ring-[#4fd1c1]" },
} as const;

/* Dots travelling along the arrow between two columns */
function Flow({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`relative flex shrink-0 items-center justify-center ${vertical ? "h-8 w-full" : "h-full w-8"}`} aria-hidden>
      <span className={`absolute ${vertical ? "left-1/2 top-0 h-full w-0 -translate-x-1/2 border-l border-dashed" : "left-0 top-1/2 h-0 w-full -translate-y-1/2 border-t border-dashed"} border-slate-300`} />
      {[0, 1, 2].map((k) => (
        <motion.span
          key={k}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#1ea99b] shadow-[0_0_8px_#1ea99b]"
          style={vertical ? { left: "calc(50% - 3px)" } : { top: "calc(50% - 3px)" }}
          animate={vertical ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: k * 0.4, ease: "linear" }}
        />
      ))}
      <ArrowRight className={`relative h-4 w-4 bg-white text-slate-400 ${vertical ? "rotate-90" : ""}`} />
    </div>
  );
}

function Column({ col, tone, from, lit, avatar }: { col: Col; tone: keyof typeof TONE; from: number; lit: number; avatar?: string }) {
  const t = TONE[tone];
  const dark = tone !== "inn";
  return (
    <div className={`relative flex min-w-0 flex-1 flex-col rounded-2xl p-3 sm:p-4 ${t.panel}`}>
      <div className="mb-3 flex items-center gap-2">
        {avatar && (
          <motion.span animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }} className="block">
            <Image src={avatar} alt="" width={26} height={26} className="h-6 w-6 rounded-full ring-2 ring-white/60" />
          </motion.span>
        )}
        <p className={`text-[12px] font-semibold ${t.head}`}>{col.title}</p>
      </div>
      <ul className="space-y-2">
        {col.items.map((it, k) => {
          const on = lit >= from + k;
          const now = lit === from + k;
          return (
            <motion.li
              key={it}
              animate={{ opacity: on ? 1 : 0.5, scale: now ? 1.04 : 1, y: on ? 0 : 4 }}
              transition={{ duration: 0.35 }}
              className={`relative flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 text-[12px] leading-snug shadow-sm sm:text-[12.5px] ${now ? `ring-2 ${t.on}` : ""}`}
            >
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? (dark ? "bg-[#1ea99b] text-white" : "bg-[#0e2343] text-white") : "bg-slate-200 text-transparent"}`}>
                <Check className="h-2.5 w-2.5" strokeWidth={4} />
              </span>
              <span className="min-w-0 text-[#0e2343]">{it}</span>
              {now && (
                <motion.span className="pointer-events-none absolute inset-0 rounded-xl" initial={{ boxShadow: "0 0 0 0 rgba(79,209,193,0.6)" }} animate={{ boxShadow: "0 0 0 12px rgba(79,209,193,0)" }} transition={{ duration: 0.9 }} />
              )}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/* The animated pipeline: chips light up one by one, then the loop restarts */
function Pipeline({ s, playing }: { s: Step; playing: boolean }) {
  const reduce = useReducedMotion();
  const total = s.inn.items.length + s.vita.items.length + s.out.items.length;
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    if (reduce) { setLit(total); return; }
    if (!playing) return;
    const id = setInterval(() => setLit((n) => (n >= total + 3 ? -1 : n + 1)), 600);
    return () => clearInterval(id);
  }, [playing, reduce, total]);
  const a = s.inn.items.length;
  const b = a + s.vita.items.length;
  return (
    <div className="flex flex-col items-stretch sm:flex-row">
      <Column col={s.inn} tone="inn" from={0} lit={lit} />
      <div className="sm:hidden"><Flow vertical /></div>
      <div className="hidden sm:flex"><Flow /></div>
      <Column col={s.vita} tone="vita" from={a} lit={lit} avatar={s.avatar} />
      <div className="sm:hidden"><Flow vertical /></div>
      <div className="hidden sm:flex"><Flow /></div>
      <Column col={s.out} tone="out" from={b} lit={lit} />
    </div>
  );
}

function Card({ s, i, n, progress }: { s: Step; i: number; n: number; progress: MotionValue<number> }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });
  // once later cards slide over this one, it shrinks back a little, like a stack of cards
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.035]);
  return (
    <div className="lg:sticky" style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}>
      <motion.article
        ref={ref}
        style={{ scale }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="origin-top rounded-[1.75rem] border border-slate-200/70 bg-white p-5 shadow-[0_30px_80px_-40px_rgba(14,35,67,0.45)] sm:p-8 lg:grid lg:min-h-[25rem] lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-10"
      >
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0e2343] font-display text-sm font-semibold text-white">{i + 1}</span>
            <span className="rounded-full bg-[#1ea99b]/10 px-3 py-1 text-sm font-medium text-[#12857a]">{s.agent}</span>
          </div>
          <h3 className="mt-5 font-display text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.025em] text-[#0e2343] sm:text-[2rem]">{s.title}</h3>
          <p className="mt-3 leading-relaxed text-slate-600">{s.body}</p>
        </div>
        <div className="mt-6 lg:col-span-8 lg:mt-0">
          <Pipeline s={s} playing={inView} />
        </div>
      </motion.article>
    </div>
  );
}

export default function PatientJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative isolate py-20 sm:py-28" aria-labelledby="journey-title">
      {/* soft light streaks behind the cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eaf7f5_0%,#f1f5fb_50%,#ffffff_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[repeating-linear-gradient(90deg,rgba(30,169,155,0.07)_0_80px,rgba(21,153,219,0.05)_80px_160px,transparent_160px_250px)] [mask-image:linear-gradient(180deg,black,transparent)]" />

      <MotionConfig reducedMotion="user">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="journey-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">
              What it looks like inside your hospital
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              At every counter, Vita takes what comes in, does the busywork and hands your team something ready to use.
            </p>
          </div>

          <div ref={ref} className="mt-14 space-y-6 lg:space-y-10">
            {STEPS.map((s, i) => (
              <Card key={s.title} s={s} i={i} n={STEPS.length} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </MotionConfig>
    </section>
  );
}
