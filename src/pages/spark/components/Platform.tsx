import {
  BookOpenCheck,
  Mic,
  Navigation,
  CalendarCheck,
  Users,
  ShieldCheck,
  Activity,
  Languages,
  Palette,
  Bot,
  Database,
  MessagesSquare,
  BarChart3,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'

type Feature = {
  icon: LucideIcon
  title: string
  body: string
  isNew?: boolean
}

const FEATURES: Feature[] = [
  {
    icon: BookOpenCheck,
    title: 'Trained on your site',
    body: 'Answers are grounded in pages you approve and files you upload — never the open internet. If Spark doesn\'t know, it says so.',
  },
  {
    icon: Mic,
    title: 'Voice + chat in one widget',
    body: 'Visitors type or tap the mic and just talk. Browser-native on every device — no app, no phone system, nothing to install.',
    isNew: true,
  },
  {
    icon: Navigation,
    title: 'Guided navigation',
    body: 'Ask "show me your prices" and Spark opens the page mid-conversation, then keeps chatting once the visitor lands.',
  },
  {
    icon: CalendarCheck,
    title: 'Meeting booking built in',
    body: 'Connect Google Calendar, Calendly or Cal.com. Spark offers real open slots and books them — no back-and-forth emails.',
  },
  {
    icon: Users,
    title: 'Lightweight lead CRM',
    body: 'Every conversation, contact and booking lives in one searchable dashboard, ready to export or push to your CRM.',
  },
  {
    icon: ShieldCheck,
    title: 'Answer control & guardrails',
    body: 'Don\'t like how a question was answered? Revise it once and Spark says the right thing every time after.',
  },
  {
    icon: Activity,
    title: 'Live monitoring & analytics',
    body: 'Watch conversations as they happen and learn what visitors ask most — your website finally talks back to you.',
  },
  {
    icon: Languages,
    title: 'Speaks your customer\'s language',
    body: 'Spark detects the visitor\'s language and answers in it automatically — 50+ languages out of the box.',
  },
  {
    icon: Palette,
    title: 'Your brand, your look',
    body: 'Match colors, avatar, tone and welcome screen to your site in a couple of clicks. It feels like yours, because it is.',
  },
]

/* ── Studio mockup ────────────────────────────────────────────── */

function StudioMockup() {
  const nav = [
    { icon: Bot, label: 'Assistant', active: true },
    { icon: Database, label: 'Training' },
    { icon: MessagesSquare, label: 'Conversations' },
    { icon: BarChart3, label: 'Analytics' },
  ]
  return (
    <div className="platform-mock reveal rd1 mb-12 sm:mb-14">
      <div className="flex items-center gap-2 border-b border-[hsl(var(--spark-border)/0.7)] px-4 py-2.5">
        <div className="magic-window-dots">
          <span /><span /><span />
        </div>
        <span className="ml-2 text-[10.5px] font-medium spark-text-subtle" style={{ fontFamily: 'var(--font-mono)' }}>
          spark.helllo.ai/studio
        </span>
      </div>

      <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
        {/* Sidebar */}
        <div className="platform-mock-side hidden flex-col gap-1 p-3 md:flex">
          <div className="mb-2 flex items-center gap-2 px-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-spark text-white">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="text-[11.5px] font-semibold spark-text-primary">Spark Studio</span>
          </div>
          {nav.map(({ icon: Icon, label, active }) => (
            <div key={label} className={`platform-mock-nav-item ${active ? 'is-active' : ''}`}>
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] spark-text-subtle">
              Personality
            </div>
            <div
              className="rounded-lg px-3 py-2.5 text-[11px] leading-relaxed spark-text-muted"
              style={{ background: 'rgba(248,250,252,0.9)', border: '1px solid hsl(var(--spark-border))', fontFamily: 'var(--font-mono)' }}
            >
              Friendly and concise. Answer from the training data only. When a visitor is ready to
              talk, offer an open slot from the calendar.
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="platform-toggle">
              Ask for contact details before answering
              <span className="platform-toggle-pill" />
            </div>
            <div className="platform-toggle">
              Offer to book a meeting
              <span className="platform-toggle-pill" />
            </div>
            <div className="platform-toggle">
              Voice replies
              <span className="platform-toggle-pill" />
            </div>
            <div className="platform-toggle">
              Show welcome screen on new chats
              <span className="platform-toggle-pill is-off" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.25)' }}>
            <span className="text-[11px] spark-text-muted">
              Trained on <span className="font-semibold spark-text-primary">yourbusiness.com</span> · 42 pages, 3 files
            </span>
            <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white bg-gradient-spark">
              Publish
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Section ──────────────────────────────────────────────────── */

export default function Platform() {
  return (
    <section id="platform" className="spark-section relative scroll-mt-4">
      <div className="glow-divider" />

      <SectionHeader
        index="02"
        label="Platform"
        title="Your best employee, hired in an afternoon."
        sub="Shape the exact experience visitors get — tone, look, languages and rules. No coding required."
      />

      <StudioMockup />

      <div className="feature-grid reveal rd2">
        {FEATURES.map(({ icon: Icon, title, body, isNew }) => (
          <div key={title} className="feature-grid-card">
            <div className="feature-grid-icon">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="mb-1.5 font-display text-[15px] font-semibold spark-text-primary">
              {title}
              {isNew && <span className="feature-grid-new">New</span>}
            </h3>
            <p className="text-[13px] leading-relaxed spark-text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
