"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { DOCTORDEKHO_URL } from "@/lib/site";
import { avatarFor } from "./VitaPanels";

const ease = [0.22, 1, 0.36, 1] as const;

export type Log = { t: string; a: string };

const AGENTS = [
  {
    id: "patients",
    name: "Vita for patients",
    where: "Live on Doctor Dekho",
    tone: "violet",
    lead: "Patients describe how they feel in their own words. Vita's symptom router picks the right specialist, shows nearby doctors with fees and open slots, books the appointment and guides the patient to the clinic.",
    points: ["Doctor matching from symptoms", "Live slots and instant booking", "Confirmation and reminders on WhatsApp", "Directions to the clinic door"],
    cta: { label: "Try it on Doctor Dekho", href: DOCTORDEKHO_URL, external: true },
    log: [
      { t: "10:02", a: "Understood symptoms: fever, cough, chest pain on breathing" },
      { t: "10:02", a: "Matched specialty: general physician, to be seen today" },
      { t: "10:03", a: "Found 6 doctors within 5 km with slots today" },
      { t: "10:04", a: "Booked Dr. A. Kumar at 11:30, token A-14" },
      { t: "10:04", a: "Sent confirmation and location on WhatsApp" },
      { t: "11:05", a: "Started directions to City Care Hospital" },
      { t: "11:24", a: "Patient arrived, handed over to 1HMS Vita" },
    ] as Log[],
  },
  {
    id: "hms",
    name: "1HMS Vita",
    where: "Inside 1HMS",
    tone: "teal",
    lead: "Inside the hospital, 1HMS Vita takes the busywork off your staff. It checks patients in from their booking, keeps the OPD queue moving, drafts prescriptions and notes from the consultation, routes orders and keeps the bill up to date.",
    points: ["Check-in straight from the booking", "Voice scribe for prescriptions and notes", "Orders routed to lab, radiology and pharmacy", "Billing, discharge and follow-up reminders"],
    cta: { label: "Explore 1HMS", href: "/solutions/1hms", external: false },
    log: [
      { t: "11:24", a: "Checked in Ramesh Y. from booking, token A-14" },
      { t: "11:26", a: "Vitals recorded, queue updated, Dr. Kumar notified" },
      { t: "11:41", a: "Prescription and notes drafted from the consultation" },
      { t: "11:42", a: "Dr. Kumar reviewed and signed" },
      { t: "11:42", a: "Chest X-ray sent to 1Rad, CBC sent to 1Lab" },
      { t: "11:43", a: "Medicines sent to 1Pharma, bill updated" },
      { t: "11:43", a: "Follow-up reminder set for 7 days" },
    ] as Log[],
  },
  {
    id: "rad",
    name: "1Rad Vita",
    where: "Inside 1Rad cloud PACS",
    tone: "sky",
    lead: "In radiology, 1Rad Vita runs AI vision analysis on each study as it arrives, marks the regions worth a closer look and drafts a structured report. The radiologist reviews, edits and signs, from the hospital or from home.",
    points: ["AI vision analysis on every study", "Findings marked on the image", "Structured first-draft reports", "Review and sign from anywhere"],
    cta: { label: "Explore 1Rad", href: "/solutions/1rad", external: false },
    log: [] as Log[],
  },
] as const;

const TONE = {
  violet: { chip: "bg-violet-50 text-violet-700", dot: "bg-[#8a6fe0]" },
  teal: { chip: "bg-[#1ea99b]/10 text-[#12857a]", dot: "bg-[#1ea99b]" },
  sky: { chip: "bg-sky-50 text-sky-700", dot: "bg-[#1599db]" },
} as const;

export function AgentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/90 bg-white shadow-[0_40px_80px_-40px_rgba(14,35,67,0.5)]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-3.5">
        <Image src={avatarFor(title)} alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
        <div className="flex-1 leading-tight">
          <p className="font-display font-semibold text-[#0e2343]">{title}</p>
          <p className="text-xs text-slate-500">Activity log, sample patient</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Running
        </span>
      </div>
      {children}
    </div>
  );
}

