"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import type { Stage } from "./HospitalScene";
import { STAGES, StagePanel } from "./VitaPanels";
import { DOCTORDEKHO_URL } from "@/lib/site";
import { FlyingVita } from "./FlyingVita";

const HospitalScene = dynamic(() => import("./HospitalScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-2/3 w-2/3 rounded-[40%] bg-[radial-gradient(closest-side,hsl(var(--brand-teal)/0.14),transparent)]" />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero3D() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [flight, setFlight] = useState(0);
  const [landed, setLanded] = useState(false);
  const [glide, setGlide] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const stage = STAGES[i].key;

  // Each flight: powered flaps in, a glide over the campus, flaps again to land.
  useEffect(() => {
    if (reduce) { setLanded(true); return; }
    setGlide(false);
    const a = setTimeout(() => setGlide(true), 1500);
    const b = setTimeout(() => setGlide(false), 2900);
    // hand over to the standing pose just before touchdown so the two overlap (no empty frame)
    const c = setTimeout(() => setLanded(true), 4150);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, [flight, reduce]);
  const fly = () => { if (reduce) return; setLanded(false); setFlight((f) => f + 1); };

  // Play the journey on a loop while the hero is on screen, until the visitor picks a step.
  useEffect(() => {
    if (!auto || !inView) return;
    const t = setTimeout(() => setI((n) => (n + 1) % STAGES.length), STAGES[i].ms);
    return () => clearTimeout(t);
  }, [i, auto, inView]);

  const pick = (s: Stage) => { setAuto(false); setI(STAGES.findIndex((x) => x.key === s)); };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay },
  });

  const Stepper = ({ vertical }: { vertical: boolean }) => (
    <ol
      aria-label="The patient journey with Vita"
      className={vertical ? "mt-8 hidden space-y-0.5 lg:block" : "-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden"}
    >
      {STAGES.map((s, n) => {
        const on = n === i;
        return (
          <li key={s.key} className={vertical ? "" : "shrink-0"}>
            <button
              type="button"
              onClick={() => pick(s.key)}
              aria-pressed={on}
              className={
                vertical
                  ? `group relative flex w-full items-center gap-4 rounded-xl px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b] ${on ? "bg-white shadow-[0_8px_28px_-14px_rgba(14,35,67,0.4)] ring-1 ring-slate-200" : "hover:bg-white/70"}`
                  : `flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.9rem] font-semibold transition-colors ${on ? "border-[#0e2343] bg-[#0e2343] text-white" : "border-slate-200 bg-white text-[#0e2343]"}`
              }
            >
              {vertical ? (
                <>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.8rem] font-semibold ${on ? "bg-[#0e2343] text-white" : "bg-slate-100 text-slate-500"}`}>{n + 1}</span>
                  <span className={`min-w-0 flex-1 font-display text-[0.98rem] font-semibold ${on ? "text-[#0e2343]" : "text-slate-600"}`}>{s.step}</span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.75rem] ${s.agent.startsWith("1Rad") ? "bg-sky-50 text-sky-700" : s.agent.startsWith("1HMS") ? "bg-[#1ea99b]/10 text-[#12857a]" : "bg-violet-50 text-violet-700"}`}>{s.agent}</span>
                  {on && auto && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] overflow-hidden rounded-full bg-slate-100">
                      <motion.span key={i} className="block h-full origin-left bg-[#1ea99b]" initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }} transition={{ duration: s.ms / 1000, ease: "linear" }} />
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[0.7rem] ${on ? "bg-white text-[#0e2343]" : "bg-slate-100 text-slate-500"}`}>{n + 1}</span>
                  <span className={on ? "text-white" : "text-[#0e2343]"}>{s.step}</span>
                </>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );

  return (
    <section ref={ref} className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]" aria-labelledby="hero-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_72%_52%,hsl(var(--brand-teal)/0.10),transparent_72%)]" />

      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-y-6 px-5 pb-12 pt-6 sm:px-8 md:pt-10 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:gap-x-8 lg:px-12 lg:pb-14 lg:pt-4">
        <div className="relative z-10 lg:col-span-5">
          <motion.p {...rise(0)} className="flex items-center gap-2.5 text-[0.95rem] text-slate-600">
            <Image src="/assets/vita/avatar-present.webp" alt="" width={40} height={40} priority className="h-10 w-10 rounded-full ring-2 ring-white" />
            Meet Vita: AI agents for hospitals in India
          </motion.p>
          <motion.h1
            id="hero-title"
            {...rise(0.06)}
            className="mt-5 font-display text-[2.45rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0e2343] sm:text-[3.4rem] lg:text-[3.4rem] xl:text-[3.85rem]"
            style={{ fontVariationSettings: "'opsz' 96, 'wdth' 92" }}
          >
            AI agents for every step of the patient journey.
          </motion.h1>
          <motion.p {...rise(0.18)} className="mt-5 max-w-[35rem] text-[1.05rem] leading-relaxed text-slate-600 sm:text-lg">
            Vita helps patients find the right doctor and reach your hospital. Inside, it handles check-in, notes, orders and billing in 1HMS, our hospital management software. In 1Rad cloud PACS, it reads scans and drafts reports for your radiologist to sign.
          </motion.p>
          <motion.div {...rise(0.3)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex h-[3.25rem] items-center justify-center whitespace-nowrap rounded-full bg-[#0e2343] px-6 text-[0.98rem] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,35,67,0.6)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#13305c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]"
            >
              Book a hospital demo
            </Link>
            <a
              href={DOCTORDEKHO_URL}
              className="inline-flex h-[3.25rem] items-center justify-center whitespace-nowrap rounded-full border border-slate-300/80 bg-white/70 px-6 text-[0.98rem] font-semibold text-[#0e2343] backdrop-blur transition-colors hover:border-[#1ea99b] hover:text-[#12857a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]"
            >
              Find a doctor with Vita
            </a>
          </motion.div>
          <motion.div {...rise(0.42)}>
            <Stepper vertical />
          </motion.div>
        </div>

        {/* Journey stage: 3D campus + what Vita is doing right now */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.15 }}
          className="relative lg:col-span-7 lg:-mr-12"
        >
          <div className="relative -mx-5 h-[320px] sm:-mx-8 sm:h-[440px] lg:mx-0 lg:h-[min(760px,calc(100svh-6rem))]">
            <HospitalScene stage={stage} onPick={pick} />
            {/* Vita flies in over the campus, glides, then lands to host the tour */}
            <AnimatePresence>
              {!landed && (
                <motion.div
                  key={flight}
                  className="pointer-events-none absolute z-30 w-[170px] sm:w-[260px] lg:w-[380px]"
                  initial={{ left: "108%", top: "-30%", scale: 0.5, rotate: -10, opacity: 1 }}
                  animate={{ left: ["108%", "62%", "30%", "8%", "-8%"], top: ["-30%", "-6%", "8%", "30%", "58%"], scale: [0.5, 0.62, 0.8, 0.82, 0.68], rotate: [-10, -6, 5, 8, 0] }}
                  exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.35 } }}
                  transition={{ duration: 4.4, times: [0, 0.3, 0.55, 0.8, 1], ease: "easeInOut" }}
                >
                  {/* image faces right; mirror it so Vita flies head-first to the left */}
                  <div style={{ transform: "scaleX(-1)" }}>
                    <FlyingVita mode={glide ? "glide" : "flap"} beat={0.55} priority />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* soft shadow travelling across the ground under Vita */}
            <AnimatePresence>
              {!landed && (
                <motion.div
                  key={"s" + flight}
                  aria-hidden
                  className="pointer-events-none absolute z-10 h-6 w-28 rounded-[50%] bg-[#0e2343] blur-md lg:w-40"
                  initial={{ left: "100%", top: "86%", opacity: 0, scale: 0.4 }}
                  animate={{ left: ["100%", "66%", "38%", "14%", "2%"], top: ["86%", "84%", "84%", "86%", "90%"], opacity: [0, 0.08, 0.12, 0.16, 0.22], scale: [0.4, 0.55, 0.7, 0.8, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 4.4, times: [0, 0.3, 0.55, 0.8, 1], ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
            <motion.button
              type="button"
              onClick={fly}
              aria-label="Make Vita fly over the hospital again"
              initial={false}
              animate={landed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -18, scale: 0.92 }}
              transition={landed ? { type: "spring", stiffness: 300, damping: 18 } : { duration: 0.15 }}
              className="group absolute bottom-1 left-3 z-20 w-[96px] rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b] sm:w-[130px] lg:-left-4 lg:bottom-10 lg:w-[175px]"
            >
              <motion.div animate={reduce || !landed ? undefined : { y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
                <Image src="/assets/vita/vita-present.webp" alt="Vita, NexEagle's AI agent" width={753} height={760} priority sizes="(min-width: 1024px) 175px, 130px" className="h-auto w-full drop-shadow-[0_18px_22px_rgba(14,35,67,0.25)] transition-transform group-hover:-rotate-3" />
              </motion.div>
              <span className="pointer-events-none absolute -top-2 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0e2343] opacity-0 shadow transition-opacity group-hover:opacity-100 lg:block">Tap to fly</span>
            </motion.button>
          </div>
          <div className="mt-2 lg:hidden">
            <Stepper vertical={false} />
          </div>
          <div className="relative z-10 mt-4 lg:absolute lg:right-6 lg:top-4 lg:mt-0 lg:w-[290px] xl:right-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={reduce ? false : { opacity: 0, y: 16, rotateX: 8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
                style={{ transformPerspective: 900 }}
              >
                <StagePanel stage={stage} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-2 text-center text-[11px] text-slate-400">Sample patient and data</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
