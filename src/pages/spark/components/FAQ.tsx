import { useState } from 'react'
import { Plus } from 'lucide-react'

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
    q: 'Is my data used to train other AI models?',
    a: 'No. Your content trains only your assistant — it\'s never used to train foundation models or shared with other customers. You see and approve every page before it\'s crawled, and can delete your data anytime. Full details in our Privacy Policy.',
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
    a: 'Three things: guided navigation (Spark takes visitors to the right page mid-conversation), in-browser voice, and training from your actual site content. Spark is built for SMB websites.',
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
