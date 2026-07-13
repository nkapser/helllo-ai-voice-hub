import type { ReactNode } from 'react'
import {
  Globe,
  FileText,
  MessageSquareText,
  ListChecks,
  Rss,
  CheckCircle2,
  CalendarCheck,
  UserPlus,
  Sparkles,
} from 'lucide-react'

/* ── Step mockups ─────────────────────────────────────────────── */

function ScanMockup() {
  return (
    <div className="step-shell">
      <div className="magic-window-bar">
        <div className="magic-window-dots">
          <span /><span /><span />
        </div>
        <div className="magic-url-bar">
          <Globe className="h-2.5 w-2.5" />
          yourbusiness.com
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-medium spark-text-primary">Reading your website…</span>
          <span className="spark-text-subtle">42 pages found</span>
        </div>
        <div className="magic-progress-track">
          <div className="magic-progress-fill" />
        </div>
        <div className="mt-1 flex flex-col gap-2">
          {[
            'Learning your services & prices',
            'Picking up hours, policies & FAQs',
            'Building your assistant',
          ].map((label) => (
            <div key={label} className="magic-scan-step">
              <span className="magic-scan-step-icon">
                <CheckCircle2 className="h-3 w-3" />
              </span>
              <span className="spark-text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrainMockup() {
  const sources = [
    { icon: Globe, label: 'Website', meta: '42 pages crawled' },
    { icon: FileText, label: 'Files', meta: '3 PDFs, 1 price list' },
    { icon: MessageSquareText, label: 'Q&A pairs', meta: '26 pairs' },
    { icon: Rss, label: 'Sitemap & feeds', meta: '2 entries' },
  ]
  return (
    <div className="step-shell">
      <div className="flex items-center justify-between border-b border-[hsl(var(--spark-border)/0.7)] px-4 py-2.5">
        <span className="text-[11px] font-semibold spark-text-primary">Training sources</span>
        <span className="spark-badge-pill rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide">
          Synced
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {sources.map(({ icon: Icon, label, meta }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid hsl(var(--spark-border))' }}
          >
            <span className="magic-icon" style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.5rem' }}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="flex-1 text-[11.5px] font-medium spark-text-primary">{label}</span>
            <span className="text-[10.5px] spark-text-subtle">{meta}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmbedMockup() {
  return (
    <div className="step-shell">
      <div className="magic-window-bar">
        <div className="magic-window-dots">
          <span /><span /><span />
        </div>
        <span className="text-[10px] spark-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>
          index.html
        </span>
      </div>
      <div className="magic-code-block">
        <div className="magic-code-line">
          <span className="tok-comment">&lt;!-- Paste before &lt;/body&gt; — that's it --&gt;</span>
        </div>
        <div className="magic-code-line">
          <span className="tok-punctuation">&lt;</span>
          <span className="tok-tag">script</span>{' '}
          <span className="tok-attr">src</span>
          <span className="tok-punctuation">=</span>
          <span className="tok-string">"https://spark.helllo.ai/widget.js"</span>
        </div>
        <div className="magic-code-line">
          {'  '}
          <span className="tok-attr">data-site</span>
          <span className="tok-punctuation">=</span>
          <span className="tok-string">"yourbusiness.com"</span>
          <span className="tok-punctuation">&gt;&lt;/</span>
          <span className="tok-tag">script</span>
          <span className="tok-punctuation">&gt;</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 px-4 pb-4">
        <span className="text-[10.5px] spark-text-subtle">Live on your site</span>
        <span className="widget-pulse flex h-9 w-9 items-center justify-center rounded-full bg-gradient-spark text-white shadow-spark">
          <Sparkles className="h-4 w-4" />
        </span>
      </div>
    </div>
  )
}

function OutcomesMockup() {
  const rows = [
    { icon: CalendarCheck, title: 'Demo booked — Thu 2:00 pm', meta: 'sarah@northloop.co', tone: 'ok' },
    { icon: UserPlus, title: 'Lead captured', meta: 'mike@grovefit.com', tone: 'ok' },
    { icon: MessageSquareText, title: '"Do you ship to Canada?"', meta: 'Answered · 11:42 pm', tone: '' },
    { icon: MessageSquareText, title: '"Where are your prices?"', meta: 'Guided to /pricing', tone: '' },
  ]
  return (
    <div className="step-shell">
      <div className="flex items-center justify-between border-b border-[hsl(var(--spark-border)/0.7)] px-4 py-2.5">
        <span className="text-[11px] font-semibold spark-text-primary">Last night, while you slept</span>
        <span className="text-[10px] spark-text-subtle">4 conversations</span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {rows.map(({ icon: Icon, title, meta, tone }) => (
          <div
            key={title}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid hsl(var(--spark-border))' }}
          >
            <span
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
              style={
                tone === 'ok'
                  ? { background: 'var(--spark-success-muted)', color: '#047857' }
                  : { background: 'rgba(96,165,250,0.12)', color: 'var(--spark-ember)' }
              }
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="flex-1 truncate text-[11.5px] font-medium spark-text-primary">{title}</span>
            <span className="text-[10px] spark-text-subtle">{meta}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Steps ────────────────────────────────────────────────────── */

type Step = {
  num: string
  title: string
  body: string
  demo: ReactNode
}

const STEPS: Step[] = [
  {
    num: '1',
    title: 'Paste your URL',
    body: 'Spark reads your pages and builds an assistant that knows your business — services, prices, hours, policies. No setup wizard, no code, no copy-pasting content.',
    demo: <ScanMockup />,
  },
  {
    num: '2',
    title: 'Teach it the rest',
    body: "Add PDFs, price lists and Q&A pairs for anything your site doesn't say. When things change, retrain in one click — your assistant never falls behind.",
    demo: <TrainMockup />,
  },
  {
    num: '3',
    title: 'Embed with one line',
    body: 'Drop a single script tag in your footer — or paste it into WordPress, Wix, Webflow or Shopify settings. The widget is live the moment you save.',
    demo: <EmbedMockup />,
  },
  {
    num: '4',
    title: 'Watch visits become leads',
    body: 'Spark answers questions by voice or chat, walks visitors to the right page, books meetings and captures contact details — around the clock, in any language.',
    demo: <OutcomesMockup />,
  },
]

/* ── Section ──────────────────────────────────────────────────── */

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="spark-section relative scroll-mt-4">
      <div className="glow-divider" />

      <SectionIntro />

      <div className="flex flex-col">
        {STEPS.map((step, i) => (
          <div key={step.num} className={`step-row reveal rd${Math.min(i + 1, 3)}`}>
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <span className="step-num">{step.num} / 4</span>
              <h3 className="mb-2.5 font-display text-xl font-semibold leading-snug tracking-tight spark-text-primary lg:text-2xl">
                {step.title}
              </h3>
              <p className="max-w-md text-[14.5px] leading-relaxed spark-text-muted">{step.body}</p>
            </div>
            <div className={`mx-auto w-full max-w-md ${i % 2 === 1 ? 'md:order-1 md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
              {step.demo}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionIntro() {
  return (
    <div className="reveal mb-2">
      <div className="section-eyebrow">
        <span className="section-eyebrow-idx">[01]</span>
        <span className="section-eyebrow-label">How it works</span>
      </div>
      <h2 className="section-duo-head spark-text-primary">
        Don't just add a chatbot. Put your website to work.{' '}
        <span className="duo-muted">
          Spark learns your site once, then answers, guides and books for every visitor — day and night.
        </span>
      </h2>
    </div>
  )
}
