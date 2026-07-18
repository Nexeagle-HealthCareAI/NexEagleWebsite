"use client";

import { useState, useEffect } from "react";
import { X, Download, Share, PlusSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define the beforeinstallprompt event type since it's non-standard
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or installed
    const hasSeenPrompt = localStorage.getItem("hasSeenInstallPrompt");
    if (hasSeenPrompt === "true") return;

    // Detect iOS (Safari doesn't support beforeinstallprompt)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    // Check if the app is already running in standalone mode (installed)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                         (window.navigator as any).standalone === true;

    if (isStandalone) return;

    if (isIosDevice) {
      setIsIos(true);
      // Wait a few seconds before showing the prompt so we don't overwhelm them instantly
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android / Chrome handling
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Optionally delay showing it
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("hasSeenInstallPrompt", "true");
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the native install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Regardless of outcome, we don't need to show our custom banner again
    handleDismiss();
    
    // Clear the saved prompt since it can't be used again
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="bg-white rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-200/60 relative">
            
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-95 transition-all"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 pr-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-teal to-sky-500 flex items-center justify-center shrink-0 shadow-sm text-white">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-base leading-tight mb-1">
                  Install Doctor Dekho
                </h3>
                <p className="text-[13px] text-slate-500 leading-snug">
                  Add to your home screen for faster access, easy bookings, and a better experience.
                </p>
              </div>
            </div>

            {isIos ? (
              <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/50 -mx-5 -mb-5 px-5 py-4 rounded-b-3xl">
                <p className="text-[13px] text-slate-600 font-medium flex flex-wrap items-center gap-1.5 justify-center text-center">
                  Tap <span className="inline-flex p-1 rounded-md bg-white border border-slate-200 shadow-sm"><Share className="w-3.5 h-3.5 text-blue-500" /></span> 
                  and then <span className="inline-flex p-1 rounded-md bg-white border border-slate-200 shadow-sm"><PlusSquare className="w-3.5 h-3.5 text-slate-700" /></span>
                  <strong className="text-slate-800">Add to Home Screen</strong>
                </p>
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="w-full mt-5 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-[0_4px_14px_0_rgba(15,23,42,0.18)] active:scale-[0.98] transition-transform"
              >
                Install App
              </button>
            )}
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
