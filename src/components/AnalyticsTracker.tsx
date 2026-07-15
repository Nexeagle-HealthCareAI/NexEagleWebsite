"use client";

import { useEffect } from "react";

type Props = {
  title: string;
};

export default function AnalyticsTracker({ title }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "GA_MEASUREMENT_ID", {
        page_title: title,
        page_location: window.location.href,
      });
    }
  }, [title]);
  return null;
}
