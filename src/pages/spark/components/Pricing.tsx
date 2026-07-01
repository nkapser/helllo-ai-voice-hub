import {
  Check,
  Sparkles,
  Coins,
  FileSearch,
  Mic,
  MessageSquare,
  Plug,
  AudioLines,
  Building2,
} from 'lucide-react'
import { getDashboardAuthSignInUrl } from '@/lib/dashboard'

const SPARK_SIGNIN_URL = getDashboardAuthSignInUrl('/console/spark')
const ENTERPRISE_URL = 'mailto:hello@helllo.ai?subject=Spark%20Enterprise%20inquiry'

const FREE_STATS = [
  { icon: Coins, value: '500', label: 'credits included' },
  { icon: FileSearch, value: '10', label: 'pages to crawl' },
  { icon: Mic, value: '30 min', label: 'voice conversations' },
  { icon: MessageSquare, value: '100', label: 'chat conversations' },
]

const ENTERPRISE_FEATURES = [
  {
    icon: Plug,
    value: 'Custom integrations',
    label: 'CRM, data warehouse, internal tools & bespoke workflows',
  },
  {
    icon: AudioLines,
    value: 'Premium voices',
    label: 'Brand-matched voice quality, languages & deployment options',
  },
]

interface PlanFeature {
  text: string
  highlighted?: boolean
}

