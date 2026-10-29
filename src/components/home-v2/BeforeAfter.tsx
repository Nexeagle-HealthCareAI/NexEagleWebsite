"use client";

// A patient's day on paper versus with Vita: the plainest way to show a hospital owner what
// actually changes. Side by side on large screens; a toggle on phones.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";

const ROWS = [
  { when: "Booking", before: "Patient calls around or just turns up and waits.", after: "Vita matches symptoms to the right doctor and books a slot." },
  { when: "Arrival", before: "Forms filled by hand at the counter, then a paper slip.", after: "Details are already in. Reception hands over the token." },
  { when: "Consultation", before: "Doctor writes the prescription by hand while patients wait.", after: "Notes and prescription drafted as the doctor talks; doctor signs." },
  { when: "Scan", before: "Patient carries a slip to radiology; the report comes the next day.", after: "Order reaches radiology at once; AI drafts the report for signing." },
  { when: "Lab", before: "Staff phone the lab to ask if results are ready.", after: "Results land in the record the moment they're approved." },
  { when: "Bill", before: "A separate bill at every counter, totalled by hand.", after: "One bill with every service, ready before the patient asks." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function BeforeAfter() {
  const [view, setView] = useState<"before" | "after">("after");
  const reduce = useReducedMotion();

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="ba-title">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h2 id="ba-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">
            A patient&apos;s day, before and after
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            The same visit for fever and cough, run on paper and run with Vita.
          </p>
        </div>

        {/* phones: switch between the two days */}
        <div role="tablist" aria-label="Compare" className="mt-8 inline-flex rounded-full bg-slate-100 p-1 lg:hidden">
          {(["before", "after"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className="relative rounded-full px-5 py-2 text-sm font-semibold"
            >
              {view === v && <motion.span layoutId="ba-pill" className={`absolute inset-0 rounded-full ${v === "after" ? "bg-[#1ea99b]" : "bg-[#0e2343]"}`} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className={`relative ${view === v ? "text-white" : "text-slate-600"}`}>{v === "before" ? "On paper" : "With Vita"}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 lg:mt-12">
          {/* column heads (large screens) */}
          <div className="hidden grid-cols-[10rem_1fr_1fr] bg-slate-50 text-sm font-semibold lg:grid">
            <span className="px-6 py-4 text-slate-500">Moment</span>
            <span className="border-l border-slate-200 px-6 py-4 text-slate-500">On paper</span>
            <span className="flex items-center gap-2 border-l border-slate-200 bg-[#1ea99b]/10 px-6 py-4 text-[#12857a]">With Vita</span>
          </div>
          <ul>
            {ROWS.map((r, i) => (
              <motion.li
                key={r.when}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.45, ease, delay: i * 0.06 }}
                className="grid grid-cols-1 border-t border-slate-200 first:border-t-0 lg:grid-cols-[10rem_1fr_1fr] lg:first:border-t"
              >
                <span className="px-5 pt-4 font-display text-lg font-semibold text-[#0e2343] lg:px-6 lg:py-5">{r.when}</span>

                {/* large screens: both columns */}
                <span className="hidden items-start gap-3 border-l border-slate-200 px-6 py-5 text-slate-500 lg:flex">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500"><X className="h-3 w-3" strokeWidth={3} /></span>
                  <span className="text-slate-500">{r.before}</span>
                </span>
                <motion.span
                  className="hidden items-start gap-3 border-l border-slate-200 bg-[#1ea99b]/[0.04] px-6 py-5 lg:flex"
                  initial={reduce ? false : { backgroundColor: "rgba(30,169,155,0)" }}
                  whileInView={{ backgroundColor: "rgba(30,169,155,0.06)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                >
                  <motion.span
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, type: "spring", stiffness: 500, damping: 20 }}
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1ea99b] text-white"
                  >
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </motion.span>
                  <span className="font-medium text-[#0e2343]">{r.after}</span>
                </motion.span>

                {/* phones: the chosen day */}
                <span className="px-5 pb-4 pt-1 lg:hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={view}
                      initial={{ opacity: 0, x: view === "after" ? 16 : -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: view === "after" ? -16 : 16 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-3"
                    >
                      {view === "after" ? (
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1ea99b] text-white"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                      ) : (
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-50 text-rose-500"><X className="h-3 w-3" strokeWidth={3} /></span>
                      )}
                      <span className={view === "after" ? "font-medium text-[#0e2343]" : "text-slate-500"}>{view === "after" ? r.after : r.before}</span>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
