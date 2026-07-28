import { getDashboardAuthSignInUrl } from '@/lib/dashboard'
import SparkLogo from './SparkLogo'

export default function Nav() {
  const signInUrl = getDashboardAuthSignInUrl('/console/spark')
  return (
    <header className="mx-auto w-full max-w-6xl border-b border-[hsl(var(--spark-border)/0.7)] px-4 py-4 sm:px-6">
      <nav className="relative z-10 flex items-center justify-between">
        <a href="/spark" className="flex items-center gap-3">
          <SparkLogo size={30} />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight spark-text-primary">
              Spark
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.12em] spark-text-muted">
              by Helllo.ai
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="/"
            className="text-sm spark-text-muted transition-colors hover:text-[hsl(215_28%_17%)]"
          >
            Home
          </a>
          <a
            href="https://www.helllo.ai"
            className="hidden text-sm spark-text-muted transition-colors hover:text-[hsl(215_28%_17%)] sm:inline"
          >
            Helllo.ai
          </a>
          <a
            href={signInUrl}
            className="spark-btn-secondary inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium"
          >
            Sign in
          </a>
        </div>
      </nav>
    </header>
  )
}
