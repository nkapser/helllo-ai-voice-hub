import { useEffect, useRef, useState } from 'react'
import URLInput from './URLInput'
import SparkLogo from './SparkLogo'
import HeroShaderGradient from './HeroShaderGradient'

const HERO_SETTLED_KEY = 'spark-hero-settled'
const HERO_ENTRANCE_MS = 360 + 600 + 50

const HERO_NAV_LINKS = [
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
] as const

const rotatingPhrases = ['that talks to', 'that guides', 'that converts']
const HERO_SEO_HEADLINE =
  'Give your website an assistant that talks to, guides, and converts visitors'
const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_AT_FULL = 1500
const PAUSE_AT_EMPTY = 300

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [typedText, setTypedText] = useState(prefersReducedMotion ? rotatingPhrases[0] : '')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const settle = () => {
      el.classList.add('hero-settled')
      sessionStorage.setItem(HERO_SETTLED_KEY, '1')
    }

    if (sessionStorage.getItem(HERO_SETTLED_KEY) === '1') {
      settle()
      return
    }

    const timer = window.setTimeout(settle, HERO_ENTRANCE_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const currentPhrase = rotatingPhrases[phraseIndex]

    if (!isDeleting && typedText === currentPhrase) {
      const timeoutId = window.setTimeout(() => setIsDeleting(true), PAUSE_AT_FULL)
      return () => window.clearTimeout(timeoutId)
    }

    if (isDeleting && typedText === '') {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length)
      return
    }

    const timeoutId = window.setTimeout(
      () => {
        setTypedText((prev) =>
          isDeleting
            ? currentPhrase.slice(0, prev.length - 1)
            : currentPhrase.slice(0, prev.length + 1)
        )
      },
      isDeleting ? (typedText === '' ? PAUSE_AT_EMPTY : DELETE_SPEED) : TYPE_SPEED
    )

    return () => window.clearTimeout(timeoutId)
  }, [typedText, isDeleting, phraseIndex, prefersReducedMotion])

  return (
    <section
      id="hero"
      className="hero-section relative w-full px-4 pb-10 pt-4 text-center sm:px-6 sm:pt-6 lg:pt-8"
    >
      <style>{`
        .hero-typewriter-cursor {
          display: inline-block;
          width: 0.04em;
          margin-left: 0.05em;
          animation: hero-blink 1s step-end infinite;
        }
        @keyframes hero-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-typewriter-cursor { animation: none; }
        }
      `}</style>
      <HeroShaderGradient />

      <div className="absolute left-4 right-4 top-4 z-10 sm:left-6 sm:right-6 sm:top-6 lg:left-8 lg:right-8 lg:top-8">
        <div className="flex items-start justify-between gap-4">
          <a
            href="/spark"
            className="inline-flex items-center gap-3 text-left"
            aria-label="Spark"
          >
            <SparkLogo size={30} />
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold tracking-tight text-black">
                Spark
              </span>
            </span>
          </a>

          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Spark page sections">
            {HERO_NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="rounded-md px-2 py-2 text-[13px] font-medium text-black/70 transition-colors hover:text-black sm:px-2.5"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-6xl">
        <div
          ref={contentRef}
          className="hero-voice-content flex w-full flex-col items-center"
        >
          <div className="spark-badge-pill animate-spark-rise d0 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--spark)]" />
            No credit card · Free forever · Live in 30 seconds
          </div>

          <h1 className="animate-spark-rise d1 mb-8 w-full font-display text-[2.75rem] font-normal leading-[0.95] tracking-tight text-black sm:mb-10 sm:text-6xl sm:leading-[0.95] md:text-7xl xl:text-8xl">
            <span className="sr-only">{HERO_SEO_HEADLINE}</span>
            <span aria-hidden="true" className="block">
              Give your website
            </span>
            <span aria-hidden="true" className="block">
              an assistant
            </span>
            <span aria-hidden="true" className="block">
              <span className="italic text-blue-900">
                {typedText}
                {!prefersReducedMotion && (
                  <span className="hero-typewriter-cursor text-blue-900">_</span>
                )}
              </span>
            </span>
            <span aria-hidden="true" className="block">
              visitors
            </span>
          </h1>

          <div className="animate-spark-rise d3 mb-8 w-full max-w-xl sm:mb-10">
            <URLInput id="hero-input" showTrustRow={false} />
          </div>

          <div className="animate-spark-rise d4 w-full max-w-xl">
            <p className="text-base font-semibold text-black sm:text-lg">
              Live in 30 seconds. &nbsp; Start Free. &nbsp; Trained on your data
            </p>
            <p className="mt-6 text-sm text-black/80">
              The AI Assistant is trained on your website data, answers questions, navigates between pages & books meetings on your calendar.
            </p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
        <p className="animate-spark-rise d5 rounded-lg bg-slate-900/90 px-4 py-2 text-sm text-white shadow-md backdrop-blur-sm">
          © 2026 Perceptory AI Labs Private Limited
        </p>
      </div>
    </section>
  )
}
