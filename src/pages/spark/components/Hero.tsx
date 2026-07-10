import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import URLInput from './URLInput'
import HeroShaderGradient from './HeroShaderGradient'

const HERO_SETTLED_KEY = 'spark-hero-settled'
const HERO_ENTRANCE_MS = 360 + 600 + 50

const rotatingPhrases = ['that talks to', 'that guides', 'that converts']
const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_AT_FULL = 1500
const PAUSE_AT_EMPTY = 300

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [typedText, setTypedText] = useState('')
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
  }, [typedText, isDeleting, phraseIndex])

  return (
    <section
      id="hero"
      className="hero-section relative w-full px-4 pb-10 pt-6 text-center sm:px-6 sm:pt-8 lg:pt-10"
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

      <div className="absolute left-4 top-4 z-10 text-left sm:left-6 sm:top-6 lg:left-8 lg:top-8">
        <a
          href="/spark"
          className="inline-flex items-center gap-3"
          aria-label="Spark"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-spark text-white shadow-spark">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight text-black">
              Spark
            </span>
          </span>
        </a>
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-6xl">
        <div
          ref={contentRef}
          className="hero-voice-content mt-24 flex w-full flex-col items-center sm:mt-28"
        >
          <div className="spark-badge-pill animate-spark-rise d0 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--spark)]" />
            Launching on Product Hunt — be first to embed Spark
          </div>

          <h1 className="animate-spark-rise d1 mb-24 w-full font-display text-[2.75rem] font-normal leading-[0.95] tracking-tight text-black sm:text-6xl sm:leading-[0.95] md:text-7xl xl:text-8xl">
            <span className="block">
              Give your website
            </span>
            <span className="block">
              an assistant
            </span>
            <span className="block">
              <span className="italic text-blue-900" aria-live="polite">
                {typedText}<span className="hero-typewriter-cursor text-blue-900">_</span>
              </span>
            </span>
            <span className="block">
              visitors
            </span>
          </h1>

          <div className="animate-spark-rise d3 mb-16 w-full max-w-xl">
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
