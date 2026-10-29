import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, MessagesSquare, MonitorPlay, Users } from "lucide-react";
import PageHero, { btnPrimary, btnSecondary, WHATSAPP } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Motion";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { CUSTOMERS } from "@/lib/customers";
import { SITE_URL } from "@/lib/site";

const TITLE = "NexEagle Customers: Hospitals and Diagnostic Centres Using NexEagle | NexEagle";
const DESCRIPTION =
  "Hospitals and diagnostic centres running NexEagle every day, including Sparsh Hospital in Kishanganj and Glisan Super Speciality Hospital in Purnea, Bihar. Ask to speak with a customer team before you decide.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/customers" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/customers", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const CHECKS = [
  { Icon: Users, title: "Talk to a customer team", body: "With their agreement, we put you in touch with the people who use NexEagle every day: owners, doctors and front-desk staff." },
  { Icon: MonitorPlay, title: "See it set up for you", body: "We run the demo with your own departments, doctors and rates, so you see your hospital, not a sample." },
  { Icon: MessagesSquare, title: "Ask us anything", body: "Questions about setup, data, training or price get a straight answer, on a call or on WhatsApp." },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/customers#page`,
    url: `${SITE_URL}/customers`,
    name: "NexEagle customers",
    description: DESCRIPTION,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: CUSTOMERS.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": c.type.toLowerCase().includes("diagnos") ? "MedicalBusiness" : "Hospital", name: c.name, url: c.url, ...(c.place ? { address: { "@type": "PostalAddress", addressLocality: c.place, addressRegion: c.state, addressCountry: "IN" } } : {}) },
      })),
    },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title="NexEagle Customers" />
      <PageHero
        crumb="Customers"
        eyebrow="Customers"
        title="Running every day in hospitals and diagnostic centres"
        intro="NexEagle runs the front desk, wards, billing and radiology for the teams below. The best way to judge us is to hear from them."
        actions={<><Link href="/contact" className={btnPrimary}>Book a demo</Link><a href={WHATSAPP("Hi NexEagle, I'd like to speak with a hospital that uses NexEagle.")} target="_blank" rel="noopener noreferrer" className={btnSecondary}>Ask for a reference</a></>}
        pose={{ src: "/assets/vita/vita-happy.webp", w: 1006, h: 760, alt: "Vita with wings open" }}
      />

      <section className="bg-white pb-20 pt-4 sm:pb-28" aria-label="Customer list">
        <div className="mx-auto grid max-w-[1320px] gap-5 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
          {CUSTOMERS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_30px_70px_-50px_rgba(14,35,67,0.5)]">
                <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-slate-100 bg-white">
                  {c.logo ? <Image src={c.logo} alt={`${c.name} logo`} width={80} height={80} className="h-16 w-16 object-contain" /> : <span className="font-display text-2xl font-bold text-[#0e2343]">{c.initials}</span>}
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#0e2343]">{c.name}</h2>
                <p className="mt-2 flex items-center gap-1.5 text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-slate-500">{[c.place, c.state].filter(Boolean).join(", ") || c.type}</span>
                </p>
                <p className="mt-1 text-sm text-slate-500">{c.place ? c.type : ""}</p>

                {c.story?.profile && <p className="mt-5 text-slate-700">{c.story.profile}</p>}
                {c.story?.uses && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.story.uses.map((u) => <li key={u} className="rounded-full bg-[#1ea99b]/10 px-3 py-1 text-sm font-semibold text-[#12857a]">{u}</li>)}
                  </ul>
                )}
                {c.story?.metrics && (
                  <dl className="mt-6 grid grid-cols-2 gap-4">
                    {c.story.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl bg-[#f4f8f8] p-3">
                        <dt className="text-xs text-slate-500">{m.label}</dt>
                        <dd className="mt-1 font-display text-lg font-semibold text-[#0e2343]">{m.before} → {m.after}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {c.story?.quote && (
                  <blockquote className="mt-6 border-l-2 border-[#1ea99b] pl-4">
                    <p className="text-[#0e2343]">“{c.story.quote.text}”</p>
                    <footer className="mt-2 text-sm text-slate-500">{c.story.quote.name}, {c.story.quote.role}</footer>
                  </blockquote>
                )}

                <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-[#12857a] hover:text-[#0e2343]">
                  Visit {c.name.split(" ")[0]}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f8f8] py-20 sm:py-28" aria-labelledby="check-title">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <h2 id="check-title" className="max-w-2xl font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">Check us before you commit</h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {CHECKS.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 0.06} className="rounded-[1.5rem] bg-white p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1ea99b]/10 text-[#12857a]"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 font-display text-xl font-semibold text-[#0e2343]">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCTA />
    </main>
  );
}
