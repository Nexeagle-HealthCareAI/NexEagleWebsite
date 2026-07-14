"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ThumbsUp, Send, UserCircle2 } from "lucide-react";
import StarRating from "./StarRating";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;   // ISO string
  helpful: number;
}

interface ReviewsSectionProps {
  doctorId: string;
  doctorName: string;
  /** Seed reviews shown when LocalStorage is empty (mock/display data) */
  seedReviews?: Review[];
}

const STORAGE_KEY = (id: string) => `nexeagle_reviews_${id}`;

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default function ReviewsSection({
  doctorId,
  doctorName,
  seedReviews = [],
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Load from localStorage (merge with seed reviews on first load)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY(doctorId));
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(seedReviews);
      }
    } catch {
      setReviews(seedReviews);
    }
  }, [doctorId, seedReviews]);

  function persist(updated: Review[]) {
    try {
      localStorage.setItem(STORAGE_KEY(doctorId), JSON.stringify(updated));
    } catch { /* storage full / private mode */ }
    setReviews(updated);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newRating === 0) { setError("Please select a star rating."); return; }
    if (!newComment.trim()) { setError("Please write a short comment."); return; }

    setSubmitting(true);
    const review: Review = {
      id: `${Date.now()}`,
      author: newAuthor.trim() || "Anonymous",
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString(),
      helpful: 0,
    };
    const updated = [review, ...reviews];
    persist(updated);
    setNewRating(0);
    setNewComment("");
    setNewAuthor("");
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function markHelpful(id: string) {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, helpful: r.helpful + 1 } : r
    );
    persist(updated);
  }

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="space-y-6">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-brand-teal" />
          <h2 className="text-lg font-extrabold text-slate-900">
            Reviews
          </h2>
          <span className="text-sm text-slate-400 font-medium">
            ({reviews.length})
          </span>
        </div>
        {avg > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              {avg.toFixed(1)}
            </span>
            <div>
              <StarRating value={avg} size="sm" />
              <span className="text-xs text-slate-400">{reviews.length} reviews</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Review list ── */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-50 border border-brand-teal/20 flex items-center justify-center shrink-0">
                    <UserCircle2 className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{r.author}</p>
                    <p className="text-[11px] text-slate-400">{timeAgo(r.date)}</p>
                  </div>
                </div>
                <StarRating value={r.rating} size="sm" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-10">{r.comment}</p>
              <div className="pl-10">
                <button
                  onClick={() => markHelpful(r.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-brand-teal transition"
                >
                  <ThumbsUp className="w-3 h-3" />
                  Helpful {r.helpful > 0 && `(${r.helpful})`}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
          <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 font-medium">
            No reviews yet. Be the first to review {doctorName}!
          </p>
        </div>
      )}

      {/* ── Write a review ── */}
      <div className="bg-gradient-to-br from-teal-50/60 to-white rounded-2xl border border-teal-100 p-5">
        <h3 className="text-sm font-extrabold text-slate-800 mb-4">
          Leave a Review
        </h3>
        {submitted ? (
          <div className="text-center py-4">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-brand-teal flex items-center justify-center mx-auto mb-2">
              <Send className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-teal-700">
              Thank you for your review!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Star picker */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                Your Rating
              </label>
              <StarRating
                value={newRating}
                size="lg"
                interactive
                onChange={setNewRating}
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                Your Comment
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Share your experience with ${doctorName}…`}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:border-brand-teal/40 focus:ring-brand-teal/10 transition resize-none"
              />
            </div>

            {/* Name (optional) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                Your Name (optional)
              </label>
              <input
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Anonymous"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:border-brand-teal/40 focus:ring-brand-teal/10 transition"
              />
            </div>

            {error && (
              <p className="text-[11px] font-bold text-rose-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Submit Review
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
