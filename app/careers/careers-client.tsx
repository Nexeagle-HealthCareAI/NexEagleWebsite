"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, Clock, MapPin } from "lucide-react";

const ROLES = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    team: "Engineering",
    location: "Kolkata / Remote",
    type: "Full-time",
    experience: "2–4 years",
    skills: ["Python", "NLP", "LLMs", "RAG", "Vector databases"],
    about: "Build Vita, our AI agents: the scribe that drafts notes and prescriptions, workflow automation in 1HMS, and the models behind 1Rad's report drafts.",
    you: [
      "Strong Python and experience with deep learning frameworks",
      "Hands-on work with large language models, prompting and retrieval (RAG)",
      "Experience deploying ML models to secure production cloud environments",
      "Interest in healthcare IT standards is a big plus",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Specialist",
    team: "Growth",
    location: "Kolkata / Remote",
    type: "Full-time",
    experience: "1–3 years",
    skills: ["SEO", "B2B growth", "Content", "Performance ads", "Analytics"],
    about: "Help hospitals, nursing homes and diagnostic centres across India discover NexEagle, through search, content, LinkedIn and campaigns.",
    you: [
      "Experience in B2B SaaS growth, lead generation and performance marketing",
      "Clear writing that doctors and hospital owners want to read",
      "Comfortable with SEO tools, Google Analytics, LinkedIn and email campaigns",
      "Understanding of healthtech in India is a strong plus",
    ],
  },
];

export default function CareersClient() {
  const [open, setOpen] = useState<string | null>(ROLES[0].id);
  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="roles-title">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">
        <h2 id="roles-title" className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343] sm:text-3xl">Open roles</h2>
        <ul className="mt-6 space-y-4">
          {ROLES.map((r) => {
            const on = open === r.id;
            return (
              <li key={r.id} className={`overflow-hidden rounded-[1.5rem] border bg-white transition-shadow ${on ? "border-[#1ea99b]/50 shadow-[0_24px_60px_-30px_rgba(14,35,67,0.4)]" : "border-slate-200"}`}>
                <button onClick={() => setOpen(on ? null : r.id)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-7">
                  <span>
                    <span className="block font-display text-xl font-semibold text-[#0e2343] sm:text-2xl">{r.title}</span>
                    <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5 text-slate-500"><Briefcase className="h-4 w-4" />{r.team}</span>
                      <span className="flex items-center gap-1.5 text-slate-500"><MapPin className="h-4 w-4" />{r.location}</span>
                      <span className="flex items-center gap-1.5 text-slate-500"><Clock className="h-4 w-4" />{r.type}, {r.experience}</span>
                    </span>
                  </span>
                  <ChevronDown className={`h-6 w-6 shrink-0 text-slate-400 transition-transform ${on ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="grid gap-6 border-t border-slate-100 p-5 sm:p-7 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                          <p className="leading-relaxed text-slate-700">{r.about}</p>
                          <p className="mt-5 font-semibold text-[#0e2343]">You&apos;ll do well here if you have</p>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-600">
                            {r.you.map((y) => <li key={y}>{y}</li>)}
                          </ul>
                        </div>
                        <div className="lg:col-span-5">
                          <div className="flex flex-wrap gap-2">
                            {r.skills.map((s) => <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{s}</span>)}
                          </div>
                          <a href={`mailto:info@nexeagle.com?subject=${encodeURIComponent(`Application: ${r.title}`)}&body=${encodeURIComponent(`Hi NexEagle team,\n\nI'd like to apply for the ${r.title} role. My CV and LinkedIn are attached / below.\n\n`)}`} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#0e2343] font-semibold text-white hover:bg-[#13305c]">
                            Apply by email
                          </a>
                          <p className="mt-2 text-center text-xs text-slate-500">Send your CV to info@nexeagle.com</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 rounded-[1.5rem] bg-[#f4f8f8] p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold text-[#0e2343]">Don&apos;t see your role?</p>
            <p className="mt-1 text-slate-600">If you want to build software that hospitals rely on, tell us what you&apos;d bring.</p>
          </div>
          <a href="mailto:info@nexeagle.com?subject=General%20application" className="mt-4 inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-6 font-semibold text-[#0e2343] hover:border-[#0e2343] sm:mt-0">Send a general application</a>
        </div>
      </div>
    </section>
  );
}
