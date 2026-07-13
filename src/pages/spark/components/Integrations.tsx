import { Code2, Inbox, CalendarClock } from 'lucide-react'
import SectionHeader from './SectionHeader'

const EMBED_PLATFORMS = [
  'WordPress', 'Shopify', 'Wix', 'Squarespace', 'Webflow',
  'Framer', 'GoDaddy', 'Weebly', 'Next.js', 'Static sites',
]

const HANDOFF_CHANNELS = [
  'Gmail', 'Outlook', 'Zendesk', 'Freshdesk', 'Intercom',
  'Help Scout', 'HubSpot', 'Zoho Desk',
]

const SYNC_TOOLS = [
  'Google Calendar', 'Calendly', 'Cal.com', 'HubSpot', 'Pipedrive', 'Zoho CRM',
]

function ChipWall({ chips, featured }: { chips: string[]; featured: string }) {
  return (
    <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
      {chips.map((chip) => (
        <span key={chip} className="int-chip">{chip}</span>
      ))}
      <span className="int-chip is-featured">{featured}</span>
    </div>
  )
}

export default function Integrations() {
  const cards = [
    {
      icon: Code2,
      title: 'Embed on any website',
      body: 'Add the floating voice-and-chat widget with a single line of code — whatever your site is built on, whoever built it.',
      chips: EMBED_PLATFORMS,
      featured: 'Any website',
    },
    {
      icon: Inbox,
      title: 'Hand off to a human when it matters',
      body: 'When a question truly needs you, Spark escalates to your inbox or helpdesk with the full conversation attached — fewer tickets, never a dead end.',
      chips: HANDOFF_CHANNELS,
      featured: 'Any inbox',
    },
    {
      icon: CalendarClock,
      title: 'Syncs with your calendar & CRM',
      body: 'Real availability, real bookings, and every captured lead pushed to where your team already works.',
      chips: SYNC_TOOLS,
      featured: 'More coming',
    },
  ]

  return (
    <section id="integration" className="spark-section relative scroll-mt-4">
      <div className="glow-divider" />

      <SectionHeader
        index="04"
        label="Integration"
        title="Drops into the site you already have."
        sub="One script tag. No developers, no migration, no new tools to learn."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, body, chips, featured }, i) => (
          <div key={title} className={`int-card reveal rd${i + 1}`}>
            <div className="feature-grid-icon">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="mb-1.5 font-display text-[16px] font-semibold leading-snug spark-text-primary">
              {title}
            </h3>
            <p className="text-[13px] leading-relaxed spark-text-muted">{body}</p>
            <ChipWall chips={chips} featured={featured} />
          </div>
        ))}
      </div>
    </section>
  )
}
