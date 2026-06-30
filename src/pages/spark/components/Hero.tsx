import { Globe, Mic, Code2 } from 'lucide-react'
import URLInput from './URLInput'
import HeroVoiceField from './HeroVoiceField'

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
      className="hero-voice-stage mx-auto flex w-full max-w-6xl flex-col items-center overflow-hidden px-2 pb-16 pt-10 text-center sm:pt-14 lg:pt-16"
    >
      <HeroVoiceField />

      <div className="hero-voice-content flex w-full flex-col items-center">
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
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] spark-text-muted">
            Built by
          </p>
          <a
            href="https://perceptorylabs.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--spark-border))] bg-[var(--spark-surface-elevated)] px-5 py-2.5 text-sm font-medium spark-text-primary transition hover:border-[var(--spark)] hover:shadow-spark"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-spark text-[10px] text-white">
              PL
            </span>
            perceptorylabs.ai
          </a>
          <p className="mt-3 text-[12.5px] spark-text-subtle max-w-sm mx-auto">
            Production AI from the team behind Helllo.ai
          </p>
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
      </div>
    </section>
  )
}
