import { useCallback, useMemo } from "react";
import {
  Radar, Sparkles, UserPlus, Target, Route, MessagesSquare, RefreshCw,
} from "lucide-react";
import { useInView, useScrollProgress } from "../lib/hooks";
import {
  DiscoveryVisual, CreativeVisual, EnrichmentVisual, QualificationVisual,
  PlanningVisual, AgentsVisual, CrmVisual,
} from "./FeatureVisuals";

interface Feature {
  id: string;
  icon: typeof Radar;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  stats: [string, string][];
  Visual: () => JSX.Element;
}

const features: Feature[] = [
  {
    id: "discovery",
    icon: Radar,
    title: "Lead Discovery",
    subtitle: "Find high-intent customers across every acquisition channel.",
    headline: "Every channel. One pipeline.",
    description:
      "Meta, Google, marketplaces, organic and WhatsApp — RevEngg listens to every acquisition surface and pulls high-intent buyers into a single unified pipeline, in real time.",
    stats: [["6+", "channels unified"], ["Real-time", "signal capture"]],
    Visual: DiscoveryVisual,
  },
  {
    id: "creative",
    icon: Sparkles,
    title: "Creative Intelligence",
    subtitle: "Generate high-performing ad creatives and campaign variations using AI.",
    headline: "Creatives that earn their spend.",
    description:
      "AI generates images, headlines and copy variations, launches them as structured experiments, and doubles down on the variant your customers actually convert on.",
    stats: [["100+", "variants per brief"], ["Auto", "winner promotion"]],
    Visual: CreativeVisual,
  },
  {
    id: "enrichment",
    icon: UserPlus,
    title: "Lead Enrichment",
    subtitle: "Automatically enrich every lead with firmographic and behavioral intelligence.",
    headline: "A thin lead becomes a full profile.",
    description:
      "Company, revenue, industry, location, social presence and live buying intent — appended to every lead automatically, before anyone lifts a finger.",
    stats: [["12+", "attributes appended"], ["<30s", "to full profile"]],
    Visual: EnrichmentVisual,
  },
  {
    id: "qualification",
    icon: Target,
    title: "Qualification",
    subtitle: "AI qualifies every lead using context and buying intent.",
    headline: "Know who's ready to buy. Now.",
    description:
      "Every lead is scored on behavior, context and buying signals, then routed into a priority queue — so agents always work the hottest conversation first.",
    stats: [["100%", "leads scored"], ["0", "manual triage"]],
    Visual: QualificationVisual,
  },
  {
    id: "planning",
    icon: Route,
    title: "Planning",
    subtitle: "Plan the next best action using contextual memory and AI reasoning.",
    headline: "Observe. Reason. Recommend. Execute.",
    description:
      "A decision engine that remembers every order, conversation and browse session — and reasons over it to pick the next best action for every single customer.",
    stats: [["Per-customer", "action plans"], ["Continuous", "learning loop"]],
    Visual: PlanningVisual,
  },
  {
    id: "agents",
    icon: MessagesSquare,
    title: "Conversation Agents",
    subtitle: "Voice, WhatsApp, Email and Website AI Agents engage customers autonomously.",
    headline: "One memory. Every channel.",
    description:
      "Voice, WhatsApp, Email, Website and SMS agents share one contextual memory — a customer never repeats themselves, and no conversation ever goes cold.",
    stats: [["24×7", "engagement"], ["5", "channels, one brain"]],
    Visual: AgentsVisual,
  },
  {
    id: "crm",
    icon: RefreshCw,
    title: "CRM Intelligence",
    subtitle: "Every interaction automatically updates your CRM with structured intelligence.",
    headline: "Your CRM writes itself.",
    description:
      "HubSpot, Salesforce, Zoho, Freshsales or Pipedrive — every call summary, stage change and next step lands in your CRM as structured data. Automatically.",
    stats: [["5+", "CRMs supported"], ["100%", "interactions logged"]],
    Visual: CrmVisual,
  },
];

const STAGE_VH = 85; // scroll length per feature on desktop

