"use client";

// Small, honest product demos for the product pages. Sample data only; each plays once when it
// scrolls into view and ends on an action a person takes (sign, approve, dispense).

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { AlertTriangle, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function useTyped(text: string, start: boolean, delay = 0, step = 3, ms = 24) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduce) { setN(text.length); return; }
    let id: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      let i = 0;
      id = setInterval(() => { i += step; setN(Math.min(i, text.length)); if (i >= text.length) clearInterval(id); }, ms);
    }, delay);
    return () => { clearTimeout(t); clearInterval(id); };
  }, [start, reduce, text, delay, step, ms]);
  return n;
}

/* 1HMS: the AI scribe listens, drafts the prescription, the doctor signs */
const RX = "Diagnosis: Lower respiratory tract infection.\nRx: Amoxicillin 500 mg, 1-0-1 for 5 days. Paracetamol 650 mg if fever. Steam inhalation twice daily.\nOrders: Chest X-ray PA, CBC.\nReview after 5 days.";

export function ScribeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const n = useTyped(RX, seen, 2200, 3, 22);
  const done = n >= RX.length;
  const [signed, setSigned] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className="space-y-4 p-5">
        <div className="flex items-center gap-3 rounded-2xl bg-[#8a6fe0]/8 px-4 py-3">
          <div className="flex h-8 flex-1 items-center gap-[3px]">
            {Array.from({ length: 34 }).map((_, k) => (
              <motion.span key={k} className="w-[3px] rounded-full bg-[#8a6fe0]" animate={done ? { height: 4 } : { height: [4, 6 + ((k * 7) % 24), 4] }} transition={done ? { duration: 0.3 } : { duration: 0.7 + (k % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: (k % 7) * 0.05 }} />
            ))}
          </div>
          <span className="shrink-0 text-xs font-medium text-[#6d50cf]">{done ? "Consultation captured" : "Listening to the consultation…"}</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-[#0e2343]">Prescription draft</p>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${signed ? "bg-emerald-100 text-emerald-700" : "bg-violet-50 text-violet-700"}`}>{signed ? "Signed and sent" : done ? "Ready for review" : "Drafting…"}</span>
          </div>
          <p className="mt-3 min-h-[8.5rem] whitespace-pre-line text-[0.9rem] leading-relaxed text-slate-700" aria-live="polite">
            {RX.slice(0, n)}
            {n > 0 && !done && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#6d50cf]" />}
          </p>
        </div>
        <button type="button" disabled={!done} onClick={() => setSigned((v) => !v)} className="h-11 w-full rounded-full bg-[#0e2343] text-sm font-semibold text-white transition-[opacity,background-color] hover:bg-[#13305c] disabled:opacity-40">
          {signed ? "Undo" : "Sign as Dr. Kumar and send on WhatsApp"}
        </button>
        <p className="text-center text-xs text-slate-500">Sample consultation. The doctor always reviews before signing.</p>
      </div>
    </MotionConfig>
  );
}

/* 1Lab: values arrive from the analyser, abnormal ones are flagged, the pathologist approves */
const RESULTS = [
  { t: "Haemoglobin", v: 10.2, u: "g/dL", ref: "12–15", low: 12, high: 15 },
  { t: "WBC count", v: 13800, u: "/µL", ref: "4,000–11,000", low: 4000, high: 11000 },
  { t: "Platelets", v: 240000, u: "/µL", ref: "1.5–4.5 lakh", low: 150000, high: 450000 },
  { t: "Fasting glucose", v: 128, u: "mg/dL", ref: "70–100", low: 70, high: 100 },
];

function Value({ to, play, delay, className }: { to: number; play: boolean; delay: number; className?: string }) {
  const mv = useMotionValue(0);
  const txt = useTransform(mv, (v) => (to > 1000 ? Math.round(v).toLocaleString("en-IN") : v.toFixed(to % 1 ? 1 : 0)));
  useEffect(() => {
    if (!play) return;
    const c = animate(mv, to, { duration: 0.9, delay, ease: "easeOut" });
    return () => c.stop();
  }, [play, to, delay, mv]);
  return <motion.span className={className}>{txt}</motion.span>;
}

export function LabDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const [approved, setApproved] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Sample LB-2291, from the analyser</p>
            <p className="font-display text-lg font-semibold text-[#0e2343]">CBC + fasting glucose</p>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{approved ? "Approved, sent to doctor" : "Awaiting pathologist"}</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {RESULTS.map((r, i) => {
            const bad = r.v < r.low || r.v > r.high;
            return (
              <motion.div key={r.t} initial={{ opacity: 0, x: 10 }} animate={seen ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.35 }} className={`grid grid-cols-[1.3fr_1fr_1fr] items-center gap-2 px-4 py-3 text-sm ${i ? "border-t border-slate-100" : ""}`}>
                <span className="font-medium text-[#0e2343]">{r.t}</span>
                <span className={`flex items-center gap-1.5 ${bad ? "font-semibold text-rose-600" : "text-slate-700"}`}>
                  <Value to={r.v} play={seen} delay={0.3 + i * 0.35} className={bad ? "font-semibold text-rose-600" : "text-slate-700"} /> <span className="text-xs text-slate-400">{r.u}</span>
                  {bad && (
                    <motion.span initial={{ scale: 0 }} animate={seen ? { scale: [0, 1.3, 1] } : {}} transition={{ delay: 1.3 + i * 0.35 }}>
                      <AlertTriangle className="h-3.5 w-3.5" />
                    </motion.span>
                  )}
                </span>
                <span className="text-xs text-slate-400">{r.ref}</span>
              </motion.div>
            );
          })}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={seen ? { opacity: 1 } : {}} transition={{ delay: 2.4 }} className="rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700">
          Vita flagged 3 values outside the reference range and will notify Dr. Kumar on approval.
        </motion.p>
        <button type="button" onClick={() => setApproved((v) => !v)} className="h-11 w-full rounded-full bg-[#0e2343] text-sm font-semibold text-white hover:bg-[#13305c]">
          {approved ? "Undo approval" : "Approve as pathologist"}
        </button>
      </div>
    </MotionConfig>
  );
}

