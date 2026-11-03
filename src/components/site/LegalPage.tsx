"use client";

// Shared layout for Privacy, Terms and Security: readable column, sticky contents list that
// follows your scroll, and a contact box at the end.

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import type { LegalSection } from "@/lib/legal/types";

export default function LegalPage({
  sections,
  updated,
  intro,
  before,
  contact,
}: {
  sections: LegalSection[];
  updated?: string;
  intro?: string;
  before?: React.ReactNode;
  contact: { title: string; body: string; email: string };
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  return (
    <section className="bg-white pb-24 pt-4" aria-label="Contents">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
        {/* contents */}
        <nav aria-label="On this page" className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            {updated && <p className="mb-4 text-sm text-slate-500">Last updated {updated}</p>}
            <p className="mb-2 text-sm font-semibold text-[#0e2343]">On this page</p>
            <ol className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:block lg:space-y-0.5 lg:overflow-visible lg:border-l lg:border-slate-200 lg:pb-0">
              {sections.map((s, i) => (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    className={`block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition-colors lg:-ml-px lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-2 ${
                      active === s.id ? "border-[#1ea99b] bg-[#1ea99b]/10 font-semibold text-[#0e2343] lg:bg-transparent" : "border-slate-200 text-slate-500 hover:text-[#0e2343] lg:border-transparent"
                    }`}
                  >
                    <span className="mr-1.5 text-slate-400">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* body */}
        <div className="min-w-0 lg:col-span-8">
          {intro && <p className="mb-10 text-lg leading-relaxed text-slate-700">{intro}</p>}
          {before}
          <div className="space-y-14">
            {sections.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343] sm:text-[1.75rem]">
                  <span className="mr-2 text-slate-300">{i + 1}.</span>
                  {s.title}
                </h2>
                {s.description && <p className="mt-2 text-slate-500">{s.description}</p>}
                <div className="mt-5 space-y-5">
                  {s.content.map((c, k) => (
                    <div key={k}>
                      {c.subtitle && <h3 className="font-display text-lg font-semibold text-[#0e2343]">{c.subtitle}</h3>}
                      {c.text && <p className="mt-1.5 max-w-[44rem] leading-[1.75] text-slate-700">{c.text}</p>}
                      {c.items && (
                        <ul className="mt-2.5 max-w-[44rem] space-y-2">
                          {c.items.map((it) => (
                            <li key={it} className="flex gap-3 leading-relaxed text-slate-700">
                              <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1ea99b]" />
                              <span className="text-slate-700">{it}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 rounded-[1.5rem] bg-[#f4f8f8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-xl font-semibold text-[#0e2343]">{contact.title}</p>
              <p className="mt-1 max-w-lg text-slate-600">{contact.body}</p>
              <p className="mt-2 text-sm text-slate-500">NexEagle, Kolkata, West Bengal, India</p>
            </div>
            <a href={`mailto:${contact.email}`} className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#0e2343] px-6 font-semibold text-white hover:bg-[#13305c]">
              <Mail className="h-4 w-4" />
              <span className="text-white">{contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