interface Plan {
  name: string
  price: string
  period: string
  tagline: string
  cta: string
  featured?: boolean
  features: PlanFeature[]
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    tagline: 'Best for a single marketing site',
    cta: 'Start Starter',
    features: [
      { text: 'Voice: 16 credits/min (~300 mins/mo)', highlighted: true },
      { text: 'Chat: 6 credits/conversation (~800/mo)' },
      { text: '3 concurrent voice conversations' },
      { text: 'Up to 1,000 pages' },
      { text: 'Google Calendar & Calendly' },
      { text: 'Chat + voice widget' },
      { text: 'Guided navigation' },
    ],
  },
  {
    name: 'Growth',
    price: '$99',
    period: '/month',
    tagline: 'Best for growing businesses',
    cta: 'Get Growth',
    featured: true,
    features: [
      { text: 'Voice: 12 credits/min (~800 mins/mo)', highlighted: true },
      { text: 'Chat: 5 credits/conversation (~2,000/mo)' },
      { text: '5 concurrent voice conversations' },
      { text: 'Up to 2,000 pages' },
      { text: 'Google Calendar, Calendly & Cal.com' },
      { text: 'CRM integrations (Shopify)', highlighted: true },
      { text: 'File uploads (FAQ, PDF)' },
    ],
  },
  {
    name: 'Scale',
    price: '$299',
    period: '/month',
    tagline: 'Best for high-traffic sites & agencies',
    cta: 'Get Scale',
    features: [
      { text: 'Voice: 10 credits/min (~3,000 mins/mo)', highlighted: true },
      { text: 'Chat: 3 credits/conversation (~10,000/mo)' },
      { text: '10 concurrent voice conversations' },
      { text: 'Up to 6,000 pages' },
      { text: 'Google Calendar, Calendly & Cal.com' },
      { text: 'Custom integrations', highlighted: true },
      { text: 'Priority support' },
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="spark-section relative">
      <div className="glow-divider" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 300,
            background: 'radial-gradient(ellipse, rgba(96,165,250,0.1) 0%, transparent 70%)',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-8 reveal">
          <span className="inline-block text-[12px] uppercase tracking-widest mb-4 font-medium text-[var(--spark-ember)]">
            Pricing
          </span>
          <h2
            className="mb-3 font-display text-[clamp(2rem,4vw,3rem)] tracking-tight spark-text-primary"
          >
            Simple plans.{' '}
            <em className="gradient-text not-italic">Clear limits.</em>
          </h2>
          <p className="text-[14px] spark-text-muted max-w-lg mx-auto">
            Credits translate to real usage — minutes of voice and chat conversations.
            India: INR via Razorpay · International: USD via Stripe
          </p>
        </div>

        <div className="pricing-bands reveal rd1">
          <article className="pricing-band pricing-band-free">
            <div className="pricing-band-identity">
              <span className="pricing-band-badge pricing-band-badge-free">Free forever</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-[2rem] font-bold leading-none spark-text-primary">$0</span>
                <span className="text-[12px] spark-text-subtle">/ forever</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-snug spark-text-muted">
                Try Spark on your site — no credit card, no expiry.
              </p>
            </div>

            <div className="pricing-band-divider" aria-hidden />

            <div className="pricing-band-stats">
              {FREE_STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="pricing-band-stat">
                  <div className="pricing-band-stat-icon pricing-band-stat-icon-free">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <div className="pricing-band-stat-value">{value}</div>
                    <div className="pricing-band-stat-label">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pricing-band-cta-wrap">
              <a href={SPARK_SIGNIN_URL} className="pricing-band-cta pricing-band-cta-free">
                Start free
              </a>
            </div>
          </article>
        </div>

        <p className="pricing-paid-label reveal">Monthly plans</p>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map(({ name, price, period, tagline, cta, featured, features }, i) => (
            <div
              key={name}
              className={`reveal rd${i + 1} rounded-2xl p-6 flex flex-col gap-5 relative ${featured ? 'pricing-featured glass' : 'glass'}`}
              style={
                featured
                  ? {
                      background: 'rgba(96,165,250,0.08)',
                      border: '1px solid rgba(96,165,250,0.35)',
                    }
                  : undefined
              }
            >
              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-white whitespace-nowrap bg-gradient-spark">
                    <Sparkles className="w-3 h-3" />
                    Most popular
                  </div>
                </div>
              )}

              <div>
                <div
                  className={`text-[12.5px] font-semibold mb-1 ${featured ? 'text-[var(--spark-ember)]' : 'spark-text-muted'}`}
                >
                  {name}
                </div>
                <p className="text-[12px] spark-text-subtle mb-3">{tagline}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold spark-text-primary font-display">
                    {price}
                  </span>
                  <span className="text-[13px] spark-text-subtle">{period}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {features.map(({ text, highlighted }) => (
                  <div key={text} className="flex items-start gap-2">
                    <Check
                      className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${highlighted ? '' : 'spark-text-subtle'}`}
                      style={highlighted ? { color: 'var(--spark)' } : undefined}
                    />
                    <span
                      className={`text-[12.5px] leading-snug ${highlighted ? 'spark-text-primary font-medium' : 'spark-text-muted'}`}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={SPARK_SIGNIN_URL}
                className={`block text-center py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${featured ? 'btn-spark text-white' : 'spark-btn-secondary'}`}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        <article className="pricing-band pricing-band-enterprise reveal mt-5">
          <div className="pricing-band-identity">
            <span className="pricing-band-badge pricing-band-badge-enterprise">
              <Building2 className="h-3 w-3" strokeWidth={2.2} />
              Enterprise
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[1.65rem] font-bold leading-none spark-text-primary">
                Custom
              </span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-snug spark-text-muted">
              For high-volume sites, agencies & regulated teams.
            </p>
          </div>

          <div className="pricing-band-divider" aria-hidden />

          <div className="pricing-band-stats pricing-band-stats-enterprise">
            {ENTERPRISE_FEATURES.map(({ icon: Icon, value, label }) => (
              <div key={value} className="pricing-band-stat">
                <div className="pricing-band-stat-icon pricing-band-stat-icon-enterprise">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <div className="pricing-band-stat-value">{value}</div>
                  <div className="pricing-band-stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pricing-band-cta-wrap">
            <a href={ENTERPRISE_URL} className="pricing-band-cta pricing-band-cta-enterprise">
              Talk to sales
            </a>
          </div>
        </article>

        <p className="reveal text-center mt-6 text-[13px] spark-text-muted">
          Start on Free forever, upgrade when you need more. Paste your URL to get started.
        </p>

        <div className="text-center mt-8 reveal">
          <a
            href="/spark#hero-input"
            className="btn-spark inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-white text-sm"
          >
            Try free — paste your URL
          </a>
        </div>
      </div>
    </section>
  )
}
