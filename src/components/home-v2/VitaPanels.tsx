"use client";

// What Vita is doing at each stage of the journey, shown beside the 3D campus.
// Every name, place and figure here is sample data for illustration.

import Image from "next/image";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, Check, MapPin, Navigation, Star } from "lucide-react";
import type { Stage } from "./HospitalScene";

const ease = [0.22, 1, 0.36, 1] as const;

export const STAGES: { key: Stage; step: string; agent: string; title: string; ms: number }[] = [
  { key: "find", step: "Find a doctor", agent: "Vita for patients", title: "Describes symptoms, gets the right doctor", ms: 6000 },
  { key: "book", step: "Book", agent: "Vita for patients", title: "Books the slot and sends the token", ms: 4500 },
  { key: "go", step: "Reach the clinic", agent: "Vita for patients", title: "Guides the patient to the door", ms: 4800 },
  { key: "hms", step: "Hospital workflow", agent: "1HMS Vita", title: "Runs check-in to billing on its own", ms: 7000 },
  { key: "rad", step: "Scan & report", agent: "1Rad Vita", title: "Reads the scan, drafts the report", ms: 7500 },
];

export const avatarFor = (agent: string) =>
  agent.startsWith("1Rad") ? "/assets/vita/avatar-think.webp" : agent.startsWith("1HMS") ? "/assets/vita/avatar-coffee.webp" : "/assets/vita/avatar-present.webp";

function Header({ agent, live = true }: { agent: string; live?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3">
      <Image src={avatarFor(agent)} alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="font-display text-[0.95rem] font-semibold text-[#0e2343]">{agent}</p>
        <p className="text-[11px] text-slate-500">{live ? "Working now" : "Done"}</p>
      </div>
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
    </div>
  );
}

// Staggered entrance for each line of an agent's work (reduced motion handled by MotionConfig).
function anim(i: number, base = 0.25, gap = 0.9) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease, delay: base + i * gap },
  } as const;
}

