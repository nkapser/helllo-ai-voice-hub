import { Sparkles } from 'lucide-react'
import URLInput from './URLInput'
import HeroShaderGradient from './HeroShaderGradient'

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section relative w-full px-4 pb-10 pt-6 text-center sm:px-6 sm:pt-8 lg:pt-10"
    >
      <HeroShaderGradient />

      <div className="relative z-[1] mx-auto w-full max-w-6xl">
        <a
          href="/spark"
          className="hero-spark-logo mb-8 inline-flex items-center gap-3 text-left"
          aria-label="Spark"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-spark text-white shadow-spark">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight spark-text-primary">
              Spark
            </span>
          </span>
        </a>

        <div className="hero-voice-content flex w-full flex-col items-center">
          <div className="spark-badge-pill animate-spark-rise d0 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--spark)]" />
            Launching on Product Hunt — be first to embed Spark
          </div>

          <h1 className="animate-spark-rise d1 mb-5 w-full font-display text-[2.75rem] font-normal leading-[0.95] tracking-tight spark-text-primary sm:text-6xl sm:leading-[0.95] md:text-7xl xl:text-8xl">
            <span className="block max-[360px]:whitespace-normal sm:whitespace-nowrap">
              Give your website
            </span>
            <span className="gradient-text block italic">a voice.</span>
          </h1>

          <p className="animate-spark-rise d2 mx-auto mb-8 max-w-xl text-base spark-text-muted sm:text-lg">
            Paste your URL. In 30 seconds, talk to an AI assistant trained on your site — then embed it in one line of code.
          </p>

          <div className="animate-spark-rise d3 w-full max-w-xl">
            <URLInput id="hero-input" showTrustRow showExamples />
          </div>

          <div className="animate-spark-rise d4 mt-10 w-full">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] spark-text-muted">
              Built by
            </p>
            <a
              href="https://perceptorylabs.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--spark-border))] bg-[var(--spark-surface-elevated)] px-5 py-2.5 text-sm font-medium spark-text-primary transition hover:border-[var(--spark)] hover:shadow-spark"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-spark text-[10px] text-white">
                PL
              </span>
              perceptorylabs.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