export function LogList({ log }: { log: Log[] }) {
  return (
    <ol className="relative space-y-1 p-5">
      <span aria-hidden className="absolute bottom-8 left-[4.15rem] top-8 w-px bg-slate-200" />
      {log.map((l, i) => (
        <motion.li
          key={l.a}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.32 }}
          className="relative flex items-start gap-4 py-1.5"
        >
          <span className="w-10 shrink-0 pt-0.5 text-right text-[12px] tabular-nums text-slate-400">{l.t}</span>
          <motion.span
            initial={{ scale: 0.3 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35 + i * 0.32, type: "spring", stiffness: 500, damping: 22 }}
            className="relative z-10 mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-[#1ea99b] text-white ring-4 ring-white"
          >
            <Check className="h-3 w-3" strokeWidth={3.5} />
          </motion.span>
          <span className="text-[0.92rem] leading-snug text-[#0e2343]">{l.a}</span>
        </motion.li>
      ))}
    </ol>
  );
}

const DRAFT =
  "Findings: Patchy airspace opacity in the right lower zone. Left lung clear. No pleural effusion. Cardiac size within normal limits. Impression: Right lower zone consolidation, likely infective. Clinical correlation advised.";

export function RadDemo() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    if (reduce) { setN(DRAFT.length); return; }
    const start = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => { i += 3; setN(Math.min(i, DRAFT.length)); if (i >= DRAFT.length) clearInterval(id); }, 24);
      return () => clearInterval(id);
    }, 2300);
    return () => clearTimeout(start);
  }, [reduce]);
  const done = n >= DRAFT.length;
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#0b1220]">
        <div className="absolute inset-[10%] rounded-[45%] bg-[radial-gradient(ellipse_at_30%_45%,rgba(255,255,255,0.36),transparent_46%),radial-gradient(ellipse_at_70%_48%,rgba(255,255,255,0.32),transparent_46%)]" />
        <div className="absolute left-1/2 top-[8%] h-[80%] w-[7%] -translate-x-1/2 rounded-full bg-white/30" />
        {[22, 32, 42, 52].map((t) => <div key={t} className="absolute left-[18%] right-[18%] h-[3px] rounded-full bg-white/10" style={{ top: `${t}%` }} />)}
        <div className="absolute left-[60%] top-[56%] h-[16%] w-[16%] rounded-full bg-white/40 blur-md" />
        {!reduce && (
          <motion.div initial={{ top: "-12%" }} animate={{ top: "112%" }} transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }} className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#4fd1c1]/40 to-transparent" />
        )}
        {[
          { x: 55, y: 52, w: 26, h: 22, l: "Opacity 0.91", c: "amber", d: 1.5 },
          { x: 20, y: 30, w: 22, h: 18, l: "Normal 0.97", c: "teal", d: 1.9 },
        ].map((b) => (
          <motion.div key={b.l} initial={{ opacity: 0, scale: 1.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: b.d, duration: 0.35 }}
            className={`absolute rounded-md border-2 ${b.c === "amber" ? "border-amber-400" : "border-[#4fd1c1]"}`} style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}>
            <span className={`absolute -top-5 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-semibold text-[#0b1220] ${b.c === "amber" ? "bg-amber-400" : "bg-[#4fd1c1]"}`}>{b.l}</span>
          </motion.div>
        ))}
        <span className="absolute bottom-2.5 left-3 text-[11px] text-white/70">Chest PA, sample study</span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <p className="font-display font-semibold text-[#0e2343]">Report draft</p>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${signed ? "bg-emerald-100 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>
            {signed ? "Signed" : done ? "Ready for review" : n ? "Drafting…" : "Analysing images…"}
          </span>
        </div>
        <p className="mt-3 min-h-[9.5rem] flex-1 text-[0.92rem] leading-relaxed text-slate-700" aria-live="polite">
          {DRAFT.slice(0, n)}
          {n > 0 && !done && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-sky-600" />}
        </p>
        <button
          type="button"
          disabled={!done}
          onClick={() => setSigned((v) => !v)}
          className="mt-4 h-11 rounded-full bg-[#0e2343] px-5 text-sm font-semibold text-white transition-[opacity,background-color] hover:bg-[#13305c] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          {signed ? "Undo signature" : "Approve and sign as radiologist"}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">{signed ? "Report released to the doctor and patient." : "Nothing is released until a radiologist signs."}</p>
      </div>
    </div>
  );
}

