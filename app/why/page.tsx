import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Building2, HeartHandshake, Languages, Layers, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import PageHero, { btnPrimary, btnSecondary } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Motion";
import BeforeAfter from "@/components/home-v2/BeforeAfter";
import { ClientsStrip, ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: { absolute: "Why NexEagle: Hospital Software Built for Indian Hospitals | NexEagle" },
  description: "Why hospitals and diagnostic centres choose NexEagle: one patient record across OPD, IPD, radiology, lab and pharmacy, Vita AI agents that do the paperwork, Hindi support, on-site setup and data hosted in India.",
  alternates: { canonical: "/why" },
};

const REASONS = [
  { Icon: Layers, title: "One patient record, everywhere", body: "OPD, wards, radiology, lab and pharmacy work on the same record. Nobody types a patient's details twice, and nothing gets lost between counters." },
  { Icon: Bot, title: "AI that does the paperwork", body: "Vita drafts notes, prescriptions and radiology reports, keeps queues and bills up to date, and leaves every clinical decision to your doctors." },
  { Icon: Building2, title: "Made for hospitals like yours", body: "Built for small and mid-sized hospitals, nursing homes and diagnostic centres in India, not adapted from software made for big chains abroad." },
  { Icon: Languages, title: "English and Hindi", body: "Your reception, nurses and billing staff can work in the language they're comfortable with, and we train them in it." },
  { Icon: HeartHandshake, title: "We set it up with you", body: "Our team visits, configures, brings in your data and trains every role on site. After go-live you have a named contact." },
  { Icon: Stethoscope, title: "Doctors on the team", body: "A surgeon on our founding team checks every clinical workflow, so the software fits how doctors and wards really work." },
  { Icon: ShieldCheck, title: "Patient data protected", body: "Role-based logins, encryption and a full audit trail, handled in line with India's DPDP Act 2023." },
  { Icon: MapPin, title: "Hosted in India, proven in Bihar", body: "Your data stays on servers in India. NexEagle runs every day in hospitals in Kishanganj and Purnea." },
];

export default function Page() {
  return (
    <main>
      <AnalyticsTracker title="Why Choose NexEagle - Modern Clinical OS" />
      <PageHero
        crumb="Why NexEagle"
        eyebrow="Why NexEagle"
        title="Hospital software that fits how Indian hospitals really work"
        intro="Most hospital software asks your staff to change how they work. NexEagle starts from your OPD, wards and counters, and takes the paperwork off them."
        actions={<><Link href="/contact" className={btnPrimary}>Book a demo</Link><Link href="/how-it-works" className={btnSecondary}>How going live works</Link></>}
        pose={{ src: "/assets/vita/vita-present.webp", w: 753, h: 760, alt: "Vita presenting" }}
      />
      <ClientsStrip />
      <section className="bg-white py-20 sm:py-28" aria-labelledby="reasons-title">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <h2 id="reasons-title" className="max-w-2xl font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">Eight reasons hospitals choose us</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={(i % 4) * 0.06} className="border-t border-slate-200 pt-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1ea99b]/10 text-[#12857a]"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-[#0e2343]">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-600">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <BeforeAfter />
      <ClosingCTA />
    </main>
  );
}
