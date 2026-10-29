"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Photo, type PhotoKey } from "./Photo";

const STEPS: { photo: PhotoKey; title: string; body: string; product: string }[] = [
  {
    photo: "reception",
    title: "Checked in from the booking",
    body: "The patient booked with Vita, so 1HMS Vita already has their details. Reception confirms in a click and hands over the token. No forms, no second queue.",
    product: "1HMS Vita",
  },
  {
    photo: "consult",
    title: "The doctor talks, the notes write themselves",
    body: "The AI scribe drafts the prescription and case notes while the doctor speaks. The doctor reviews, edits and signs, then the prescription goes to the patient by SMS or WhatsApp.",
    product: "1HMS Vita",
  },
  {
    photo: "radiology",
    title: "1Rad Vita reads the scan first",
    body: "The X-ray order reaches radiology instantly. 1Rad Vita analyses the images, marks what needs a closer look and drafts the report. The radiologist reviews and signs, from the hospital or from home.",
    product: "1Rad Vita",
  },
  {
    photo: "lab",
    title: "Samples tracked from collection to result",
    body: "Labelled samples move through the lab with their status visible to the doctor. Results land in the patient's record the moment they are approved.",
    product: "1HMS Vita + 1Lab",
  },
  {
    photo: "pharmacy",
    title: "Medicines and the bill are already waiting",
    body: "The pharmacy sees the prescription before the patient arrives, stock updates itself, and every service used along the way is already on one bill.",
    product: "1HMS Vita + 1Pharma",
  },
];


const ease = [0.22, 1, 0.36, 1] as const;
const AVATAR: Record<number, string> = { 0: "/assets/vita/avatar-coffee.webp", 1: "/assets/vita/avatar-coffee.webp", 2: "/assets/vita/avatar-think.webp", 3: "/assets/vita/avatar-coffee.webp", 4: "/assets/vita/avatar-coffee.webp" };
const AGENT: Record<number, string> = { 0: "1HMS Vita", 1: "1HMS Vita", 2: "1Rad Vita", 3: "1HMS Vita", 4: "1HMS Vita" };

function Tick({ d, children }: { d: number; children: React.ReactNode }) {
  return (
    <motion.li initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: d, duration: 0.35, ease }} className="flex items-center gap-2 text-[12.5px] text-[#0e2343]">
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: d + 0.25, type: "spring", stiffness: 500, damping: 20 }} className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#1ea99b] text-white">
        <Check className="h-2.5 w-2.5" strokeWidth={4} />
      </motion.span>
      {children}
    </motion.li>
  );
}

/* What Vita is doing in this photo, drawn over it and replayed every time the step comes into view */
function StepOverlay({ i }: { i: number }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* step-specific effect on the photo itself */}
      {i === 2 && (
        <>
          <motion.div initial={{ top: "-15%" }} animate={{ top: "115%" }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }} className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#4fd1c1]/45 to-transparent" />
          <motion.div initial={{ opacity: 0, scale: 1.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, duration: 0.4 }} className="pointer-events-none absolute left-[46%] top-[28%] h-[22%] w-[20%] rounded-lg border-2 border-amber-400">
            <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-semibold text-[#0b1220]">Look closer 0.91</span>
          </motion.div>
        </>
      )}
      {i === 0 && (
        <motion.span initial={{ scale: 0.6, opacity: 0.8 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} className="pointer-events-none absolute left-[48%] top-[45%] h-16 w-16 rounded-full border-2 border-white" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease, delay: 0.25 }}
        className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/92 p-3.5 shadow-[0_20px_50px_-20px_rgba(14,35,67,0.6)] backdrop-blur-md sm:right-auto sm:w-[19rem]"
      >
        <div className="mb-2.5 flex items-center gap-2">
          <Image src={AVATAR[i]} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
          <span className="font-display text-[0.9rem] font-semibold text-[#0e2343]">{AGENT[i]}</span>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-600"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />Live</span>
        </div>

        {i === 0 && (
          <ul className="space-y-1.5">
            <Tick d={0.6}>Booking found: Ramesh Y., 11:30</Tick>
            <Tick d={1.2}>Details filled in, no forms</Tick>
            <motion.li initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.9, type: "spring", stiffness: 300, damping: 18 }} className="mt-2 flex items-center justify-between rounded-xl bg-[#0e2343] px-3 py-2 text-white">
              <span className="text-[11px] !text-white/70">OPD token</span>
              <span className="font-display text-lg font-semibold !text-white">A-14</span>
            </motion.li>
          </ul>
        )}

        {i === 1 && (
          <div>
            <div className="flex h-8 items-center gap-[3px]">
              {Array.from({ length: 28 }).map((_, k) => (
                <motion.span key={k} className="w-[3px] rounded-full bg-[#8a6fe0]" animate={{ height: [4, 6 + ((k * 7) % 22), 4] }} transition={{ duration: 0.7 + (k % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: (k % 7) * 0.05 }} />
              ))}
              <span className="ml-2 text-[11px] text-slate-500">Listening…</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              <Tick d={0.9}>Notes drafted from the consultation</Tick>
              <Tick d={1.6}>Rx: Amoxicillin 500 mg, 5 days</Tick>
              <Tick d={2.3}>Sent to patient on WhatsApp</Tick>
            </ul>
          </div>
        )}

        {i === 2 && (
          <ul className="space-y-1.5">
            <Tick d={0.5}>Study received from the scanner</Tick>
            <Tick d={1.5}>AI vision: 1 region to review</Tick>
            <Tick d={2.2}>Report drafted, waiting for signature</Tick>
          </ul>
        )}

        {i === 3 && (
          <div>
            <p className="text-[12.5px] font-semibold text-[#0e2343]">Sample LB-2291: CBC</p>
            <div className="mt-2 flex gap-1.5">
              {["Collected", "Received", "Processed", "Approved"].map((t, k) => (
                <div key={t} className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <motion.div className="h-full origin-left bg-[#8a6fe0]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5 + k * 0.6, duration: 0.5 }} />
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500">{t}</p>
                </div>
              ))}
            </div>
            <ul className="mt-2"><Tick d={3}>Result added to the patient record</Tick></ul>
          </div>
        )}

        {i === 4 && <BillCard />}
      </motion.div>
    </MotionConfig>
  );
}

