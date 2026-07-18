"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { isStandalone } from "@/lib/pwaInstall";

// Only replay once per cold start (app icon tap -> new process), not on every internal
// client-side navigation within the same session.
const SESSION_KEY = "nexeagle_launch_splash_shown";

const WORDMARK = "Doctor Dekho".split("");

type Stage = "logo" | "wordmark" | "powered" | "exit";

/**
 * Native-app-style boot animation shown only when the PWA is launched from the home-screen icon
 * (display-mode: standalone) — a regular browser tab never sees this. Logo tumbles in with a real
 * 3D transform, responds live to touch/pointer drag (holographic tilt) while it's up, "Doctor
 * Dekho" flips in letter by letter, then "Powered by NexEagle" settles underneath before the
 * whole thing dismisses into the app. Tap anywhere to skip.
 */
export default function LaunchSplash() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<Stage>("logo");
  const containerRef = useRef<HTMLDivElement>(null);

  // Pointer-driven 3D tilt on the logo — genuine, live interactivity rather than a canned loop.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 18, mass: 0.4 });
  const tiltX = useTransform(springY, [-1, 1], [16, -16]);
  const tiltY = useTransform(springX, [-1, 1], [-16, 16]);

  useEffect(() => {
    if (!isStandalone()) return;
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* best-effort — if storage is unavailable, just show it once this mount */
    }

    setVisible(true);
    const timers = [
      setTimeout(() => setStage("wordmark"), 650),
      setTimeout(() => setStage("powered"), 1750),
      setTimeout(() => setStage("exit"), 2700),
      setTimeout(() => setVisible(false), 3250),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const skip = () => setVisible(false);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerMove}
        onClick={skip}
        role="button"
        aria-label="Skip"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden select-none cursor-pointer"
        style={{ perspective: 1000 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "exit" ? 0 : 1, scale: stage === "exit" ? 1.06 : 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient brand-color glow, breathing behind everything */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 42%, hsl(var(--brand-teal) / 0.16), transparent 60%)" }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Logo — 3D tumble-in, then lives as an interactive tilt card */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
          }}
          initial={{ rotateY: -160, rotateZ: -8, scale: 0.35, opacity: 0 }}
          animate={{ rotateZ: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-24 h-24 sm:w-28 sm:h-28"
        >
          <motion.div
            className="absolute -inset-6 rounded-full pointer-events-none"
            style={{ boxShadow: "0 0 60px hsl(var(--brand-teal) / 0.45), 0 0 110px hsl(var(--brand-sky) / 0.3)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.webp"
            alt="NexEagle"
            className="relative w-full h-full object-contain drop-shadow-[0_18px_30px_hsl(var(--brand-navy)/0.25)]"
            fetchPriority="high"
            decoding="async"
          />
          {/* One-shot diagonal shine sweep across the icon once it lands */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 0.85, duration: 0.7, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute -inset-y-4 -left-1/2 w-1/3 rotate-12"
              style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.85), transparent)" }}
              initial={{ x: "-40%" }}
              animate={{ x: "260%" }}
              transition={{ delay: 0.85, duration: 0.7, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* "Doctor Dekho" — letter-by-letter 3D flip-up */}
        <div className="mt-7 flex" style={{ perspective: 600 }}>
          <AnimatePresence>
            {stage !== "logo" &&
              WORDMARK.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, rotateX: -90, y: 10 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ delay: i * 0.035, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-sky-500 inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
          </AnimatePresence>
        </div>

        {/* "Powered by NexEagle" */}
        <AnimatePresence>
          {(stage === "powered" || stage === "exit") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-3 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-slate-400"
            >
              Powered by NexEagle
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading dots — native-app affordance */}
        <div className="absolute bottom-16 flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-brand-teal"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          className="absolute bottom-8 text-[10px] font-medium tracking-wide text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          Tap to continue
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
