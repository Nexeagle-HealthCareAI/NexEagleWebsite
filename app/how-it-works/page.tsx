import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageHero, { btnPrimary, btnSecondary } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Motion";
import HomeFAQ from "@/components/home-v2/HomeFAQ";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "How NexEagle Goes Live in Your Hospital: Setup, Data Migration & Training" },
  description: "How NexEagle hospital software goes live: we map your workflow, configure 1HMS, 1Rad, 1Lab and 1Pharma, bring in your data, train every role on site in English or Hindi, and support you after go-live.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    title: "We visit and map your workflow",
    body: "Our team spends time at your reception, OPD, wards, lab, radiology and billing to see how work flows today and what slows it down.",
    you: "Show us around and tell us what you want to fix first.",
    we: ["Walk through every counter", "Note your departments, doctors and services", "Agree what goes live first"],
  },
  {
    title: "We set it up and bring your data in",
    body: "We configure NexEagle around what we saw: your doctors and schedules, services and rates, packages, stock and report formats.",
    you: "Share your rate list, doctor list and any existing records.",
    we: ["Configure doctors, departments and rates", "Import patients, stock and past records where possible", "Connect your printers, scanners and imaging machines"],
  },
  {
    title: "We train every role on site",
    body: "Reception, doctors, nurses, lab, radiology, pharmacy and accounts each learn only the screens they use, in English or Hindi.",
    you: "Give each team an hour with us.",
    we: ["Hands-on training at each counter", "Short guides for every role", "A trial day before switching over"],
  },
  {
    title: "You go live, we stay close",
    body: "On go-live day our team is with you. After that you have a named contact who knows your hospital.",
    you: "Tell us what you'd like to improve next.",
    we: ["On-site support on go-live day", "A named support contact", "Regular check-ins and new features as you grow"],
  },
];

const FAQ_HOW = [
  { q: "How long does it take to go live?", a: "It depends on the size of your hospital and the products you switch on. A clinic or small hospital starting with OPD and billing can go live quickly; we agree a clear plan and date with you after the first visit." },
  { q: "Can you bring in data from our current software?", a: "In most cases, yes. We import patient lists, stock and other records from your current system or spreadsheets; we check what's possible during the first visit." },
  { q: "Do our staff need to be good with computers?", a: "No. Each role learns only the screens it uses, in English or Hindi, and our team stays close in the first weeks." },
  { q: "What happens if something goes wrong after go-live?", a: "You have a named support contact who knows your hospital, and you can also reach our team on WhatsApp or by phone." },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: "How NexEagle goes live in your hospital",
        description: metadata.description,
        step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
      },
      { "@type": "FAQPage", "@id": `${SITE_URL}/how-it-works#faq`, mainEntity: FAQ_HOW.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title="How It Works - Fast Onboarding Guide" />
      <PageHero
        crumb="How it works"
        eyebrow="How it works"
        title="Going live is our job, not your staff's"
        intro="Software only helps once people use it. Here's exactly how we set NexEagle up in your hospital and stay with you after."
        actions={<><Link href="/contact" className={btnPrimary}>Plan my go-live</Link><Link href="/why" className={btnSecondary}>Why NexEagle</Link></>}
        pose={{ src: "/assets/vita/vita-coffee.webp", w: 538, h: 640, alt: "Vita with a cup of coffee" }}
      />
      <section className="bg-white pb-20 pt-6 sm:pb-28" aria-label="Steps">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">
          <ol className="relative space-y-6 before:absolute before:bottom-8 before:left-[1.35rem] before:top-8 before:w-px before:bg-[#1ea99b]/40 sm:before:left-[1.6rem]">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} className="relative pl-14 sm:pl-20">
                <span className="absolute left-0 top-6 grid h-11 w-11 place-items-center rounded-full bg-[#0e2343] font-display font-semibold text-white ring-8 ring-white sm:h-[3.2rem] sm:w-[3.2rem] sm:text-lg">{i + 1}</span>
                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(14,35,67,0.4)] sm:p-8 lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-7">
                    <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343]">{s.title}</h2>
                    <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
                    <p className="mt-4 rounded-xl bg-[#f4f8f8] px-4 py-3 text-sm text-slate-700"><span className="font-semibold text-[#0e2343]">From you: </span>{s.you}</p>
                  </div>
                  <ul className="mt-5 space-y-2.5 lg:col-span-5 lg:mt-1">
                    {s.we.map((w) => (
                      <li key={w} className="flex items-start gap-2.5 text-[#0e2343]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1ea99b] text-white"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <HomeFAQ items={FAQ_HOW} title="Going-live questions" intro="What hospitals ask us before switching over." />
      <ClosingCTA />
    </main>
  );
}