function BillCard() {
  const items = [
    { n: "Consultation", v: 300 },
    { n: "Chest X-ray", v: 450 },
    { n: "CBC", v: 220 },
    { n: "Medicines", v: 170 },
  ];
  const total = useMotionValue(0);
  const shown = useTransform(total, (v) => "₹" + Math.round(v).toLocaleString("en-IN"));
  useEffect(() => {
    const c = animate(total, 1140, { duration: 2.2, delay: 0.5, ease: "easeOut" });
    return () => c.stop();
  }, [total]);
  return (
    <div>
      <ul className="space-y-1">
        {items.map((it, k) => (
          <motion.li key={it.n} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + k * 0.45 }} className="flex justify-between text-[12.5px] text-slate-600">
            <span>{it.n}</span><span>₹{it.v}</span>
          </motion.li>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
        <span className="text-[12.5px] font-semibold text-[#0e2343]">One bill, ready</span>
        <motion.span className="font-display text-lg font-semibold text-[#12857a]">{shown}</motion.span>
      </div>
    </div>
  );
}

function Step({ i, active, onActive }: { i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const mobileSeen = useInView(ref, { once: true, margin: "-25% 0px" });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  const s = STEPS[i];
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease }}
      className="relative pl-10 lg:flex lg:min-h-[62vh] lg:items-center lg:pl-14"
    >
      <motion.span
        aria-hidden
        animate={active ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute left-0 top-1 z-10 grid h-7 w-7 place-items-center rounded-full border text-[0.8rem] font-semibold transition-colors duration-500 lg:top-1/2 lg:-translate-y-1/2 ${
          active ? "border-[#1ea99b] bg-[#1ea99b] text-white shadow-[0_0_0_6px_rgba(30,169,155,0.15)]" : "border-slate-300 bg-white text-slate-500"
        }`}
      >
        {i + 1}
      </motion.span>
      <div className={`relative w-full rounded-3xl transition-all duration-500 lg:p-7 ${active ? "lg:bg-white lg:shadow-[0_24px_60px_-30px_rgba(14,35,67,0.35)] lg:ring-1 lg:ring-slate-200" : "lg:opacity-60"}`}>
        {/* phones & tablets: photo with its own Vita overlay */}
        <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-3xl lg:hidden">
          <Photo k={s.photo} sizes="(max-width: 1024px) 100vw, 0px" className="absolute inset-0 h-full w-full" />
          {mobileSeen && <StepOverlay i={i} />}
        </div>
        <p className="text-sm font-medium text-[#12857a]">{s.product}</p>
        <h3 className="mt-1 font-display text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.025em] text-[#0e2343] sm:text-[2rem]">
          {s.title}
        </h3>
        <p className="mt-3 max-w-[32rem] text-[1.03rem] leading-relaxed text-slate-600">{s.body}</p>
      </div>
    </motion.li>
  );
}

export default function PatientJourney() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative bg-white py-20 sm:py-28" aria-labelledby="journey-title">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h2 id="journey-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">
            What it looks like inside your hospital
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Vita works in the background, so your staff spend their time on patients instead of paperwork.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-6 lg:grid-cols-12 lg:gap-16">
          {/* desktop: one sticky photo that changes with the step in view */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(50vh-17rem)] h-[34rem] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(14,35,67,0.45)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <motion.div className="absolute inset-0" initial={{ scale: 1 }} animate={reduce ? undefined : { scale: 1.1 }} transition={{ duration: 9, ease: "linear" }}>
                    <Photo k={STEPS[active].photo} sizes="(min-width: 1024px) 50vw, 0px" className="h-full w-full" />
                  </motion.div>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0e2343]/45 via-transparent to-transparent" />
                  <StepOverlay i={active} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#0e2343] backdrop-blur">
                Step {active + 1} of {STEPS.length}
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            {/* progress rail */}
            <div aria-hidden className="absolute bottom-0 left-[13px] top-0 w-px bg-slate-200">
              <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-[#1ea99b]" />
            </div>
            <ol ref={listRef} className="space-y-16 lg:space-y-6">
              {STEPS.map((_, i) => (
                <Step key={i} i={i} active={active === i} onActive={setActive} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
