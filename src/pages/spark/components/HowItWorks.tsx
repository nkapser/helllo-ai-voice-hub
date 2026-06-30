import { MousePointerClick, UserPlus, ShieldCheck, BookOpen, Rocket } from 'lucide-react'

const STEPS = [
  {
    num:   '01',
    icon:  MousePointerClick,
    label: 'Try it',
    body:  'Paste your URL → play with a homepage-trained assistant in 30 seconds. No signup required.',
    accent: 'var(--spark)',
    accentRgb: '96,165,250',
  },
  {
    num:   '02',
    icon:  UserPlus,
    label: 'Account',
    body:  'Create a free account to save your assistant and set up your domain.',
    accent: 'var(--spark-glow)',
    accentRgb: '147,197,253',
  },
  {
    num:   '03',
    icon:  ShieldCheck,
    label: 'Verify',
    body:  "Prove you own the domain with a DNS TXT record or HTML meta tag — so only you can train an assistant on your site.",
    accent: 'var(--spark-ember)',
    accentRgb: '59,130,246',
  },
  {
    num:   '04',
    icon:  BookOpen,
    label: 'Train',
    body:  "We map your full site, crawl up to 10 pages free. You see every page, approve what gets learned.",
    accent: 'var(--spark-glow)',
    accentRgb: '147,197,253',
  },
  {
    num:   '05',
    icon:  Rocket,
    label: 'Launch',
    body:  'Copy the embed snippet, paste it site-wide before </body>. Visitors chat on every page.',
    accent: 'var(--spark-ember)',
    accentRgb: '59,130,246',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="spark-section relative">
      <div className="glow-divider" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-8 reveal">
          <span
            className="inline-block text-[12px] uppercase tracking-widest mb-4 font-medium"
            style={{ color: 'var(--spark-ember)' }}
          >
            How it works
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            From URL to live assistant{' '}
            <em className="gradient-text not-italic">in minutes</em>
          </h2>
        </div>

        {/* Steps timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical connector line */}
          <div
            className="absolute left-[27px] top-10 bottom-10 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, rgba(96,165,250,0.5), rgba(59,130,246,0.5))' }}
          />

          {STEPS.map(({ num, icon: Icon, label, body, accent, accentRgb }, i) => (
            <div
              key={num}
              className={`reveal rd${i + 1} relative flex gap-5 sm:gap-8 items-start group`}
              style={{ paddingBottom: i < STEPS.length - 1 ? '2.5rem' : 0 }}
            >
              {/* Step indicator */}
              <div className="relative flex-shrink-0 z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: `rgba(${accentRgb},0.12)`,
                    border: `1px solid rgba(${accentRgb},0.25)`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
              </div>

              {/* Content */}
              <div className="pt-3 flex-1">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span
                    className="text-[11px] font-semibold tracking-widest uppercase"
                    style={{ color: accent }}
                  >
                    {num}
                  </span>
                  <h3 className="spark-text-primary font-semibold text-[15px]">{label}</h3>
                </div>
                <p className="text-[14px] leading-relaxed spark-text-muted">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 reveal">
          <a
            href="/spark#hero-input"
            className="btn-spark inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-white text-sm"
          >
            ✦ Spark my site
          </a>
        </div>
      </div>
    </section>
  )
}
