"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
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

function Step({ i, active, onActive }: { i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  const s = STEPS[i];
  return (
    <li ref={ref} className="relative pl-10 lg:flex lg:min-h-[62vh] lg:items-center lg:pl-14">
      <span
        aria-hidden
        className={`absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full border text-[0.8rem] font-semibold transition-colors duration-500 lg:top-1/2 lg:-translate-y-1/2 ${
          active ? "border-[#1ea99b] bg-[#1ea99b] text-white" : "border-slate-300 bg-white text-slate-500"
        }`}
      >
        {i + 1}
      </span>
      <div>
        {/* phones & tablets: photo sits with its step */}
        <Photo k={s.photo} sizes="(max-width: 1024px) 100vw, 0px" className="mb-5 aspect-[4/3] rounded-3xl lg:hidden" />
        <p className="text-sm font-medium text-[#12857a]">{s.product}</p>
        <h3 className={`mt-1 font-display text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.025em] transition-colors duration-500 sm:text-[2rem] ${active ? "text-[#0e2343]" : "text-[#0e2343] lg:text-slate-400"}`}>
          {s.title}
        </h3>
        <p className="mt-3 max-w-[32rem] text-[1.03rem] leading-relaxed text-slate-600">{s.body}</p>
      </div>
    </li>
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
                  <Photo k={STEPS[active].photo} sizes="(min-width: 1024px) 50vw, 0px" className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#0e2343] backdrop-blur">
                Step {active + 1} of {STEPS.length}
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            {/* progress rail */}
            <div aria-hidden className="absolute bottom-0 left-[13px] top-0 w-px bg-slate-200">
              <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-[#1ea99b]" />
            </div>
            <ol ref={listRef} className="space-y-16 lg:space-y-0">
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
