import { Copy, ClipboardPaste, RefreshCw, AlertCircle } from 'lucide-react'

const STEPS = [
  {
    num: '1',
    icon: Copy,
    label: 'Copy',
    body: 'Get your embed snippet from the Spark dashboard after training is complete.',
  },
  {
    num: '2',
    icon: ClipboardPaste,
    label: 'Paste',
    body: (
      <>
        Add it before{' '}
        <code className="text-[11px] px-1.5 py-0.5 rounded spark-chip">
          &lt;/body&gt;
        </code>
        {' '}in your site template — footer, layout, <code className="text-[11px] px-1 rounded spark-chip">_document</code>, Webflow custom code, or Framer site settings.
      </>
    ),
  },
  {
    num: '3',
    icon: RefreshCw,
    label: 'Refresh',
    body: 'The widget appears on every page. Chat state persists as visitors browse — no interruptions.',
  },
]

const EMBED_LINES = [
  { cls: 'tok-comment', text: '<!-- Spark Assistant — paste before </body>, site-wide -->' },
  { cls: 'tok-tag',     text: '<script' },
  { cls: '',            text: '  ' },
  { cls: 'tok-attr',    text: 'src' },
  { cls: 'tok-punctuation', text: '=' },
  { cls: 'tok-string',  text: '"https://unpkg.com/@helllo-ai/spark-chat-widget@latest/agent-chat.spark-core.latest.js"' },
  { cls: 'tok-tag',     text: '></script>' },
  { cls: 'tok-tag',     text: '<script>' },
  { cls: 'tok-property',text: '  window.AgentChatWidget.init({' },
  { cls: 'tok-attr',    text: '    agentId:' },
  { cls: 'tok-string',  text: ' "your-agent-id",' },
  { cls: 'tok-attr',    text: '    embedKey:' },
  { cls: 'tok-string',  text: ' "your-embed-key",' },
  { cls: 'tok-attr',    text: '    enableGuidedNavigation:' },
  { cls: 'tok-value',   text: ' true' },
  { cls: 'tok-property',text: '  });' },
  { cls: 'tok-tag',     text: '</script>' },
]

const PLATFORMS = ['Next.js', 'React', 'Webflow', 'Framer', 'Shopify', 'Plain HTML']

export default function Install() {
  return (
    <section className="relative py-24">
      <div className="glow-divider" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-24">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-[12px] uppercase tracking-widest mb-4 font-medium" style={{ color: 'var(--spark-ember)' }}>
            Install
          </span>
          <h2
            className="mb-3"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.02em' }}
          >
            Install in{' '}
            <em className="gradient-text not-italic">60 seconds</em>.
            <br />Seriously.
          </h2>
          <p className="text-[15px] spark-text-muted">
            One snippet. Every page. No developer required — but devs will love it too.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Left: steps ── */}
          <div className="flex flex-col gap-7">
            {STEPS.map(({ num, icon: Icon, label, body }, i) => (
              <div key={num} className={`reveal rd${i + 1} flex gap-5 items-start`}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.3)' }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: 'var(--spark-ember)', width: 18, height: 18 }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10.5px] font-bold uppercase tracking-widest"
                      style={{ color: 'var(--spark)' }}
                    >
                      Step {num}
                    </span>
                    <span className="spark-text-primary font-semibold text-[14px]">{label}</span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed spark-text-muted">
                    {body}
                  </p>
                </div>
              </div>
            ))}

            {/* Callout */}
            <div
              className="reveal rd4 rounded-xl p-4 flex gap-3 items-start"
              style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.2)' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--spark)' }} />
              <div>
                <div className="text-[13px] font-semibold spark-text-primary mb-0.5">Put it site-wide, not homepage-only</div>
                <div className="text-[12.5px] leading-relaxed spark-text-muted">
                  Guided navigation and session memory only work when the widget loads on every page.
                </div>
              </div>
            </div>

            {/* Platform pills */}
            <div className="reveal rd5">
              <div className="text-[11.5px] mb-3 spark-text-subtle">Works on</div>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <span
                    key={p}
                    className="spark-chip text-[12px] px-3 py-1.5 rounded-lg"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: code block ── */}
          <div className="reveal rd2">
            <div
              className="rounded-2xl overflow-hidden glass shadow-elevated"
            >
              {/* Code window titlebar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid hsl(var(--spark-border))', background: 'rgba(241,245,249,0.6)' }}
              >
                <div className="flex items-center gap-1.5">
                  {['#ff5f57','#febc2e','#28c840'].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-[11px] spark-text-subtle">embed.html</span>
                <button
                  className="spark-btn-secondary text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all duration-150"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>

              {/* Code */}
              <pre className="p-5 overflow-x-auto code-root">
                {EMBED_LINES.map((line, i) => (
                  <div key={i} className={line.cls}>{line.text}</div>
                ))}
              </pre>
            </div>

            <p className="mt-4 text-[12.5px] text-center spark-text-subtle">
              Your unique <code style={{ color: 'var(--spark-ember)' }}>agentId</code> and <code style={{ color: 'var(--spark-ember)' }}>embedKey</code> are generated in the Spark dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
