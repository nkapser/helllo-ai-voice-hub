import { useEffect } from "react";
import { setSEO } from "@/lib/seo";
import "../spark/spark.css";
import "../revengg/revengg.css";
import RevealInit from "../spark/components/RevealInit";
import SparkLogo from "../spark/components/SparkLogo";
import Wordmark from "../revengg/components/Wordmark";

/* ════════════════════════════════════════════════════════════════
   Helllo Design Language System — /design-language-system
   The single source of truth for how /, /helllo and /spark look,
   move and speak. Written in the language it documents.
═══════════════════════════════════════════════════════════════ */

const SectionHead = ({ index, label, title, sub }: { index: string; label: string; title: string; sub?: string }) => (
  <div className="reveal mb-8">
    <div className="section-eyebrow">
      <span className="section-eyebrow-idx">[{index}]</span>
      <span className="section-eyebrow-label">{label}</span>
    </div>
    <h2 className="section-duo-head spark-text-primary">
      {title} {sub && <span className="duo-muted">{sub}</span>}
    </h2>
  </div>
);

const Swatch = ({ hex, name, value, border = false, text }: { hex: string; name: string; value: string; border?: boolean; text?: string }) => (
  <div className="flex flex-col gap-2">
    <div
      className={`flex h-20 items-end rounded-xl p-3 ${border ? "border border-[hsl(var(--spark-border))]" : ""}`}
      style={{ background: hex }}
    >
      {text && <span className="text-xs font-semibold" style={{ color: text }}>Aa</span>}
    </div>
    <div>
      <p className="text-sm font-medium spark-text-primary">{name}</p>
      <p className="font-mono text-[11px] spark-text-muted">{value}</p>
    </div>
  </div>
);

const TypeRow = ({ name, spec, children }: { name: string; spec: string; children: React.ReactNode }) => (
  <div className="grid items-baseline gap-2 border-b border-[hsl(var(--spark-border)/0.6)] py-5 last:border-0 sm:grid-cols-[11rem_1fr_auto]">
    <p className="text-xs font-medium uppercase tracking-[0.1em] spark-text-muted">{name}</p>
    <div className="min-w-0 spark-text-primary">{children}</div>
    <p className="font-mono text-[11px] spark-text-subtle">{spec}</p>
  </div>
);

const MotionRow = ({ name, value, usage }: { name: string; value: string; usage: string }) => (
  <div className="grid gap-1 border-b border-[hsl(var(--spark-border)/0.6)] py-4 last:border-0 sm:grid-cols-[13rem_1fr] sm:gap-6">
    <p className="text-sm font-semibold spark-text-primary">{name}</p>
    <div>
      <p className="font-mono text-[12px] text-[var(--spark-ember)]">{value}</p>
      <p className="mt-1 text-[13px] spark-text-muted">{usage}</p>
    </div>
  </div>
);

