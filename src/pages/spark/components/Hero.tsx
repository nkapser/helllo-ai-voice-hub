import { CheckCircle2, Sparkles } from 'lucide-react'
import URLInput     from './URLInput'
import WidgetMockup from './WidgetMockup'

const TRUST_ITEMS = [
  'Free to start',
  'Your data, your site',
  'Live in 60 seconds',
]

const LOGO_NAMES = ['acme.dev', 'northwind', 'lumen', 'studio·6', 'kraft.io', 'halcyon', 'meridian', 'foxwood']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* ── Aurora background ── */}
      <div className="aurora-root">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          {/* ── LEFT: Text + CTA ── */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

            {/* Badge */}
            <div className="anim-fade-up d0 inline-flex items-center gap-2 mb-8">
              <div
                className="badge-shimmer flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{ border: '1px solid rgba(124,92,255,0.3)' }}
              >
                <Sparkles className="w-3 h-3" style={{ color: '#7c5cff' }} />
                <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Live in 60 seconds · no code · free to try
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="anim-fade-up d1 leading-[1.08] mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              <span className="block text-white">Give your website</span>
              <em className="gradient-text not-italic block">a voice.</em>
            </h1>

            {/* Subhead */}
            <p
              className="anim-fade-up d2 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ color: 'rgba(255,255,255,0.58)' }}
            >
              Paste your URL. In 30 seconds, talk to an AI assistant trained on
              your site — then drop one line of code and never miss a visitor
              question again.
            </p>

            {/* URL Input */}
            <div className="anim-fade-up d3 mb-5">
              <URLInput id="hero-input" size="large" />
            </div>

            {/* Trust row */}
            <div className="anim-fade-up d4 flex items-center justify-center lg:justify-start flex-wrap gap-x-5 gap-y-2">
              {TRUST_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#22d3ee' }} />
                  <span className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Widget mockup ── */}
          <div className="anim-fade-up d5 flex-1 flex justify-center lg:justify-end w-full">
            <WidgetMockup />
          </div>
        </div>

        {/* ── Social proof strip ── */}
        <div className="relative z-10 mt-20 lg:mt-24">
          <div className="anim-fade-up d6 text-center mb-6">
            <span className="text-[12px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Trusted by indie builders shipping today
            </span>
          </div>
          <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg,transparent,black 15%,black 85%,transparent)' }}>
            <div className="ticker-track py-2">
              {/* Doubled for seamless loop */}
              {[...LOGO_NAMES, ...LOGO_NAMES].map((name, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 mx-8 text-sm font-medium"
                  style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.05em' }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #060815)' }}
      />
    </section>
  )
}
