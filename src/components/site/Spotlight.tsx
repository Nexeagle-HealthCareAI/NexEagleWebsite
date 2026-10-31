"use client";

// One quiet listener for the whole site: any element marked data-spot gets a soft teal glow
// that follows the cursor while it's hovered. Pure CSS does the drawing (see index.css).
import { useEffect } from "react";

export default function Spotlight() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) return;
    let last: HTMLElement | null = null;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = (e.target as HTMLElement | null)?.closest?.("[data-spot], .spot-host") as HTMLElement | null;
        if (el) {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        last = el;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); void last; };
  }, []);
  return null;
}
