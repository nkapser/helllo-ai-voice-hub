import { useState, type FormEvent } from 'react'
import { Globe, ArrowRight, Loader2, Zap, Lock, Sparkles } from 'lucide-react'
import { sparkAppUrl } from '../lib/utils'

interface URLInputProps {
  id?: string
  placeholder?: string
  showExamples?: boolean
  showTrustRow?: boolean
}

const EXAMPLE_URLS = ['stripe.com', 'notion.so', 'linear.app']

export default function URLInput({
  id = 'url-input',
  placeholder = 'yourwebsite.com',
  showExamples = true,
  showTrustRow = false,
}: URLInputProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setTimeout(() => {
      window.location.href = sparkAppUrl(url)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        id={id}
        className="url-input-wrap glass flex items-center gap-2 rounded-2xl p-2 shadow-elevated transition-all focus-within:ring-2 focus-within:ring-[rgba(96,165,250,0.4)]"
      >
        <span className="pl-3 spark-text-muted">
          <Globe className="h-5 w-5" />
        </span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none focus:ring-0"
          autoComplete="url"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="btn-spark inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-5 text-sm font-medium transition hover:scale-[1.02]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Try it free
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {showTrustRow && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs spark-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[var(--spark)]" />
            Free to start
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[var(--spark)]" />
            Your data, your site
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[var(--spark)]" />
            Live in 60s
          </span>
        </div>
      )}

      {showExamples && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {EXAMPLE_URLS.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setUrl(ex)}
              className="spark-chip rounded-full px-3 py-1 font-mono text-xs"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </form>
  )
}
