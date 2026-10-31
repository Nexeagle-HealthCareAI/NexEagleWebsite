"use client";

// Vita, built into every page as NexEagle's support assistant. Answers common questions instantly
// from approved answers (src/lib/vitaKnowledge.ts) and hands over to the NexEagle team's live chat,
// WhatsApp or a phone call for anything else.

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone, X } from "lucide-react";
import { STARTERS, TOPICS, matchTopic, type Topic } from "@/lib/vitaKnowledge";

const LiveChat = lazy(() => import("./LiveChat"));

type Msg = { id: number; from: "vita" | "me"; text: string; topic?: Topic; handoff?: boolean };

const WA = (m: string) => `https://wa.me/918074906808?text=${encodeURIComponent(m)}`;
const byId = (id: string) => TOPICS.find((t) => t.id === id)!;

export default function VitaSupport() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState(false); // team chat visible
  const [teamMounted, setTeamMounted] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [nudge, setNudge] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // A small hello bubble once per visit: after a while, and only once the visitor has scrolled a
  // little, so it never sits on top of the homepage hero.
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("vita-nudged") === "1"; } catch { /* ignore */ }
    if (seen) return;
    let ready = false;
    let scrolled = window.scrollY > 160;
    const show = () => { if (ready && scrolled) { setNudge(true); try { sessionStorage.setItem("vita-nudged", "1"); } catch { /* ignore */ } window.removeEventListener("scroll", onScroll); } };
    const onScroll = () => { if (window.scrollY > 160) { scrolled = true; show(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => { ready = true; show(); }, 12000);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ id: ++idRef.current, from: "vita", text: "Hi, I'm Vita from NexEagle Customer Support. I can answer questions about our hospital software, set up a demo, or connect you with our team. What would you like to know?" }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open, msgs.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    if (!open || team) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, team]);

  const reply = (m: Omit<Msg, "id">) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((xs) => [...xs, { ...m, id: ++idRef.current }]);
    }, reduce ? 0 : 650);
  };

  const ask = (text: string, topic?: Topic) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((xs) => [...xs, { id: ++idRef.current, from: "me", text: q }]);
    setDraft("");
    const hit = topic ?? matchTopic(q);
    if (hit) reply({ from: "vita", text: hit.answer, topic: hit, handoff: hit.id === "support" });
    else reply({ from: "vita", text: "I don't have a ready answer for that one. Our team can help: chat with them here, or reach them on WhatsApp or by phone.", handoff: true });
  };

  const toTeam = () => { setTeamMounted(true); setTeam(true); };

  const lastVita = [...msgs].reverse().find((m) => m.from === "vita");
  const chips = (lastVita?.topic?.next?.length ? lastVita.topic.next : msgs.length <= 1 ? STARTERS : []).map(byId);

  return (
    <>
      {/* Team live chat, kept mounted once opened so the conversation survives switching back to Vita */}
      {teamMounted && (
        <Suspense fallback={null}>
          <LiveChat embedded visible={open && team} onBack={() => setTeam(false)} />
        </Suspense>
      )}

      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.4 }} className="fixed bottom-4 right-4 z-50 flex items-end gap-2 sm:bottom-6 sm:right-6">
            <AnimatePresence>
              {nudge && (
                <motion.button
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => { setNudge(false); setOpen(true); }}
                  className="mb-2 hidden max-w-[220px] rounded-2xl rounded-br-md bg-white px-4 py-3 text-left text-sm text-[#0e2343] shadow-[0_12px_40px_-12px_rgba(14,35,67,0.45)] ring-1 ring-slate-200 sm:block"
                >
                  <span className="text-[#0e2343]">Questions about NexEagle? I can help in a few seconds.</span>
                </motion.button>
              )}
            </AnimatePresence>
            <button
              onClick={() => { setNudge(false); setOpen(true); }}
              aria-label="Vita Customer Support: ask a question"
              className="group flex h-16 items-center gap-2.5 rounded-full bg-[#0e2343] p-1.5 text-white sm:pr-5 shadow-[0_16px_40px_-12px_rgba(14,35,67,0.7)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1ea99b]/50"
            >
              <motion.span animate={reduce ? undefined : { rotate: [0, -8, 8, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 5 }} className="relative block">
                <Image src="/assets/vita/avatar-present.webp" alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-full ring-2 ring-white/30" />
                <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#0e2343] bg-emerald-400" />
              </motion.span>
              <span className="hidden leading-tight sm:block"><span className="block text-[11px] font-medium text-white/70">Vita Customer Support</span><span className="block font-semibold text-white">Ask Vita</span></span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vita panel */}
      <AnimatePresence>
        {open && !team && (
          <motion.div
            role="dialog"
            aria-label="Vita Customer Support"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[620px] sm:max-h-[calc(100vh-3rem)] sm:w-[390px] sm:rounded-[1.5rem] sm:border sm:border-slate-200 sm:shadow-[0_30px_80px_-20px_rgba(14,35,67,0.45)]"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0e2343,#12857a)] px-4 pb-4 pt-3 text-white">
              <div className="flex items-center gap-3">
                <span className="relative">
                  <Image src="/assets/vita/avatar-present.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full ring-2 ring-white/40" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0e2343] bg-emerald-400" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-semibold leading-tight text-white">Vita Customer Support</p>
                  <p className="text-xs text-white/75">NexEagle · AI assistant, replies instantly</p>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Conversation */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4" aria-live="polite">
              {msgs.map((m) => (
                <motion.div key={m.id} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={m.from === "me" ? "flex justify-end" : "flex items-end gap-2"}>
                  {m.from === "vita" && <Image src="/assets/vita/avatar-present.webp" alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-full" />}
                  <div className={m.from === "me" ? "max-w-[80%] rounded-2xl rounded-br-md bg-[#0e2343] px-3.5 py-2.5 text-[0.92rem] text-white" : "max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[0.92rem] text-[#0e2343] shadow-sm ring-1 ring-slate-200/70"}>
                    <p className={m.from === "me" ? "text-white" : "text-[#0e2343]"}>{m.text}</p>
                    {m.topic?.link && (
                      m.topic.link.href.startsWith("http") ? (
                        <a href={m.topic.link.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex rounded-full bg-[#1ea99b]/10 px-3 py-1.5 text-sm font-semibold text-[#12857a] hover:bg-[#1ea99b]/20">{m.topic.link.text}</a>
                      ) : (
                        <Link href={m.topic.link.href} onClick={() => setOpen(false)} className="mt-2 inline-flex rounded-full bg-[#1ea99b]/10 px-3 py-1.5 text-sm font-semibold text-[#12857a] hover:bg-[#1ea99b]/20">{m.topic.link.text}</Link>
                      )
                    )}
                    {m.handoff && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <button onClick={toTeam} className="inline-flex items-center gap-1.5 rounded-full bg-[#0e2343] px-3 py-1.5 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /><span className="text-white">Chat with the team</span></button>
                        <a href={WA("Hi NexEagle, I have a question.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-[#25d366] px-3 py-1.5 text-sm font-semibold text-[#073b1f]">WhatsApp</a>
                        <a href="tel:+918074906808" className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-[#0e2343]"><Phone className="h-3.5 w-3.5" />Call</a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <Image src="/assets/vita/avatar-present.webp" alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
                  <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-3.5 py-3 shadow-sm ring-1 ring-slate-200/70">
                    {[0, 1, 2].map((k) => (
                      <motion.span key={k} className="h-1.5 w-1.5 rounded-full bg-slate-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: k * 0.12 }} />
                    ))}
                  </div>
                </div>
              )}
              {!typing && chips.length > 0 && (
                <div className="flex flex-wrap gap-2 pl-9 pt-1">
                  {chips.map((t) => (
                    <button key={t.id} onClick={() => ask(t.label, t)} className="rounded-full border border-[#1ea99b]/40 bg-white px-3 py-1.5 text-sm font-medium text-[#12857a] transition-colors hover:bg-[#1ea99b]/10">
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={(e) => { e.preventDefault(); ask(draft); }} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask Vita anything about NexEagle…"
                maxLength={300}
                className="h-11 flex-1 rounded-full border border-slate-300 px-4 text-[0.95rem] text-[#0e2343] outline-none focus:border-[#1ea99b] focus:ring-4 focus:ring-[#1ea99b]/15"
              />
              <button type="submit" disabled={!draft.trim()} aria-label="Send" className="grid h-11 w-11 place-items-center rounded-full bg-[#0e2343] text-white disabled:opacity-40">
                <ArrowUp className="h-5 w-5" />
              </button>
            </form>
            <div className="flex items-center justify-between bg-white px-4 pb-3 text-[11px] text-slate-400">
              <span>Vita gives general information, not medical advice.</span>
              <button onClick={toTeam} className="font-semibold text-[#12857a] hover:underline">Talk to a person</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
