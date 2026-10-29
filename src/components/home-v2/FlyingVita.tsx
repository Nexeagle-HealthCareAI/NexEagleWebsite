"use client";

// Vita in flight, built from three layers (far wing, body, near wing) so the wings can beat from
// the shoulders while the body rises and dips with each stroke, like a real bird.
// `mode`: "flap" = powered flight, "glide" = wings held, gentle drift.

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const W = 1200;
const H = 851;
const FAR_ORIGIN = "45.3% 53%"; // far (left) wing shoulder
const NEAR_ORIGIN = "65.2% 62.6%"; // near (right) wing shoulder

export function FlyingVita({ mode = "flap", beat = 0.62, className, priority = false }: { mode?: "flap" | "glide"; beat?: number; className?: string; priority?: boolean }) {
  const reduce = useReducedMotion();
  const still = reduce;
  const flap = mode === "flap" && !still;
  const loop = { duration: beat, repeat: Infinity, ease: "easeInOut" as const };
  const glide = { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <motion.div
      className={cn("relative aspect-[1200/851] select-none", className)}
      animate={still ? undefined : flap ? { y: ["0%", "-4%", "0%", "3%", "0%"] } : { y: ["0%", "-2%", "0%"], rotate: [0, -1.5, 0] }}
      transition={flap ? loop : glide}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: FAR_ORIGIN }}
        animate={still ? undefined : flap ? { rotate: [0, 22, 0, -20, 0], scaleY: [1, 0.96, 1, 1.03, 1] } : { rotate: [8, 10, 8] }}
        transition={flap ? loop : glide}
      >
        <Image src="/assets/vita/fly-wing-far.webp" alt="" width={W} height={H} priority={priority} className="h-full w-full" />
      </motion.div>
      <Image src="/assets/vita/fly-body.webp" alt="" width={W} height={H} priority={priority} className="absolute inset-0 h-full w-full" />
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: NEAR_ORIGIN }}
        animate={still ? undefined : flap ? { rotate: [0, -16, 0, 18, 0], scaleY: [1, 0.92, 1, 1.06, 1] } : { rotate: [-6, -8, -6] }}
        transition={flap ? loop : glide}
      >
        <Image src="/assets/vita/fly-wing-near.webp" alt="" width={W} height={H} priority={priority} className="h-full w-full" />
      </motion.div>
    </motion.div>
  );
}
