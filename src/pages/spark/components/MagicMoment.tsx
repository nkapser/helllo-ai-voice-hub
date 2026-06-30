import { ScanLine, Mic, Code2, Check, Lock } from 'lucide-react'

const SCAN_STEPS = [
  'Fetching homepage',
  'Reading content',
  'Building knowledge',
  'Assistant ready',
]

const CODE_LINES = [
  { cls: 'tok-comment', text: '<!-- Spark — paste before </body> -->' },
  { cls: 'tok-tag', text: '<script src="…/agent-chat.spark-core.latest.js">' },
  { cls: 'tok-tag', text: '</script>' },
  { cls: 'tok-tag', text: '<script>' },
  { cls: 'tok-property', text: '  AgentChatWidget.init({ agentId, embedKey });' },
  { cls: 'tok-tag', text: '</script>' },
]

export default function MagicMoment() {
  return (
    <section className="spark-section relative overflow-hidden">
      <div className="glow-divider" />

      <div className="max-w-6xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-8 reveal">
          <span className="inline-block text-[12px] uppercase tracking-widest mb-2 font-medium text-[var(--spark-ember)]">
            Try before you pay
          </span>
          <h2
            className="font-display text-[clamp(2rem,4vw,2.75rem)] tracking-tight spark-text-primary mb-2"
          >
            See it on{' '}
            <em className="gradient-text not-italic">your site</em>
            {' '}before you pay
          </h2>
          <p className="text-sm sm:text-base spark-text-muted max-w-lg mx-auto">
            Sign up free to scan your pages and get your embed script. No credit card until you choose a paid plan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {/* Card 1 — Scan */}
          <article className="magic-card reveal rd1">
            <div className="magic-card-accent" />
            <div className="magic-card-body">
              <span className="magic-step">Step 01</span>
              <div className="flex items-start gap-3">
                <div className="magic-icon">
                  <ScanLine className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-[15px] font-semibold spark-text-primary mb-1">
                    Reads your site in seconds
                  </h3>
                  <p className="text-[13px] leading-relaxed spark-text-muted">
                    We parse your real pages — not a canned demo dataset.
                  </p>
                </div>
              </div>

              <div className="magic-preview">
                <div className="magic-window-bar">
                  <div className="magic-window-dots">
                    <span /><span /><span />
                  </div>
                  <div className="magic-url-bar">
                    <Lock className="h-2.5 w-2.5 text-[var(--spark)]" />
                    yourwebsite.com
                  </div>
                </div>
                <div className="p-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] spark-text-muted mb-1.5">
                      <span>Scanning homepage</span>
                      <span className="font-medium text-[var(--spark-ember)]">100%</span>
                    </div>
                    <div className="magic-progress-track">
                      <div className="magic-progress-fill" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {SCAN_STEPS.map((label) => (
                      <div key={label} className="magic-scan-step spark-text-primary">
                        <span className="magic-scan-step-icon">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2 — Chat + voice */}
          <article className="magic-card reveal rd2">
            <div className="magic-card-accent" />
            <div className="magic-card-body">
              <span className="magic-step">Step 02</span>
              <div className="flex items-start gap-3">
                <div className="magic-icon">
                  <Mic className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-[15px] font-semibold spark-text-primary mb-1">
                    Chat + voice, in the browser
                  </h3>
                  <p className="text-[13px] leading-relaxed spark-text-muted">
                    Visitors type or talk — no app, no phone system, no plugins.
                  </p>
                </div>
              </div>

              <div className="magic-preview p-3 flex items-end justify-center">
                <div className="w-full max-w-[220px] rounded-xl overflow-hidden border border-[hsl(var(--spark-border))] bg-white shadow-elevated">
                  <div className="magic-widget-header">
                    <div className="magic-widget-avatar">✦</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold leading-tight">Your Assistant</div>
                      <div className="text-[9px] opacity-80">Online · chat & voice</div>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="p-2.5 flex flex-col gap-2">
                    <div className="magic-bubble-user">How much does it cost?</div>
                    <div className="magic-bubble-bot">
                      We have plans from $49/mo. Want me to open Pricing?
                    </div>
                    <div className="magic-chip-row">
                      <span className="magic-chip">Pricing</span>
                      <span className="magic-chip">Book a demo</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1 border-t border-[hsl(var(--spark-border))]">
                      <Mic className="h-3 w-3 text-[var(--spark)]" />
                      <span className="text-[9px] spark-text-muted">Tap to speak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3 — Embed */}
          <article className="magic-card reveal rd3">
            <div className="magic-card-accent" />
            <div className="magic-card-body">
              <span className="magic-step">Step 03</span>
              <div className="flex items-start gap-3">
                <div className="magic-icon">
                  <Code2 className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-[15px] font-semibold spark-text-primary mb-1">
                    One script tag. Any site.
                  </h3>
                  <p className="text-[13px] leading-relaxed spark-text-muted">
                    Next.js, Webflow, Framer, WordPress — paste before{' '}
                    <code className="text-[11px] px-1 py-0.5 rounded spark-chip">&lt;/body&gt;</code>.
                  </p>
                </div>
              </div>

              <div className="magic-preview">
                <div className="magic-window-bar">
                  <div className="magic-window-dots">
                    <span /><span /><span />
                  </div>
                  <span className="text-[10px] font-mono spark-text-muted">embed-snippet.html</span>
                </div>
                <div className="magic-code-block">
                  {CODE_LINES.map((line, i) => (
                    <div key={i} className={`magic-code-line ${line.cls}`}>{line.text}</div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
