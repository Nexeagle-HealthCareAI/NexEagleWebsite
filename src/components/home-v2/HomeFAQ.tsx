import Image from "next/image";
import { Plus } from "lucide-react";
import { FAQ } from "@/lib/homeContent";

// Plain HTML <details> so every answer is in the page source for search engines and AI answer
// engines, and works without JavaScript. Mirrors the FAQPage JSON-LD on the homepage.
export default function HomeFAQ({ items = FAQ, title = "Questions hospitals ask us", intro = "About Vita AI agents, 1HMS hospital management software and 1Rad AI radiology reporting." }: { items?: { q: string; a: string }[]; title?: string; intro?: string }) {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {intro}
          </p>
          <Image src="/assets/vita/vita-think.webp" alt="Vita thinking about a question" width={466} height={640} sizes="160px" className="mt-8 hidden h-auto w-[150px] lg:block" />
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]">
                <h3 className="font-display text-lg font-semibold leading-snug text-[#0e2343] sm:text-xl">{f.q}</h3>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-300 text-[#0e2343] transition-transform duration-300 group-open:rotate-45 group-open:border-[#1ea99b] group-open:bg-[#1ea99b] group-open:text-white">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-[46rem] pb-6 pr-12 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
