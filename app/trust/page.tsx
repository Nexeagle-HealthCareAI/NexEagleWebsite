import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ChevronRight, Download, FileText, KeyRound, MapPin, Scale, ShieldCheck, UserCheck } from "lucide-react";
import PageHero, { btnPrimary, btnSecondary } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Motion";
import LegalCards from "@/components/site/LegalCards";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { CERTS } from "@/lib/legal/security";
import { SITE_URL } from "@/lib/site";

const TITLE = "Trust at NexEagle: Patient Data, Security, AI Oversight & Compliance | NexEagle";
const DESCRIPTION =
  "How NexEagle looks after hospital and patient data: hosted in India, role-based access and audit trails, AI that drafts while clinicians decide, and handling in line with the DPDP Act 2023. Security documentation for your IT team on request.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/trust" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/trust", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const PILLARS = [
  { Icon: MapPin, title: "Your data stays in India", body: "Clinical and billing data is hosted on servers in India." },
  { Icon: KeyRound, title: "Each role sees only its work", body: "Reception, doctors, nurses, lab, pharmacy and accounts each have their own login and permissions." },
  { Icon: UserCheck, title: "Every action is recorded", body: "An audit trail shows who viewed or changed a record, and when." },
  { Icon: Bot, title: "AI drafts, people decide", body: "Vita drafts notes, prescriptions and reports. A doctor, radiologist or pathologist reviews and signs every one." },
  { Icon: Scale, title: "In line with the DPDP Act", body: "Personal and health data is handled in line with India's Digital Personal Data Protection Act, 2023." },
  { Icon: ShieldCheck, title: "Your data is yours", body: "Hospitals can ask for a copy of their data, and patients can ask to access or correct theirs." },
];

const DOCS = [
  { title: "Security", body: "How we protect systems and data, and how we respond to incidents.", href: "/security" },
  { title: "Privacy policy", body: "What we collect, why, how long we keep it and your rights.", href: "/privacy" },
  { title: "Terms of service", body: "The terms for using NexEagle products and services.", href: "/terms" },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/trust#page`,
    url: `${SITE_URL}/trust`,
    name: "Trust at NexEagle",
    description: DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnalyticsTracker title="NexEagle Trust" />
      <PageHero
        crumb="Trust"
        eyebrow="Trust"
        title="Patient data is the most sensitive thing you'll give us"
        intro="Here's how we look after it: where it lives, who can see it, how AI is kept in check, and the standards we work to."
        actions={<><a href="mailto:info@nexeagle.com?subject=Security%20documentation%20request" className={btnPrimary}>Request security documents</a><Link href="/security" className={btnSecondary}>Read our security page</Link></>}
        pose={{ src: "/assets/vita/vita-relax.webp", w: 725, h: 640, alt: "Vita relaxing" }}
      />

      <section className="bg-white pb-20 pt-4 sm:pb-24" aria-label="How we protect data">
        <ul className="mx-auto grid max-w-[1320px] gap-x-10 gap-y-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12">
          {PILLARS.map(({ Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 0.06} className="border-t border-slate-200 pt-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1ea99b]/10 text-[#12857a]"><Icon className="h-5 w-5" /></span>
              <h2 className="mt-4 font-display text-lg font-semibold text-[#0e2343]">{title}</h2>
              <p className="mt-1.5 leading-relaxed text-slate-600">{body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-[#f4f8f8] py-20 sm:py-24" aria-label="Standards">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <LegalCards title="Standards we work to" items={CERTS.map((c) => ({ title: c.name, description: c.description, tag: c.status }))} />
          <p className="-mt-8 max-w-2xl text-slate-600">
            We name a certificate here only once it has been issued. To understand what each standard means for your hospital, read our{" "}
            <Link href="/guides" className="font-semibold text-[#12857a] hover:text-[#0e2343]">guides on ABDM, NABH and DHIS</Link>.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24" aria-labelledby="docs-title">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          <h2 id="docs-title" className="font-display text-[2rem] font-semibold tracking-[-0.03em] text-[#0e2343] sm:text-[2.6rem]">Policies and documents</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {DOCS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="group flex h-full flex-col rounded-2xl border border-slate-200 p-6 transition-colors hover:border-[#1ea99b]">
                  <FileText className="h-5 w-5 text-[#12857a]" />
                  <span className="mt-4 font-display text-xl font-semibold text-[#0e2343]">{d.title}</span>
                  <span className="mt-1 text-slate-600">{d.body}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#12857a]">Read<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 rounded-[1.5rem] bg-[#0e2343] p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="font-display text-xl font-semibold text-white">For your IT team</p>
              <p className="mt-1 max-w-xl text-white/75">We share detailed security documentation with hospitals evaluating NexEagle. Write to us and we'll send it.</p>
            </div>
            <a href="mailto:info@nexeagle.com?subject=Security%20documentation%20request" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#0e2343]">
              <Download className="h-4 w-4" />
              <span className="text-[#0e2343]">Request documents</span>
            </a>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </main>
  );
}
