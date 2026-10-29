"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Check, Lock, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/** A module as the product pages write it (server side). */
export type Module = { Icon: LucideIcon; title: string; body: string; core?: boolean };
/** What reaches this client component: the icon already drawn (a function can't cross from server to client). */
export type BuilderModule = { icon: ReactNode; title: string; body: string; core?: boolean };

const WHATSAPP = "https://wa.me/918074906808?text=";

/**
 * The product's modules as switches: "build your 1HMS". Core modules are always on; the rest start on or off
 * (`startWith`) and flip with a tap. A bar under the grid counts what is switched on and books a demo (or opens
 * WhatsApp) with that list filled in. Every card keeps its full text visible on or off, so the page still reads as
 * a plain list for people and search engines. Reduced motion: no lift, no pop.
 */
export default function ModuleBuilder({ product, modules, startWith }: { product: string; modules: BuilderModule[]; startWith: "core" | "all" }) {
  const reduce = useReducedMotion();
  const [on, setOn] = useState<Set<string>>(() => new Set(modules.filter((m) => startWith === "all" || m.core).map((m) => m.title)));
  const chosen = useMemo(() => modules.filter((m) => on.has(m.title)), [modules, on]);

  const toggle = (m: BuilderModule) => {
    if (m.core) return;
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(m.title)) next.delete(m.title);
      else next.add(m.title);
      return next;
    });
  };

  const list = chosen.map((m) => m.title).join(", ");
  const demoHref = `/contact?product=${encodeURIComponent(product)}&modules=${encodeURIComponent(list)}`;
  const whatsappHref = WHATSAPP + encodeURIComponent(`Hi NexEagle, I'd like to see ${product} with: ${list}.`);

  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-[#12857a]">
        {startWith === "core" ? "Tap a module to switch it on." : "Tap a module to leave it out."}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => {
          const isOn = on.has(m.title);
          return (
            <li key={m.title}>
              <motion.button
                type="button"
                onClick={() => toggle(m)}
                aria-pressed={isOn}
                aria-disabled={m.core || undefined}
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={reduce || m.core ? undefined : { scale: 0.98 }}
                className={`group relative flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b] ${
                  isOn ? "border-[#1ea99b] bg-[#1ea99b]/[0.06] shadow-[0_12px_30px_-18px_rgba(18,133,122,0.6)]" : "border-slate-200 bg-white hover:border-[#1ea99b]/50"
                } ${m.core ? "cursor-default" : "cursor-pointer"}`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl transition-colors ${isOn ? "bg-[#1ea99b] text-white" : "bg-[#1ea99b]/10 text-[#12857a]"}`}>
                    <span className={reduce ? "" : "transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"}>{m.icon}</span>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      m.core ? "bg-[#0e2343]/5 text-[#0e2343]" : isOn ? "bg-[#1ea99b] text-white" : "border border-slate-200 text-slate-500 group-hover:border-[#1ea99b]/50 group-hover:text-[#12857a]"
                    }`}
                  >
                    {m.core ? (
                      <>
                        <Lock className="h-3 w-3" /> Always on
                      </>
                    ) : isOn ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={3} /> On
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" strokeWidth={3} /> Add
                      </>
                    )}
                  </span>
                </span>
                <span className="mt-4 font-display text-lg font-semibold text-[#0e2343]">{m.title}</span>
                <span className="mt-1.5 leading-relaxed text-slate-600">{m.body}</span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_18px_40px_-20px_rgba(14,35,67,0.45)] backdrop-blur sm:flex-row sm:items-center">
          <p className="flex-1 text-sm text-slate-600" aria-live="polite">
            <span className="font-display text-base font-semibold text-[#0e2343]">
              Your {product}: {chosen.length} of {modules.length} modules
            </span>
            <span className="block">All on one patient record. Switch more on any time.</span>
          </p>
          <div className="flex gap-2">
            <Link href={demoHref} className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#0e2343] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#13305c]">
              Book a demo with these
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-slate-300 px-4 text-sm font-semibold text-[#0e2343] transition-colors hover:border-[#25d366]">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
