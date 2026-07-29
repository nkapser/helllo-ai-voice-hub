import { ArrowUpRight, Play, Award, Cloud, BadgeCheck } from "lucide-react";
import { useInView } from "../lib/hooks";
import DashboardIllustration from "./DashboardIllustration";

const trust = [
  { icon: Award, label: "SAP Startup Cohort 2026" },
  { icon: Cloud, label: "Google Cloud for Startups" },
  { icon: BadgeCheck, label: "DPIIT Recognized" },
];

const Hero = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section className="relative z-10 px-5 pt-16 md:px-8 lg:pt-20">
      <div
        ref={ref}
        className={`rev-reveal ${inView ? "rev-in" : ""} mx-auto grid max-w-7xl items-center gap-14 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-12 lg:gap-10`}
      >
        {/* Left — message */}
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--rev-hairline)] bg-[var(--rev-surface)] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--rev-green)]" />
            <span className="rev-eyebrow !text-[10px]">
              AI Revenue Engineering Platform for B2C Brands
            </span>
          </span>

          <h1 className="rev-wordmark mt-6 text-[clamp(3.5rem,9vw,6rem)] leading-[0.95]">
            <span className="rev-wm-rev">Revenue</span><br/>
            <span className="rev-wm-engg">Engineering</span>
            {/* <span className="rev-wm-dot">.</span> */}
          </h1>

          <p className="rev-display mt-5 max-w-md text-2xl leading-snug !font-bold md:text-[1.7rem]">
            Engineer every customer interaction into measurable revenue.
          </p>

          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--rev-ink-70)]">
            AI agents that discover, enrich, qualify, engage and retain customers
            across Voice, WhatsApp, Email and Web.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/helllo#contact" className="rev-btn rev-btn-green">
              Book a Demo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#platform" className="rev-btn rev-btn-ghost">
              <Play className="h-4 w-4" aria-hidden="true" />
              Watch Platform
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--rev-hairline)] pt-6">
            {trust.map((t, i) => (
              <div key={t.label} className="flex items-center gap-5">
                {i > 0 && <span className="rev-vline hidden h-5 sm:block" />}
                <span className="flex items-center gap-2">
                  <t.icon className="h-4 w-4 text-[var(--rev-ink-50)]" aria-hidden="true" />
                  <span className="rev-mono text-[10px] text-[var(--rev-ink-70)]">{t.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — product */}
        <div className="lg:col-span-7">
          <DashboardIllustration />
        </div>
      </div>
    </section>
  );
};

export default Hero;
