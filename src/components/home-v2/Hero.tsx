"use client";

// Homepage hero: one clear promise to hospital owners on the left; on the right a living 3D
// hospital (people, vehicles, Vita flying overhead) seen from a new angle at every step.
// The steps autoplay until the visitor picks one.

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import { avatarFor } from "./VitaPanels";
import { SCREENS, type Screen } from "./StoryScene";

const StoryScene = dynamic(() => import("./StoryScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-3/4 w-3/4 rounded-[45%] bg-[radial-gradient(closest-side,hsl(var(--brand-teal)/0.16),transparent)]" />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;
const COLOR: Record<string, string> = { "Vita for patients": "#8a6fe0", "1HMS Vita": "#1ea99b", "1Rad Vita": "#1599db" };

const CAPTION: Record<Screen, string> = {
  find: "The patient describes the symptoms. Vita picks the right specialty, finds nearby doctors with free slots and books one.",
  hms: "At the hospital, the doctor's 1HMS Vita checks the patient in, records vitals, drafts the prescription and routes every order.",
  rad: "In radiology, 1Rad Vita reads the scan and drafts the report in seconds. The radiologist signs, and it lands in 1HMS.",
};

const PROOF = ["Running in hospitals in Bihar", "Doctors sign everything Vita drafts", "Data hosted in India", "English and Hindi"];

export default function Hero() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const stage = SCREENS[i];

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SCREENS.length), SCREENS[i].ms);
    return () => clearTimeout(t);
  }, [i, auto, inView]);

  const pick = (s: Screen) => { setAuto(false); setI(SCREENS.findIndex((x) => x.key === s)); };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease, delay },
  });

  return (
    <section ref={ref} className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]" aria-labelledby="hero-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_74%_48%,hsl(var(--brand-teal)/0.13),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />

      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-y-4 px-5 pb-10 pt-6 sm:px-8 md:pt-10 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-x-6 lg:px-12 lg:pb-12 lg:pt-2">
        {/* Message */}
        <div className="relative z-10 lg:col-span-5">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-[#1ea99b]/30 bg-white/70 px-3.5 py-1.5 text-[0.85rem] font-medium text-[#12857a] backdrop-blur">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1ea99b] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#1ea99b]" /></span>
            Vita, NexEagle&apos;s AI agent for hospitals
          </motion.p>
          <motion.h1
            id="hero-title"
            {...rise(0.06)}
            className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.0] tracking-[-0.035em] text-[#0e2343] sm:text-[3.5rem] xl:text-[4rem]"
            style={{ fontVariationSettings: "'opsz' 96, 'wdth' 92" }}
          >
            Hospital software that does the paperwork itself.
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-5 max-w-[33rem] text-[1.05rem] leading-relaxed text-slate-600 sm:text-lg">
            Vita finds patients the right doctor, runs your front desk, wards and billing in 1HMS, and drafts radiology reports in 1Rad. Your doctors check and sign. Your staff stop typing.
          </motion.p>
          <motion.div {...rise(0.26)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex h-[3.25rem] items-center justify-center whitespace-nowrap rounded-full bg-[#0e2343] px-7 text-[0.98rem] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,35,67,0.6)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#13305c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]"
            >
              Book a demo
            </Link>
            <Link
              href="/customers"
              className="group inline-flex h-[3.25rem] items-center justify-center gap-1 whitespace-nowrap rounded-full border border-slate-300/80 bg-white/70 px-6 text-[0.98rem] font-semibold text-[#0e2343] backdrop-blur transition-colors hover:border-[#1ea99b] hover:text-[#12857a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]"
            >
              See it in a hospital
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.ul {...rise(0.36)} className="mt-8 grid max-w-[33rem] grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {PROOF.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[0.92rem] text-slate-600">
                <Check className="h-4 w-4 shrink-0 text-[#1ea99b]" strokeWidth={3} />
                <span className="text-slate-600">{p}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Vita in 3D with the journey orbiting her */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.1 }}
          className="relative lg:col-span-7"
        >
          <div className="relative">
          <div className="relative -mx-5 h-[360px] sm:-mx-8 sm:h-[500px] lg:mx-0 lg:h-[min(680px,calc(100svh-9rem))]">
            <StoryScene screen={stage.key} onPick={pick} />
          </div>

            {/* What Vita is doing at this step, as a caption over the scene */}
            <div className="pointer-events-none -mx-5 mt-2 flex justify-center px-5 sm:absolute sm:inset-x-6 sm:bottom-3 sm:mx-0 sm:mt-0 sm:px-0 lg:inset-x-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.key}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease }}
                  className="pointer-events-auto flex max-w-[560px] items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2.5 shadow-[0_16px_40px_-24px_rgba(14,35,67,0.5)] backdrop-blur"
                >
                  <Image src={avatarFor(stage.agent)} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-full" />
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: COLOR[stage.agent] }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: COLOR[stage.agent] }} />
                      {stage.agent}
                    </p>
                    <p className="text-[0.9rem] leading-snug text-[#0e2343]">{CAPTION[stage.key]}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step strip: the same five stages, for touch and for anyone who skips the 3D */}
          <ol aria-label="The patient journey with Vita" className="-mx-5 mt-1 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
            {SCREENS.map((s, n) => {
              const on = n === i;
              return (
                <li key={s.key} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => pick(s.key)}
                    aria-pressed={on}
                    className={`relative flex items-center gap-2 overflow-hidden rounded-full border px-3.5 py-2 text-[0.85rem] font-semibold transition-colors ${on ? "border-[#0e2343] bg-[#0e2343] text-white" : "border-slate-200 bg-white/80 text-[#0e2343] hover:border-[#1ea99b]"}`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: COLOR[s.agent] }} />
                    <span className={on ? "text-white" : "text-[#0e2343]"}>{s.step}</span>
                    {on && auto && (
                      <motion.span key={i} className="absolute bottom-0 left-0 h-[2px] origin-left bg-[#1ea99b]" style={{ width: "100%" }} initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }} transition={{ duration: s.ms / 1000, ease: "linear" }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

        </motion.div>
      </div>
    </section>
  );
}
