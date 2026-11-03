export default function LegalCards({ title, items }: { title: string; items: { title: string; description: string; tag?: string }[] }) {
  return (
    <div className="mb-14">
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#0e2343]">{title}</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(14,35,67,0.5)]">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-lg font-semibold text-[#0e2343]">{it.title}</p>
              {it.tag && (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${it.tag === "Roadmap" ? "bg-amber-50 text-amber-700" : "bg-[#1ea99b]/10 text-[#12857a]"}`}>{it.tag}</span>
              )}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{it.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
