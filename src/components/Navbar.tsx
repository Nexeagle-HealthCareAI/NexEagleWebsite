"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, Stethoscope, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCTORDEKHO_URL } from "@/lib/site";

const PRODUCTS = [
  { name: "1HMS", line: "Hospital management & EMR", href: "/solutions/1hms", dot: "bg-[#1ea99b]" },
  { name: "1Rad", line: "Cloud PACS & AI reporting", href: "/solutions/1rad", dot: "bg-[#1599db]" },
  { name: "1Lab", line: "Lab information system", href: "/solutions/1lab", dot: "bg-[#8a6fe0]" },
  { name: "1Pharma", line: "Pharmacy & inventory", href: "/solutions/1pharma", dot: "bg-[#22a559]" },
];

const AUDIENCES = [
  { name: "Doctors and clinics", href: "/for/doctors" },
  { name: "Hospitals", href: "/for/hospitals" },
  { name: "Diagnostic centres", href: "/for/diagnostic-centres" },
  { name: "Labs and pharmacies", href: "/for/labs-pharmacies" },
];

const LINKS = [
  { name: "Customers", href: "/customers" },
  { name: "NexEagle AI", href: "/ai" },
  { name: "Guides", href: "/guides" },
  { name: "Contact", href: "/contact" },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <Image src="/assets/logo.webp" alt="" width={44} height={44} priority className={cn("object-contain", compact ? "h-9 w-9" : "h-10 w-10")} />
      <span className="font-display text-[1.35rem] font-bold leading-none tracking-[-0.03em] text-[#0e2343]">NexEagle</span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation; lock page scroll while the mobile menu is open.
  useEffect(() => { setOpen(false); setProductsOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled || open ? "bg-white/85 shadow-[0_1px_0_rgba(14,35,67,0.08)] backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main">
          <Link href="/" aria-label="NexEagle home" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1ea99b]">
            <Wordmark />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button
                type="button"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                onClick={() => setProductsOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium xl:px-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]",
                  pathname.startsWith("/solutions") || pathname.startsWith("/for/") ? "text-[#0e2343]" : "text-slate-600 hover:text-[#0e2343]"
                )}
              >
                Solutions
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", productsOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full w-[46rem] pt-3"
                  >
                    <div className="grid grid-cols-[1fr_15rem] gap-2 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(14,35,67,0.35)]">
                    <div>
                    <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Products</p>
                    <div className="grid grid-cols-2 gap-1">
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]"
                        >
                          <span className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", p.dot)} />
                          <span>
                            <span className="block font-display font-semibold text-[#0e2343]">{p.name}</span>
                            <span className="block text-sm text-slate-500">{p.line}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    </div>
                    <div className="rounded-xl bg-[#f4f8f8] p-2">
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Who it's for</p>
                      {AUDIENCES.map((a) => (
                        <Link key={a.href} href={a.href} className="block rounded-lg px-3 py-2 font-medium text-[#0e2343] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]">
                          {a.name}
                        </Link>
                      ))}
                    </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors xl:px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]",
                  isActive(l.href) ? "text-[#0e2343]" : "text-slate-600 hover:text-[#0e2343]"
                )}
              >
                {l.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={DOCTORDEKHO_URL}
              aria-label="Find a doctor on Doctor Dekho"
              title="Find a doctor"
              className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[0.95rem] font-medium text-[#12857a] transition-colors hover:bg-[#1ea99b]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b]"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden xl:inline">Find a doctor</span>
            </a>
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full bg-[#0e2343] px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#13305c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]"
            >
              Book a demo
            </Link>
          </div>

          {/* Mobile / tablet toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-[#0e2343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ea99b] lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-white lg:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: 0.05 } } }}
              className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8"
            >
              <motion.p variants={item(reduce)} className="px-1 pb-2 text-sm text-slate-500">Products</motion.p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {PRODUCTS.map((p) => (
                  <motion.div key={p.href} variants={item(reduce)}>
                    <Link href={p.href} className="flex items-start gap-3 rounded-2xl p-3 active:bg-slate-50">
                      <span className={cn("mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full", p.dot)} />
                      <span>
                        <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343]">{p.name}</span>
                        <span className="block text-[0.95rem] text-slate-500">{p.line}</span>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.p variants={item(reduce)} className="px-1 pb-1 pt-5 text-sm text-slate-500">Who it&apos;s for</motion.p>
              <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                {AUDIENCES.map((a) => (
                  <motion.div key={a.href} variants={item(reduce)}>
                    <Link href={a.href} className="block rounded-2xl px-3 py-2.5 text-lg font-medium text-[#0e2343] active:bg-slate-50">{a.name}</Link>
                  </motion.div>
                ))}
              </div>
              <div className="my-4 h-px bg-slate-200" />
              {LINKS.map((l) => (
                <motion.div key={l.href} variants={item(reduce)}>
                  <Link href={l.href} className="block rounded-2xl px-3 py-3 font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343] active:bg-slate-50">
                    {l.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={item(reduce)} className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
                <a href={DOCTORDEKHO_URL} className="flex h-14 items-center justify-center gap-2 rounded-full border border-slate-300 font-semibold text-[#12857a]">
                  <Stethoscope className="h-5 w-5" />
                  Find a doctor
                </a>
                <Link href="/contact" className="flex h-14 items-center justify-center rounded-full bg-[#0e2343] font-semibold text-white">
                  Book a demo
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function item(reduce: boolean | null) {
  return {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  };
}
