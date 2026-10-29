import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal, Float } from "./Motion";

// Standard header for inner pages: breadcrumb, eyebrow, H1, intro, optional actions and Vita pose.
export default function PageHero({
  crumb,
  eyebrow,
  title,
  intro,
  actions,
  pose,
}: {
  crumb: string;
  eyebrow?: string;
  title: string;
  intro: string;
  actions?: React.ReactNode;
  pose?: { src: string; w: number; h: number; alt: string };
}) {
  return (
    <section className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]" aria-labelledby="page-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_80%_40%,hsl(var(--brand-teal)/0.11),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-20 lg:pt-14">
        <Reveal className="lg:col-span-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#0e2343]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#0e2343]">{crumb}</span>
          </nav>
          {eyebrow && <p className="mt-6 text-[0.95rem] font-medium text-[#12857a]">{eyebrow}</p>}
          <h1 id="page-title" className="mt-4 max-w-[48rem] font-display text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.035em] text-[#0e2343] sm:text-[3.2rem] xl:text-[3.7rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-relaxed text-slate-600 sm:text-lg">{intro}</p>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </Reveal>
        {pose && (
          <div className="hidden lg:col-span-4 lg:block">
            <Float className="mx-auto w-[240px] xl:w-[280px]">
              <Image src={pose.src} alt={pose.alt} width={pose.w} height={pose.h} priority sizes="280px" className="h-auto w-full drop-shadow-[0_24px_30px_rgba(14,35,67,0.22)]" />
            </Float>
          </div>
        )}
      </div>
    </section>
  );
}

export const btnPrimary = "inline-flex h-[3.25rem] items-center justify-center whitespace-nowrap rounded-full bg-[#0e2343] px-7 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(14,35,67,0.6)] transition-colors hover:bg-[#13305c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]";
export const btnSecondary = "inline-flex h-[3.25rem] items-center justify-center whitespace-nowrap rounded-full border border-slate-300 bg-white/70 px-7 font-semibold text-[#0e2343] transition-colors hover:border-[#0e2343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]";
export const WHATSAPP = (msg: string) => `https://wa.me/918074906808?text=${encodeURIComponent(msg)}`;
