import Wordmark from "./Wordmark";

const RevFooter = () => (
  <footer className="relative z-10 border-t border-[var(--rev-hairline)] px-5 py-10 md:px-8">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
      <div className="flex items-center gap-3">
        <a href="/" aria-label="RevEngg home">
          <Wordmark className="text-lg" />
        </a>
        <span className="rev-mono text-[9px] text-[var(--rev-ink-50)]">
          by helllo.ai
        </span>
      </div>

      <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
        {[
          { label: "Helllo Voice", href: "/helllo" },
          { label: "Spark", href: "/spark" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "hi@helllo.ai", href: "mailto:hi@helllo.ai" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-[13px] font-medium text-[var(--rev-ink-70)] transition-colors hover:text-[var(--rev-ink)]"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <p className="rev-mono text-[9px] text-[var(--rev-ink-50)]">
        © {new Date().getFullYear()} helllo.ai
      </p>
    </div>
  </footer>
);

export default RevFooter;
