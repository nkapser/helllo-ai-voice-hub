import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Navigation, Calendar, Upload, Workflow, PackageSearch } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const CARD_SHADOW_ACTIVE =
  '0 28px 70px -28px rgba(59, 130, 246, 0.28), 0 16px 40px -20px rgba(15, 23, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
const CARD_SHADOW_STACK =
  '0 12px 32px -24px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
const CARD_SHADOW_HIDDEN =
  '0 8px 24px -20px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)'

type Panel = {
  icon: LucideIcon
  badge: string
  iconColor: string
  accentBg: string
  accentBorder: string
  badgeColor: string
  badgeBorder: string
  title: string
  body: string
  demo: ReactNode
}

const PANELS: Panel[] = [
  {
    icon: Navigation,
    badge: 'On by default',
    iconColor: 'var(--spark)',
    accentBg: 'rgba(96,165,250,0.1)',
    accentBorder: 'rgba(96,165,250,0.25)',
    badgeColor: 'rgba(96,165,250,0.2)',
    badgeBorder: 'rgba(96,165,250,0.4)',
    title: 'Guide visitors to the right page',
    body: 'Ask "take me to pricing" or "show me your FAQs" — Spark navigates there mid-conversation and keeps chatting once they land.',
    demo: (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--spark-border))]" style={{ background: 'rgba(241,245,249,0.6)' }}>
        <div className="p-3 flex flex-col gap-2">
          <div className="self-end rounded-xl rounded-br-sm px-3 py-1.5 text-[11px] spark-text-primary" style={{ background: 'rgba(241,245,249,0.9)', border: '1px solid hsl(var(--spark-border))', maxWidth: '85%' }}>
            How much does it cost?
          </div>
          <div className="self-start flex flex-col gap-1.5" style={{ maxWidth: '90%' }}>
            <div className="rounded-xl rounded-bl-sm px-3 py-1.5 text-[11px] spark-text-primary" style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.2)' }}>
              We offer plans from $49/mo. Want me to open your Pricing page?
            </div>
            <div className="flex gap-1.5">
              <div className="px-3 py-1 rounded-full text-[10px] font-medium cursor-pointer" style={{ background: 'rgba(96,165,250,0.2)', border: '1px solid rgba(96,165,250,0.4)', color: 'var(--spark-ember)' }}>
                Yes, take me there →
              </div>
              <div className="spark-chip px-3 py-1 rounded-full text-[10px] spark-text-subtle">Tell me more</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Calendar,
    badge: 'Two-way calendar sync',
    iconColor: 'var(--spark-ember)',
    accentBg: 'rgba(96,165,250,0.1)',
    accentBorder: 'rgba(96,165,250,0.25)',
    badgeColor: 'rgba(96,165,250,0.15)',
    badgeBorder: 'rgba(96,165,250,0.35)',
    title: 'Turn conversations into booked meetings',
    body: "Connect Google Calendar, Calendly, or Cal.com. When a visitor's ready to talk, Spark offers a real open slot and books it — no back-and-forth emails.",
    demo: (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--spark-border))]" style={{ background: 'rgba(241,245,249,0.6)' }}>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5">
            {['Google Calendar', 'Calendly', 'Cal.com'].map((name) => (
              <span key={name} className="spark-chip px-2.5 py-1 rounded-full text-[10px]">{name}</span>
            ))}
          </div>
          <div className="mt-1 rounded-lg px-3 py-2 text-[11px] leading-relaxed spark-text-muted" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
            "I've got a slot Thursday at 2pm — want me to book it?"
          </div>
          <div className="flex gap-1.5">
            <div className="px-3 py-1 rounded-full text-[10px] font-medium cursor-pointer" style={{ background: 'rgba(96,165,250,0.2)', border: '1px solid rgba(96,165,250,0.4)', color: 'var(--spark-ember)' }}>
              Book it →
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Upload,
    badge: 'Drag & drop',
    iconColor: 'var(--spark-glow)',
    accentBg: 'rgba(147,197,253,0.1)',
    accentBorder: 'rgba(147,197,253,0.25)',
    badgeColor: 'rgba(147,197,253,0.2)',
    badgeBorder: 'rgba(147,197,253,0.35)',
    title: "Answer questions your site doesn't cover",
    body: 'Upload FAQs, price lists, return policies — PDF, DOCX, CSV. Your assistant gets smarter without you rewriting a single page.',
    demo: (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--spark-border))]" style={{ background: 'rgba(241,245,249,0.6)' }}>
        <div className="p-3 flex flex-col gap-2">
          {['FAQ_2024.pdf', 'Pricing_Sheet.xlsx', 'Return_Policy.docx'].map((file, i) => (
            <div key={file} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid hsl(var(--spark-border))' }}>
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: ['rgba(239,68,68,0.2)', 'rgba(34,197,94,0.2)', 'rgba(59,130,246,0.2)'][i], color: ['#f87171', '#4ade80', '#60a5fa'][i] }}
              >
                {['PDF', 'XLS', 'DOC'][i]}
              </div>
              <span className="text-[11.5px] flex-1 spark-text-muted">{file}</span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--spark)' }} />
            </div>
          ))}
          <div className="flex items-center justify-center gap-2 py-2 rounded-lg mt-1 text-[11px]" style={{ border: '1px dashed rgba(96,165,250,0.35)', color: 'var(--spark-ember)' }}>
            <Upload className="w-3 h-3" /> Drop files here
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Workflow,
    badge: 'Connects to your stack',
    iconColor: 'var(--spark)',
    accentBg: 'rgba(96,165,250,0.1)',
    accentBorder: 'rgba(96,165,250,0.25)',
    badgeColor: 'rgba(96,165,250,0.2)',
    badgeBorder: 'rgba(96,165,250,0.4)',
    title: 'Push leads. Pull order history.',
    body: 'Sync with your CRM to capture new leads automatically and pull real customer data — like recent orders — straight into the conversation.',
    demo: (
      <div className="rounded-xl overflow-hidden border border-[hsl(var(--spark-border))]" style={{ background: 'rgba(241,245,249,0.6)' }}>
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid hsl(var(--spark-border))' }}>
            <Workflow className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--spark-ember)' }} />
            <span className="text-[11.5px] flex-1 spark-text-muted">New lead captured</span>
            <span className="text-[10px] font-medium" style={{ color: 'var(--spark-ember)' }}>→ CRM</span>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid hsl(var(--spark-border))' }}>
            <PackageSearch className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--spark-ember)' }} />
            <span className="text-[11.5px] flex-1 spark-text-muted">Order #48213</span>
            <span className="text-[10px] spark-text-subtle">Fetched from store</span>
          </div>
          <div className="rounded-lg px-3 py-2 text-[11px] leading-relaxed spark-text-muted" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
            "Your last order shipped Tuesday — want the tracking link?"
          </div>
        </div>
      </div>
    ),
  },
]

