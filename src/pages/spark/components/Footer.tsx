import { Sparkles } from 'lucide-react'

const LINKS = [
  {
    group: 'Product',
    items: [
      { label: 'Spark',    href: '/spark' },
      { label: 'Pricing',  href: '/spark#pricing' },
      { label: 'Docs',     href: 'https://docs.helllo.ai' },
    ],
  },
  {
    group: 'Company',
    items: [
      { label: 'Helllo.ai', href: 'https://helllo.ai' },
      { label: 'Blog',      href: 'https://helllo.ai/blog' },
    ],
  },
  {
    group: 'Legal',
    items: [
      { label: 'Privacy', href: 'https://helllo.ai/privacy' },
      { label: 'Terms',   href: 'https://helllo.ai/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-10"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#7c5cff,#22d3ee)' }}
              >
                <Sparkles className="w-4 h-4 text-white" strokeWidth={1.8} />
              </div>
              <div>
                <span className="font-semibold text-white text-[15px]">Spark</span>
                <span className="text-[11px] ml-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>by Helllo.ai</span>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Give your website a voice. Paste your URL, train on your content, embed one script tag.
            </p>
          </div>

          {/* Link groups */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {LINKS.map(({ group, items }) => (
              <div key={group}>
                <div className="text-[11.5px] uppercase tracking-widest font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {group}
                </div>
                <div className="flex flex-col gap-2.5">
                  {items.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="text-[13.5px] transition-colors duration-150"
                      style={{ color: 'rgba(255,255,255,0.48)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.48)')}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
            © 2026 Helllo.ai — All rights reserved.
          </span>
          <a
            href="https://helllo.ai"
            className="text-[12.5px] transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.28)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
          >
            helllo.ai ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
