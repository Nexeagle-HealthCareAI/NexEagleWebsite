import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2, Star, Send } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { submitFeedback } from "@/lib/api";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "website", label: "Website Experience" },
  { value: "bug", label: "Report a Problem" },
  { value: "suggestion", label: "Suggestion" },
];

const feedbackSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  category: z.string().min(1),
  message: z.string().min(1, "Please share your feedback").max(4000),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { category: "general" },
  });

  const category = watch("category");

  const onSubmit = async (values: FeedbackFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitFeedback({
        ...values,
        rating: rating || undefined,
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not send feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Share Your Feedback"
        description="Tell us what you think about the NexEagle website and services. Your feedback helps us improve."
        keywords="NexEagle feedback, website feedback, suggestions"
      />
      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16 bg-gradient-to-b from-teal-50/20 via-white to-white select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 pointer-events-none rounded-full blur-[140px] z-0"></div>
        <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-3xl mx-auto text-center space-y-5">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            We'd love your feedback.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Found something confusing, or have an idea to make NexEagle better? Tell us.
          </p>
        </div>
      </section>

      <section className="container px-6 md:px-8 lg:px-12 max-w-2xl mx-auto pb-24">
        {isSubmitted ? (
          <div className="text-center py-16 px-6 bg-slate-50 rounded-3xl border border-brand-teal/20 space-y-4 select-none">
            <div className="w-14 h-14 bg-teal-50 border border-brand-teal/20 rounded-2xl flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 text-brand-teal" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Thank you!</h3>
            <p className="text-slate-500 text-sm md:text-base">
              Your feedback has been received. We really appreciate you taking the time.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-8 rounded-3xl border border-slate-200/80 bg-white"
          >
            {submitError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-5 py-4 text-sm font-medium">
                {submitError}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && (
                  <p className="text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setValue("category", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Rating (optional)</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star === rating ? 0 : star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="p-1"
                    aria-label={`Rate ${star} star${star === 1 ? "" : "s"}`}
                  >
                    <Star
                      className={cn(
                        "w-6 h-6 transition-colors",
                        (hovered || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Your Feedback</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell us what's on your mind..."
                className="resize-none"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-xs text-red-600">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Feedback
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Feedback;
