import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Do I need a developer?',
    a: 'No. Copy one script tag into your site footer. If you use Webflow or Framer, paste it in site settings under "Custom Code." Any non-technical site owner can do this in 2 minutes.',
  },
  {
    q: 'Will it hallucinate about my business?',
    a: 'Answers are grounded in pages you approve and files you upload — not the open internet. If Spark doesn\'t know something, it says so instead of making it up.',
  },
  {
    q: 'Can I try it before signing up?',
    a: 'Yes. Paste your URL and immediately chat with a homepage-trained assistant — no account, no credit card. Sign up only when you want to save and embed.',
  },
  {
    q: 'Why do I need to verify my domain?',
    a: 'So only you can train an assistant on your site. It\'s a standard ownership check (DNS TXT record or HTML meta tag) — the same way Google Search Console works.',
  },
  {
    q: 'Chat or voice — which does it support?',
    a: 'Both, in the same widget. Visitors can type or tap the mic to talk. No app download, no phone call system — it\'s all browser-native.',
  },
  {
    q: 'What makes Spark different from Intercom or Drift?',
    a: 'Three things: guided navigation (Spark takes visitors to the right page mid-conversation), in-browser voice, and training from your actual site content. Spark is built for SMB website.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes. The widget is fully responsive and touch-optimised — tap to chat, tap to talk, swipe to close.',
  },
  {
    q: 'What happens when the free trial credits run out?',
    a: 'The assistant stops responding until you upgrade or add credits. We\'ll email you before they run out so you\'re never caught off guard.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="spark-section relative">
      <div className="glow-divider" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-8 reveal">
          <span className="inline-block text-[12px] uppercase tracking-widest mb-4 font-medium" style={{ color: 'var(--spark-ember)' }}>
            FAQ
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}>
            Questions? We thought about them.
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={q}
                className={`reveal rd${Math.min(i + 1, 5)} rounded-xl overflow-hidden transition-all duration-200 glass glass-hover`}
                style={{
                  background: isOpen ? 'rgba(96,165,250,0.08)' : undefined,
                  border: isOpen ? '1px solid rgba(96,165,250,0.25)' : undefined,
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-[14.5px] font-medium leading-snug ${isOpen ? 'spark-text-primary' : 'spark-text-muted'}`}
                  >
                    {q}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: isOpen ? 'rgba(96,165,250,0.2)' : 'rgba(241,245,249,0.9)',
                      border: `1px solid ${isOpen ? 'rgba(96,165,250,0.4)' : 'hsl(var(--spark-border))'}`,
                    }}
                  >
                    {isOpen
                      ? <Minus className="w-3.5 h-3.5" style={{ color: 'var(--spark-ember)' }} />
                      : <Plus  className="w-3.5 h-3.5 spark-text-muted" />
                    }
                  </div>
                </button>

                {/* Body — animate via style */}
                <div
                  style={{
                    maxHeight: isOpen ? 400 : 0,
                    overflow: 'hidden',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.36s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
                  }}
                >
                  <p
                    className="px-5 pb-4 text-[14px] leading-relaxed spark-text-muted"
                  >
                    {a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
