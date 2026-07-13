import { useState } from 'react'
import SectionHeader from './SectionHeader'
import SparkChatWidget, { type ChatDemo } from './SparkChatWidget'

type UseCase = {
  title: string
  body: string
  demo: ChatDemo
}

const USE_CASES: UseCase[] = [
  {
    title: 'Answer pre-sale questions instantly',
    body: 'Shipping, sizing, availability, "what\'s included" — answered in seconds, before the visitor bounces to a competitor.',
    demo: {
      greeting: 'Welcome! Ask me anything about our products or delivery.',
      q: 'Do you deliver on Saturdays?',
      a: 'We do — Saturday delivery is free on orders over $50. Want me to open the delivery page so you can check your area?',
      chips: ['Open delivery info →', 'What about returns?'],
    },
  },
  {
    title: 'Book meetings and demos',
    body: 'When a visitor is ready to talk, Spark checks your real calendar and locks in a slot — no email ping-pong.',
    demo: {
      greeting: 'Hi! I can answer questions or set up a call with the team.',
      q: 'Can I talk to someone about the Pro plan?',
      a: 'Of course. I have Thursday 2:00 pm or Friday 10:30 am open — which works better for you?',
      chips: ['Book Thursday 2:00 pm', 'Friday 10:30 am'],
    },
  },
  {
    title: 'Qualify leads before they leave',
    body: 'Spark asks the right follow-up questions and captures contact details, so your inbox fills with warm leads, not cold clicks.',
    demo: {
      greeting: 'Hello! Happy to help you plan your project.',
      q: 'How much would a kitchen renovation cost?',
      a: 'It depends on size and finish — most projects land between $12k and $30k. What\'s the best email to send a tailored estimate to?',
      chips: ['Share my email', 'See example projects'],
    },
  },
  {
    title: 'Cover after-hours, 24/7',
    body: 'Two thirds of visits happen when you\'re closed. Spark keeps selling, answering and booking while you sleep.',
    demo: {
      greeting: 'Hi there! The team is offline, but I\'m here all night.',
      q: 'Are you open right now?',
      a: 'The office is closed until 9 am, but I can help with anything right here — or book you the first call of the morning.',
      chips: ['Book 9:00 am call', 'Ask a question'],
    },
  },
  {
    title: 'Guide visitors to the right page',
    body: 'Spark doesn\'t paste links — it takes visitors to the page mid-conversation and stays with them once they land.',
    demo: {
      greeting: 'Welcome! I can walk you to any page on this site.',
      q: 'Where can I see your prices?',
      a: 'Taking you to the pricing page now — I\'ll stay right here if any questions come up on the way.',
      chips: ['Go to pricing →', 'Compare plans'],
    },
  },
  {
    title: 'Collect feedback and testimonials',
    body: 'Happy customer in the chat? Spark asks for a quick review at exactly the right moment — and files it for you.',
    demo: {
      greeting: 'Hi again! How did everything work out?',
      q: 'That fixed it, thanks so much!',
      a: 'Glad to hear it! Would you mind sharing a one-line review? It helps other customers — and it takes ten seconds.',
      chips: ['Leave a review', 'Maybe later'],
    },
  },
]

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

      <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
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

        <div className="reveal rd2 mx-auto flex w-full max-w-sm lg:mx-0 lg:max-w-none">
          <SparkChatWidget demo={active.demo} />
        </div>
      </div>
    </section>
  )
}
