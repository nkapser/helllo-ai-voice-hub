import { Check, Sparkles } from 'lucide-react'

interface PlanFeature {
  text: string
  highlighted?: boolean
}

interface Plan {
  name:      string
  price:     string
  period:    string
  sites?:    string
  pages:     string
  credits:   string
  cta:       string
  ctaHref:   string
  featured?: boolean
  features:  PlanFeature[]
}

const PLANS: Plan[] = [
  {
    name:    'Free',
    price:   '$0',
    period:  'forever',
    sites:   '3 domains',
    pages:   '10 pages per crawl',
    credits: 'Trial credits included',
    cta:     'Start free',
    ctaHref: 'https://app.helllo.ai/auth/signin?redirect=/console/spark',
    features: [
      { text: '3 domains' },
      { text: '10 pages per crawl' },
      { text: 'Trial credits' },
      { text: 'Chat + voice widget' },
      { text: 'Guided navigation' },
    ],
  },
  {
    name:    'Starter',
    price:   '$50',
    period:  '/month',
    pages:   'Full site training',
    credits: '5,000 credits/mo',
    cta:     'Start Starter',
    ctaHref: 'https://app.helllo.ai/auth/signin?redirect=/console/spark',
    features: [
      { text: 'Full site training', highlighted: true },
      { text: '5,000 credits/mo' },
      { text: 'Chat + voice widget' },
      { text: 'Guided navigation' },
      { text: 'File uploads (FAQ, PDF)' },
    ],
  },
  {
    name:    'Growth',
    price:   '$299',
    period:  '/month',
    pages:   'Full site training',
    credits: '29,900 credits/mo',
    cta:     'Get Growth',
    ctaHref: 'https://app.helllo.ai/auth/signin?redirect=/console/spark',
    featured: true,
    features: [
      { text: 'Full site training', highlighted: true },
      { text: '29,900 credits/mo', highlighted: true },
      { text: 'Chat + voice widget' },
      { text: 'Guided navigation' },
      { text: 'File uploads (FAQ, PDF)' },
      { text: 'Booking / Calendly integration' },
    ],
  },
  {
    name:    'Scale',
    price:   '$499',
    period:  '/month',
    pages:   'Full site training',
    credits: '49,900 credits/mo',
    cta:     'Get Scale',
    ctaHref: 'https://app.helllo.ai/auth/signin?redirect=/console/spark',
    features: [
      { text: 'Full site training', highlighted: true },
      { text: '49,900 credits/mo', highlighted: true },
      { text: 'Chat + voice widget' },
      { text: 'Guided navigation' },
      { text: 'File uploads (FAQ, PDF)' },
      { text: 'Booking / Calendly integration' },
      { text: 'Priority support' },
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="glow-divider" />

      {/* Aurora accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{
            position: 'absolute',
            width: 500, height: 300,
            background: 'radial-gradient(ellipse, rgba(124,92,255,0.1) 0%, transparent 70%)',
            top: '10%', left: '50%', transform: 'translateX(-50%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 mt-24">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block text-[12px] uppercase tracking-widest mb-4 font-medium" style={{ color: 'rgba(124,92,255,0.8)' }}>
            Pricing
          </span>
          <h2
            className="mb-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}
          >
            Start free. Scale when{' '}
            <em className="gradient-text not-italic">your site grows.</em>
          </h2>
          <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
            India: INR pricing via Razorpay · International: USD via Stripe
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map(({ name, price, period, pages, credits, cta, ctaHref, featured, features }, i) => (
            <div
              key={name}
              className={`reveal rd${i + 1} rounded-2xl p-6 flex flex-col gap-5 relative ${featured ? 'pricing-featured' : 'glass'}`}
              style={featured ? {
                background: 'rgba(124,92,255,0.1)',
                border: '1px solid rgba(124,92,255,0.35)',
              } : undefined}
            >
              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold text-white whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg,#7c5cff,#22d3ee)' }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Most popular
                  </div>
                </div>
              )}

              {/* Plan name + price */}
              <div>
                <div className="text-[12.5px] font-semibold mb-3" style={{ color: featured ? '#9d82ff' : 'rgba(255,255,255,0.5)' }}>
                  {name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {price}
                  </span>
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {period}
                  </span>
                </div>
              </div>

              {/* Key specs */}
              <div className="text-[12.5px] flex flex-col gap-1.5">
                <div style={{ color: 'rgba(255,255,255,0.6)' }}>{pages}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)' }}>{credits}</div>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-2 flex-1">
                {features.map(({ text, highlighted }) => (
                  <div key={text} className="flex items-start gap-2">
                    <Check
                      className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                      style={{ color: highlighted ? '#22d3ee' : 'rgba(255,255,255,0.35)' }}
                    />
                    <span
                      className="text-[12.5px]"
                      style={{ color: highlighted ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)' }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={ctaHref}
                className={`block text-center py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${featured ? 'btn-spark text-white' : ''}`}
                style={!featured ? {
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                } : undefined}
                onMouseEnter={!featured ? e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                } : undefined}
                onMouseLeave={!featured ? e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                } : undefined}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 reveal">
          <a
            href="/spark#hero-input"
            className="btn-spark inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-white text-sm"
          >
            Start free — paste your URL
          </a>
        </div>
      </div>
    </section>
  )
}
