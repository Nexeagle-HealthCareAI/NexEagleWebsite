"use client";

import Image from "next/image";
import Link from "next/link";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center px-5 py-16">
      <AnalyticsTracker title="Page Not Found - NexEagle" />
      <div className="max-w-md text-center">
        <Image src="/assets/vita/vita-sleep.webp" alt="Vita asleep" width={641} height={640} priority className="mx-auto h-auto w-[220px]" />
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-[#0e2343]">This page doesn&apos;t exist</h1>
        <p className="mt-3 text-lg text-slate-600">The link may be old or mistyped. Vita is taking a nap here, but everything else is wide awake.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full bg-[#0e2343] px-6 font-semibold text-white hover:bg-[#13305c]">Go to the homepage</Link>
          <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 px-6 font-semibold text-[#0e2343] hover:border-[#0e2343]">Contact us</Link>
        </div>
      </div>
    </main>
  );
}