/* 1Pharma: the prescription is waiting, stock is checked, expiring batches are flagged */
export function StockDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const [dispensed, setDispensed] = useState(false);
  const items = [
    { n: "Amoxicillin 500 mg", q: "10 caps", b: "Batch AMX-2241, exp. Mar 2027", ok: true },
    { n: "Paracetamol 650 mg", q: "10 tabs", b: "Batch PCM-0912, exp. Jan 2027", ok: true },
    { n: "Cough syrup 100 ml", q: "1 bottle", b: "Batch CS-117 expires in 20 days, using CS-131", ok: false },
  ];
  return (
    <MotionConfig reducedMotion="user">
      <div ref={ref} className="space-y-4 p-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={seen ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="flex items-center justify-between rounded-2xl bg-[#0e2343] px-4 py-3 text-white">
          <span className="text-sm text-white">New prescription from Dr. Kumar, token A-14</span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] text-white">just now</span>
        </motion.div>
        <ul className="space-y-2">
          {items.map((it, i) => (
            <motion.li key={it.n} initial={{ opacity: 0, x: -10 }} animate={seen ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6 + i * 0.45, ease }} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0e2343]">{it.n} <span className="font-normal text-slate-500">· {it.q}</span></p>
                <p className={`mt-0.5 text-xs ${it.ok ? "text-slate-500" : "text-amber-700"}`}>{it.b}</p>
              </div>
              <motion.span initial={{ scale: 0 }} animate={seen ? { scale: 1 } : {}} transition={{ delay: 0.9 + i * 0.45, type: "spring", stiffness: 500, damping: 20 }} className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white ${it.ok ? "bg-[#1ea99b]" : "bg-amber-500"}`}>
                {it.ok ? <Check className="h-3 w-3" strokeWidth={3.5} /> : <AlertTriangle className="h-3 w-3" />}
              </motion.span>
            </motion.li>
          ))}
        </ul>
        <motion.div initial={{ opacity: 0 }} animate={seen ? { opacity: 1 } : {}} transition={{ delay: 2.4 }} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm">
          <span className="text-slate-600">Added to the patient&apos;s bill</span>
          <span className="font-display font-semibold text-[#12857a]">₹486</span>
        </motion.div>
        <button type="button" onClick={() => setDispensed((v) => !v)} className="h-11 w-full rounded-full bg-[#0e2343] text-sm font-semibold text-white hover:bg-[#13305c]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(dispensed)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-block text-white">
              {dispensed ? "Dispensed, stock updated" : "Dispense"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </MotionConfig>
  );
}
