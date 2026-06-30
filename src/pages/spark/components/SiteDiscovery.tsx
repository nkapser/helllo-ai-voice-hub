import { Check, Globe, ArrowRight } from 'lucide-react'

const PAGES = [
  { path: '/',          label: 'Home',        checked: true },
  { path: '/pricing',   label: 'Pricing',     checked: true },
  { path: '/faq',       label: 'FAQ',         checked: true },
  { path: '/contact',   label: 'Contact',     checked: true },
  { path: '/blog',      label: 'Blog',        checked: true },
  { path: '/about',     label: 'About',       checked: true },
  { path: '/docs',      label: 'Docs',        checked: false },
  { path: '/changelog', label: 'Changelog',   checked: false },
]

const EXTRA = 39

export default function SiteDiscovery() {
  return (
    <section className="relative py-24">
      <div className="glow-divider" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-24">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* ── Left: text ── */}
          <div className="flex-1 reveal">
            <span
              className="inline-block text-[12px] uppercase tracking-widest mb-4 font-medium"
              style={{ color: 'rgba(124,92,255,0.8)' }}
            >
              Site-wide training
            </span>
            <h2
              className="mb-5"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              We found{' '}
              <em className="gradient-text not-italic">47 pages</em>
              {' '}on your site.
              <br />Your assistant can learn them all.
            </h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.52)' }}>
              Before we crawl, Spark maps your entire site — sitemap and links — so
              you see exactly what's trainable and approve every page.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                ['Free plan', '10 pages per crawl — perfect to get started'],
                ['Paid plans', 'Full-site training for richer, more accurate answers'],
              ].map(([tier, desc]) => (
                <div key={tier} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.4)' }}
                  >
                    <Check className="w-3 h-3" style={{ color: '#22d3ee' }} />
                  </div>
                  <div>
                    <span className="text-white text-[14px] font-medium">{tier} — </span>
                    <span className="text-[14px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Upgrade callout */}
            <div
              className="rounded-xl p-4 flex items-center justify-between gap-4"
              style={{ background: 'rgba(124,92,255,0.1)', border: '1px solid rgba(124,92,255,0.25)' }}
            >
              <div>
                <div className="text-white text-[13.5px] font-medium mb-0.5">Train on all 47 pages</div>
                <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Free plan covers 10. Upgrade for full-site training.
                </div>
              </div>
              <a
                href="https://app.helllo.ai/console/profile/billing"
                className="flex-shrink-0 flex items-center gap-1.5 text-[12.5px] font-medium px-4 py-2 rounded-lg text-white transition-all duration-150"
                style={{ background: 'rgba(124,92,255,0.3)', border: '1px solid rgba(124,92,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,92,255,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,92,255,0.3)' }}
              >
                See plans <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ── Right: page list ── */}
          <div className="w-full lg:w-80 reveal rd2">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
              >
                <Globe className="w-3.5 h-3.5" style={{ color: '#22d3ee' }} />
                <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  yourwebsite.com
                </span>
                <span
                  className="ml-auto text-[10.5px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}
                >
                  47 pages found
                </span>
              </div>

              <div className="py-2">
                {PAGES.map(({ path, label, checked }) => (
                  <div
                    key={path}
                    className="flex items-center gap-3 px-4 py-2.5 transition-all duration-150"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: checked ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${checked ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      {checked && <Check className="w-2.5 h-2.5" style={{ color: '#22d3ee' }} />}
                    </div>
                    <span className="text-[12px] flex-1" style={{ color: checked ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)' }}>
                      {path}
                    </span>
                    <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                      {label}
                    </span>
                  </div>
                ))}

                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-4 h-4 rounded flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    +{EXTRA} more pages
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
