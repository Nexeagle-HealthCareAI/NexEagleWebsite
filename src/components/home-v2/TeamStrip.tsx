import Image from "next/image";
import Link from "next/link";

// Real people behind the product: the strongest trust signal for a hospital owner.
const PEOPLE = [
  { name: "Dr Md Taquedis Noori", role: "Co-founder, Medical Advisor", cred: "MS, MCh Urology (IPGMER & SSKM Hospital)", img: "/assets/Taquedis Noori.webp" },
  { name: "Md Tasquil Noori", role: "Co-founder, Tech Lead", cred: "BTech, NIT Warangal", img: "/assets/Tasquil_Noori.webp" },
  { name: "Md Aquib", role: "Co-founder, Product Manager", cred: "IIT Bombay alumnus", img: "" },
  { name: "Dr Md Tabish Noori", role: "Healthcare Research Advisor", cred: "Research Fellow, Imperial College London", img: "/assets/Tabish Noori.webp" },
];

export default function TeamStrip() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="team-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <h2 id="team-title" className="font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0e2343] sm:text-5xl">
            Built by doctors and engineers, together
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            A surgeon on the founding team checks every clinical workflow. The software runs every day in hospitals in Kishanganj and Purnea, and what we learn there goes straight back into the product.
          </p>
          <Link href="/team" className="mt-8 inline-flex h-12 items-center rounded-full border border-slate-300 px-6 font-semibold text-[#0e2343] transition-colors hover:border-[#0e2343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ea99b]">
            Meet the whole team
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:col-span-8">
          {PEOPLE.map((p) => (
            <li key={p.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#e8f5f3,#eef2f8)]">
                {p.img ? (
                  <Image src={p.img} alt={p.name} fill sizes="(min-width: 1024px) 200px, 45vw" className="object-cover object-top grayscale-[15%]" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center font-display text-4xl font-semibold text-[#12857a]/70">
                    {p.name.split(" ").slice(-2).map((w) => w[0]).join("")}
                  </span>
                )}
              </div>
              <p className="mt-3 font-display font-semibold leading-tight text-[#0e2343]">{p.name}</p>
              <p className="mt-0.5 text-sm text-[#12857a]">{p.role}</p>
              <p className="mt-1 text-sm leading-snug text-slate-500">{p.cred}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
