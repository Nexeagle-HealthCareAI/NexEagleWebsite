"use client";

// Tiny motion helpers so server-rendered pages can use Framer Motion without becoming client pages.
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}

export function Float({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}