const Platform = () => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const active = useMemo(() => {
    const idx = Math.floor(progress * features.length);
    return Math.min(idx, features.length - 1);
  }, [progress]);

  const jumpTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top =
      el.getBoundingClientRect().top +
      window.scrollY +
      (total * (i + 0.5)) / features.length;
    window.scrollTo({ top, behavior: "smooth" });
  }, [ref]);

  return (
    <section id="platform" className="relative z-10 mt-16 scroll-mt-24 lg:mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="rev-eyebrow">
          <span className="rev-eyebrow-idx">[01]</span>
          <span>The Platform</span>
        </p>
        <h2 className="rev-display mt-3 max-w-2xl text-4xl md:text-5xl">
          Revenue Engineering,{" "}
          <span className="italic text-[var(--rev-green-deep)]">end to end.</span>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--rev-ink-70)]">
          Seven systems, one continuous loop — from the first ad impression to the
          repeat purchase.
        </p>
      </div>

      {/* ---------- Desktop: sticky scrollytelling ---------- */}
      <div
        ref={ref}
        className="relative mx-auto hidden max-w-7xl lg:block"
        style={{ height: `${features.length * STAGE_VH}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center px-8">
          <div className="grid w-full grid-cols-12 gap-10">
            {/* Left — feature rail */}
            <div className="col-span-5 flex flex-col gap-2.5" role="tablist" aria-label="Platform capabilities">
              {features.map((f, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`rev-panel-${f.id}`}
                    data-active={isActive}
                    onClick={() => jumpTo(i)}
                    className={`rev-feature-card relative w-full cursor-pointer rounded-2xl border px-5 py-3.5 text-left ${
                      isActive
                        ? "border-[var(--rev-green-ember)] bg-[var(--rev-surface)] shadow-[0_16px_40px_-24px_rgba(59,130,246,0.35)]"
                        : "border-[var(--rev-hairline)] bg-transparent hover:bg-[var(--rev-surface)]"
                    }`}
                  >
                    <span className="rev-feature-bar absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[var(--rev-green)]" />
                    <span className="flex items-center gap-3.5">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isActive ? "bg-[var(--rev-green)]" : "bg-[#F1F5F9]"
                        }`}
                      >
                        <f.icon className="h-[18px] w-[18px] text-[var(--rev-ink)]" aria-hidden="true" />
                      </span>
                      <span className="flex-1">
                        <span className="flex items-baseline justify-between">
                          <span className="rev-display text-[1.05rem] !font-bold">{f.title}</span>
                          <span className="rev-mono text-[9px] text-[var(--rev-ink-30)]">
                            0{i + 1}
                          </span>
                        </span>
                        <span className="rev-feature-sub">
                          <span className="block !overflow-hidden">
                            <span className="mt-1 block pb-0.5 text-[13px] leading-snug text-[var(--rev-ink-70)]">
                              {f.subtitle}
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right — dynamic stage */}
            <div className="col-span-7 relative">
              {features.map((f, i) => (
                <div
                  key={f.id}
                  id={`rev-panel-${f.id}`}
                  role="tabpanel"
                  aria-hidden={i !== active}
                  className={`rev-panel absolute inset-0 flex flex-col justify-center ${
                    i === active ? "rev-active" : ""
                  }`}
                >
                  <div className="rev-card overflow-hidden p-6">
                    <f.Visual />
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-6">
                    <div>
                      <h3 className="rev-display text-2xl">{f.headline}</h3>
                      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[var(--rev-ink-70)]">
                        {f.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                      {f.stats.map(([v, l]) => (
                        <div key={l} className="rounded-xl border border-[var(--rev-hairline)] bg-[var(--rev-surface)] px-4 py-3">
                          <p className="rev-display text-lg leading-none">{v}</p>
                          <p className="rev-mono mt-1.5 text-[8px] text-[var(--rev-ink-50)]">{l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {/* height ghost so absolute panels have room */}
              <div className="invisible flex flex-col justify-center" aria-hidden="true">
                <div className="rev-card p-6">
                  <DiscoveryVisual />
                </div>
                <div className="mt-5 h-28" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile / tablet: stacked ---------- */}
      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-12 px-5 lg:hidden">
        {features.map((f, i) => (
          <MobileFeature key={f.id} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
};

const MobileFeature = ({ feature: f, index }: { feature: Feature; index: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`rev-reveal ${inView ? "rev-in rev-active" : ""}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--rev-green)]">
          <f.icon className="h-5 w-5 text-[var(--rev-ink)]" aria-hidden="true" />
        </span>
        <div>
          <p className="rev-mono text-[9px] text-[var(--rev-ink-50)]">0{index + 1}</p>
          <h3 className="rev-display text-xl !font-bold">{f.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--rev-ink-70)]">{f.subtitle}</p>
      <div className="rev-card mt-4 overflow-hidden p-4">
        <f.Visual />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[var(--rev-ink-70)]">{f.description}</p>
      <div className="mt-4 flex gap-3">
        {f.stats.map(([v, l]) => (
          <div key={l} className="flex-1 rounded-xl border border-[var(--rev-hairline)] bg-[var(--rev-surface)] px-4 py-3">
            <p className="rev-display text-lg leading-none">{v}</p>
            <p className="rev-mono mt-1.5 text-[8px] text-[var(--rev-ink-50)]">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
