import { useEffect, useMemo, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'
import URLInput from './URLInput'
import HeroShaderGradient from './HeroShaderGradient'

const HERO_SETTLED_KEY = 'spark-hero-settled'
const HERO_ENTRANCE_MS = 360 + 600 + 50

const rotatingPhrases = ['talks to them', 'guides them', 'converts them']
const phraseHeightEm = 1.2
const slotRepeatCount = 12

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [slotIndex, setSlotIndex] = useState(0)
  const [isSlotResetting, setIsSlotResetting] = useState(false)

  const slotItems = useMemo(
    () => Array.from({ length: rotatingPhrases.length * slotRepeatCount }, (_, i) => rotatingPhrases[i % rotatingPhrases.length]),
    []
  )

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
    const stepSize = 1
    let intervalId: number | undefined

    const initialDelay = window.setTimeout(() => {
      setSlotIndex((prev) => prev + stepSize)

      intervalId = window.setInterval(() => {
        setSlotIndex((prev) => {
          const next = prev + stepSize
          if (next >= slotItems.length) return 0
          return next
        })
      }, 2500)
    }, 800)

    return () => {
      window.clearTimeout(initialDelay)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [slotItems.length])

  useEffect(() => {
    if (slotIndex >= rotatingPhrases.length) {
      const timeoutId = window.setTimeout(() => {
        setIsSlotResetting(true)
        setSlotIndex(0)
        window.requestAnimationFrame(() => setIsSlotResetting(false))
      }, 700)
      return () => window.clearTimeout(timeoutId)
    }
  }, [slotIndex])

  return (
    <section
      id="hero"
      className="hero-section relative w-full px-4 pb-10 pt-6 text-center sm:px-6 sm:pt-8 lg:pt-10"
    >
      <style>{`
        .hero-slot {
          display: inline-flex;
          align-items: baseline;
          justify-content: center;
          height: 1.2em;
          overflow: hidden;
          vertical-align: baseline;
          min-width: max-content;
          font-size: 0.95em;
        }
        .hero-slot-track {
          display: block;
          will-change: transform;
          transition: transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .hero-slot-track.no-transition {
          transition: none;
        }
        .hero-slot-item {
          display: block;
          height: 1.2em;
          line-height: 1.2em;
          white-space: nowrap;
          text-align: center;
          padding-right: 0.2em;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-slot-track { transition: none; }
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

          <h1 className="animate-spark-rise d1 mb-16 w-full font-display text-[2.75rem] font-normal leading-[0.95] tracking-tight text-black sm:text-6xl sm:leading-[0.95] md:text-7xl xl:text-8xl">
            <span className="block">
              Give your website visitors an assistant that
            </span>
            <span className="block">
              <span className="hero-slot" aria-live="polite">
                <span
                  className={`hero-slot-track italic text-blue-900 ${isSlotResetting ? 'no-transition' : ''}`}
                  style={{
                    transform: `translateY(-${slotIndex * phraseHeightEm}em)`,
                  }}
                >
                  {slotItems.map((phrase, index) => (
                    <span key={`${phrase}-${index}`} className="hero-slot-item">
                      {phrase}
                    </span>
                  ))}
                </span>
              </span>
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
