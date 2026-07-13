import { useState } from 'react'
import { Sparkles, Mic } from 'lucide-react'
import SectionHeader from './SectionHeader'

type UseCase = {
  title: string
  body: string
  demo: {
    q: string
    a: string
    chip?: string
  }
}

const USE_CASES: UseCase[] = [
  {
    title: 'Answer pre-sale questions instantly',
    body: 'Shipping, sizing, availability, "what\'s included" — answered in seconds, before the visitor bounces to a competitor.',
    demo: {
      q: 'Do you deliver on Saturdays?',
      a: 'We do — Saturday delivery is free on orders over $50. Want me to open the delivery page so you can check your area?',
      chip: 'Open delivery info →',
    },
  },
  {
    title: 'Book meetings and demos',
    body: 'When a visitor is ready to talk, Spark checks your real calendar and locks in a slot — no email ping-pong.',
    demo: {
      q: 'Can I talk to someone about the Pro plan?',
      a: 'Of course. I have Thursday 2:00 pm or Friday 10:30 am open — which works better for you?',
      chip: 'Book Thursday 2:00 pm',
    },
  },
  {
    title: 'Qualify leads before they leave',
    body: 'Spark asks the right follow-up questions and captures contact details, so your inbox fills with warm leads, not cold clicks.',
    demo: {
      q: 'How much would a kitchen renovation cost?',
      a: 'It depends on size and finish — most projects land between $12k and $30k. What\'s the best email to send a tailored estimate to?',
      chip: 'Share my email',
    },
  },
  {
    title: 'Cover after-hours, 24/7',
    body: 'Two thirds of visits happen when you\'re closed. Spark keeps selling, answering and booking while you sleep.',
    demo: {
      q: 'Are you open right now?',
      a: 'The office is closed until 9 am, but I can help with anything right here — or book you the first call of the morning.',
      chip: 'Book 9:00 am call',
    },
  },
  {
    title: 'Guide visitors to the right page',
    body: 'Spark doesn\'t paste links — it takes visitors to the page mid-conversation and stays with them once they land.',
    demo: {
      q: 'Where can I see your prices?',
      a: 'Taking you to the pricing page now — I\'ll stay right here if any questions come up on the way.',
      chip: 'Go to pricing →',
    },
  },
  {
    title: 'Collect feedback and testimonials',
    body: 'Happy customer in the chat? Spark asks for a quick review at exactly the right moment — and files it for you.',
    demo: {
      q: 'That fixed it, thanks so much!',
      a: 'Glad to hear it! Would you mind sharing a one-line review? It helps other customers — and it takes ten seconds.',
      chip: 'Leave a review',
    },
  },
]

function ExampleAgent({ demo }: { demo: UseCase['demo'] }) {
  return (
    <div className="step-shell sticky top-8">
      <div className="magic-widget-header">
        <span className="magic-widget-avatar">
          <Sparkles className="h-3 w-3" />
        </span>
        <div className="flex-1 leading-tight">
          <div className="text-[11px] font-semibold">Spark</div>
          <div className="text-[9px] opacity-80">Example agent · online</div>
        </div>
        <Mic className="h-3.5 w-3.5 opacity-80" />
      </div>
      <div className="flex min-h-[13rem] flex-col justify-end gap-2 p-4" style={{ background: 'rgba(248,250,252,0.7)' }}>
        <div key={demo.q} className="flex flex-col gap-2">
          <div className="magic-bubble-user">{demo.q}</div>
          <div className="magic-bubble-bot">{demo.a}</div>
          {demo.chip && (
            <div className="magic-chip-row">
              <span className="magic-chip cursor-pointer" style={{ fontSize: 10.5, padding: '0.3rem 0.65rem' }}>
                {demo.chip}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function UseCases() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = USE_CASES[activeIdx]

  return (
    <section id="use-cases" className="spark-section relative scroll-mt-4">
      <div className="glow-divider" />

      <SectionHeader
        index="03"
        label="Use cases"
        title="One assistant. Every job on your website."
        sub="Spark goes beyond support — it sells, books, qualifies and listens."
      />

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        <div className="reveal flex flex-col gap-1.5" role="tablist" aria-label="Use cases">
          {USE_CASES.map((useCase, i) => {
            const isActive = i === activeIdx
            return (
              <button
                key={useCase.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`usecase-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-medium"
                    style={{ fontFamily: 'var(--font-mono)', color: isActive ? 'var(--spark-ember)' : 'var(--spark-fg-subtle)' }}
                  >
                    0{i + 1}
                  </span>
                  <span className={`text-[15px] leading-snug ${isActive ? 'font-semibold spark-text-primary' : 'font-medium spark-text-muted'}`}>
                    {useCase.title}
                  </span>
                </span>
                <span className="usecase-item-body">
                  <span className="mt-2 block pl-8 text-[13px] leading-relaxed spark-text-muted">
                    {useCase.body}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="reveal rd2 mx-auto w-full max-w-sm lg:mx-0">
          <ExampleAgent demo={active.demo} />
        </div>
      </div>
    </section>
  )
}
