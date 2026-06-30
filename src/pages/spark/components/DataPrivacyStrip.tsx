import { Lock, ShieldCheck, Database, FileCheck } from 'lucide-react'

const PRIVACY_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Grounded in your content',
    body: 'Answers come from pages you approve — not the open web.',
  },
  {
    icon: Lock,
    title: 'Your data stays yours',
    body: 'Never used to train foundation models. You control what gets learned.',
  },
  {
    icon: Database,
    title: 'You approve every page',
    body: 'See exactly what Spark crawls before it goes live on your site.',
  },
  {
    icon: FileCheck,
    title: 'Privacy-first by design',
    body: 'Built for GDPR-conscious teams. Delete your data anytime.',
  },
]

export default function DataPrivacyStrip() {
  return (
    <section className="spark-section relative" aria-labelledby="privacy-strip-heading">
      <div className="glow-divider" />

      <div className="max-w-6xl mx-auto px-2 sm:px-0">
        <div className="text-center mb-8 reveal">
          <span className="inline-block text-[12px] uppercase tracking-widest mb-2 font-medium text-[var(--spark-ember)]">
            Trust & privacy
          </span>
          <h2
            id="privacy-strip-heading"
            className="font-display text-2xl sm:text-3xl tracking-tight spark-text-primary mb-2"
          >
            Safe for your site. Safe for your visitors.
          </h2>
          <p className="text-sm sm:text-base spark-text-muted max-w-xl mx-auto">
            Spark is built by{' '}
            <a
              href="https://perceptorylabs.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--spark-ember)] underline decoration-[var(--spark-glow)] underline-offset-2 hover:text-[var(--spark)]"
            >
              Perceptory Labs
            </a>
            {' '}— with the same rigor we apply to production AI systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 reveal rd1">
          {PRIVACY_POINTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass rounded-2xl p-4 text-left">
              <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--spark-accent))]">
                <Icon className="h-4 w-4 text-[var(--spark-ember)]" strokeWidth={2} />
              </div>
              <h3 className="font-display text-sm font-semibold spark-text-primary mb-1">
                {title}
              </h3>
              <p className="text-[13px] leading-relaxed spark-text-muted">{body}</p>
            </div>
          ))}
        </div>

        <p className="reveal rd2 mt-6 text-center text-[12.5px] spark-text-subtle">
          Read our{' '}
          <a href="/privacy" className="text-[var(--spark-ember)] hover:underline">
            Privacy Policy
          </a>
          {' '}for full details on data handling and retention.
        </p>
      </div>
    </section>
  )
}
