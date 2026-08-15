import { ArrowRight } from "lucide-react";
import { useInView } from "../lib/hooks";
import WaitlistForm from "./WaitlistForm";

const problems = [
  {
    num: "01",
    title: "Demand is scattered. The pipeline is blind.",
    sting: "By the time a human follows up, the buyer has already moved on.",
    body: "Ads, marketplace DMs, WhatsApp, website chat — none of it lands in one place. High-intent customers go cold between the click and the first conversation.",
    close: "RevEngg unifies every acquisition surface into one live pipeline, then answers in seconds.",
  },
  {
    num: "02",
    title: "You talk to everyone. You convert almost no one.",
    sting: "Expensive humans burn hours on tyre-kickers while ready buyers wait.",
    body: "Without enrichment and intent scoring, every lead looks the same. Qualification is a gut feel. The hottest conversations never make the top of the queue.",
    close: "RevEngg enriches, scores and routes every lead before anyone lifts a finger.",
  },
  {
    num: "03",
    title: "The sale is treated as the finish line.",
    sting: "Repeat purchase, upsell and win-back are left to chance.",
    body: "After checkout, memory resets. No next-best action. No always-on agent on Voice, WhatsApp or Email. Revenue that should compound leaks out the back of the funnel.",
    close: "RevEngg keeps one memory across channels — and engineers retention the same way it engineers acquisition.",
  },
];

const Problems = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <section id="waitlist" className="relative z-10 mt-20 scroll-mt-24 px-5 md:px-8 lg:mt-16">
      <div
        ref={ref}
        className={`rev-reveal ${inView ? "rev-in" : ""} mx-auto max-w-7xl`}
      >
        <p className="rev-eyebrow">
          <span className="rev-eyebrow-idx">[01]</span>
          <span>The leaks</span>
        </p>
        <h2 className="rev-display mt-3 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
          Three reasons revenue
          <br />
          <span className="italic">never compounds.</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--rev-ink-70)]">
          These are the gaps Revenue Engineering is built to close. Private alpha is open for brands who feel them every week.
        </p>

        <ol className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {problems.map((p) => (
            <li key={p.num} className="rev-card flex flex-col p-7 md:p-8">
              <span className="rev-mono text-[11px] text-[var(--rev-green-deep)]">{p.num}</span>
              <h3 className="rev-display mt-4 text-2xl leading-snug md:text-[1.65rem]">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] font-medium leading-relaxed text-[var(--rev-ink)]">
                {p.sting}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--rev-ink-70)]">
                {p.body}
              </p>
              <p className="mt-auto flex items-start gap-2 pt-6 text-[14px] font-medium leading-snug text-[var(--rev-green-deep)]">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {p.close}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 rounded-[2rem] border border-[var(--rev-hairline)] bg-[var(--rev-surface)] px-6 py-12 text-center md:px-10 md:py-16">
          <p className="rev-eyebrow justify-center">
            <span className="rev-eyebrow-idx">Private alpha</span>
          </p>
          <h3 className="rev-display mx-auto mt-3 max-w-2xl text-3xl md:text-4xl">
            Join the waitlist. Be first when we open the next cohort.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--rev-ink-70)]">
            Tell us where to reach you. We'll send access, not a newsletter dump.
          </p>
          <div className="mt-8">
            <WaitlistForm id="waitlist-form" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
