import { Sparkles } from 'lucide-react'

const LINKS = [
  {
    group: 'Product',
    items: [
      { label: 'How it works', href: '/spark#how-it-works' },
      { label: 'Platform', href: '/spark#platform' },
      { label: 'Use cases', href: '/spark#use-cases' },
      { label: 'Integration', href: '/spark#integration' },
      { label: 'Pricing', href: '/spark#pricing' },
      { label: 'FAQ', href: '/spark#faq' },
    ],
  },
  {
    group: 'Company',
    items: [
      { label: 'Helllo.ai', href: 'https://helllo.ai' },
      { label: 'Blog', href: 'https://helllo.ai/blog' },
      { label: 'Docs', href: 'https://docs.helllo.ai' },
    ],
  },
  {
    group: 'Legal',
    items: [
      { label: 'Privacy', href: 'https://helllo.ai/privacy' },
      { label: 'Terms', href: 'https://helllo.ai/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-[hsl(var(--spark-border))] pb-8 pt-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-10 md:flex-row">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-spark shadow-spark">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-[15px] font-semibold spark-text-primary">Spark</span>
                <span className="ml-1.5 text-[11px] spark-text-subtle">by Helllo.ai</span>
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
                <div className="mb-4 text-[11.5px] font-semibold uppercase tracking-widest spark-text-subtle">
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

        {/* Ghost wordmark */}
        <div className="flex justify-center overflow-hidden" aria-hidden="true">
          <span className="footer-ghost-word -mb-3 sm:-mb-6">helllo.ai</span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[hsl(var(--spark-border))] pt-6 sm:flex-row">
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
