import { useState, type FormEvent } from 'react'
import { Globe, ArrowRight, Loader2 } from 'lucide-react'
import { sparkAppUrl } from '../lib/utils'

interface URLInputProps {
  id?: string
  placeholder?: string
  size?: 'default' | 'large'
}

const EXAMPLE_URLS = ['stripe.com', 'notion.so', 'linear.app']

export default function URLInput({
  id = 'url-input',
  placeholder = 'yourwebsite.com',
  size = 'default',
}: URLInputProps) {
  const [url, setUrl]         = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    // Small delay for feel
    setTimeout(() => {
      window.location.href = sparkAppUrl(url)
    }, 300)
  }

  const isLarge = size === 'large'

  return (
    <div className="w-full">
      {/* ── Main input card ── */}
      <form onSubmit={handleSubmit}>
        <div
          id={id}
          className="url-input-wrap glass flex items-center rounded-xl overflow-hidden"
          style={{ padding: isLarge ? '6px 6px 6px 16px' : '5px 5px 5px 14px' }}
        >
          <Globe
            className="flex-shrink-0 mr-2"
            style={{ color: 'rgba(255,255,255,0.38)', width: isLarge ? 18 : 16, height: isLarge ? 18 : 16 }}
          />
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30 min-w-0"
            style={{ fontSize: isLarge ? 16 : 14 }}
            autoComplete="url"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-spark flex-shrink-0 flex items-center gap-2 rounded-lg font-medium text-white disabled:opacity-70"
            style={{ padding: isLarge ? '10px 20px' : '8px 16px', fontSize: isLarge ? 14 : 13 }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Try it free
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* ── Example chips ── */}
      <div className="flex items-center flex-wrap gap-2 mt-3">
        <span className="text-[11.5px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Try:
        </span>
        {EXAMPLE_URLS.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setUrl(ex)}
            className="text-[11.5px] px-2.5 py-1 rounded-md transition-all duration-150"
            style={{
              color: 'rgba(255,255,255,0.45)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(124,92,255,0.9)'
              e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
