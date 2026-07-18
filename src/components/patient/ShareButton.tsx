"use client";

import { Share2, Copy, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nContext";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

export default function ShareButton({ title, text, url, className = "" }: ShareButtonProps) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [showQr, setShowQr] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success(t("shareButton.copied") || "Link copied to clipboard!");
  };

  const handleDownloadQr = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    
    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Add white background
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        // Trigger download
        const a = document.createElement("a");
        a.download = `QR_Code.png`;
        a.href = canvas.toDataURL("image/png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("QR Code downloaded successfully!");
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (!mounted) return null;

  // Fast-path for mobile: if native Web Share is available, use a simple button.
  // The native share sheet already includes 'Copy' and 'QR' options on modern OSs.
  if (mounted && typeof navigator !== "undefined" && !!navigator.share) {
    return (
      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors text-xs font-bold ${className}`}
        title={t("shareButton.share") || "Share"}
      >
        <Share2 className="w-3.5 h-3.5" />
        {t("shareButton.share") || "Share"}
      </button>
    );
  }

  // Fallback for Desktop (no navigator.share): show the Dropdown menu
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors text-xs font-bold ${className}`}
            title={t("shareButton.share") || "Share"}
          >
            <Share2 className="w-3.5 h-3.5" />
            {t("shareButton.share") || "Share"}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 z-[100]">
          <DropdownMenuItem onClick={handleShare} className="gap-2 cursor-pointer">
            <Share2 className="w-4 h-4" />
            <span>{t("shareButton.shareOnWhatsapp") || "Share on WhatsApp"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy} className="gap-2 cursor-pointer">
            <Copy className="w-4 h-4" />
            <span>{t("shareButton.copyLink") || "Copy Link"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowQr(true)} className="gap-2 cursor-pointer">
            <QrCode className="w-4 h-4" />
            <span>{t("shareButton.qrCode") || "QR Scanner"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showQr} onOpenChange={setShowQr}>
        <DialogContent className="sm:max-w-md z-[110]">
          <DialogHeader>
            <DialogTitle className="text-center">{t("shareButton.scanQrCode") || "Scan QR Code"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl">
            <QRCode id="qr-code-svg" value={url} size={256} className="h-auto max-w-full" />
            <p className="mt-4 text-sm text-center text-slate-500 mb-4">
              {t("shareButton.scanToView") || "Scan this code with a mobile device to view this profile."}
            </p>
            <button
              onClick={handleDownloadQr}
              className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg text-sm font-semibold hover:bg-brand-teal/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
