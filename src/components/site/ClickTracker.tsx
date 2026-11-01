"use client";

// One listener for the whole site. Anything with data-track="name" records that name when clicked.
// Common exits are recorded even without the attribute: WhatsApp, phone, email and the product apps.
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function nameFor(a: HTMLAnchorElement): string | null {
  const href = a.getAttribute("href") || "";
  if (href.startsWith("https://wa.me/")) return "whatsapp";
  if (href.startsWith("tel:")) return "call";
  if (href.startsWith("mailto:")) return "email";
  try {
    const u = new URL(href, window.location.href);
    if (u.hostname.endsWith("nexeagle.com") && u.hostname !== window.location.hostname) return `open_${u.hostname.split(".")[0]}`;
  } catch {
    /* not a URL */
  }
  return null;
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-track], a[href]") as HTMLElement | null;
      if (!el) return;
      const named = el.closest("[data-track]") as HTMLElement | null;
      const name = named?.dataset.track || (el instanceof HTMLAnchorElement ? nameFor(el) : null);
      if (name) trackEvent(name);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
