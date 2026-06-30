import { ScanLine, Mic, Code2, Check } from 'lucide-react'

const SCAN_STEPS = [
  { label: 'Fetching homepage',    done: true },
  { label: 'Reading content',      done: true },
  { label: 'Building knowledge',   done: true },
  { label: 'Waking up assistant',  done: true },
]

const EMBED_CODE = [
  { type: 'comment',  text: '<!-- Paste before </body> on every page -->' },
  { type: 'tag',      text: '<script ' },
  { type: 'attr',     text: 'src' },
  { type: 'punct',    text: '=' },
  { type: 'string',   text: '"https://unpkg.com/@helllo-ai/spark-chat-widget@latest/agent-chat.spark-core.latest.js"' },
  { type: 'tag-end',  text: '></script>' },
  { type: 'tag',      text: '<script>' },
  { type: 'prop',     text: '  window.AgentChatWidget.init(' },
  { type: 'value',    text: '{ agentId: "…", embedKey: "…", enableGuidedNavigation: true }' },
  { type: 'prop',     text: ');' },
  { type: 'tag-end',  text: '</script>' },
]

function CodeLine({ type, text }: { type: string; text: string }) {
  const classMap: Record<string, string> = {
    comment:  'tok-comment',
    tag:      'tok-tag',
    'tag-end':'tok-tag',
    attr:     'tok-attr',
    string:   'tok-string',
    punct:    'tok-punctuation',
    prop:     'tok-property',
    value:    'tok-value',
  }
  return <div className={classMap[type] ?? ''}>{text}</div>
}

export default function MagicMoment() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="glow-divider" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-24">
        <div className="text-center mb-16 reveal">
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            See it on{' '}
            <em className="gradient-text not-italic">your site</em>
            {' '}before you sign up
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>
            No credit card. No install. Just your URL.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          {/* ── Card 1: Scans your homepage ── */}
          <div className="glass glass-hover rounded-2xl p-6 reveal rd1 flex flex-col gap-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(124,92,255,0.2)', border: '1px solid rgba(124,92,255,0.3)' }}
            >
              <ScanLine className="w-5 h-5" style={{ color: '#9d82ff' }} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1 text-[15px]">
                Reads your homepage in seconds
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                We scrape, parse, and understand your actual content — not a demo dataset.
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-2">
              {SCAN_STEPS.map(({ label, done }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: done ? 'rgba(34,211,238,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${done ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)'}` }}
                  >
                    {done && <Check className="w-2.5 h-2.5" style={{ color: '#22d3ee' }} />}
                  </div>
                  <span className="text-[12.5px]" style={{ color: done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 2: Chat + Voice ── */}
          <div className="glass glass-hover rounded-2xl p-6 reveal rd2 flex flex-col gap-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)' }}
            >
              <Mic className="w-5 h-5" style={{ color: '#22d3ee' }} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1 text-[15px]">
                Chat + voice, in the browser
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                Visitors type or talk. No app download, no phone system — just the browser.
              </p>
            </div>
            <div className="mt-auto rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Tab bar */}
              <div className="flex" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Chat', 'Voice'].map((tab, i) => (
                  <div
                    key={tab}
                    className="flex-1 py-2 text-center text-[12px] font-medium transition-all"
                    style={{
                      color: i === 0 ? 'white' : 'rgba(255,255,255,0.4)',
                      background: i === 0 ? 'rgba(124,92,255,0.2)' : 'transparent',
                      borderBottom: i === 0 ? '1px solid #7c5cff' : 'none',
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              {/* Chat preview */}
              <div className="p-3 flex flex-col gap-2">
                <div className="self-end rounded-xl rounded-br-sm px-3 py-1.5 text-[11px]" style={{ background: 'rgba(124,92,255,0.3)', color: 'rgba(255,255,255,0.85)', maxWidth: '80%' }}>
                  How much does it cost?
                </div>
                <div className="self-start rounded-xl rounded-bl-sm px-3 py-1.5 text-[11px]" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)', maxWidth: '80%' }}>
                  We have a free plan! Want me to take you to Pricing?
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 3: One script tag ── */}
          <div className="glass glass-hover rounded-2xl p-6 reveal rd3 flex flex-col gap-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(124,92,255,0.2)', border: '1px solid rgba(124,92,255,0.3)' }}
            >
              <Code2 className="w-5 h-5" style={{ color: '#9d82ff' }} />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1 text-[15px]">
                One script tag. Any site.
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                Next.js, Webflow, Framer, plain HTML — paste before <code className="text-[11px] px-1 rounded" style={{ background: 'rgba(255,255,255,0.08)' }}>&lt;/body&gt;</code> on every page.
              </p>
            </div>
            <div
              className="mt-auto rounded-xl p-4 overflow-x-auto code-root"
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {EMBED_CODE.map((line, i) => (
                <CodeLine key={i} {...line} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