const Bubble = ({ me, children, i }: { me?: boolean; children: React.ReactNode; i: number }) => (
  <motion.div {...anim(i)} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${me ? "ml-auto rounded-br-md bg-[#0e2343] text-white" : "rounded-bl-md bg-slate-100 text-[#0e2343]"}`}>
    {children}
  </motion.div>
);

function FindPanel() {
  const docs = [
    { n: "Dr. A. Kumar", s: "General Physician", d: "2.1 km", f: "₹300", t: "Today 11:30", r: "4.8" },
    { n: "Dr. S. Anand", s: "Chest Specialist", d: "3.4 km", f: "₹500", t: "Today 16:00", r: "4.7" },
  ];
  return (
    <div className="space-y-2.5 p-4">
      <Bubble me i={0}><span className="!text-white">Fever and cough for 3 days. My chest hurts when I breathe.</span></Bubble>
      <Bubble i={1}>That should be seen today by a general physician. Two good options near you:</Bubble>
      {docs.map((d, i) => (
        <motion.div key={d.n} {...anim(i + 2, 0.25, 0.6)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#0e2343]">{d.n}</p>
            <p className="text-[11px] text-slate-500">{d.s}, {d.d}, {d.f}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="flex items-center justify-end gap-1 text-[11px] text-amber-600"><Star className="h-3 w-3 fill-current" />{d.r}</p>
            <p className="text-[11px] font-semibold text-[#12857a]">{d.t}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BookPanel() {
  return (
    <div className="space-y-2.5 p-4">
      <Bubble me i={0}><span className="!text-white">Book Dr. Kumar at 11:30</span></Bubble>
      <Bubble i={1}>Done. I&apos;ve sent the details to your WhatsApp.</Bubble>
      <motion.div {...anim(2)} className="rounded-2xl border border-[#1ea99b]/30 bg-[#effaf8] p-3.5">
        <div className="flex items-center gap-2 text-[#12857a]">
          <CalendarCheck className="h-4 w-4" />
          <span className="text-[12px] font-semibold">Appointment confirmed</span>
        </div>
        <p className="mt-2 font-display text-lg font-semibold text-[#0e2343]">Token A-14</p>
        <p className="text-[12px] text-slate-600">Dr. A. Kumar, City Care Hospital</p>
        <p className="text-[12px] text-slate-600">Today, 11:30</p>
      </motion.div>
    </div>
  );
}

function GoPanel() {
  const reduce = useReducedMotion();
  return (
    <div className="space-y-2.5 p-4">
      <Bubble i={0}>Leave by 11:05 to be on time. It&apos;s 3.4 km, about 12 minutes.</Bubble>
      <motion.div {...anim(1)} className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f3f7f7]">
        <svg viewBox="0 0 260 120" className="block h-[120px] w-full" aria-hidden>
          <path d="M0 30 H260 M0 80 H260 M60 0 V120 M170 0 V120" stroke="#dde6e7" strokeWidth="10" />
          <motion.path
            d="M28 98 C 60 98, 60 80, 90 80 S 140 80, 170 60 S 200 30, 232 26"
            fill="none" stroke="#8a6fe0" strokeWidth="4" strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: "easeInOut", delay: 1.1 }}
          />
          <circle cx="28" cy="98" r="6" fill="#8a6fe0" />
          <rect x="222" y="14" width="20" height="20" rx="5" fill="#1ea99b" />
          <path d="M232 19 v10 M227 24 h10" stroke="#fff" strokeWidth="2.4" />
        </svg>
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-[12px] text-slate-600"><MapPin className="h-3.5 w-3.5 text-[#1ea99b]" />City Care Hospital</span>
          <span className="flex items-center gap-1 rounded-full bg-[#0e2343] px-2.5 py-1 text-[11px] font-semibold text-white"><Navigation className="h-3 w-3" />12 min</span>
        </div>
      </motion.div>
      <motion.p {...anim(3)} className="text-center text-[11px] text-slate-500">Arriving 11:24. The hospital already knows you&apos;re coming.</motion.p>
    </div>
  );
}

function LogPanel({ items, gap }: { items: string[]; gap: number }) {
  return (
    <ul className="space-y-2 p-4">
      {items.map((t, i) => (
        <motion.li key={t} {...anim(i, 0.3, gap)} className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3 py-2.5">
          <motion.span
            initial={{ scale: 0.4, backgroundColor: "#cbd5e1" }}
            animate={{ scale: 1, backgroundColor: "#1ea99b" }}
            transition={{ delay: 0.3 + i * gap + 0.45, duration: 0.3 }}
            className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full p-[3px] text-white"
          >
            <Check className="h-3 w-3" strokeWidth={3.5} />
          </motion.span>
          <span className="text-[12.5px] leading-snug text-[#0e2343]">{t}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function RadPanel() {
  const reduce = useReducedMotion();
  const boxes = [
    { x: 58, y: 52, w: 22, h: 20, l: "Opacity", c: "0.91", d: 0.8 },
    { x: 24, y: 26, w: 16, h: 14, l: "Clear", c: "0.97", d: 1.6 },
  ];
  return (
    <div className="space-y-2.5 p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#0b1220]">
        <div className="absolute inset-[10%] rounded-[45%] bg-[radial-gradient(ellipse_at_30%_45%,rgba(255,255,255,0.36),transparent_46%),radial-gradient(ellipse_at_70%_48%,rgba(255,255,255,0.32),transparent_46%)]" />
        <div className="absolute left-1/2 top-[8%] h-[80%] w-[7%] -translate-x-1/2 rounded-full bg-white/30" />
        <div className="absolute left-[62%] top-[56%] h-[14%] w-[14%] rounded-full bg-white/35 blur-md" />
        {/* scanning sweep */}
        {!reduce && (
          <motion.div initial={{ top: "-10%" }} animate={{ top: "110%" }} transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }} className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-[#4fd1c1]/40 to-transparent" />
        )}
        {boxes.map((b) => (
          <motion.div
            key={b.l}
            initial={reduce ? false : { opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduce ? 0 : b.d + 0.6, duration: 0.35 }}
            className={`absolute rounded-md border-2 ${b.l === "Opacity" ? "border-amber-400" : "border-[#4fd1c1]"}`}
            style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
          >
            <span className={`absolute -top-5 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[9.5px] font-semibold text-[#0b1220] ${b.l === "Opacity" ? "bg-amber-400" : "bg-[#4fd1c1]"}`}>
              {b.l} {b.c}
            </span>
          </motion.div>
        ))}
        <span className="absolute bottom-2 left-2 text-[10px] text-white/70">Chest PA, sample study</span>
      </div>
      <motion.div {...anim(0, 2.6)} className="rounded-xl border border-slate-200 bg-white p-3 text-[12px] leading-relaxed text-slate-600">
        <p><b className="text-[#0e2343]">Draft impression:</b> Patchy opacity in the right lower zone, suggestive of consolidation. Clinical correlation advised.</p>
      </motion.div>
      <motion.div {...anim(1, 2.6)} className="flex items-center justify-between rounded-xl bg-[#0e2343] px-3 py-2.5">
        <span className="text-[12px] font-semibold text-white">Waiting for radiologist to sign</span>
        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white">Draft</span>
      </motion.div>
    </div>
  );
}

export function StagePanel({ stage }: { stage: Stage }) {
  const s = STAGES.find((x) => x.key === stage)!;
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-slate-200/90 bg-white/95 shadow-[0_30px_70px_-30px_rgba(14,35,67,0.45)] backdrop-blur">
      <Header agent={s.agent} />
      <MotionConfig reducedMotion="user">
      <div key={stage} className="min-h-[19.5rem]">
        {stage === "find" && <FindPanel />}
        {stage === "book" && <BookPanel />}
        {stage === "go" && <GoPanel />}
        {stage === "hms" && (
          <LogPanel
            gap={1.05}
            items={[
              "Checked in from the booking, no forms at reception",
              "Vitals recorded and sent to Dr. Kumar",
              "Prescription drafted from the consultation; doctor signed",
              "Chest X-ray ordered and sent to radiology",
              "Medicines sent to pharmacy, bill updated",
            ]}
          />
        )}
        {stage === "rad" && <RadPanel />}
      </div>
      </MotionConfig>
    </div>
  );
}
