"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, RotateCcw, Loader2, AlertCircle } from "lucide-react";
import * as signalR from "@microsoft/signalr";
import { v4 as uuidv4 } from "uuid";

// Live support chat with the NexEagle team. Agents answer from the CMS (Live Support page); the
// server side is CMSAPI's /chathub (Hubs/ChatHub.cs).
//
// Behaviour, in plain terms:
//  * The visitor gives a name (email optional) once; it is remembered in this browser.
//  * Once a chat has been opened, the connection stays up while the visitor is on the page, so a
//    reply that arrives with the panel closed shows as an unread badge instead of being missed.
//  * The header says honestly whether someone is online. Offline messages are kept and answered later.
//  * After an agent ends a chat, the visitor can start a new one.
//
// NEXT_PUBLIC_API_URL is inlined at build time (Dockerfile build-arg). It must be an https:// origin
// on an https:// page: browsers block plain http/ws from secure pages, and the widget says so.
const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "") ||
  "http://151.185.45.77:5002";
const CHAT_HUB_URL = `${API_ORIGIN}/chathub`;
const SUPPORT_EMAIL = "info@nexeagle.com";

const KEY_GUEST_ID = "nex_eagle_guest_id";
const KEY_NAME = "nex_eagle_guest_name";
const KEY_EMAIL = "nex_eagle_guest_email";

const MAX_LENGTH = 2000;            // same limit as ChatHub.MaxMessageLength
const TYPING_SEND_EVERY_MS = 2500;
const TYPING_SHOW_FOR_MS = 4000;

type ServerMessage = {
  messageId?: string;
  sessionId?: string;
  senderType: string;           // "Guest" | "Agent"
  messageText: string;
  sentAt: string;
};

type ChatMessage = ServerMessage & {
  localId?: string;
  status?: "sending" | "failed";
};

type ConnState = "idle" | "connecting" | "connected" | "reconnecting" | "failed" | "blocked";

const QUICK_REPLIES = ["Book a demo", "Pricing for my hospital", "I need technical help"];

