import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Motion";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

const TITLE = "Guides for Hospital Owners: ABDM, NABH Digital Health and DHIS Explained | NexEagle";
const DESCRIPTION =
  "Plain-language, dated guides for hospital and diagnostic centre owners in India: ABDM milestones M1–M3, NABH Digital Health Standards and the Digital Health Incentive Scheme, with what to ask your software vendor.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/guides", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${SITE_URL}/guides`,
    name: "NexEagle guides",
    description: DESCRIPTION,
    hasPart: GUIDES.map((g) => ({ "@type": "Article", headline: g.title, url: `${SITE_URL}/guides/${g.slug}` })),
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title="NexEagle Guides" />
      <PageHero
        crumb="Guides"
        eyebrow="Guides"
        title="The rules and schemes that shape hospital software, explained"
        intro="Short, dated guides for hospital and diagnostic centre owners. Each one links to its sources and ends with the questions to ask any software vendor, including us."
        pose={{ src: "/assets/vita/vita-think.webp", w: 466, h: 640, alt: "Vita thinking" }}
      />
      <section className="bg-white pb-24 pt-4" aria-label="Guides">
        <ul className="mx-auto grid max-w-[1320px] gap-5 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
          {GUIDES.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={i * 0.06}>
              <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 p-7 transition-[border-color,box-shadow] hover:border-[#1ea99b]/60 hover:shadow-[0_30px_70px_-40px_rgba(14,35,67,0.45)]">
                <span className="text-sm font-medium text-[#12857a]">{g.short}</span>
                <span className="mt-3 font-display text-xl font-semibold leading-snug text-[#0e2343]">{g.title}</span>
                <span className="mt-3 line-clamp-4 text-slate-600">{g.answer}</span>
                <span className="mt-auto flex items-center justify-between pt-6 text-sm">
                  <span className="text-slate-500">Checked {fmt(g.checked)}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#12857a]">Read<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <ClosingCTA />
    </main>
  );
}
