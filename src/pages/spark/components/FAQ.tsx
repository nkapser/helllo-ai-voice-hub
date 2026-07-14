import { useState } from 'react'
import { Plus } from 'lucide-react'
import { SPARK_FAQS } from '@/lib/spark-seo'

const FAQS = SPARK_FAQS

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="spark-section relative scroll-mt-4">
      <div className="glow-divider" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        {/* Header column */}
        <div className="reveal lg:sticky lg:top-8 lg:self-start">
          <div className="section-eyebrow">
            <span className="section-eyebrow-label">FAQ</span>
          </div>
          <h2 className="section-duo-head spark-text-primary">
            Frequently asked questions.{' '}
            <span className="duo-muted">The honest answers, before you ask.</span>
          </h2>
          <p className="mt-4 text-[14px] spark-text-muted">
            Something else on your mind?{' '}
            <a href="mailto:hello@helllo.ai" className="font-medium" style={{ color: 'var(--spark-ember)' }}>
              Ask us directly
            </a>{' '}
            — or just ask the widget.
          </p>
        </div>

        {/* Accordion column */}
        <div className="reveal rd1 flex flex-col">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIdx === i
            return (
              <div key={q} className="faq-row">
                <button
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={`text-[14.5px] font-medium leading-snug ${isOpen ? 'spark-text-primary' : 'spark-text-muted'}`}>
                    {q}
                  </span>
                  <Plus
                    className="h-4 w-4 flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: isOpen ? 'var(--spark-ember)' : 'var(--spark-fg-subtle)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 400 : 0,
                    overflow: 'hidden',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.36s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
                  }}
                >
                  <p className="pb-4 pr-8 text-[14px] leading-relaxed spark-text-muted">{a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
