import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { subscribeToBrevo } from "@/lib/brevo";
import { useToast } from "@/hooks/use-toast";

type WaitlistFormProps = {
  variant?: "light" | "dark";
  id?: string;
};

const WaitlistForm = ({ variant = "light", id }: WaitlistFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const dark = variant === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await subscribeToBrevo(email);

    setIsSubmitting(false);

    if (result.status === "ok") {
      setJoined(true);
      setEmail("");
      toast({
        title: "You're on the waitlist",
        description: "We'll write when Revenue Engineering opens the next cohort.",
      });
      return;
    }

    if (result.status === "already") {
      setJoined(true);
      toast({
        title: "You're already on the list",
        description: "This email is already subscribed. We'll be in touch.",
      });
      return;
    }

    if (result.status === "invalid_email") {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (result.status === "rate_limited") {
      toast({
        title: "Please wait",
        description: `Please wait ${result.remainingSeconds} second${result.remainingSeconds !== 1 ? "s" : ""} before trying again.`,
        variant: "destructive",
      });
      return;
    }

    if (result.status === "not_configured") {
      toast({
        title: "Waitlist not configured",
        description: import.meta.env.DEV
          ? "Please configure VITE_BREVO_API_KEY and VITE_BREVO_LIST_ID in .env.local"
          : "The waitlist is temporarily unavailable. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Could not join",
      description: result.message || "There was an error. Please try again later.",
      variant: "destructive",
    });
  };

  if (joined) {
    return (
      <p
        className={`flex items-center justify-center gap-2 text-[15px] font-medium ${
          dark ? "text-white" : "text-[var(--rev-ink)]"
        }`}
        role="status"
      >
        <CheckCircle2
          className={`h-5 w-5 ${dark ? "text-[var(--rev-green)]" : "text-[var(--rev-green-deep)]"}`}
          aria-hidden="true"
        />
        You're on the waitlist. We'll be in touch.
      </p>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="mx-auto w-full max-w-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor={id ? `${id}-email` : "waitlist-email"}>
          Work email
        </label>
        <input
          id={id ? `${id}-email` : "waitlist-email"}
          type="email"
          required
          autoComplete="email"
          placeholder="Work email"
          value={email}
          disabled={isSubmitting}
          onChange={(e) => setEmail(e.target.value)}
          className={`min-h-12 flex-1 rounded-xl border px-4 text-[15px] outline-none transition-colors disabled:opacity-60 ${
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/45 focus:border-[var(--rev-green)]"
              : "border-[var(--rev-hairline)] bg-[var(--rev-surface)] text-[var(--rev-ink)] placeholder:text-[var(--rev-ink-50)] focus:border-[var(--rev-green-ember)]"
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rev-btn rev-btn-green !min-h-12 shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Joining…
            </>
          ) : (
            "Join the waitlist"
          )}
        </button>
      </div>
      <p className={`mt-3 text-center text-xs ${dark ? "text-white/45" : "text-[var(--rev-ink-50)]"}`}>
        Private alpha. Same list as helllo.ai — no spam, unsubscribe anytime.
      </p>
    </form>
  );
};

export default WaitlistForm;
