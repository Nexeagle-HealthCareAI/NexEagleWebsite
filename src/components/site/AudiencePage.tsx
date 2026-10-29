import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronRight, MapPin } from "lucide-react";
import { AgentCard } from "@/components/home-v2/AgentsSection";
import HomeFAQ from "@/components/home-v2/HomeFAQ";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { SITE_URL } from "@/lib/site";
import { CUSTOMERS, type CustomerId } from "@/lib/customers";
import { Reveal, Float } from "./Motion";
import { btnPrimary, btnSecondary, WHATSAPP } from "./PageHero";

// One page per type of buyer (doctors, hospitals, diagnostic centres, labs and pharmacies).
// Lead with their problem, show what changes in their day, then the products and the live sites.

export type AudienceConfig = {
  slug: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  sub: string;
  points: string[];
  agentTitle: string;
  demo: React.ReactNode;
  pose: { src: string; w: number; h: number; alt: string };
  changesTitle: string;
  changes: { before: string; after: string }[];
  products: { name: string; href: string; line: string; when: "Start with" | "Add when ready" }[];
  proofTitle: string;
  proof: CustomerId[];
  faq: { q: string; a: string }[];
  schema: { name: string; description: string; audience: string };
  analyticsTitle: string;
};

export default function AudiencePage({ c }: { c: AudienceConfig }) {
  const url = `${SITE_URL}/for/${c.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: c.crumb, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: c.schema.name,
        description: c.schema.description,
        audience: { "@type": "BusinessAudience", audienceType: c.schema.audience, geographicArea: { "@type": "Country", name: "India" } },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  const sites = c.proof.map((id) => CUSTOMERS.find((x) => x.id === id)!).filter(Boolean);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title={c.analyticsTitle} />

      {/* Hero */}
      <section className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]" aria-labelledby="a-title">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_75%_45%,hsl(var(--brand-teal)/0.12),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-24 lg:pt-14">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#0e2343]">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#0e2343]">{c.crumb}</span>
            </nav>
            <Reveal>
              <p className="mt-6 text-[0.95rem] font-medium text-[#12857a]">{c.eyebrow}</p>
              <h1 id="a-title" className="mt-4 font-display text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.035em] text-[#0e2343] sm:text-[3.2rem] xl:text-[3.5rem]">{c.h1}</h1>
              <p className="mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed text-slate-600 sm:text-lg">{c.sub}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className={btnPrimary}>Book a demo</Link>
                <a href={WHATSAPP(`Hi NexEagle, I'm interested in NexEagle for ${c.schema.audience.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" className={btnSecondary}>Ask on WhatsApp</a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-[#1ea99b]" strokeWidth={3} />
                    <span className="text-slate-600">{p}</span>
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

      {/* Before and after */}
      <section className="border-t border-slate-200/70 bg-white py-20 sm:py-24" aria-labelledby="chg-title">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <h2 id="chg-title" className="max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0e2343] sm:text-[2.8rem]">{c.changesTitle}</h2>
          <div className="mt-12 hidden grid-cols-2 gap-6 px-6 text-sm font-semibold uppercase tracking-[0.12em] sm:grid">
            <span className="text-slate-400">Today</span>
            <span className="text-[#12857a]">With NexEagle</span>
          </div>
          <ul className="mt-4 space-y-3">
            {c.changes.map((x, i) => (
              <Reveal as="li" key={x.before} delay={i * 0.05} className="grid overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-2">
                <p className="bg-slate-50 p-5 text-slate-500 sm:p-6"><span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 sm:hidden">Today</span>{x.before}</p>
                <p className="flex gap-3 bg-white p-5 font-medium text-[#0e2343] sm:p-6">
                  <ArrowRight className="mt-1 hidden h-4 w-4 shrink-0 text-[#1ea99b] sm:block" />
                  <span className="text-[#0e2343]"><span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-[#12857a] sm:hidden">With NexEagle</span>{x.after}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section className="bg-[#f4f8f8] py-20 sm:py-24" aria-labelledby="prod-title">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <h2 id="prod-title" className="font-display text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0e2343] sm:text-[2.8rem]">What you would use</h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">Start with one product and add the rest later. They all share the same patient record.</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {c.products.map((p, i) => (
              <Reveal as="li" key={p.name} delay={(i % 2) * 0.06}>
                <Link href={p.href} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] hover:border-[#1ea99b]/60 hover:shadow-[0_24px_60px_-40px_rgba(14,35,67,0.45)]">
                  <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.when === "Start with" ? "bg-[#1ea99b]/10 text-[#12857a]" : "bg-slate-100 text-slate-600"}`}>{p.when}</span>
                  <span className="mt-3 font-display text-2xl font-semibold text-[#0e2343]">{p.name}</span>
                  <span className="mt-1 text-slate-600">{p.line}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#12857a]">See {p.name}<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-[#0e2343] py-20 text-white sm:py-24" aria-labelledby="proof-title">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5fd6c9]">In use today</p>
            <h2 id="proof-title" className="mt-3 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.6rem]">{c.proofTitle}</h2>
            <p className="mt-4 max-w-md text-white/75">Ask us to put you in touch with a team that uses NexEagle every day, and judge it from them.</p>
            <Link href="/customers" className="mt-6 inline-flex items-center gap-1 font-semibold text-[#5fd6c9] hover:text-white">All customers<ChevronRight className="h-4 w-4" /></Link>
          </div>
          <ul className="space-y-4 lg:col-span-7">
            {sites.map((s) => (
              <li key={s.id} className="flex items-center gap-5 rounded-2xl border border-white/15 bg-white/5 p-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white">
                  {s.logo ? <Image src={s.logo} alt="" width={56} height={56} className="h-12 w-12 object-contain" /> : <span className="font-display text-lg font-bold text-[#0e2343]">{s.initials}</span>}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl font-semibold text-white">{s.name}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-sm text-white/70"><MapPin className="h-3.5 w-3.5" />{s.place ? `${s.place} · ` : ""}{s.type}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeFAQ items={c.faq} title="Questions we hear" intro={`What ${c.schema.audience.toLowerCase()} usually ask before choosing NexEagle.`} />
      <ClosingCTA />
    </main>
  );
}
