"use client";

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

export default function ShareButton({ title, text, url, className = "" }: ShareButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    // If Web Share API is available (most mobile browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Open WhatsApp directly
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        `${text}\n\n${url}`
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors text-xs font-bold ${className}`}
      title="Share on WhatsApp"
    >
      <Share2 className="w-3.5 h-3.5" />
      Share
    </button>
  );
}
