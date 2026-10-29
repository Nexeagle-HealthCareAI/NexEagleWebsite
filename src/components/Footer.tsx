import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Phone } from "lucide-react";
import TrackingChoicesLink from "./TrackingChoicesLink";
import { SOFTWARE } from "@/lib/site";

const COLS = [
  {
    title: "Products",
    links: [
      { name: "1HMS hospital management", href: "/solutions/1hms" },
      { name: "1Rad radiology & PACS", href: "/solutions/1rad" },
      { name: "1Lab laboratory", href: "/solutions/1lab" },
      { name: "1Pharma pharmacy", href: "/solutions/1pharma" },
      { name: "NexEagle AI", href: "/ai" },
    ],
  },
  {
    title: "Who it's for",
    links: [
      { name: "Doctors and clinics", href: "/for/doctors" },
      { name: "Hospitals", href: "/for/hospitals" },
      { name: "Diagnostic centres", href: "/for/diagnostic-centres" },
      { name: "Labs and pharmacies", href: "/for/labs-pharmacies" },
      { name: "Customers", href: "/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Why NexEagle", href: "/why" },
      { name: "How it works", href: "/how-it-works" },
      { name: "Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Guides", href: "/guides" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Trust",
    links: [
      { name: "Trust overview", href: "/trust" },
      { name: "Security", href: "/security" },
      { name: "Privacy policy", href: "/privacy" },
      { name: "Terms of service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const linkCls = "text-[0.95rem] text-slate-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b] rounded";
  return (
    <footer className="bg-[#0a1a33] text-slate-300">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]">
              <Image src="/assets/logo.webp" alt="" width={44} height={44} className="h-10 w-10 object-contain" />
              <span className="font-display text-2xl font-bold tracking-[-0.03em] text-white">NexEagle</span>
            </Link>
            <p className="mt-4 max-w-sm leading-relaxed !text-slate-400">
              Vita AI agents, hospital management software, cloud PACS with AI radiology reporting, LIS and pharmacy software for hospitals, clinics and diagnostic centres across India.
            </p>
            <ul className="mt-6 space-y-3">
              <li><a href="tel:+918074906808" className={`inline-flex items-center gap-2.5 ${linkCls}`}><Phone className="h-4 w-4" />+91 80749 06808</a></li>
              <li><a href="mailto:info@nexeagle.com" className={`inline-flex items-center gap-2.5 ${linkCls}`}><Mail className="h-4 w-4" />info@nexeagle.com</a></li>
              <li><a href="https://linkedin.com/company/nexeagle" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkCls}`}><Linkedin className="h-4 w-4" />LinkedIn</a></li>
            </ul>
            <p className="mt-8 font-display font-semibold text-white">Log in to our software</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOFTWARE.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-[#1ea99b] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8 lg:col-start-5">
            {COLS.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="font-display font-semibold text-white">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.href}><Link href={l.href} className={linkCls}>{l.name}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500">© {new Date().getFullYear()} NexEagle. All rights reserved. Photography via <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-white hover:underline">Unsplash</a>.</p>
          <TrackingChoicesLink className="self-start rounded text-slate-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b] sm:self-auto" />
        </div>
      </div>
    </footer>
  );
}
