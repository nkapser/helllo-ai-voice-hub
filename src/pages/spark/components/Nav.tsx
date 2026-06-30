import { useState } from 'react'
import { Sparkles, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'How it works', href: '/spark#how-it-works' },
  { label: 'Superpowers',  href: '/spark#superpowers' },
  { label: 'Pricing',      href: '/spark#pricing' },
  { label: 'FAQ',          href: '/spark#faq' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(6,8,21,0.78)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="/spark" className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#7c5cff,#22d3ee)' }}
          >
            <Sparkles className="w-4 h-4 text-white" strokeWidth={1.8} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-semibold text-white text-[15px] tracking-tight"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Spark
            </span>
            <span className="text-[11px] hidden sm:block" style={{ color: 'rgba(255,255,255,0.38)' }}>
              by Helllo.ai
            </span>
          </div>
        </a>

        {/* ── Desktop nav links ── */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[13.5px] transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://app.helllo.ai/auth/signin?redirect=/console/spark"
            className="text-[13.5px] px-4 py-2 rounded-lg transition-all duration-150"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Sign in
          </a>
          <a
            href="/spark#hero-input"
            className="btn-spark text-[13.5px] font-medium px-5 py-2 rounded-lg text-white"
          >
            Try it free
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'rgba(255,255,255,0.65)' }}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          className="md:hidden px-5 pb-5 pt-3 flex flex-col gap-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="py-2.5 text-sm"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="pt-3 mt-2 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <a
              href="https://app.helllo.ai/auth/signin?redirect=/console/spark"
              className="text-sm text-center py-2.5 rounded-lg"
              style={{
                color: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Sign in
            </a>
            <a
              href="/spark#hero-input"
              className="btn-spark text-sm font-medium py-2.5 rounded-lg text-white text-center"
              onClick={() => setOpen(false)}
            >
              Try it free
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
