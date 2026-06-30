import { Globe, Mic, Code2 } from 'lucide-react'
import URLInput from './URLInput'

const LOGO_NAMES = ['acme.dev', 'northwind', 'lumen', 'studio·6', 'kraft.io', 'halcyon']

const FEATURE_CARDS = [
  {
    icon: Globe,
    title: 'Trained on your site',
    body: 'We read your pages and build an assistant that knows your product, voice, and details.',
  },
  {
    icon: Mic,
    title: 'Chat + real voice',
    body: 'Visitors type or talk. In-browser voice with no apps, no plugins, no friction.',
  },
  {
    icon: Code2,
    title: 'One-line embed',
    body: 'Drop a single <script> tag. Works on any site — Next.js, plain HTML, Webflow, Framer.',
  },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto flex w-full max-w-6xl flex-col items-center px-2 pb-16 pt-10 text-center sm:pt-14 lg:pt-16"
    >
      <div className="spark-badge-pill animate-spark-rise d0 mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--spark)]" />
        Launching on Product Hunt — be first to embed Spark
      </div>

      <h1 className="animate-spark-rise d1 mb-6 w-full font-display text-[2.75rem] font-normal leading-[0.95] tracking-tight spark-text-primary sm:text-6xl sm:leading-[0.95] md:text-7xl xl:text-8xl">
        <span className="block max-[360px]:whitespace-normal sm:whitespace-nowrap">
          Give your website
        </span>
        <span className="gradient-text block italic">a voice.</span>
      </h1>

      <p className="animate-spark-rise d2 mx-auto mb-10 max-w-xl text-base spark-text-muted sm:text-lg">
        Paste your URL. In 30 seconds, talk to an AI assistant trained on your site — then embed it in one line of code.
      </p>

      <div className="animate-spark-rise d3 w-full max-w-xl">
        <URLInput id="hero-input" showTrustRow showExamples />
      </div>

      <div className="animate-spark-rise d4 mt-14 w-full">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] spark-text-muted">
          Trusted by indie builders shipping today
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-sm spark-text-subtle">
          {LOGO_NAMES.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>

      <div className="animate-spark-rise d5 mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURE_CARDS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="glass rounded-2xl p-6 text-left">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-spark text-white shadow-spark">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-semibold spark-text-primary">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed spark-text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
