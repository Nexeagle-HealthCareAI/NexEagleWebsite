import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink, HelpCircle } from "lucide-react";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = GUIDES.find((x) => x.slug === params.slug);
  if (!g) return {};
  return {
    title: { absolute: `${g.title} | NexEagle` },
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.description, url: `/guides/${g.slug}`, images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
  };
}

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function Page({ params }: { params: { slug: string } }) {
  const g = GUIDES.find((x) => x.slug === params.slug);
  if (!g) notFound();
  const url = `${SITE_URL}/guides/${g.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: g.short, item: url },
        ],
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: g.title,
        description: g.description,
        dateModified: g.checked,
        datePublished: g.checked,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
        citation: g.sources.map((s) => s.url),
      },
    ],
  };
  const others = GUIDES.filter((x) => x.slug !== g.slug);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title={`Guide: ${g.short}`} />
      <article className="mx-auto max-w-[760px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#0e2343]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/guides" className="hover:text-[#0e2343]">Guides</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#0e2343]">{g.short}</span>
        </nav>
        <h1 className="mt-6 font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[#0e2343] sm:text-[2.9rem]">{g.title}</h1>
        <p className="mt-4 text-sm text-slate-500">Facts checked on {fmt(g.checked)}. General information, not legal or financial advice.</p>

        <div className="mt-8 rounded-2xl border-l-4 border-[#1ea99b] bg-[#f4f8f8] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#12857a]">In short</p>
          <p className="mt-2 text-lg leading-relaxed text-[#0e2343]">{g.answer}</p>
        </div>

        {g.sections.map((s) => (
          <section key={s.h} className="mt-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343]">{s.h}</h2>
            {s.p?.map((t) => <p key={t} className="mt-4 leading-[1.75] text-slate-700">{t}</p>)}
            {s.list && (
              <ul className="mt-4 space-y-2.5">
                {s.list.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed text-slate-700">
                    <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1ea99b]" />
                    <span className="text-slate-700">{t}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.table && (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[520px] text-left text-[0.95rem]">
                  <thead className="bg-slate-50">
                    <tr>{s.table.head.map((h) => <th key={h} className="px-4 py-3 font-semibold text-[#0e2343]">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r[0]} className="border-t border-slate-200 align-top">
                        {r.map((c, i) => <td key={i} className={`px-4 py-3 ${i === 0 ? "font-semibold text-[#0e2343]" : "text-slate-700"}`}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        <section className="mt-12 rounded-2xl bg-[#0e2343] p-6 text-white sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-[#5fd6c9]" />Questions to ask any software vendor</h2>
          <ol className="mt-4 space-y-3">
            {g.ask.map((q, i) => (
              <li key={q} className="flex gap-3 text-white/90">
                <span className="font-display font-semibold text-[#5fd6c9]">{i + 1}.</span>
                <span className="text-white/90">{q}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-white/70">Ask us too. <Link href="/contact" className="font-semibold text-white underline underline-offset-2">Book a call</Link> and we'll answer each one for NexEagle.</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-[#0e2343]">Sources</h2>
          <ul className="mt-3 space-y-2">
            {g.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#12857a] hover:text-[#0e2343]">
                  {s.title}<ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="font-display text-lg font-semibold text-[#0e2343]">More guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/guides/${o.slug}`} className="group block rounded-2xl border border-slate-200 p-5 hover:border-[#1ea99b]">
                  <span className="text-sm text-[#12857a]">{o.short}</span>
                  <span className="mt-1 block font-display font-semibold text-[#0e2343]">{o.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <ClosingCTA />
    </main>
  );
}
