import { useEffect, useState } from 'react'
import { LayoutGrid, MessageSquareX, Minus, X, Send } from 'lucide-react'
import SparkLogo from './SparkLogo'

export type ChatDemo = {
  /** Opening bot greeting (optional — falls back to a generic one) */
  greeting?: string
  /** Visitor message */
  q: string
  /** Assistant reply */
  a: string
  /** Suggestion chips shown after the reply */
  chips?: string[]
}

const DEFAULT_GREETING = "Hi! I'm the Spark assistant for this site — ask me anything."

/**
 * SparkChatWidget — a themed replica of the Helllo.ai chat widget
 * (header with avatar + Connected status, bubble thread, suggestion
 * chips, input bar, "Powered by helllo.ai" footer) that plays a
 * simulated conversation whenever `demo` changes.
 *
 * Stages: greeting → visitor message → typing dots → reply → chips.
 */
export default function SparkChatWidget({
  demo,
  agentName = 'Spark Assistant',
}: {
  demo: ChatDemo
  agentName?: string
}) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    setStage(0)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setStage(4)
      return
    }
    const timers = [
      window.setTimeout(() => setStage(1), 450),
      window.setTimeout(() => setStage(2), 1050),
      window.setTimeout(() => setStage(3), 2050),
      window.setTimeout(() => setStage(4), 2450),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [demo])

  const chips = demo.chips ?? []

  return (
    <div className="chatw" role="figure" aria-label={`Example conversation: ${demo.q}`}>
      {/* Header */}
      <div className="chatw-header">
        <div className="chatw-avatar">
          <SparkLogo size={16} fill="white" ripples={false} />
          <span className="chatw-avatar-dot" />
        </div>
        <div className="min-w-0 leading-tight">
          <div className="chatw-name truncate">{agentName}</div>
          <div className="chatw-status">Connected</div>
        </div>
        <div className="chatw-header-actions" aria-hidden="true">
          <LayoutGrid className="h-4 w-4" />
          <MessageSquareX className="h-4 w-4" />
          <Minus className="h-4 w-4" />
          <X className="h-4 w-4" />
        </div>
      </div>

      {/* Thread */}
      <div className="chatw-body" aria-live="polite">
        <div className="chatw-msg chatw-bubble-bot">{demo.greeting ?? DEFAULT_GREETING}</div>
        {stage >= 1 && <div className="chatw-msg chatw-bubble-user">{demo.q}</div>}
        {stage === 2 && (
          <div className="chatw-msg chatw-typing" aria-label="Assistant is typing">
            <span /><span /><span />
          </div>
        )}
        {stage >= 3 && <div className="chatw-msg chatw-bubble-bot">{demo.a}</div>}
      </div>

      {/* Suggestion chips */}
      {chips.length > 0 && (
        <div className="chatw-chips">
          {chips.map((chip) => (
            <span
              key={chip}
              className={`chatw-chip chatw-msg ${stage >= 4 ? '' : 'invisible'}`}
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="chatw-inputbar">
        <div className="chatw-input select-none">Type a message...</div>
        <span className="chatw-send" aria-hidden="true">
          <Send className="h-4 w-4" style={{ transform: 'translateX(-1px)' }} />
        </span>
      </div>

      <div className="chatw-footer">
        Powered by <a href="https://helllo.ai">helllo.ai</a>
      </div>
    </div>
  )
}
