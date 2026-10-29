import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronRight } from "lucide-react";
import { AgentCard } from "@/components/home-v2/AgentsSection";
import { StepCards } from "@/components/home-v2/PatientJourney";
import type { Step } from "@/lib/journeySteps";
import HomeFAQ from "@/components/home-v2/HomeFAQ";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { SITE_URL } from "@/lib/site";
import { Reveal, Float } from "./Motion";

export type ProductConfig = {
  slug: string;
  name: string;
  category: string;
  dot: string;
  pose: { src: string; w: number; h: number; alt: string };
  h1: string;
  sub: string;
  points: string[];
  agentTitle: string;
  demo: React.ReactNode;
  modulesTitle: string;
  modulesIntro: string;
  modules: { Icon: LucideIcon; title: string; body: string }[];
  stepsTitle: string;
  stepsIntro: string;
  steps: Step[];
  worksWith: { name: string; href: string; line: string }[];
  faq: { q: string; a: string }[];
  schema: { name: string; category: string; description: string };
  analyticsTitle: string;
};

const WHATSAPP = "https://wa.me/918074906808?text=";

export default function ProductPage({ c }: { c: ProductConfig }) {
  const url = `${SITE_URL}/solutions/${c.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: c.name, item: url },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: c.schema.name,
        applicationCategory: "HealthApplication",
        applicationSubCategory: c.schema.category,
        operatingSystem: "Web",
        url,
        description: c.schema.description,
        areaServed: { "@type": "Country", name: "India" },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title={c.analyticsTitle} />

      {/* ── Hero ── */}
      <section className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]" aria-labelledby="p-title">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_75%_45%,hsl(var(--brand-teal)/0.12),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-24 lg:pt-14">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0e2343]">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/products" className="hover:text-[#0e2343]">Products</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#0e2343]">{c.name}</span>
            </nav>
            <Reveal>
              <p className="mt-6 flex items-center gap-2 text-[0.95rem] font-medium text-[#0e2343]">
                <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
                {c.name} <span className="font-normal text-slate-500">{c.category}</span>
              </p>
              <h1 id="p-title" className="mt-4 font-display text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.035em] text-[#0e2343] sm:text-[3.2rem] xl:text-[3.6rem]">
                {c.h1}
              </h1>
              <p className="mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed text-slate-600 sm:text-lg">{c.sub}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex h-[3.25rem] items-center justify-center whitespace-nowrap rounded-full bg-[#0e2343] px-7 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,35,67,0.6)] transition-colors hover:bg-[#13305c]">
                  Book a {c.name} demo
                </Link>
                <a href={WHATSAPP + encodeURIComponent(`Hi NexEagle, I'd like to know more about ${c.name}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex h-[3.25rem] items-center justify-center whitespace-nowrap rounded-full border border-slate-300 bg-white/70 px-7 font-semibold text-[#0e2343] transition-colors hover:border-[#25d366]">
                  Ask on WhatsApp
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-[#1ea99b]" strokeWidth={3} />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="relative lg:col-span-6">
            <Reveal delay={0.15} className="xl:pl-24">
              <AgentCard title={c.agentTitle}>{c.demo}</AgentCard>
            </Reveal>
            <Float className="pointer-events-none absolute -left-4 bottom-0 hidden w-[120px] xl:block">
              <Image src={c.pose.src} alt={c.pose.alt} width={c.pose.w} height={c.pose.h} sizes="150px" className="h-auto w-full drop-shadow-[0_18px_22px_rgba(14,35,67,0.25)]" />
            </Float>
          </div>
        </div>
      </section>

      {/* ── What it covers ── */}
      <section className="border-t border-slate-200/70 bg-white py-20 sm:py-24" aria-labelledby="mods-title">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 id="mods-title" className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0e2343] sm:text-[2.8rem] lg:col-span-6">{c.modulesTitle}</h2>
            <p className="text-lg leading-relaxed text-slate-600 lg:col-span-5 lg:col-start-8 lg:self-end">{c.modulesIntro}</p>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {c.modules.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 0.06} className="border-t border-slate-200 pt-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1ea99b]/10 text-[#12857a]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#0e2343]">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-600">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How a day runs (stacking animated pipelines) ── */}
      <section className="relative isolate py-20 sm:py-28" aria-labelledby="steps-title">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eaf7f5_0%,#f1f5fb_50%,#ffffff_100%)]" />
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="steps-title" className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0e2343] sm:text-[2.8rem]">{c.stepsTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{c.stepsIntro}</p>
          </div>
          <div className="mt-14">
            <StepCards steps={c.steps} />
          </div>
        </div>
      </section>

      {/* ── Works with ── */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="ww-title">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <h2 id="ww-title" className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343] sm:text-3xl">Works on the same patient record as</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.worksWith.map((w) => (
              <li key={w.name}>
                <Link href={w.href} className="group flex h-full flex-col rounded-2xl border border-slate-200 p-5 transition-colors hover:border-[#1ea99b]">
                  <span className="font-display text-lg font-semibold text-[#0e2343]">{w.name}</span>
                  <span className="mt-1 text-sm leading-snug text-slate-600">{w.line}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#12857a]">
                    See {w.name} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeFAQ items={c.faq} title={`${c.name} questions`} intro={`What hospitals usually ask before choosing ${c.name}.`} />
      <ClosingCTA />
    </main>
  );
}