function readStorage(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode: works for this page only */
  }
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// `embedded`: opened from the Vita support assistant; Vita owns the launcher and decides when the
// team chat is visible, and closing returns the visitor to Vita (the connection stays alive).
export default function LiveChat({ embedded = false, visible = false, onBack }: { embedded?: boolean; visible?: boolean; onBack?: () => void } = {}) {
  const [isOpen, setIsOpen] = useState(embedded && visible);
  const [hasOpened, setHasOpened] = useState(embedded && visible);
  useEffect(() => {
    if (!embedded) return;
    setIsOpen(visible);
    if (visible) setHasOpened(true);
  }, [embedded, visible]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  const [conn, setConn] = useState<signalR.HubConnection | null>(null);
  const [connState, setConnState] = useState<ConnState>("idle");
  const [retryToken, setRetryToken] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [agentOnline, setAgentOnline] = useState<boolean | null>(null);
  const [agentTyping, setAgentTyping] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [unread, setUnread] = useState(0);
  const [draft, setDraft] = useState("");

  const isOpenRef = useRef(isOpen);
  const lastTypingSentRef = useRef(0);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) setUnread(0);
  }, [isOpen]);

  // Restore a returning visitor's details (client only: localStorage does not exist during SSR).
  useEffect(() => {
    const savedName = readStorage(KEY_NAME);
    setName(savedName);
    setEmail(readStorage(KEY_EMAIL));
    setRegistered(!!savedName);
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, agentTyping, sessionEnded, isOpen]);

  // ── Connection: built once the visitor has opened the chat and given a name; kept for the page ──
  useEffect(() => {
    if (!hasOpened || !registered) return;

    if (window.location.protocol === "https:" && CHAT_HUB_URL.startsWith("http:")) {
      console.error(`[LiveChat] ${CHAT_HUB_URL} is not https, so the browser blocks it on this https page. Set NEXT_PUBLIC_API_URL to the CMS API's https origin.`);
      setConnState("blocked");
      return;
    }

    let guestId = readStorage(KEY_GUEST_ID);
    if (!guestId) {
      guestId = uuidv4();
      writeStorage(KEY_GUEST_ID, guestId);
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(CHAT_HUB_URL)
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    // Runs on every (re)connect: a reconnect is a new server connection, in no session until it joins.
    const join = () =>
      connection
        .invoke("JoinSession", guestId, readStorage(KEY_NAME) || null, readStorage(KEY_EMAIL) || null)
        .catch((e) => console.error("[LiveChat] JoinSession failed:", e));

    connection.on("SessionJoined", (id: string) => {
      setSessionId(id);
      setSessionEnded(false);
    });

    connection.on("LoadHistory", (history: ServerMessage[]) => {
      // Server history is the truth; keep only this tab's messages that never reached the server.
      setMessages((prev) => [...history, ...prev.filter((m) => m.status)]);
      setHistoryLoaded(true);
    });

    connection.on("ReceiveMessage", (msg: ServerMessage) => {
      setMessages((prev) => {
        if (msg.senderType === "Guest") {
          // Our own message echoed back: replace its "sending" placeholder.
          const i = prev.findIndex((m) => m.status === "sending" && m.messageText === msg.messageText);
          if (i >= 0) return [...prev.slice(0, i), msg, ...prev.slice(i + 1)];
        }
        if (msg.messageId && prev.some((m) => m.messageId === msg.messageId)) return prev;
        return [...prev, msg];
      });
      if (msg.senderType !== "Guest") {
        setAgentTyping(false);
        if (!isOpenRef.current) setUnread((n) => n + 1);
      }
    });

    connection.on("AgentStatus", (online: boolean) => setAgentOnline(online));

    connection.on("AgentTyping", () => {
      setAgentTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => setAgentTyping(false), TYPING_SHOW_FOR_MS);
    });

    connection.on("SessionClosed", () => {
      setSessionEnded(true);
      setSessionId(null);
      setAgentTyping(false);
    });

    connection.onreconnecting(() => setConnState("reconnecting"));
    connection.onreconnected(() => {
      setConnState("connected");
      void join();
    });
    connection.onclose(() => setConnState("failed"));   // automatic reconnect gave up

    let cancelled = false;
    setConnState("connecting");
    connection
      .start()
      .then(() => {
        if (cancelled) return;
        setConnState("connected");
        void join();
      })
      .catch((e) => {
        console.error("[LiveChat] Connection failed:", e);
        if (!cancelled) setConnState("failed");
      });

    setConn(connection);
    return () => {
      cancelled = true;
      setConn(null);
      setSessionId(null);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      connection.stop().catch(() => {});
    };
  }, [hasOpened, registered, retryToken]);

  // Focus the message box whenever it becomes usable.
  const canSend = connState === "connected" && !!sessionId && !sessionEnded;
  useEffect(() => {
    if (isOpen && registered && canSend) inputRef.current?.focus();
  }, [isOpen, registered, canSend]);

  const open = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  const close = useCallback(() => {
    if (embedded) { onBack?.(); return; }
    setIsOpen(false);
    launcherRef.current?.focus();
  }, [embedded, onBack]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const register = () => {
    const n = name.trim();
    if (!n) return;
    writeStorage(KEY_NAME, n);
    if (email.trim()) writeStorage(KEY_EMAIL, email.trim());
    setRegistered(true);
  };

  const deliver = async (msg: ChatMessage) => {
    if (!conn || !sessionId) return;
    try {
      // senderType/senderId are decided by the server from the connection.
      await conn.invoke("SendMessage", sessionId, msg.messageText);
    } catch (e) {
      console.error("[LiveChat] Send failed:", e);
      if (String(e).includes("ended")) setSessionEnded(true);
      setMessages((prev) => prev.map((m) => (m.localId === msg.localId ? { ...m, status: "failed" } : m)));
    }
  };

  const send = (text: string) => {
    const trimmed = text.trim().slice(0, MAX_LENGTH);
    if (!trimmed || !canSend) return;
    const msg: ChatMessage = {
      localId: uuidv4(),
      senderType: "Guest",
      messageText: trimmed,
      sentAt: new Date().toISOString(),
      status: "sending",
    };
    setMessages((prev) => [...prev, msg]);
    setDraft("");
    void deliver(msg);
  };

  const retry = (msg: ChatMessage) => {
    setMessages((prev) => prev.map((m) => (m.localId === msg.localId ? { ...m, status: "sending" } : m)));
    void deliver(msg);
  };

  const onDraftChange = (value: string) => {
    setDraft(value.slice(0, MAX_LENGTH));
    const now = Date.now();
    if (conn && sessionId && value.trim() && now - lastTypingSentRef.current > TYPING_SEND_EVERY_MS) {
      lastTypingSentRef.current = now;
      conn.invoke("Typing", sessionId).catch(() => {});
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setSessionEnded(false);
    const guestId = readStorage(KEY_GUEST_ID);
    conn
      ?.invoke("JoinSession", guestId, readStorage(KEY_NAME) || null, readStorage(KEY_EMAIL) || null)
      .catch((e) => console.error("[LiveChat] New chat failed:", e));
  };

  // Auto-grow the message box up to ~5 lines.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [draft]);

  // ── Launcher ──────────────────────────────────────────────────────────────────────────────────
  if (!isOpen && embedded) return null;
  if (!isOpen) {
    return (
      <button
        ref={launcherRef}
        onClick={open}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-14 items-center gap-2 rounded-full bg-[#0e2343] pl-4 pr-5 text-white shadow-xl transition hover:bg-[#13305c] hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1ea99b]/40"
        aria-label={unread > 0 ? `Chat with us, ${unread} new message${unread === 1 ? "" : "s"}` : "Chat with us"}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[10px] font-bold">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    );
  }

  // ── Panel ─────────────────────────────────────────────────────────────────────────────────────
  const statusText =
    connState === "blocked" || connState === "failed"
      ? "Chat unavailable"
      : agentOnline === null
      ? "Connecting…"
      : agentOnline
      ? "Online · usually replies in a few minutes"
      : "Away · leave a message, we'll reply soon";

  return (
    <div
      role="dialog"
      aria-label="Chat with NexEagle Support"
      className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-3rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#0e2343] px-4 py-3 text-white sm:rounded-t-2xl">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-bold text-[#0e2343]">N</div>
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0e2343] ${agentOnline ? "bg-green-400" : "bg-slate-300"}`}
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight text-white">NexEagle team</p>
          <p className="truncate text-xs text-white/70">{registered ? statusText : "We're here to help"}</p>
        </div>
        <button
          onClick={close}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={embedded ? "Back to Vita" : "Close chat"}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {!registered ? (
        // ── First visit: who are you? ─────────────────────────────────────────────────────────────
        <form
          className="flex flex-1 flex-col justify-center gap-4 overflow-y-auto bg-slate-50 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className="space-y-1 text-center">
            <p className="text-lg font-semibold text-slate-900">Hi there 👋</p>
            <p className="text-sm text-slate-600">Tell us your name and we&apos;ll connect you with our team.</p>
          </div>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
              autoFocus
              autoComplete="name"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-[#1ea99b] focus:ring-2 focus:ring-[#1ea99b]/15"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>
              Email <span className="font-normal text-slate-500">(optional, so we can reply if you leave)</span>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={150}
              autoComplete="email"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-[#1ea99b] focus:ring-2 focus:ring-[#1ea99b]/15"
            />
          </label>
          <button
            type="submit"
            disabled={!name.trim()}
            className="h-11 rounded-xl bg-[#0e2343] font-semibold text-white transition hover:bg-[#13305c] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start chat
          </button>
          <p className="text-center text-xs text-slate-500">
            Your messages are saved so our team can reply. See our{" "}
            <a href="/privacy" className="underline">privacy policy</a>.
          </p>
        </form>
      ) : (
        <>
          {/* Connection banner */}
          {connState !== "connected" && connState !== "idle" && (
            <div
              className={`flex items-center gap-2 px-4 py-2 text-xs ${
                connState === "failed" || connState === "blocked" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"
              }`}
              role="status"
            >
              {connState === "connecting" || connState === "reconnecting" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span className="flex-1">
                {connState === "connecting" && "Connecting…"}
                {connState === "reconnecting" && "Connection lost. Reconnecting…"}
                {connState === "failed" && "We couldn't connect. Check your internet and try again."}
                {connState === "blocked" && (
                  <>Chat isn&apos;t available here right now. Email us at <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</>
                )}
              </span>
              {connState === "failed" && (
                <button onClick={() => setRetryToken((t) => t + 1)} className="font-semibold underline">
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto bg-slate-50 px-4 py-4" aria-live="polite">
            {historyLoaded && messages.length === 0 && !sessionEnded && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Hi {name.trim().split(" ")[0] || "there"} 👋</p>
                <p className="mt-1">
                  {agentOnline
                    ? "How can we help? Ask anything about NexEagle and our team will reply here."
                    : "Our team is away right now. Leave a message and we'll reply here" + (email ? " and by email." : ".")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      disabled={!canSend}
                      className="rounded-full border border-[#1ea99b]/30 bg-[#1ea99b]/10 px-3 py-1.5 text-xs font-medium text-[#12857a] transition hover:bg-[#1ea99b]/20 disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const mine = m.senderType === "Guest";
              const firstOfRun = i === 0 || messages[i - 1].senderType !== m.senderType;
              return (
                <div key={m.messageId ?? m.localId ?? `m-${i}`} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                  {!mine && firstOfRun && <span className="mb-0.5 ml-1 text-[11px] font-medium text-slate-500">NexEagle Support</span>}
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      mine ? "rounded-br-md bg-[#0e2343] text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                    } ${m.status === "failed" ? "opacity-60" : ""}`}
                  >
                    {m.messageText}
                  </div>
                  <span className="mx-1 mt-0.5 text-[10px] text-slate-400">
                    {m.status === "sending" ? "Sending…" : m.status === "failed" ? (
                      <button onClick={() => retry(m)} className="inline-flex items-center gap-1 font-medium text-red-600">
                        <RotateCcw className="h-3 w-3" aria-hidden="true" /> Not sent · tap to retry
                      </button>
                    ) : timeLabel(m.sentAt)}
                  </span>
                </div>
              );
            })}

            {agentTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500" aria-label="Support is typing">
                <span className="flex gap-1 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                </span>
              </div>
            )}

            {sessionEnded && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-700">
                <p>This chat has ended. Thanks for talking to us!</p>
                <button
                  onClick={startNewChat}
                  disabled={connState !== "connected"}
                  className="mt-3 rounded-full bg-[#0e2343] px-4 py-2 text-sm font-semibold text-white hover:bg-[#13305c] disabled:opacity-50"
                >
                  Start a new chat
                </button>
              </div>
            )}
          </div>

          {/* Composer */}
          {!sessionEnded && (
            <form
              className="border-t border-slate-200 bg-white p-3 sm:rounded-b-2xl"
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  onChange={(e) => onDraftChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      send(draft);
                    }
                  }}
                  placeholder={canSend ? "Write a message…" : "Connecting…"}
                  disabled={!canSend}
                  aria-label="Message"
                  className="max-h-[120px] min-h-[44px] flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-base text-slate-900 outline-none focus:border-[#1ea99b] focus:ring-2 focus:ring-[#1ea99b]/15 disabled:bg-slate-50 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!canSend || !draft.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0e2343] text-white transition hover:bg-[#13305c] disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-slate-400">
                {draft.length > MAX_LENGTH - 200 ? `${MAX_LENGTH - draft.length} characters left` : "Enter to send · Shift + Enter for a new line"}
              </p>
            </form>
          )}
        </>
      )}
    </div>
  );
}
