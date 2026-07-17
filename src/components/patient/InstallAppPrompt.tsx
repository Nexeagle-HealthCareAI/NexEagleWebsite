"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, Share, PlusSquare, Download } from "lucide-react";
import {
  ENGAGEMENT_EVENT,
  canShowInstallPrompt,
  isIosSafari,
  isStandalone,
  recordDismissed,
  recordInstalled,
  recordShown,
  type BeforeInstallPromptEvent,
} from "@/lib/pwaInstall";

// Custom, highly-visible A2HS prompt — mounted once in app/layout.tsx. Stays invisible
// until a caller fires the "nexeagle:engagement" event from a real high-intent moment
// (booking confirmed, browsing multiple doctors — see BookingPanel.tsx / DoctorViewTracker),
// never on cold pageload. Android/desktop get a real one-tap install via the deferred
// beforeinstallprompt event; iOS Safari (which never fires that event) gets manual
// Share → Add to Home Screen instructions instead.
export default function InstallAppPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosMode, setIosMode] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    function onBeforeInstall(e: BeforeInstallPromptEvent) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    function onInstalled() {
      recordInstalled();
      setVisible(false);
      setDeferredPrompt(null);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (isStandalone()) return;

    function onEngagement() {
      if (!canShowInstallPrompt()) return;
      const ios = isIosSafari();
      // Nothing to trigger yet on Android/desktop until Chrome hands us a deferred
      // prompt — showing the sheet before that would just be a dead "Install" button.
      if (!deferredPrompt && !ios) return;
      setIosMode(ios);
      setVisible(true);
      recordShown();
    }
    window.addEventListener(ENGAGEMENT_EVENT, onEngagement);
    return () => window.removeEventListener(ENGAGEMENT_EVENT, onEngagement);
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    setVisible(false);
    recordDismissed();
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    if (choice.outcome === "accepted") {
      recordInstalled();
      setVisible(false);
    } else {
      dismiss();
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-x-auto sm:left-4 sm:bottom-4 sm:w-96 sm:px-0 sm:pb-0 animate-in slide-in-from-bottom-4 duration-300">
      <div className="relative rounded-3xl border border-slate-200/80 bg-white shadow-2xl p-5">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <Image src="/icons/icon-192.png" alt="" width={48} height={48} className="rounded-xl shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-sm text-slate-900">Install NexEagle</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              Add Doctor Dekho to your home screen — book faster next time, no browser or typing the URL.
            </p>
          </div>
        </div>

        {iosMode ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 rounded-xl px-3 py-2.5">
              <Share className="w-4 h-4 text-brand-teal shrink-0" />
              <span>
                Tap the <b className="text-slate-800">Share</b> icon in Safari&apos;s toolbar
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 rounded-xl px-3 py-2.5">
              <PlusSquare className="w-4 h-4 text-brand-teal shrink-0" />
              <span>
                Then tap <b className="text-slate-800">Add to Home Screen</b>
              </span>
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="w-full mt-1 rounded-xl bg-brand-teal text-white text-sm font-bold py-2.5 shadow-sm hover:bg-brand-teal/90 active:scale-[0.98] transition"
            >
              Got it
            </button>
          </div>
        ) : (
          <div className="mt-4 flex gap-2.5">
            <button
              type="button"
              onClick={dismiss}
              className="flex-1 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold py-2.5 hover:bg-slate-50 active:scale-[0.98] transition"
            >
              Not now
            </button>
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-teal text-white text-sm font-bold py-2.5 shadow-sm hover:bg-brand-teal/90 active:scale-[0.98] transition"
            >
              <Download className="w-4 h-4" />
              Install
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
