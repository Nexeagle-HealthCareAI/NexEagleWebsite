import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import PageHero, { btnPrimary, btnSecondary } from "./PageHero";
import { Reveal } from "./Motion";
import { TEAM, type Member } from "@/lib/team";
import { ClosingCTA } from "@/components/home-v2/Sections";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const BELIEFS = [
  { title: "Doctors' time is for patients", body: "Every minute we take off typing and paperwork goes back to the patient in front of the doctor." },
  { title: "AI drafts, people decide", body: "Vita prepares the work. A qualified clinician reviews and signs anything that reaches a patient." },
  { title: "One record, not ten apps", body: "OPD, wards, radiology, lab and pharmacy share one patient record, so nothing is typed twice." },
  { title: "We go live with you", body: "We set up, train and support your staff in your hospital, in English or Hindi, until it feels normal." },
];

const GROUPS: { key: Member["group"]; title: string }[] = [
  { key: "Founding team", title: "Founding team" },
  { key: "Medical & research", title: "Medical & research" },
  { key: "Product & engineering", title: "Product & engineering" },
];

function Person({ m }: { m: Member }) {
  return (
    <li className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#e8f5f3,#eef2f8)]">
        {m.image ? (
          <Image src={m.image} alt={m.name} fill sizes="(min-width: 1024px) 280px, 45vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-display text-5xl font-semibold text-[#12857a]/70">
            {m.name.split(" ").slice(-2).map((w) => w[0]).join("")}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold leading-tight text-[#0e2343]">{m.name}</p>
          <p className="mt-0.5 text-sm font-medium text-[#12857a]">{m.role}</p>
        </div>
        {m.linkedin && (
          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2]">
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
      {m.credential !== m.role && <p className="mt-1 text-sm text-slate-500">{m.credential}</p>}
      <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">{m.focus}</p>
    </li>
  );
}

export default function TeamPage({ only, title, intro }: { only?: Member["group"]; title?: string; intro?: string }) {
  const groups = only ? GROUPS.filter((g) => g.key === only) : GROUPS;
  return (
    <main>
      <AnalyticsTracker title={only ? `${only} - NexEagle` : "Team - NexEagle"} />
      <PageHero
        crumb="Team"
        eyebrow="The people behind NexEagle"
        title={title ?? "Doctors and engineers, building hospital software together"}
        intro={intro ?? "A surgeon on the founding team checks every clinical workflow. Engineers from NIT Warangal and IIT Bombay build it. Our deployment team sets it up in your hospital and stays close after go-live."}
        actions={<><Link href="/careers" className={btnPrimary}>Join the team</Link><Link href="/contact" className={btnSecondary}>Talk to us</Link></>}
        pose={{ src: "/assets/vita/vita-happy.webp", w: 1006, h: 760, alt: "Vita with wings open" }}
      />

      {groups.map((g) => {
        const people = TEAM.filter((m) => m.group === g.key);
        if (!people.length) return null;
        return (
          <section key={g.key} className="border-t border-slate-200/70 bg-white py-16 sm:py-20" aria-labelledby={`g-${g.key}`}>
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
              <h2 id={`g-${g.key}`} className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343] sm:text-3xl">{g.title}</h2>
              <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {people.map((m) => <Person key={m.name} m={m} />)}
              </ul>
            </div>
          </section>
        );
      })}

      {!only && (
        <section className="bg-[#f4f8f8] py-20 sm:py-28" aria-labelledby="beliefs-title">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <h2 id="beliefs-title" className="max-w-2xl font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">What we believe</h2>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {BELIEFS.map((b, i) => (
                <Reveal as="li" key={b.title} delay={i * 0.06} className="border-t border-slate-300 pt-6">
                  <h3 className="font-display text-xl font-semibold leading-snug text-[#0e2343]">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{b.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ClosingCTA />
    </main>
  );
}
