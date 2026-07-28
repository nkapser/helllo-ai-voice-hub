import { ArrowUpRight } from "lucide-react";
import { useCountUp, useInView } from "../lib/hooks";
import Wordmark from "./Wordmark";

type Metric = {
  value: number | null; // null → static display
  display?: string;
  suffix?: string;
  label: string;
};

const metrics: Metric[] = [
  { value: 45, suffix: "%", label: "More Qualified Leads" },
  { value: 60, suffix: "%", label: "Faster Lead Response" },
  { value: 35, suffix: "%", label: "Higher Customer Retention" },
  { value: 3, suffix: "×", label: "Revenue Growth" },
  { value: 90, suffix: "%", label: "Automation Rate" },
  { value: null, display: "24×7", label: "Always-On AI Engagement" },
];

const MetricCard = ({ metric, index, start }: { metric: Metric; index: number; start: boolean }) => {
  const v = useCountUp(metric.value ?? 0, start, 1300 + index * 100);
  return (
    <div className="rev-card group p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.24)] md:p-8">
      <p className="rev-display text-5xl tabular-nums md:text-6xl">
        {metric.value === null ? metric.display : `${Math.round(v)}${metric.suffix}`}
      </p>
      <div className="mt-3 h-1 w-8 rounded-full bg-[var(--rev-green)] transition-all duration-300 group-hover:w-14" />
      <p className="mt-3 text-[15px] font-medium text-[var(--rev-ink-70)]">{metric.label}</p>
    </div>
  );
};

const Outcomes = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const { ref: ctaRef, inView: ctaIn } = useInView<HTMLDivElement>(0.25);

  return (
    <section id="outcomes" className="relative z-10 mt-24 px-5 pb-10 md:px-8 lg:mt-10">
      <div
        ref={ref}
        className={`rev-reveal ${inView ? "rev-in" : ""} mx-auto max-w-7xl`}
      >
        <p className="rev-eyebrow">
          <span className="rev-eyebrow-idx">[02]</span>
          <span>Outcomes</span>
        </p>
        <h2 className="rev-display mt-3 text-4xl leading-[1.05] md:text-6xl">
          Every Customer Interaction.
          <br />
          <span className="italic">Engineered for Revenue.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} metric={m} index={i} start={inView} />
          ))}
        </div>

        {/* Large CTA */}
        <div
          ref={ctaRef}
          className={`rev-reveal ${ctaIn ? "rev-in" : ""} relative mt-16 overflow-hidden rounded-[2rem] bg-[var(--rev-ink)] px-6 py-16 text-center md:py-24`}
        >
          {/* signal lines in the dark */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full opacity-[0.16]"
          >
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M-40 ${300 - i * 60} C300 ${310 - i * 70}, 700 ${220 - i * 40}, 1240 ${140 - i * 30}`}
                fill="none"
                stroke={i === 1 ? "#60A5FA" : "#ffffff"}
                strokeWidth="1.5"
                className={i === 1 ? "rev-flow" : undefined}
              />
            ))}
          </svg>

          <div className="relative">
            <Wordmark className="text-xl opacity-90 [&_.rev-wm-rev]:!text-white" />
            <h3 className="rev-display mx-auto mt-5 max-w-2xl text-3xl text-white md:text-5xl">
              Ready to engineer
              <br />
              your <span className="italic text-[var(--rev-green)]">revenue?</span>
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              See RevEngg run your full customer lifecycle — live, on your own
              catalog and channels.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="/helllo#contact" className="rev-btn rev-btn-green">
                Book Demo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="mailto:hi@helllo.ai" className="rev-btn rev-btn-ghost-light">
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
