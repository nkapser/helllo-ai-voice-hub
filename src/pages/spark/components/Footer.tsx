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
      className="relative pt-6 pb-8 border-t border-[hsl(var(--spark-border))]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-spark shadow-spark"
              >
                <Sparkles className="w-4 h-4 text-white" strokeWidth={1.8} />
              </div>
              <div>
                <span className="font-semibold spark-text-primary text-[15px]">Spark</span>
                <span className="text-[11px] ml-1.5 spark-text-subtle">by Helllo.ai</span>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed spark-text-muted">
              Give your website a voice. Paste your URL, train on your content, embed one script tag.
            </p>
            <p className="mt-3 text-[12px] spark-text-subtle">
              Built by{' '}
              <a
                href="https://perceptorylabs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--spark-ember)] hover:underline"
              >
                Perceptory Labs
              </a>
            </p>
          </div>

          {/* Link groups */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {LINKS.map(({ group, items }) => (
              <div key={group}>
                <div className="text-[11.5px] uppercase tracking-widest font-semibold mb-4 spark-text-subtle">
                  {group}
                </div>
                <div className="flex flex-col gap-2.5">
                  {items.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="text-[13.5px] spark-text-muted transition-colors duration-150 hover:text-[hsl(215_28%_17%)]"
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
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[hsl(var(--spark-border))]"
        >
          <span className="text-[12.5px] spark-text-subtle">
            © 2026 Helllo.ai — All rights reserved.
          </span>
          <a
            href="https://helllo.ai"
            className="text-[12.5px] spark-text-subtle transition-colors duration-150 hover:text-[hsl(215_28%_17%)]"
          >
            helllo.ai ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