function FeatureCard({
  panel,
  index,
  className = '',
}: {
  panel: Panel
  index: number
  className?: string
}) {
  const { icon: Icon, badge, iconColor, accentBg, accentBorder, badgeColor, badgeBorder, title, body, demo } = panel

  return (
    <article className={`feature-stack-card ${className}`}>
      <div className="feature-stack-card-inner grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="feature-stack-card-copy flex flex-col gap-4 min-w-0">
          <span className="text-[11px] font-semibold tracking-widest spark-text-subtle">
            0{index + 1} / 0{PANELS.length}
          </span>
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
            >
              <Icon className="w-5 h-5" style={{ color: iconColor }} />
            </div>
            <span
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: badgeColor, border: `1px solid ${badgeBorder}`, color: 'var(--spark-ember)' }}
            >
              {badge}
            </span>
          </div>
          <div>
            <h3 className="spark-text-primary font-display font-semibold text-xl lg:text-2xl mb-2 leading-snug">
              {title}
            </h3>
            <p className="text-[14.5px] leading-relaxed spark-text-muted">{body}</p>
          </div>
        </div>
        <div className="w-full max-w-sm mx-auto md:mx-0 md:ml-auto feature-stack-demo">{demo}</div>
      </div>
    </article>
  )
}

function StackedShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const scrollToCardRef = useRef<(index: number) => void>(() => {})

  const handleRailClick = (index: number) => {
    scrollToCardRef.current(index)
  }

  useLayoutEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!section || !pin || cards.length === 0) return

    const applyCardMotion = (wrap: HTMLDivElement, dist: number, index: number) => {
      const shell = wrap.querySelector('.feature-stack-card') as HTMLElement | null
      const copy = wrap.querySelector('.feature-stack-card-copy') as HTMLElement | null
      const demo = wrap.querySelector('.feature-stack-demo') as HTMLElement | null
      const zBase = 12 + index

      const setShellShadow = (focus: number) => {
        if (!shell) return
        if (focus > 0.55) {
          shell.style.boxShadow = CARD_SHADOW_ACTIVE
        } else if (focus > 0.15) {
          shell.style.boxShadow = CARD_SHADOW_STACK
        } else {
          shell.style.boxShadow = CARD_SHADOW_HIDDEN
        }
      }

      const setContent = (
        contentOpacity: number,
        copyY: number,
        demoY: number,
        demoOpacity = Math.max(0, contentOpacity - 0.04),
      ) => {
        if (copy) gsap.set(copy, { y: copyY, opacity: contentOpacity })
        if (demo) gsap.set(demo, { y: demoY, opacity: demoOpacity })
      }

      if (dist < -0.9) {
        gsap.set(wrap, {
          yPercent: 16,
          scale: 0.958,
          opacity: 0,
          zIndex: zBase,
          pointerEvents: 'none',
          filter: 'blur(3px)',
        })
        setContent(0, 18, 26)
        if (shell) shell.style.boxShadow = CARD_SHADOW_HIDDEN
        return
      }

      if (dist < 0) {
        const t = easeOutCubic(gsap.utils.clamp(0, 1, (dist + 0.9) / 0.9))
        const contentIn = easeOutCubic(gsap.utils.clamp(0, 1, (dist + 0.42) / 0.42))
        const demoIn = easeOutCubic(gsap.utils.clamp(0, 1, (dist + 0.28) / 0.58))
        gsap.set(wrap, {
          yPercent: (1 - t) * 12,
          scale: 0.964 + t * 0.036,
          opacity: t * 0.96,
          zIndex: 80 + index + Math.round(t * 25),
          pointerEvents: contentIn > 0.88 ? 'auto' : 'none',
          filter: `blur(${(1 - t) * 1.2}px)`,
        })
        setContent(contentIn, (1 - contentIn) * 10, (1 - demoIn) * 18, demoIn)
        setShellShadow(t * 0.85)
        return
      }

      if (dist <= 0.92) {
        const exit = easeInOutCubic(gsap.utils.clamp(0, 1, dist / 0.92))
        const focus = 1 - exit
        const contentOut = Math.pow(focus, 1.35)
        gsap.set(wrap, {
          yPercent: -exit * 7,
          scale: 1 - exit * 0.034,
          opacity: 0.22 + contentOut * 0.78,
          zIndex: focus > 0.38 ? 100 + index : 55 + index,
          pointerEvents: dist < 0.42 ? 'auto' : 'none',
          filter: `blur(${exit * 0.85}px)`,
        })
        setContent(contentOut, -exit * 6, exit * 10)
        setShellShadow(focus)
        return
      }

      const depth = Math.min(3, dist - 0.92)
      const shellOpacity = Math.max(0.08, 0.28 - depth * 0.07)
      gsap.set(wrap, {
        yPercent: -8 - depth * 4.5,
        scale: 0.932 - depth * 0.014,
        opacity: shellOpacity,
        zIndex: 18 + index,
        pointerEvents: 'none',
        filter: `blur(${0.45 + depth * 0.5}px)`,
      })
      setContent(0, -5 - depth * 2.5, -3)
      setShellShadow(Math.max(0.06, 0.18 - depth * 0.04))
    }

    const ctx = gsap.context(() => {
      const setScene = (progress: number) => {
        const total = cards.length
        const scaled = progress * (total - 1)

        cards.forEach((card, i) => {
          applyCardMotion(card, scaled - i, i)
        })

        labelRefs.current.forEach((label, i) => {
          if (!label) return
          const focus = gsap.utils.clamp(0, 1, 1 - Math.abs(scaled - i))
          const complete = scaled > i + 0.45
          const active = focus > 0.62
          label.style.setProperty('--rail-focus', focus.toFixed(3))
          label.classList.toggle('is-active', active)
          label.classList.toggle('is-complete', complete)
          if (active) {
            label.setAttribute('aria-current', 'step')
          } else {
            label.removeAttribute('aria-current')
          }
        })

        if (progressRef.current) {
          const fill = total > 1 ? (scaled / (total - 1)) * 100 : 100
          progressRef.current.style.transform = `scaleY(${fill / 100})`
        }

        if (introRef.current) {
          gsap.set(introRef.current, {
            opacity: Math.max(0.72, 1 - progress * 0.28),
            y: progress * -14,
            filter: `blur(${progress * 0.4}px)`,
          })
        }

        if (glowRef.current) {
          const activeIndex = Math.round(scaled)
          const local = scaled - activeIndex
          const pulse = 0.28 + (1 - Math.min(1, Math.abs(local) * 1.4)) * 0.2
          glowRef.current.style.opacity = String(pulse)
          glowRef.current.style.transform = `translateY(${local * -6}px) scale(${0.98 + (1 - Math.min(1, Math.abs(local))) * 0.03})`
        }
      }

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * (cards.length - 1) * 1.05}`,
        pin: pin,
        scrub: 1.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setScene(self.progress),
      })

      scrollToCardRef.current = (index: number) => {
        const total = cards.length
        const progress = total > 1 ? index / (total - 1) : 0
        const y = trigger.start + (trigger.end - trigger.start) * progress
        window.scrollTo({ top: y, behavior: 'smooth' })
      }

      setScene(0)
    }, section)

    return () => {
      scrollToCardRef.current = () => {}
      ctx.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className="feature-stack-section">
      <div ref={pinRef} className="feature-stack-pin">
        <div className="feature-stack-layout mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div ref={introRef} className="feature-stack-intro">
            <span className="inline-block text-[12px] uppercase tracking-widest mb-3 font-medium" style={{ color: 'var(--spark-ember)' }}>
              Superpowers
            </span>
            <h2 className="mb-3 font-display text-[clamp(2rem,4vw,3rem)] tracking-tight spark-text-primary">
              Not just a chatbot.{' '}
              <em className="gradient-text not-italic">A teammate for your website.</em>
            </h2>
            <p className="text-[15px] max-w-xl spark-text-muted">
              Four things visitors actually need — scroll or pick one on the left.
            </p>
          </div>

          <div className="feature-stack-body">
            <aside className="feature-stack-rail" aria-label="Feature navigation">
              {PANELS.map((panel, i) => (
                <button
                  key={panel.title}
                  type="button"
                  ref={(el) => { labelRefs.current[i] = el }}
                  className="feature-stack-rail-item"
                  style={{ '--rail-focus': '0' } as CSSProperties}
                  onClick={() => handleRailClick(i)}
                  aria-label={`Show feature ${i + 1}: ${panel.title}`}
                >
                  <span className="feature-stack-rail-num">0{i + 1}</span>
                  <span className="feature-stack-rail-label">{panel.title}</span>
                </button>
              ))}
              <div className="feature-stack-rail-track">
                <div ref={progressRef} className="feature-stack-rail-fill" />
              </div>
            </aside>

            <div className="feature-stack-stage">
              <div ref={glowRef} className="feature-stack-stage-glow" aria-hidden="true" />
              {PANELS.map((panel, i) => (
                <div
                  key={panel.title}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className="feature-stack-card-wrap"
                >
                  <FeatureCard panel={panel} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StaticFallback() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 reveal px-2">
        <span className="inline-block text-[12px] uppercase tracking-widest mb-2 font-medium" style={{ color: 'var(--spark-ember)' }}>
          Superpowers
        </span>
        <h2 className="mb-2 font-display text-[clamp(2rem,4vw,3rem)] tracking-tight spark-text-primary">
          Not just a chatbot.{' '}
          <em className="gradient-text not-italic">A teammate for your website.</em>
        </h2>
        <p className="text-[15px] max-w-xl mx-auto spark-text-muted">
          Four things visitors actually need — the rest is noise.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {PANELS.map((panel, i) => (
          <FeatureCard
            key={panel.title}
            panel={panel}
            index={i}
            className={`feature-stack-card p-6 sm:p-8 reveal rd${Math.min(i + 1, 5)}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function FeatureShowcase() {
  const [useStacked, setUseStacked] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  useEffect(() => {
    const widthQuery = window.matchMedia('(min-width: 768px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setUseStacked(widthQuery.matches && !motionQuery.matches)
    update()
    widthQuery.addEventListener('change', update)
    motionQuery.addEventListener('change', update)
    return () => {
      widthQuery.removeEventListener('change', update)
      motionQuery.removeEventListener('change', update)
    }
  }, [])

  return (
    <section id="superpowers" className="spark-section relative feature-showcase-section">
      <div className="glow-divider" />
      {useStacked ? <StackedShowcase /> : <StaticFallback />}
    </section>
  )
}