const DLS = () => {
  useEffect(() => {
    setSEO({
      title: "Design Language System | Helllo.ai",
      description: "The shared design language behind helllo.ai, RevEngg and Spark.",
      canonical: "https://www.helllo.ai/design-language-system",
      noindex: true,
    });
    document.documentElement.lang = "en";
  }, []);

  return (
    <div className="spark-page">
      <RevealInit />
      <div className="spark-aurora" aria-hidden="true" />
      <div className="spark-grid" aria-hidden="true" />

      <div className="spark-content mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between border-b border-[hsl(var(--spark-border)/0.7)] py-4">
          <a href="/" className="flex items-center gap-3">
            <span className="font-display text-lg font-semibold tracking-tight spark-text-primary">
              helllo<span className="text-[var(--spark-ember)]">.ai</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] spark-text-muted">
              Design Language System
            </span>
          </a>
          <nav className="flex items-center gap-4 text-sm spark-text-muted">
            <a href="/" className="transition-colors hover:text-[hsl(215_28%_17%)]">RevEngg</a>
            <a href="/helllo" className="transition-colors hover:text-[hsl(215_28%_17%)]">Helllo Voice</a>
            <a href="/spark" className="transition-colors hover:text-[hsl(215_28%_17%)]">Spark</a>
          </nav>
        </header>

        {/* ── Intro ──────────────────────────────────────────── */}
        <section className="pb-14 pt-14 sm:pt-20">
          <div className="reveal">
            <span className="spark-badge-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]">
              v1.0 · July 2026
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight spark-text-primary sm:text-6xl">
              One language.
              <br />
              <span className="text-gradient-spark">Three products.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed spark-text-muted">
              The shared visual system behind{" "}
              <a href="/" className="font-medium text-[var(--spark-ember)]">RevEngg</a>,{" "}
              <a href="/helllo" className="font-medium text-[var(--spark-ember)]">Helllo Voice</a> and{" "}
              <a href="/spark" className="font-medium text-[var(--spark-ember)]">Spark</a>.
              A common foundation of neutrals, typography, surfaces and motion — with one
              accent per product doing all the talking.
            </p>
          </div>

          {/* Principles */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Light & luminous", "Cool slate neutrals on a near-white canvas. Aurora glows and dot grids stay under 5% prominence."],
              ["Product is the hero", "Custom SVG dashboards, diagrams and mockups — never stock imagery, robots or floating brains."],
              ["Motion means something", "Animation only narrates the product story: signals flow, numbers count, cards reveal. Nothing decorative."],
              ["One accent per product", "Shared neutrals everywhere; Spark and Helllo speak blue, RevEngg speaks gothic green."],
            ].map(([t, b], i) => (
              <div key={t} className={`magic-card reveal rd${i + 1}`}>
                <div className="magic-card-accent" />
                <div className="magic-card-body">
                  <p className="font-display text-base font-semibold spark-text-primary">{t}</p>
                  <p className="text-[13px] leading-relaxed spark-text-muted">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 01 Brand ───────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="01" label="Brand architecture" title="Three wordmarks," sub="one family." />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="glass reveal rd1 rounded-2xl p-7">
              <div className="rev-page rounded-xl bg-transparent">
                <Wordmark className="text-3xl" withDot />
              </div>
              <p className="mt-4 text-sm font-medium spark-text-primary">RevEngg — route /</p>
              <p className="mt-1 text-[13px] leading-relaxed spark-text-muted">
                Satoshi Black. "Rev" in near-black #111111, "Engg" in gothic green
                #9FEA28, bold italic. The only place Satoshi appears.
              </p>
            </div>
            <div className="glass reveal rd2 rounded-2xl p-7">
              <span className="font-display text-3xl font-semibold tracking-tight spark-text-primary">
                helllo<span className="text-[var(--spark-ember)]">.ai</span>
              </span>
              <p className="mt-4 text-sm font-medium spark-text-primary">Helllo Voice — route /helllo</p>
              <p className="mt-1 text-[13px] leading-relaxed spark-text-muted">
                Geist Semibold wordmark with the Spark-blue accent. AI voice agents +
                agentic flows for customer experience.
              </p>
            </div>
            <div className="glass reveal rd3 rounded-2xl p-7">
              <span className="flex items-center gap-3">
                <SparkLogo size={30} />
                <span className="leading-tight">
                  <span className="block font-display text-xl font-semibold tracking-tight spark-text-primary">Spark</span>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.12em] spark-text-muted">by Helllo.ai</span>
                </span>
              </span>
              <p className="mt-4 text-sm font-medium spark-text-primary">Spark — route /spark</p>
              <p className="mt-1 text-[13px] leading-relaxed spark-text-muted">
                Logomark + Geist wordmark. Web agent for SMB website owners.
              </p>
            </div>
          </div>
        </section>

        {/* ── 02 Color ───────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="02" label="Color" title="Slate neutrals," sub="accent per product." />

          <p className="reveal mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Neutral foundation — shared by every page</p>
          <div className="reveal grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Swatch hex="hsl(210 40% 98%)" name="Background" value="hsl(210 40% 98%)" border />
            <Swatch hex="#ffffff" name="Surface elevated" value="#FFFFFF" border />
            <Swatch hex="#f1f5f9" name="Surface" value="#F1F5F9" border />
            <Swatch hex="hsl(214 32% 84%)" name="Border" value="hsl(214 32% 84%)" />
            <Swatch hex="hsl(215 16% 47%)" name="Muted text" value="hsl(215 16% 47%)" text="#fff" />
            <Swatch hex="hsl(215 28% 17%)" name="Foreground" value="hsl(215 28% 17%)" text="#fff" />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="reveal rd1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Blue — Spark &amp; Helllo Voice</p>
              <div className="grid grid-cols-3 gap-4">
                <Swatch hex="#93c5fd" name="Glow" value="#93C5FD" />
                <Swatch hex="#60a5fa" name="Spark" value="#60A5FA" text="#fff" />
                <Swatch hex="#3b82f6" name="Ember" value="#3B82F6" text="#fff" />
              </div>
              <p className="mt-3 text-[13px] spark-text-muted">
                CTA gradient: <code className="font-mono text-[11px]">135deg, #60A5FA → #3B82F6</code>.
                Text on white uses <code className="font-mono text-[11px]">hsl(217 84% 46%)</code> for AA contrast.
              </p>
            </div>
            <div className="reveal rd2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Green — RevEngg</p>
              <div className="grid grid-cols-3 gap-4">
                <Swatch hex="#9fea28" name="Gothic green" value="#9FEA28" text="#111" />
                <Swatch hex="#65a30d" name="Green ember" value="#65A30D" text="#fff" />
                <Swatch hex="#4d7c0f" name="Green deep" value="#4D7C0F" text="#fff" />
              </div>
              <p className="mt-3 text-[13px] spark-text-muted">
                CTA gradient: <code className="font-mono text-[11px]">135deg, #9FEA28 → #86D616</code> with
                ink text. Small text on light always uses green deep (AA-safe).
              </p>
            </div>
          </div>

          <div className="reveal rd3 mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Semantic</p>
            <div className="grid grid-cols-3 gap-4 sm:max-w-md">
              <Swatch hex="#10b981" name="Success" value="#10B981" text="#fff" />
              <Swatch hex="hsl(38 92% 50%)" name="Warning" value="hsl(38 92% 50%)" text="#fff" />
              <Swatch hex="hsl(0 72% 51%)" name="Destructive" value="hsl(0 72% 51%)" text="#fff" />
            </div>
          </div>
        </section>

        {/* ── 03 Typography ──────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="03" label="Typography" title="Geist speaks," sub="Inter explains, Mono labels." />

          <div className="glass reveal rounded-2xl p-6 sm:p-8">
            <TypeRow name="Display" spec="Geist 600 · clamp(2.5–4rem) · -0.02em">
              <p className="truncate font-display text-4xl font-semibold tracking-tight sm:text-5xl">Engineer revenue.</p>
            </TypeRow>
            <TypeRow name="Section head" spec="Geist 600 · clamp(1.75–2.75rem)">
              <p className="section-duo-head !mb-0">Two-tone headline, <span className="duo-muted">muted follow-on.</span></p>
            </TypeRow>
            <TypeRow name="H3" spec="Geist 600 · 1.25rem">
              <p className="font-display text-xl font-semibold">Card and panel titles</p>
            </TypeRow>
            <TypeRow name="Body" spec="Inter 400 · 1rem · lh 1.6">
              <p className="max-w-md text-base leading-relaxed">
                Body copy is Inter — quiet, legible, never competing with the product.
              </p>
            </TypeRow>
            <TypeRow name="Eyebrow" spec="Geist Mono 500 · 11px · +0.14em · uppercase">
              <div className="section-eyebrow !mb-0">
                <span className="section-eyebrow-idx">[01]</span>
                <span className="section-eyebrow-label">Numbered section label</span>
              </div>
            </TypeRow>
            <TypeRow name="Data / mono" spec="Geist Mono 400–500 · tabular">
              <p className="font-mono text-sm">$482,630 · +24.6% · 00:42</p>
            </TypeRow>
          </div>

          <p className="reveal rd1 mt-4 text-[13px] spark-text-muted">
            Fonts load once, globally, from <code className="font-mono text-[11px]">index.html</code>.
            Satoshi is reserved exclusively for the RevEngg wordmark.
          </p>
        </section>

        {/* ── 04 Surfaces ────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="04" label="Surfaces & elevation" title="Glass, cards" sub="and glowing seams." />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass reveal rd1 rounded-2xl p-6">
              <p className="font-display text-base font-semibold spark-text-primary">Glass</p>
              <p className="mt-1.5 text-[13px] leading-relaxed spark-text-muted">
                72% white + 16px blur + hairline border. Navs, hero panels, spec sheets.
              </p>
              <code className="mt-3 block font-mono text-[10px] spark-text-subtle">.glass · .rev-glass</code>
            </div>
            <div className="magic-card reveal rd2">
              <div className="magic-card-accent" />
              <div className="magic-card-body">
                <p className="font-display text-base font-semibold spark-text-primary">Accent card</p>
                <p className="text-[13px] leading-relaxed spark-text-muted">
                  Elevated white card, 1.25rem radius, 3px gradient accent bar, −3px hover lift.
                </p>
                <code className="font-mono text-[10px] spark-text-subtle">.magic-card</code>
              </div>
            </div>
            <div className="reveal rd3 rounded-[1.25rem] border border-[hsl(214_32%_84%/0.8)] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_40px_-16px_rgba(15,23,42,0.12)]">
              <p className="font-display text-base font-semibold spark-text-primary">Standard card</p>
              <p className="mt-1.5 text-[13px] leading-relaxed spark-text-muted">
                White on hairline, soft slate shadow. The default container everywhere.
              </p>
              <code className="mt-3 block font-mono text-[10px] spark-text-subtle">.rev-card · shadow-medium</code>
            </div>
          </div>

          <div className="reveal rd3 mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Radius scale</p>
              <div className="flex items-end gap-4">
                {[["0.5rem", "rounded-lg", "inputs"], ["0.75rem", "rounded-xl", "buttons"], ["1.25rem", "rounded-2xl+", "cards"], ["9999px", "rounded-full", "pills"]].map(([r, cls, use]) => (
                  <div key={cls} className="flex flex-col items-center gap-2">
                    <div className="h-14 w-14 border-2 border-[var(--spark-ember)] bg-[hsl(var(--spark-accent))]" style={{ borderRadius: r }} />
                    <p className="font-mono text-[10px] spark-text-muted">{r}</p>
                    <p className="text-[10px] spark-text-subtle">{use}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Section seam</p>
              <div className="glow-divider" />
              <p className="mt-3 text-[13px] spark-text-muted">
                Sections are separated by a gradient glow divider — never heavy rules or
                background color blocks. <code className="font-mono text-[11px]">.glow-divider · .rev-divider</code>
              </p>
            </div>
          </div>
        </section>

        {/* ── 05 Controls ────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="05" label="Buttons & controls" title="One shape," sub="two voices." />

          <div className="glass reveal rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" className="btn-spark rounded-xl px-6 py-3 text-[15px]">Book a Demo</button>
              <button type="button" className="spark-btn-secondary rounded-xl px-6 py-3 text-[15px] font-medium">Watch Platform</button>
              <div className="rev-page bg-transparent">
                <button type="button" className="rev-btn rev-btn-green">Book a Demo</button>
              </div>
              <div className="rev-page bg-transparent">
                <button type="button" className="rev-btn rev-btn-primary">Talk to Sales</button>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="spark-badge-pill rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]">Badge pill</span>
              <span className="spark-chip rounded-full px-3.5 py-1.5 text-[12px]">Neutral chip</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(159,234,40,0.4)] bg-[rgba(159,234,40,0.14)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4d7c0f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9fea28]" />
                RevEngg badge
              </span>
            </div>
            <ul className="mt-6 space-y-1.5 text-[13px] spark-text-muted">
              <li>· Primary CTA: accent gradient + glow shadow + 1px lift on hover. One per screen.</li>
              <li>· Secondary: white surface, hairline border, accent tint on hover.</li>
              <li>· Radius 0.75rem, min-height 44–48px, visible focus ring, 150–200ms transitions.</li>
            </ul>
          </div>
        </section>

        {/* ── 06 Motion ──────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="06" label="Motion" title="Animation narrates" sub="the product story." />

          <div className="glass reveal rounded-2xl p-6 sm:p-8">
            <MotionRow name="Entrance rise" value="0.6s cubic-bezier(0.16, 1, 0.3, 1) · translateY(16–24px) → 0" usage="Hero content and scroll reveals (.reveal/.in-view, .rev-reveal/.rev-in). Staggered 80–100ms per sibling." />
            <MotionRow name="Hover lift" value="0.18–0.22s ease · translateY(-1px to -3px) + shadow" usage="Buttons lift 1px, cards lift 3px. Restore on release." />
            <MotionRow name="Signal flow" value="4–7s linear infinite · stroke-dashoffset" usage="Dashed SVG paths carrying leads, revenue and sync events. The family's signature motion." />
            <MotionRow name="Draw-in" value="1.6s cubic-bezier(0.3, 0, 0.2, 1) · stroke-dashoffset" usage="Chart lines and lifecycle paths draw once on first view." />
            <MotionRow name="Count-up" value="1.3–1.8s ease-out-cubic · rAF" usage="Metrics count from zero when they enter the viewport." />
            <MotionRow name="Panel crossfade" value="0.45s cubic-bezier(0.16, 1, 0.3, 1) · fade + 18px slide" usage="Content swaps in scrollytelling sections. No page refresh, no layout shift." />
            <div className="pt-4">
              <p className="text-[13px] spark-text-muted">
                All motion is disabled under <code className="font-mono text-[11px]">prefers-reduced-motion</code>.
                Never animate width/height/top/left — transform and opacity only.
              </p>
            </div>
          </div>
        </section>

        {/* ── 07 Backgrounds ─────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="07" label="Background layers" title="Atmosphere" sub="below 5% prominence." />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Aurora", "Fixed radial gradients in the product accent, ~45–50% layer opacity. Top-center glow + two corner washes.", ".spark-aurora · .rev-aurora"],
              ["Dot grid", "28px radial-dot grid, slate at 25%, masked to the hero region, 35% layer opacity.", ".spark-grid · .rev-grid"],
              ["Signal field", "RevEngg only: canvas bezier trajectories with drifting particles — the revenue signal. Pauses when the tab hides.", "SignalField.tsx"],
            ].map(([t, b, code], i) => (
              <div key={t} className={`magic-card reveal rd${i + 1}`}>
                <div className="magic-card-accent" />
                <div className="magic-card-body">
                  <p className="font-display text-base font-semibold spark-text-primary">{t}</p>
                  <p className="text-[13px] leading-relaxed spark-text-muted">{b}</p>
                  <code className="font-mono text-[10px] spark-text-subtle">{code}</code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 08 Usage ───────────────────────────────────────── */}
        <section className="spark-section spark-section-cta">
          <div className="glow-divider" />
          <SectionHead index="08" label="Usage" title="Where the tokens live," sub="and the rules of the road." />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass reveal rd1 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Token sources</p>
              <ul className="space-y-2.5 font-mono text-[12px] spark-text-primary">
                <li><span className="text-[var(--spark-ember)]">src/index.css</span> — global :root tokens (Tailwind semantic colors, shadows, fonts) → /helllo + app-wide</li>
                <li><span className="text-[var(--spark-ember)]">src/pages/spark/spark.css</span> — .spark-page scope → /spark</li>
                <li><span className="text-[var(--spark-ember)]">src/pages/revengg/revengg.css</span> — .rev-page scope → /</li>
                <li><span className="text-[var(--spark-ember)]">index.html</span> — Geist · Inter · Geist Mono (global font load)</li>
              </ul>
            </div>
            <div className="glass reveal rd2 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Do / Don't</p>
              <ul className="space-y-2 text-[13px] leading-relaxed">
                <li className="spark-text-primary">✓ Use semantic tokens; never raw hex in components (illustrations excepted).</li>
                <li className="spark-text-primary">✓ One accent per page. Neutrals do the layout; accent marks meaning.</li>
                <li className="spark-text-primary">✓ Custom SVG for every visual — dashboards, flows, lifecycle diagrams.</li>
                <li className="spark-text-muted">✗ No stock photos, robot art, dark cyberpunk themes or emoji-as-icons.</li>
                <li className="spark-text-muted">✗ No decorative motion; nothing animates unless it explains the product.</li>
                <li className="spark-text-muted">✗ Small green text never uses #9FEA28 on white — use green deep #4D7C0F.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[hsl(var(--spark-border)/0.7)] pt-8 sm:flex-row">
          <p className="text-[13px] spark-text-muted">Helllo Design Language · v1.0</p>
          <p className="font-mono text-[11px] spark-text-subtle">© {new Date().getFullYear()} helllo.ai</p>
        </footer>
      </div>
    </div>
  );
};

export default DLS;
