import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Check, Compass, Layers, PenTool, RefreshCw, Server } from "lucide-react";
import PageHero, { btnPrimary, btnSecondary, WHATSAPP } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Motion";
import HomeFAQ from "@/components/home-v2/HomeFAQ";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: { absolute: "Healthcare Software & AI Product Engineering Services in India | NexEagle" },
  description: "Product engineering from the team that builds 1HMS, 1Rad, 1Lab and 1Pharma: product strategy, UI/UX design, full-stack web and mobile development, AI integration and cloud architecture for healthcare and other ambitious products.",
  alternates: { canonical: "/services" },
  keywords: [
    "product engineering services",
    "healthcare software development India",
    "AI integration",
    "digital transformation",
    "software development services",
    "startup engineering partner",
    "full-stack development",
    "product design",
    "system architecture",
    "technology consulting"
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Product Engineering Services",
  "provider": {
    "@type": "Organization",
    "name": "NexEagle",
    "url": "https://nexeagle.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Product Engineering Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Strategy",
          "description": "Market research, product roadmap, competitive analysis, and go-to-market strategy"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Design",
          "description": "UI/UX design, design systems, prototyping, and user research"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full-Stack Development",
          "description": "Web and mobile app development, API development, and cloud infrastructure"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Integration",
          "description": "Machine learning, natural language processing, and AI-powered features"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "System Architecture",
          "description": "Scalable architecture, microservices, cloud infrastructure, and DevOps"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Transformation",
          "description": "Legacy system modernization, process automation, and technology consulting"
        }
      }
    ]
  }
};

const SERVICES = [
  { Icon: Compass, name: "Product strategy", line: "Work out what to build first and why.", items: ["User and market research", "MVP scope and success measures", "Roadmap and release plan"] },
  { Icon: PenTool, name: "Product design", line: "Screens people understand on the first try.", items: ["User flows and wireframes", "Visual design and design systems", "Clickable prototypes and usability tests"] },
  { Icon: Layers, name: "Web and mobile development", line: "Production-ready apps, not demos.", items: ["React and Next.js front ends", "APIs in Node.js or Python", "React Native apps for iOS and Android"] },
  { Icon: Bot, name: "AI integration", line: "AI where it saves real work, with people in control.", items: ["LLM assistants and agents", "Document and image AI", "Evaluation, guardrails and monitoring"] },
  { Icon: Server, name: "Architecture and cloud", line: "Systems that stay fast and secure as you grow.", items: ["Cloud setup and CI/CD", "Security, roles and audit trails", "Monitoring and scaling"] },
  { Icon: RefreshCw, name: "Modernising old software", line: "Move off ageing systems without stopping work.", items: ["Data migration", "Step-by-step replacement", "Training for your team"] },
];

const PROOF = [
  { name: "1HMS", what: "Hospital management and EMR used every day in hospitals in Bihar", href: "/solutions/1hms" },
  { name: "1Rad", what: "Cloud PACS with AI vision analysis and drafted reports", href: "/solutions/1rad" },
  { name: "Vita agents", what: "AI agents that book, document and keep records up to date", href: "/ai" },
];

const STEPS = [
  { title: "Understand", body: "We learn your users, your goals and what success looks like, and agree the first release." },
  { title: "Design", body: "We map flows and build a clickable prototype you can put in front of real users." },
  { title: "Build", body: "We ship in short cycles with a working demo every couple of weeks." },
  { title: "Launch and improve", body: "We go live with you, watch how it's used and keep improving it." },
];

const FAQ_SERVICES = [
  { q: "Do you only work on healthcare projects?", a: "Healthcare is where we know the most, because we build our own hospital, radiology, lab and pharmacy products. We also take on other products where our design, engineering and AI experience fits." },
  { q: "Can you work with our existing team?", a: "Yes. We can own a full product end to end, or join your team for design, AI or a specific part of the build." },
  { q: "How do you price projects?", a: "After a first conversation we share a scoped proposal with a fixed price for a defined first release, or a monthly team arrangement for ongoing work." },
  { q: "Who owns the code?", a: "For client projects you own the code and designs we build for you, as set out in our Statement of Work." },
];

export default function ServicesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <AnalyticsTracker title="NexEagle Services - Product Engineering Partner" />
      <PageHero
        crumb="Services"
        eyebrow="Product engineering"
        title="We build software the way we build our own products"
        intro="The team behind 1HMS, 1Rad and Vita can design, build and launch your product too: strategy, design, development and AI, from first idea to everyday use."
        actions={<><Link href="/contact" className={btnPrimary}>Discuss your project</Link><a href={WHATSAPP("Hi NexEagle, I'd like to discuss a software project.")} className={btnSecondary}>WhatsApp us</a></>}
        pose={{ src: "/assets/vita/vita-present.webp", w: 753, h: 760, alt: "Vita presenting" }}
      />

      <section className="bg-white pb-20 pt-4 sm:pb-28" aria-labelledby="svc-title">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <h2 id="svc-title" className="max-w-2xl font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">What we can do for you</h2>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, name, line, items }, i) => (
              <Reveal as="li" key={name} delay={(i % 3) * 0.06} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 transition-[border-color,box-shadow] hover:border-[#1ea99b]/60 hover:shadow-[0_30px_70px_-40px_rgba(14,35,67,0.45)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1ea99b]/10 text-[#12857a]"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-5 font-display text-xl font-semibold text-[#0e2343]">{name}</h3>
                <p className="mt-1 text-slate-600">{line}</p>
                <ul className="mt-4 space-y-2">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-[#0e2343]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1ea99b]" strokeWidth={3} />
                      <span className="text-[#0e2343]">{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#0e2343] py-20 text-white sm:py-28" aria-labelledby="proof-title">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5fd6c9]">Our own work</p>
            <h2 id="proof-title" className="mt-3 font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl">Built, shipped and used every day</h2>
            <p className="mt-4 max-w-md text-lg text-white/75">The best evidence of how we work is what we've built for hospitals ourselves.</p>
          </div>
          <ul className="space-y-4 lg:col-span-7">
            {PROOF.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 0.06}>
                <Link href={p.href} className="group flex items-center justify-between gap-6 rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:bg-white/10">
                  <span>
                    <span className="block font-display text-2xl font-semibold text-white">{p.name}</span>
                    <span className="mt-1 block text-white/70">{p.what}</span>
                  </span>
                  <span className="text-2xl text-[#5fd6c9] transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="proc-title">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <h2 id="proc-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">How a project runs</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="border-t-2 border-[#1ea99b] pt-5">
                <span className="font-display text-sm font-semibold text-[#12857a]">0{i + 1}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#0e2343]">{s.title}</h3>
                <p className="mt-1.5 leading-relaxed text-slate-600">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <HomeFAQ items={FAQ_SERVICES} title="Questions about working with us" intro="What teams ask before we start." />
      <ClosingCTA />
    </main>
  );
}
