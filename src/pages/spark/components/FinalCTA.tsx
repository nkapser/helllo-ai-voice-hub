import { ShieldCheck, CreditCard, X } from 'lucide-react'
import URLInput from './URLInput'

export default function FinalCTA() {
  return (
    <section className="spark-section spark-section-cta relative overflow-hidden">
      <div className="glow-divider" />

      {/* Aurora accent — centered swell */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{
            position: 'absolute',
            width: 700, height: 500,
            background: 'radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">

        {/* Headline */}
        <h2
          className="reveal mb-5 leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Your visitors have questions.
          <br />
          <em className="gradient-text not-italic">Your website should answer them — out loud.</em>
        </h2>

        <p
          className="reveal rd1 text-[17px] mb-8 spark-text-muted"
        >
          Paste your URL. Fall in love in 30 seconds.
        </p>

        {/* URL Input — large repeat */}
        <div className="reveal rd2 mb-6 max-w-xl mx-auto">
          <URLInput id="final-cta-input" showExamples={false} showTrustRow={false} />
        </div>

        {/* Micro-copy trust */}
        <div className="reveal rd3 flex items-center justify-center gap-5 flex-wrap">
          {[
            { icon: CreditCard, text: 'No credit card' },
            { icon: ShieldCheck, text: 'Free trial credits' },
            { icon: X,          text: 'Cancel anytime' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 flex-shrink-0 spark-text-subtle" />
              <span className="text-[12.5px] spark-text-subtle">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
