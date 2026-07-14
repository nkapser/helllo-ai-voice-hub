import { ShieldCheck, CreditCard, X } from 'lucide-react'
import URLInput from './URLInput'
import SparkLogo from './SparkLogo'

export default function FinalCTA() {
  return (
    <section className="spark-section spark-section-cta relative overflow-hidden">
      <div className="glow-divider" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="section-eyebrow reveal justify-center">
          <span className="section-eyebrow-idx">[06]</span>
          <span className="section-eyebrow-label">Start</span>
        </div>

        <h2
          className="reveal mb-4 leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Try Spark for free.
        </h2>

        <p className="reveal rd1 mb-8 text-[17px] spark-text-muted">
          Paste your URL and meet your website&apos;s new AI assistant in 30 seconds.
        </p>

        <div className="reveal rd2 mx-auto mb-6 max-w-xl">
          <URLInput id="final-cta-input" showTrustRow={false} />
        </div>

        <div className="reveal rd3 flex flex-wrap items-center justify-center gap-5">
          {[
            { icon: CreditCard, text: 'No credit card' },
            { icon: ShieldCheck, text: 'Free credits included' },
            { icon: X, text: 'Cancel anytime' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 flex-shrink-0 spark-text-subtle" />
              <span className="text-[12.5px] spark-text-subtle">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand band */}
      <div className="cta-brand-band reveal rd4">
        <div className="flex flex-col items-center gap-2 px-6 pb-2 pt-10 sm:pt-12">
          <SparkLogo size={52} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--spark-ember)' }}>
            by Helllo.ai
          </span>
        </div>
        <div className="flex justify-center overflow-hidden px-4">
          <span className="cta-brand-word -mb-4 sm:-mb-7" aria-hidden="true">
            Spark
          </span>
        </div>
      </div>
    </section>
  )
}
