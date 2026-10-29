import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, FileCheck2, History, MapPin, PenLine, UserCheck, Workflow, X } from "lucide-react";
import AgentsSection from "@/components/home-v2/AgentsSection";
import HomeFAQ from "@/components/home-v2/HomeFAQ";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { Reveal, Float } from "@/components/site/Motion";
import { FlyingVita } from "@/components/home-v2/FlyingVita";
import { SITE_URL } from "@/lib/site";

const TITLE = "Vita AI Agents for Hospitals in India: AI Scribe, AI Radiology Reports | NexEagle AI";
const DESCRIPTION =
  "Vita is NexEagle's family of healthcare AI agents: symptom-based doctor matching and booking for patients, an AI scribe and workflow automation in 1HMS, and AI vision analysis with drafted radiology reports in 1Rad. A clinician always signs.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["AI agents for hospitals", "healthcare AI India", "AI medical scribe", "AI voice scribe for doctors", "AI radiology report", "AI in hospital management", "symptom checker doctor booking", "Vita AI agent"],
  alternates: { canonical: "/ai" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/ai", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const RULES = [
  { Icon: PenLine, title: "A clinician signs", body: "Notes, prescriptions and reports drafted by Vita are never released until a doctor or radiologist approves them." },
  { Icon: FileCheck2, title: "Drafts look like drafts", body: "Everything Vita writes is clearly marked as a draft, so nobody mistakes it for a signed record." },
  { Icon: History, title: "Every action is logged", body: "What Vita did, when, and who approved it is kept in the audit trail." },
  { Icon: UserCheck, title: "Your roles, your rules", body: "Vita only works with the data each role is allowed to see." },
  { Icon: MapPin, title: "Data stays in India", body: "Patient data is hosted in India and handled in line with the DPDP Act 2023." },
  { Icon: Workflow, title: "Inside your workflow", body: "Vita works inside 1HMS, 1Rad and Doctor Dekho. Your staff do not learn a new tool." },
];

const DOES = [
  "Matches a patient's symptoms to the right kind of doctor",
  "Books appointments and sends confirmations",
  "Drafts notes and prescriptions from the consultation",
  "Routes orders to lab, radiology and pharmacy",
  "Marks regions on a scan that need a closer look",
  "Drafts structured radiology reports",
  "Keeps bills, queues and reminders up to date",
];
const DOESNT = [
  "Diagnose or treat patients on its own",
  "Sign or release a report or prescription",
  "Replace your doctors, radiologists or staff",
  "Share patient data outside your hospital's systems",
];

const FAQ_AI = [
  { q: "What is Vita?", a: "Vita is NexEagle's family of AI agents. Vita for patients helps people find the right doctor, book and reach the clinic. 1HMS Vita automates hospital work such as check-in, notes, orders and billing. 1Rad Vita analyses scans and drafts radiology reports." },
  { q: "Is Vita safe to use with patients?", a: "Vita prepares drafts and does the routine work, while doctors and radiologists make every clinical decision and sign every record. All actions are logged, and data is hosted in India." },
  { q: "How does the AI scribe work?", a: "With the patient's consent, 1HMS Vita listens to the consultation and drafts the case notes and prescription. The doctor reviews, edits and signs before anything is sent to the patient." },
  { q: "What does 1Rad Vita do with a scan?", a: "It runs AI vision analysis on the study, marks regions that need a closer look and prepares a structured first-draft report. The radiologist reviews, edits and signs it." },
  { q: "Do we need to change how our hospital works?", a: "No. Vita works inside the NexEagle products your staff already use, and our team sets it up around your current workflow." },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/ai#faq`,
    mainEntity: FAQ_AI.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title="NexEagle AI - Vita AI agents" />

      {/* Hero */}
      <section className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]" aria-labelledby="ai-title">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_78%_45%,rgba(138,111,224,0.14),transparent_70%),radial-gradient(40%_50%_at_60%_80%,hsl(var(--brand-teal)/0.12),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-20 lg:pt-16">
          <Reveal className="lg:col-span-6">
            <p className="text-[0.95rem] font-medium text-[#6d50cf]">NexEagle AI</p>
            <h1 id="ai-title" className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0e2343] sm:text-[3.4rem] xl:text-[3.9rem]">
              Meet Vita, the AI that does the busywork in healthcare
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-slate-600">
              Vita is a family of AI agents that work alongside your doctors and staff. It drafts, routes, reminds and checks, and leaves every clinical decision to the people who should make it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex h-[3.25rem] items-center justify-center rounded-full bg-[#0e2343] px-7 font-semibold text-white hover:bg-[#13305c]">See Vita in a demo</Link>
              <a href="#agents" className="inline-flex h-[3.25rem] items-center justify-center rounded-full border border-slate-300 bg-white/70 px-7 font-semibold text-[#0e2343] hover:border-[#0e2343]">Meet the three agents</a>
            </div>
          </Reveal>
          <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6">
            <Float>
              <Image src="/assets/vita/vita-happy.webp" alt="Vita, NexEagle's AI agent, with wings open" width={1006} height={760} priority sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(14,35,67,0.22)]" />
            </Float>
          </div>
        </div>
      </section>

      <AgentsSection />

      {/* Safety rules */}
      <section className="bg-[#0e2343] py-20 text-white sm:py-28" aria-labelledby="rules-title">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <h2 id="rules-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl lg:col-span-7">
              The rules Vita works by
            </h2>
            <p className="text-lg leading-relaxed text-slate-300 lg:col-span-5">AI in a hospital has to earn trust. These rules are built into every Vita agent, not added as an afterthought.</p>
          </div>
          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {RULES.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 0.06} className="border-t border-white/15 pt-6">
                <Icon className="h-6 w-6 text-[#4fd1c1]" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-300">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Does / doesn't */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="dd-title">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <h2 id="dd-title" className="max-w-2xl font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">What Vita does, and what it never does</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-[1.75rem] bg-[#1ea99b]/[0.07] p-7 sm:p-9">
              <p className="font-display text-xl font-semibold text-[#12857a]">Vita does</p>
              <ul className="mt-5 space-y-3">
                {DOES.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[#0e2343]">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1ea99b] text-white"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="relative overflow-hidden rounded-[1.75rem] bg-slate-50 p-7 sm:p-9">
              <p className="font-display text-xl font-semibold text-[#0e2343]">Vita never</p>
              <ul className="mt-5 space-y-3">
                {DOESNT.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[#0e2343]">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600"><X className="h-3 w-3" strokeWidth={3.5} /></span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="pointer-events-none absolute -bottom-6 -right-4 w-[200px] opacity-95 sm:w-[240px]">
                <div style={{ transform: "scaleX(-1)" }}>
                  <FlyingVita mode="glide" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <HomeFAQ items={FAQ_AI} title="Questions about Vita" intro="How Vita works, and how it keeps clinicians in charge." />
      <ClosingCTA />
    </main>
  );
}
