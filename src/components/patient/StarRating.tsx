"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;           // 0–5, supports decimals for display
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (v: number) => void;
  className?: string;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-7 h-7",
};

/**
 * Display-only or interactive star rating.
 * - Display mode: renders fractional fill via CSS clip (shows 4.8 accurately).
 * - Interactive mode: hover + click to pick a whole-number rating.
 */
export default function StarRating({
  value,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const display = interactive ? (hovered || value) : value;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starVal = i + 1;
        const fill = Math.min(Math.max(display - i, 0), 1); // 0, 0–1 fractional, or 1
        return (
          <span
            key={i}
            className={cn("relative inline-block", interactive && "cursor-pointer")}
            onMouseEnter={() => interactive && setHovered(starVal)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => interactive && onChange?.(starVal)}
          >
            {/* Background star (empty) */}
            <Star
              className={cn(sizeMap[size], "text-slate-200 fill-slate-200")}
              strokeWidth={0}
            />
            {/* Foreground star (filled), clipped by fill ratio */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className={cn(
                  sizeMap[size],
                  interactive && (hovered >= starVal)
                    ? "text-amber-400 fill-amber-400"
                    : "text-amber-400 fill-amber-400"
                )}
                strokeWidth={0}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/** Compact inline rating badge: ⭐ 4.8 (124) */
export function RatingBadge({
  rating,
  reviewCount,
  size = "sm",
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      <StarRating value={rating} size={size} />
      <span className={cn("font-bold text-slate-800", size === "sm" ? "text-xs" : "text-sm")}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={cn("text-slate-400", size === "sm" ? "text-xs" : "text-sm")}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
