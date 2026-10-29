import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageHero, { btnPrimary, btnSecondary } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Motion";
import AgentsSection from "@/components/home-v2/AgentsSection";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { DOCTORDEKHO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "NexEagle Products: 1HMS, 1Rad, 1Lab, 1Pharma and Vita AI Agents" },
  description: "NexEagle's healthcare software for India: 1HMS hospital management software and EMR, 1Rad cloud PACS with AI radiology reporting, 1Lab LIS, 1Pharma pharmacy software and Doctor Dekho, all run by Vita AI agents on one patient record.",
  alternates: { canonical: "/products" },
};

const PRODUCTS = [
  { name: "1HMS", cat: "Hospital management software & EMR", line: "OPD, IPD, e-prescriptions, AI scribe, orders and billing on one record.", href: "/solutions/1hms", dot: "bg-[#1ea99b]", for: "Hospitals, nursing homes, clinics" },
  { name: "1Rad", cat: "Cloud PACS & AI radiology reporting", line: "Browser DICOM viewer, AI vision analysis and drafted reports your radiologist signs.", href: "/solutions/1rad", dot: "bg-[#1599db]", for: "Diagnostic centres, hospital radiology" },
  { name: "1Lab", cat: "Laboratory information system", line: "Barcoded samples, analyser results, abnormal flags and pathologist approval.", href: "/solutions/1lab", dot: "bg-[#8a6fe0]", for: "Pathology labs, hospital labs" },
  { name: "1Pharma", cat: "Pharmacy & inventory", line: "Prescriptions from the doctor, barcode dispensing, expiry alerts and billing.", href: "/solutions/1pharma", dot: "bg-[#22a559]", for: "Hospital pharmacies, medical stores" },
];

export default function Page() {
  return (
    <main>
      <AnalyticsTracker title="NexEagle Products - Healthcare Ecosystem" />
      <PageHero
        crumb="Products"
        eyebrow="Products"
        title="Four products, one patient record, run by Vita"
        intro="Start with the product that solves your biggest problem today. Each one works on its own, and they share the same patient record when you add the next."
        actions={<><Link href="/contact" className={btnPrimary}>Book a demo</Link><Link href="/ai" className={btnSecondary}>Meet Vita</Link></>}
        pose={{ src: "/assets/vita/vita-happy.webp", w: 1006, h: 760, alt: "Vita with wings open" }}
      />
      <section className="bg-white pb-20 pt-4 sm:pb-24" aria-label="Products">
        <div className="mx-auto grid max-w-[1320px] gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:px-12">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08}>
              <Link href={p.href} className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#1ea99b]/60 hover:shadow-[0_30px_70px_-40px_rgba(14,35,67,0.45)] sm:p-9">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-500"><span className={`h-2.5 w-2.5 rounded-full ${p.dot}`} />{p.cat}</span>
                <span className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-[#0e2343]">{p.name}</span>
                <span className="mt-3 text-lg leading-relaxed text-slate-600">{p.line}</span>
                <span className="mt-6 text-sm text-slate-500">For: {p.for}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 font-semibold text-[#12857a]">Explore {p.name}<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
          <Reveal className="sm:col-span-2">
            <a href={DOCTORDEKHO_URL} className="group flex flex-col items-start gap-6 rounded-[1.75rem] bg-[linear-gradient(120deg,#0e2343,#12857a)] p-7 text-white sm:flex-row sm:items-center sm:p-9">
              <Image src="/assets/vita/avatar-present.webp" alt="" width={72} height={72} className="h-16 w-16 rounded-full ring-2 ring-white/40" />
              <span className="flex-1">
                <span className="block text-sm text-white/70">For patients</span>
                <span className="block font-display text-2xl font-semibold text-white">Doctor Dekho, with Vita for patients</span>
                <span className="mt-1 block text-white/80">Patients describe their symptoms, find the right doctor nearby, book and get directions to your door.</span>
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-white">Open Doctor Dekho<ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </a>
          </Reveal>
        </div>
      </section>
      <AgentsSection />
      <ClosingCTA />
    </main>
  );
}
