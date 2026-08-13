import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Wordmark from "./Wordmark";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardUrl, getDashboardAuthSignInUrl } from "@/lib/dashboard";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Helllo Voice", href: "/helllo" },
  { label: "Spark", href: "/spark" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAuthAction = () => {
    window.location.replace(
      user ? getDashboardUrl("/console") : getDashboardAuthSignInUrl("/console")
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "rev-glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="/" aria-label="RevEngg home" className="flex items-center gap-2.5">
          <Wordmark className="text-[1.4rem]" />
          <span className="hidden items-center rounded-full border border-[var(--rev-hairline)] bg-[var(--rev-surface)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--rev-ink-70)] sm:inline-flex">
            Private Alpha
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[var(--rev-ink-70)] transition-colors duration-200 hover:text-[var(--rev-ink)]"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleAuthAction}
            disabled={loading}
            aria-label={loading ? "Loading user data" : user ? "Go to console dashboard" : "Sign in to your account"}
            className="rev-btn rev-btn-ghost !min-h-0 !px-5 !py-2.5 text-sm"
          >
            {loading ? "Loading..." : user ? "Console" : "Sign In"}
          </button>
          <a href="/helllo#contact" className="rev-btn rev-btn-primary !min-h-0 !px-5 !py-2.5 text-sm">
            Book a Demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-b border-[var(--rev-hairline)] bg-[var(--rev-paper)] px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-[var(--rev-ink)] transition-colors hover:bg-[var(--rev-surface)]"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleAuthAction();
              }}
              disabled={loading}
              aria-label={loading ? "Loading user data" : user ? "Go to console dashboard" : "Sign in to your account"}
              className="rev-btn rev-btn-ghost mt-3"
            >
              {loading ? "Loading..." : user ? "Console" : "Sign In"}
            </button>
            <a
              href="/helllo#contact"
              onClick={() => setOpen(false)}
              className="rev-btn rev-btn-primary mt-3"
            >
              Book a Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;