export default function AgentsSection() {
  const [tab, setTab] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const a = AGENTS[tab];

  return (
    <section id="agents" className="scroll-mt-20 bg-[#f4f8f8] py-20 sm:py-28" aria-labelledby="agents-title">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="flex items-end gap-5 lg:col-span-7">
            <Image src="/assets/vita/vita-happy.webp" alt="Vita, NexEagle's AI agent, with wings open" width={1006} height={760} sizes="200px" className="hidden h-auto w-[170px] shrink-0 sm:block lg:w-[200px]" />
            <h2 id="agents-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">
              Three Vita agents, one patient record
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-slate-600 lg:col-span-5">
            One agent for patients, one inside the hospital, one in radiology. Each hands the patient on to the next, so nothing is typed twice.
          </p>
        </div>

        <div role="tablist" aria-label="Vita agents" className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
          {AGENTS.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              id={`agent-tab-${x.id}`}
              aria-selected={tab === i}
              aria-controls={`agent-panel-${x.id}`}
              onClick={() => setTab(i)}
              className="relative shrink-0 rounded-full px-5 py-2.5 text-[0.98rem] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]"
            >
              {tab === i && <motion.span layoutId="agent-tab" className="absolute inset-0 rounded-full bg-[#0e2343]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className={`relative flex items-center gap-2 ${tab === i ? "text-white" : "text-slate-600 hover:text-[#0e2343]"}`}>
                <span className={`h-2 w-2 rounded-full ${TONE[x.tone].dot}`} />
                {x.name}
              </span>
            </button>
          ))}
        </div>

        <div ref={ref} role="tabpanel" id={`agent-panel-${a.id}`} aria-labelledby={`agent-tab-${a.id}`} className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={a.id + "-copy"}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-5 lg:pt-4"
            >
              <span className={`inline-block rounded-full px-3 py-1 text-sm ${TONE[a.tone].chip}`}>{a.where}</span>
              <h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0e2343] sm:text-3xl">{a.name}</h3>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-600">{a.lead}</p>
              <ul className="mt-6 space-y-3">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[1rem] text-[#0e2343]">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1ea99b]/12 text-[#12857a]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              {a.cta.external ? (
                <a href={a.cta.href} className="mt-8 inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-6 font-semibold text-[#0e2343] transition-colors hover:border-[#0e2343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]">{a.cta.label}</a>
              ) : (
                <Link href={a.cta.href} className="mt-8 inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-6 font-semibold text-[#0e2343] transition-colors hover:border-[#0e2343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]">{a.cta.label}</Link>
              )}
              {a.id === "hms" && (
                <p className="mt-4 text-sm text-slate-500">
                  Works with <Link href="/solutions/1lab" className="font-semibold text-[#12857a] hover:underline">1Lab</Link> and <Link href="/solutions/1pharma" className="font-semibold text-[#12857a] hover:underline">1Pharma</Link> on the same record.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="lg:col-span-7">
            <MotionConfig reducedMotion="user">
              <AnimatePresence mode="wait">
                {inView && (
                  <motion.div
                    key={a.id + "-card"}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <AgentCard title={a.name}>{a.id === "rad" ? <RadDemo /> : <LogList log={a.log as Log[]} />}</AgentCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionConfig>
          </div>
        </div>
      </div>
    </section>
  );
}
