"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp, Send, UserCircle2, CheckCircle2 } from "lucide-react";
import StarRating from "./StarRating";
import { useDoctorReviews, useMarkReviewHelpful, useSubmitReview, useUpdateReviewComment } from "@/lib/api/hooks";
import { getSavedRating, markRated } from "@/lib/ratingGuard";

interface ReviewsSectionProps {
  doctorId: string;
  doctorName: string;
}

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
}: ReviewsSectionProps) {
  const { data } = useDoctorReviews(doctorId);
  const submitMutation = useSubmitReview(doctorId);
  const updateCommentMutation = useUpdateReviewComment(doctorId);
  const helpfulMutation = useMarkReviewHelpful(doctorId);

  const reviews = data?.reviews ?? [];
  const avg = data?.averageRating ?? 0;

  // Persisted per-browser (localStorage) — sourced once at mount so a returning visitor who
  // already rated this doctor sees that state immediately, not the interactive picker again.
  const [priorRating, setPriorRating] = useState<number | null>(() => getSavedRating(doctorId));

  const [newRating, setNewRating] = useState(0);
  const [ratingSaving, setRatingSaving] = useState(false);
  const [savedReviewId, setSavedReviewId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [commentSaving, setCommentSaving] = useState(false);
  const [commentSaved, setCommentSaved] = useState(false);
  const [error, setError] = useState("");

  // Tapping a star saves immediately — no comment, no submit button, no form to fill in.
  // The reviewId comes back so an optional comment can be attached afterward.
  async function handleRate(value: number) {
    setError("");
    setNewRating(value);
    setRatingSaving(true);
    try {
      const res = await submitMutation.mutateAsync({ rating: value });
      setSavedReviewId(res.reviewId);
      markRated(doctorId, value);
      setPriorRating(value);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save your rating — please try again.");
      setNewRating(0);
    } finally {
      setRatingSaving(false);
    }
  }

  async function handleAddComment() {
    if (!savedReviewId || !comment.trim()) return;
    setCommentSaving(true);
    try {
      await updateCommentMutation.mutateAsync({ reviewId: savedReviewId, comment: comment.trim() });
      setCommentSaved(true);
      setTimeout(() => {
        setCommentSaved(false);
        setNewRating(0);
        setSavedReviewId(null);
        setComment("");
      }, 2500);
    } catch {
      setError("Couldn't save your comment — please try again.");
    } finally {
      setCommentSaving(false);
    }
  }

  function markHelpful(id: string) {
    helpfulMutation.mutate(id);
  }

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
              key={r.reviewId}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-50 border border-brand-teal/20 flex items-center justify-center shrink-0">
                    <UserCircle2 className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{r.authorName || "Anonymous"}</p>
                    <p className="text-[11px] text-slate-400">{timeAgo(r.createdAt)}</p>
                  </div>
                </div>
                <StarRating value={r.rating} size="sm" />
              </div>
              {r.comment && (
                <p className="text-sm text-slate-600 leading-relaxed pl-10">{r.comment}</p>
              )}
              <div className="pl-10">
                <button
                  onClick={() => markHelpful(r.reviewId)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-brand-teal transition"
                >
                  <ThumbsUp className="w-3 h-3" />
                  Helpful {r.helpfulCount > 0 && `(${r.helpfulCount})`}
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

      {/* ── Rate this doctor — tap a star, it saves instantly ── */}
      <div className="bg-gradient-to-br from-teal-50/60 to-white rounded-2xl border border-teal-100 p-5">
        {commentSaved ? (
          <div className="text-center py-4">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-brand-teal flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-teal-700">Thanks for the extra detail!</p>
          </div>
        ) : savedReviewId ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
              <div>
                <p className="text-sm font-bold text-teal-700">Rating saved!</p>
                <StarRating value={newRating} size="sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                Add a comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`Share your experience with ${doctorName}…`}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:border-brand-teal/40 focus:ring-brand-teal/10 transition resize-none"
              />
              {error && <p className="text-[11px] font-bold text-rose-500">{error}</p>}
              {comment.trim() && (
                <button
                  onClick={handleAddComment}
                  disabled={commentSaving}
                  className="w-full py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {commentSaving ? "Saving…" : "Add comment"}
                </button>
              )}
            </div>
          </>
        ) : priorRating ? (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
            <div>
              <p className="text-sm font-bold text-teal-700">You already rated this doctor</p>
              <StarRating value={priorRating} size="sm" />
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-extrabold text-slate-800 mb-1">
              Rate {doctorName}
            </h3>
            <p className="text-xs text-slate-500 mb-3">Tap a star — it saves right away.</p>
            <StarRating
              value={newRating}
              size="lg"
              interactive={!ratingSaving}
              onChange={handleRate}
              className={ratingSaving ? "opacity-50 pointer-events-none" : undefined}
            />
            {error && <p className="text-[11px] font-bold text-rose-500 mt-2">{error}</p>}
          </>
        )}
      </div>
    </section>
  );
}
