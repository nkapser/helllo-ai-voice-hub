import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Minus, Plus } from "lucide-react";
import { setSEO } from "@/lib/seo";
import "../spark/spark.css";
import "../revengg/revengg.css";
import RevealInit from "../spark/components/RevealInit";
import SparkLogo from "../spark/components/SparkLogo";
import Wordmark from "../revengg/components/Wordmark";
import { BRAND_BRIEF, BRAND_BRIEF_VERSION } from "./brand-brief";

/* ════════════════════════════════════════════════════════════════
   Helllo Brand Guide — /brand
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

/* Two-column do / don't list — used by voice, imagery and governance. */
const DoDont = ({ dos, donts }: { dos: string[]; donts: string[] }) => (
  <div className="grid gap-4 lg:grid-cols-2">
    <div className="glass reveal rd1 rounded-2xl p-6">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">
        <Plus className="h-3.5 w-3.5 text-[var(--spark-ember)]" aria-hidden="true" />
        Do
      </p>
      <ul className="space-y-2 text-[13px] leading-relaxed spark-text-primary">
        {dos.map((d) => (
          <li key={d} className="flex gap-2.5">
            <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-[var(--spark-ember)]" aria-hidden="true" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="glass reveal rd2 rounded-2xl p-6">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        Don't
      </p>
      <ul className="space-y-2 text-[13px] leading-relaxed spark-text-muted">
        {donts.map((d) => (
          <li key={d} className="flex gap-2.5">
            <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-[hsl(var(--spark-border))]" aria-hidden="true" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* Copies the plain-text brief so another model can be briefed in one paste. */
const CopyBriefButton = () => {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2600);
    return () => clearTimeout(t);
  }, [state]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(BRAND_BRIEF);
      setState("copied");
      return;
    } catch {
      /* Clipboard API needs a secure context and permission — fall through. */
    }

    // Fallback for insecure contexts and older browsers: copy off a temporary
    // selection. Deprecated, but it is the only thing that works when the
    // async clipboard is unavailable.
    const ta = document.createElement("textarea");
    ta.value = BRAND_BRIEF;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try {
      setState(document.execCommand("copy") ? "copied" : "error");
    } catch {
      setState("error");
    } finally {
      document.body.removeChild(ta);
    }
  }, []);

  return (
    <div className="flex flex-col gap-2 sm:items-end">
      <button
        type="button"
        onClick={copy}
        className="btn-spark inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px]"
      >
        {state === "copied" ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {state === "copied" ? "Copied to clipboard" : "Copy full brand brief for LLMs"}
      </button>
      <p className="max-w-[19rem] text-[12px] leading-relaxed spark-text-muted sm:text-right" aria-live="polite">
        {state === "error"
          ? "Your browser blocked the clipboard. Check its site permissions and try again."
          : "~2 pages of structured text · covers voice, colour, type, marks, motion, a11y & every medium."}
      </p>
    </div>
  );
};

const Brand = () => {
  useEffect(() => {
    setSEO({
      title: "Brand Guide | Helllo.ai",
      description: "The Helllo brand in one page — voice, colour, type, marks, motion and every medium.",
      canonical: "https://www.helllo.ai/brand",
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
              Brand Guide
            </span>
          </a>
          <nav className="flex items-center gap-4 text-sm spark-text-muted">
            <a href="/" className="transition-colors hover:text-[hsl(215_28%_17%)]">RevEngg</a>
            <a href="/helllo" className="transition-colors hover:text-[hsl(215_28%_17%)]">Helllo Voice</a>
            <a href="/spark" className="transition-colors hover:text-[hsl(215_28%_17%)]">Spark</a>
          </nav>
        </header>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="pb-14 pt-14 sm:pt-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="reveal">
              <span className="spark-badge-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]">
                {BRAND_BRIEF_VERSION} · Brand guide
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight spark-text-primary sm:text-6xl">
                The Helllo brand,
                <br />
                <span className="text-gradient-spark">in one page.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed spark-text-muted">
                Everything you need to make a poster, a deck, a document, a webpage or a
                post that looks like it came from us. One shared foundation behind{" "}
                <a href="/" className="font-medium text-[var(--spark-ember)]">RevEngg</a>,{" "}
                <a href="/helllo" className="font-medium text-[var(--spark-ember)]">Helllo Voice</a> and{" "}
                <a href="/spark" className="font-medium text-[var(--spark-ember)]">Spark</a> —
                with one accent per product doing all the talking.
              </p>
            </div>
            <div className="reveal rd1 flex-shrink-0">
              <CopyBriefButton />
            </div>
          </div>

          {/* Principles */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Light & luminous", "Cool slate neutrals on a near-white canvas. Aurora glows and dot grids stay under 5% prominence."],
              ["Product is the hero", "Custom SVG dashboards, diagrams and mockups — never stock imagery, robots or floating brains."],
              ["Motion means something", "Animation only narrates the product story: signals flow, numbers count, cards reveal. Nothing decorative."],
              ["One accent per product", "Shared neutrals everywhere; the family speaks blue. RevEngg is trialing the blue flavor — gothic green #9FEA28 is its legacy accent."],
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

        {/* ── 01 Who we are ──────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="01" label="Positioning" title="Who we are," sub="and what we ship." />

          <div className="glass reveal rounded-2xl p-6 sm:p-8">
            <p className="max-w-3xl text-lg leading-relaxed spark-text-primary">
              helllo.ai builds AI agents for customer conversations. Three surfaces,
              one design language.
            </p>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed spark-text-muted">
              Our line is <span className="font-medium spark-text-primary">"Engineer every
              customer interaction into measurable revenue."</span> Everything we write
              should be able to sit under it without contradiction.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["SAP Startup Cohort 2026", "Google Cloud for Startups", "DPIIT Recognized"].map((c) => (
                <span key={c} className="spark-chip rounded-full px-3.5 py-1.5 text-[12px]">{c}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {[
              ["RevEngg", "/", "AI Revenue Engineering for B2C brands. Agents that discover, enrich, qualify, engage and retain across Voice, WhatsApp, Email and Web.", "Private Alpha"],
              ["Helllo Voice", "/helllo", "AI voice agents and agentic flows for customer experience. The shipping product.", "Live"],
              ["Spark", "/spark", "Web agent for SMB website owners.", "Live"],
            ].map(([name, href, desc, status], i) => (
              <div key={name} className={`glass reveal rd${i + 1} rounded-2xl p-6`}>
                <div className="flex items-center justify-between gap-3">
                  <a href={href} className="font-display text-base font-semibold spark-text-primary">{name}</a>
                  <span className="rounded-full border border-[hsl(var(--spark-border))] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] spark-text-muted">
                    {status}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed spark-text-muted">{desc}</p>
                <code className="mt-3 block font-mono text-[10px] spark-text-subtle">route {href}</code>
              </div>
            ))}
          </div>
        </section>

        {/* ── 02 Voice & tone ────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="02" label="Voice & tone" title="Precise, technical," sub="calm." />

          <p className="reveal mb-6 max-w-2xl text-[15px] leading-relaxed spark-text-muted">
            We describe mechanisms, not ambitions. If a sentence would survive being read
            aloud to an engineer who has to build it, it's on brand.
          </p>

          <DoDont
            dos={[
              "Name the mechanism: agents discover, enrich, qualify, engage, retain.",
              "Use concrete nouns — Voice, WhatsApp, Email, Web, CRM, lead, call, handoff.",
              "Use real numbers with units, or no numbers at all.",
              "Write short declaratives. Lead with the verb.",
            ]}
            donts={[
              "No hype: revolutionary, game-changing, unleash, supercharge, magic.",
              "No vague metrics: \"10x\", \"massive lift\", \"dramatically better\".",
              "Never anthropomorphise — the AI does not think, understand or care.",
              "No exclamation marks, no emoji in product copy.",
            ]}
          />

          <div className="glass reveal rd3 mt-4 rounded-2xl p-6 sm:p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Lexicon — use the left, not the right</p>
            <div className="space-y-0">
              {[
                ["AI agent", "bot · assistant · virtual agent"],
                ["conversation", "chat session"],
                ["human handoff", "escalation to a real person"],
                ["qualify", "score leads with AI magic"],
                ["B2C brands", "companies · businesses"],
              ].map(([good, bad]) => (
                <div key={good} className="grid gap-1 border-b border-[hsl(var(--spark-border)/0.6)] py-3 last:border-0 sm:grid-cols-2 sm:gap-6">
                  <p className="text-sm font-medium spark-text-primary">{good}</p>
                  <p className="text-sm spark-text-subtle line-through decoration-[hsl(var(--spark-border))]">{bad}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 The marks ───────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="03" label="The marks" title="Three wordmarks," sub="one family." />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="glass reveal rd1 rounded-2xl p-7">
              <div className="rev-page rounded-xl bg-transparent">
                <Wordmark className="text-3xl" withDot />
              </div>
              <p className="mt-4 text-sm font-medium spark-text-primary">RevEngg — route /</p>
              <p className="mt-1 text-[13px] leading-relaxed spark-text-muted">
                Satoshi Black. "Revenue" in near-black #111111, "Engineering" in the product
                accent, bold italic — currently the blue flavor under review
                (legacy: gothic green #9FEA28). The only place Satoshi appears.
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

          <div className="reveal rd3 mt-4 grid gap-4 lg:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Clearspace</p>
              <div className="rounded-xl border border-dashed border-[hsl(var(--spark-border))] p-6">
                <div className="rounded-lg border border-dashed border-[var(--spark)] p-5">
                  <span className="font-display text-2xl font-semibold tracking-tight spark-text-primary">
                    helllo<span className="text-[var(--spark-ember)]">.ai</span>
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed spark-text-muted">
                Clearspace on all sides equals the cap-height of the wordmark. Nothing —
                text, rules, image edges — enters that margin.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Misuse</p>
              <ul className="space-y-2 text-[13px] leading-relaxed spark-text-muted">
                <li>✗ Never recolour a mark outside its defined accent.</li>
                <li>✗ Never outline, rotate, skew or stretch.</li>
                <li>✗ Never add drop shadows, glows or bevels.</li>
                <li>✗ Never place a mark on a busy photo — paper, flat accent or glass only.</li>
                <li>✗ Never re-typeset a wordmark in a different family.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 04 Colour ──────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="04" label="Colour" title="Slate neutrals," sub="accent per product." />

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
                Small blue text on white uses deep <code className="font-mono text-[11px]">#1D4ED8</code> for AA contrast.
              </p>
            </div>
            <div className="reveal rd2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Green — RevEngg legacy accent (page currently trialing blue)</p>
              <div className="grid grid-cols-3 gap-4">
                <Swatch hex="#9fea28" name="Gothic green" value="#9FEA28" text="#111" />
                <Swatch hex="#65a30d" name="Green ember" value="#65A30D" text="#fff" />
                <Swatch hex="#4d7c0f" name="Green deep" value="#4D7C0F" text="#fff" />
              </div>
              <p className="mt-3 text-[13px] spark-text-muted">
                Held in reserve while the blue flavor is reviewed. To restore: swap the
                accent tokens in <code className="font-mono text-[11px]">revengg.css</code> back
                to these values. Small green text on light always uses green deep (AA-safe).
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

          <div className="reveal rd3 mt-8 rounded-2xl border border-[hsl(38_92%_50%/0.35)] bg-[hsl(38_92%_50%/0.07)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[hsl(32_80%_38%)]">Implementation gotcha</p>
            <p className="mt-2 text-[13px] leading-relaxed spark-text-primary">
              In <code className="font-mono text-[11px]">revengg.css</code> the tokens are still
              named <code className="font-mono text-[11px]">--rev-green</code>,{" "}
              <code className="font-mono text-[11px]">--rev-green-ember</code> and{" "}
              <code className="font-mono text-[11px]">--rev-green-deep</code> but currently hold
              the <em>blue</em> values (#60A5FA / #3B82F6 / #1D4ED8). Read the value, not the name.
            </p>
          </div>
        </section>

        {/* ── 05 Typography ──────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="05" label="Typography" title="Geist speaks," sub="Inter explains, Mono labels." />

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
            <TypeRow name="Body" spec="Inter 400 · 1rem · lh 1.6 · 60–75ch">
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
            Fonts load once, globally, from <code className="font-mono text-[11px]">index.html</code> —
            Geist 400;500;600;700 · Geist Mono 400;500 · Inter 300;400;500;600, all with{" "}
            <code className="font-mono text-[11px]">display=swap</code>.
            Satoshi is reserved exclusively for the RevEngg wordmark.
          </p>
        </section>

        {/* ── 06 Layout & spacing ────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="06" label="Layout & spacing" title="Left-aligned," sub="on a 4px rhythm." />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass reveal rd1 rounded-2xl p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Spacing scale — 4px base</p>
              <div className="flex flex-wrap items-end gap-3">
                {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-1.5">
                    <div
                      className="rounded-sm bg-[var(--spark)]"
                      style={{ width: s, height: Math.max(s, 8) }}
                    />
                    <span className="font-mono text-[10px] spark-text-muted">{s}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed spark-text-muted">
                Every gap, pad and margin comes from this ladder. If a value isn't on it,
                it needs a reason.
              </p>
            </div>
            <div className="glass reveal rd2 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Container & rhythm</p>
              <ul className="space-y-2.5 text-[13px] leading-relaxed spark-text-muted">
                <li><span className="spark-text-primary">Product pages</span> — max-w-7xl (80rem), padding 1.25rem → 2rem.</li>
                <li><span className="spark-text-primary">Documents like this one</span> — max-w-6xl (72rem).</li>
                <li><span className="spark-text-primary">Section rhythm</span> — padding-bottom 3rem, 3.5rem ≥640px.</li>
                <li><span className="spark-text-primary">Breakpoints</span> — 375 / 640 / 768 / 1024 / 1280.</li>
                <li><span className="spark-text-primary">Alignment</span> — left by default. Centre only hero CTAs and the footer.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 07 Surfaces ────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="07" label="Surfaces & elevation" title="Glass, cards" sub="and glowing seams." />

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

        {/* ── 08 Controls ────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="08" label="Buttons & controls" title="One shape," sub="two voices." />

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
              <li>· Disabled: 0.5 opacity, cursor change, and a real <code className="font-mono text-[11px]">disabled</code> attribute.</li>
            </ul>
          </div>
        </section>

        {/* ── 09 Iconography ─────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="09" label="Iconography" title="One family," sub="lucide, everywhere." />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass reveal rd1 rounded-2xl p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Sizes & weight</p>
              <div className="flex items-end gap-6">
                {[16, 20, 24].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <Copy style={{ width: s, height: s }} className="spark-text-muted" strokeWidth={1.75} aria-hidden="true" />
                    <span className="font-mono text-[10px] spark-text-muted">{s}px</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <span className="flex items-center gap-2 rounded-full border border-[hsl(var(--spark-border))] bg-white px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--spark-success)]" />
                    <span className="font-mono text-[10px] spark-text-muted">LIVE</span>
                  </span>
                  <span className="font-mono text-[10px] spark-text-subtle">status dot</span>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed spark-text-muted">
                <code className="font-mono text-[11px]">lucide-react</code>, stroke 1.5–2px,
                consistent within a layer. Muted slate by default; accent only when the icon
                <em> is</em> the meaning.
              </p>
            </div>
            <div className="glass reveal rd2 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Rules</p>
              <ul className="space-y-2 text-[13px] leading-relaxed spark-text-muted">
                <li>✓ One family across the whole product. No mixing sets.</li>
                <li>✓ Icon-only buttons carry an aria-label and a ≥44px hit area.</li>
                <li>✓ Align to the text baseline; keep padding consistent.</li>
                <li>✗ Never emoji as a structural icon.</li>
                <li>✗ Never raster icons — SVG only, so they theme and scale.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 10 Imagery ─────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="10" label="Imagery" title="Draw the product," sub="never buy a photo." />

          <DoDont
            dos={[
              "Custom SVG dashboards, lifecycle diagrams, flow maps and product mockups.",
              "Real product surfaces — a revenue chart, a conversation, a CRM sync.",
              "Line-art diagrams on paper, with the accent marking the one thing that matters.",
              "Screenshots when they are honest and legible at the size shown.",
            ]}
            donts={[
              "No stock photography of people at laptops.",
              "No robots, androids, floating brains or glowing neural networks.",
              "No dark cyberpunk grids, 3D blobs or AI-generated hero art.",
              "No decorative abstraction that could belong to any other company.",
            ]}
          />
        </section>

        {/* ── 11 Motion ──────────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="11" label="Motion" title="Animation narrates" sub="the product story." />

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

        {/* ── 12 Backgrounds ─────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="12" label="Background layers" title="Atmosphere" sub="below 5% prominence." />

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

        {/* ── 13 Accessibility ───────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="13" label="Accessibility" title="Non-negotiable," sub="not a phase-two." />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass reveal rd1 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Contrast & colour</p>
              <ul className="space-y-2 text-[13px] leading-relaxed spark-text-muted">
                <li><span className="spark-text-primary">Body text ≥4.5:1</span>, large text and UI glyphs ≥3:1.</li>
                <li>Small accent text uses the <span className="spark-text-primary">deep</span> variant — #1D4ED8 blue, #4D7C0F green. Never the mid tone.</li>
                <li>Colour never carries meaning alone; pair it with an icon or a label.</li>
                <li>Both themes checked independently — never inferred from one.</li>
              </ul>
            </div>
            <div className="glass reveal rd2 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Interaction & structure</p>
              <ul className="space-y-2 text-[13px] leading-relaxed spark-text-muted">
                <li>Visible focus ring on everything interactive. Outlines are never removed.</li>
                <li>Touch targets ≥44×44px with ≥8px separation.</li>
                <li>Sequential headings, no skipped levels; landmarks on header/nav/main/footer.</li>
                <li><code className="font-mono text-[11px]">prefers-reduced-motion</code> and system text scaling are respected.</li>
                <li>Meaningful images have alt text; decorative layers are <code className="font-mono text-[11px]">aria-hidden</code>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 14 By medium ───────────────────────────────────── */}
        <section className="spark-section">
          <div className="glow-divider" />
          <SectionHead index="14" label="By medium" title="Same language," sub="different rooms." />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Webpage", "max-w-7xl, glow dividers between sections, one primary CTA, glass nav. Aurora and dot grid sit behind the hero only."],
              ["Deck — 16:9", "Near-white slides, Geist 600 headline top-left, one idea per slide. Mono eyebrow carries the section number; accent used once."],
              ["Document — A4", "Left-aligned, Inter body at 11pt, Geist headings. Accent reserved for rules and defined terms."],
              ["Poster — 1080×1350", "One Geist display line, one accent element, generous whitespace. Wordmark bottom-left with full clearspace."],
              ["Social — 1200×627", "Headline ≤9 words, near-white background, product SVG right, wordmark bottom-left. No stock photos, no emoji."],
              ["Email", "Single column 600px, Inter throughout, one CTA in the accent gradient. The plain-text fallback must read as prose."],
            ].map(([t, b], i) => (
              <div key={t} className={`glass reveal rd${(i % 3) + 1} rounded-2xl p-6`}>
                <p className="font-display text-base font-semibold spark-text-primary">{t}</p>
                <p className="mt-2 text-[13px] leading-relaxed spark-text-muted">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 15 Tokens & governance ─────────────────────────── */}
        <section className="spark-section spark-section-cta">
          <div className="glow-divider" />
          <SectionHead index="15" label="Tokens & governance" title="Where the tokens live," sub="and the rules of the road." />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass reveal rd1 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Token sources</p>
              <ul className="space-y-2.5 font-mono text-[12px] spark-text-primary">
                <li><span className="text-[var(--spark-ember)]">src/index.css</span> — global :root tokens (Tailwind semantic colors, shadows, fonts) → /helllo + app-wide</li>
                <li><span className="text-[var(--spark-ember)]">src/pages/spark/spark.css</span> — .spark-page scope → /spark</li>
                <li><span className="text-[var(--spark-ember)]">src/pages/revengg/revengg.css</span> — .rev-page scope → /</li>
                <li><span className="text-[var(--spark-ember)]">src/pages/brand/brand-brief.ts</span> — the plain-text brief this page copies</li>
                <li><span className="text-[var(--spark-ember)]">index.html</span> — Geist · Inter · Geist Mono (global font load)</li>
              </ul>
            </div>
            <div className="glass reveal rd2 rounded-2xl p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] spark-text-muted">Do / Don't</p>
              <ul className="space-y-2 text-[13px] leading-relaxed">
                <li className="spark-text-primary">✓ Use semantic tokens; never raw hex in components (illustrations excepted).</li>
                <li className="spark-text-primary">✓ One accent per page. Neutrals do the layout; accent marks meaning.</li>
                <li className="spark-text-primary">✓ Custom SVG for every visual — dashboards, flows, lifecycle diagrams.</li>
                <li className="spark-text-primary">✓ Add a token before adding a one-off value.</li>
                <li className="spark-text-muted">✗ No stock photos, robot art, dark cyberpunk themes or emoji-as-icons.</li>
                <li className="spark-text-muted">✗ No decorative motion; nothing animates unless it explains the product.</li>
                <li className="spark-text-muted">✗ Small green text never uses #9FEA28 on white — use green deep #4D7C0F.</li>
              </ul>
            </div>
          </div>

          <div className="reveal rd3 mt-8 flex flex-col items-start gap-4 rounded-2xl border border-[hsl(var(--spark-border))] bg-white/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-base font-semibold spark-text-primary">Briefing a model?</p>
              <p className="mt-1 text-[13px] leading-relaxed spark-text-muted">
                Take the whole thing as structured plain text and paste it into your context.
              </p>
            </div>
            <CopyBriefButton />
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[hsl(var(--spark-border)/0.7)] pt-8 sm:flex-row">
          <p className="text-[13px] spark-text-muted">Helllo Brand Guide · {BRAND_BRIEF_VERSION}</p>
          <p className="font-mono text-[11px] spark-text-subtle">© {new Date().getFullYear()} helllo.ai</p>
        </footer>
      </div>
    </div>
  );
};

export default Brand;
