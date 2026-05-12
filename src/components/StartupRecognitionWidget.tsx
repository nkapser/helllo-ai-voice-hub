import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Award, ExternalLink, X } from "lucide-react";
import {
  GOOGLE_CLOUD_STARTUP_URL,
  SAP_STARTUP_URL,
  STARTUP_INDIA_URL,
} from "@/lib/recognition-programmes";

const CASCADE_STAGGER_MS = 110;

const ROWS = [
  {
    key: "sap",
    href: SAP_STARTUP_URL,
    ariaLabel: "SAP Startup Studio — SAP India news (opens in new tab)",
    title: "SAP Startup Studio",
    subtitle: "Enterprise innovation programme",
    renderVisual: () => (
      <img
        src="/logos/sap-logo.svg"
        alt=""
        className="h-7 w-auto shrink-0 object-contain"
        width={100}
        height={40}
      />
    ),
  },
  {
    key: "google",
    href: GOOGLE_CLOUD_STARTUP_URL,
    ariaLabel: "Google for Startups Cloud Program (opens in new tab)",
    title: "Google for Startups · Cloud",
    subtitle: "Credits, support & scale on Google Cloud",
    renderVisual: () => (
      <div className="flex shrink-0 items-center gap-1.5">
        <img
          src="/logos/google-wordmark.svg"
          alt=""
          className="h-5 w-auto object-contain"
          width={120}
          height={41}
        />
      </div>
    ),
  },
  {
    key: "dpiit",
    href: STARTUP_INDIA_URL,
    ariaLabel: "DPIIT recognised startup — Startup India (opens in new tab)",
    title: "DPIIT recognised",
    subtitle: "Startup India · Govt. of India",
    renderVisual: () => (
      <span className="flex shrink-0 items-center gap-2">
        <span
          className="flex h-3 w-11 overflow-hidden rounded-[3px] ring-1 ring-border"
          aria-hidden="true"
        >
          <span className="flex-1 bg-[#FF9933]" />
          <span className="flex-1 bg-white" />
          <span className="flex-1 bg-[#138808]" />
        </span>
        <span className="text-lg leading-none" aria-hidden="true">
          🇮🇳
        </span>
      </span>
    ),
  },
] as const;

/**
 * Floating launcher below the site header (top-right) for SAP / Google Cloud / DPIIT recognitions.
 */
const StartupRecognitionWidget = () => {
  const [open, setOpen] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  useEffect(() => {
    if (!open) return;
    setPlayKey((k) => k + 1);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, close]);

  return (
    <>
      <style>{`
        @keyframes startup-recognition-cascade {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .startup-recognition-cascade-row {
          animation: startup-recognition-cascade 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .startup-recognition-cascade-row {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
        @keyframes startup-recognition-halo {
          0%, 100% {
            box-shadow: 0 0 0 0 hsl(var(--primary) / 0.45), 0 0 0 0 hsl(var(--primary) / 0.2);
          }
          50% {
            box-shadow: 0 0 0 10px hsl(var(--primary) / 0), 0 0 24px 6px hsl(var(--primary) / 0.35);
          }
        }
        .startup-recognition-halo-ring {
          animation: startup-recognition-halo 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .startup-recognition-halo-ring {
            animation: none;
            box-shadow: 0 0 0 2px hsl(var(--primary) / 0.25);
          }
        }
      `}</style>

      <div
        ref={rootRef}
        className="fixed right-4 top-[4.25rem] z-[100] flex flex-col items-end gap-3 sm:right-6 lg:right-8"
      >
        <div className="relative">
          <div
            className="startup-recognition-halo-ring pointer-events-none absolute -inset-[3px] rounded-full"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={
              open ? "Close programme recognitions panel" : "View programme recognitions"
            }
            className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-background shadow-lg ring-2 ring-primary/20 transition hover:scale-105 hover:bg-muted/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Award
              className="h-6 w-6 text-amber-600 drop-shadow-sm dark:text-amber-400"
              strokeWidth={2.15}
              aria-hidden="true"
            />
          </button>
        </div>

        {open && (
          <div
            id={panelId}
            key={playKey}
            role="dialog"
            aria-label="Startup programme recognitions"
            className="w-[min(92vw,18.5rem)] overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Recognised programmes
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Close recognitions panel"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col divide-y divide-border/60 p-1">
              {ROWS.map((row, index) => (
                <a
                  key={row.key}
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={row.ariaLabel}
                  className="startup-recognition-cascade-row flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-muted/60"
                  style={{ animationDelay: `${index * CASCADE_STAGGER_MS}ms` }}
                >
                  <div className="flex w-14 shrink-0 items-center justify-start sm:w-16">
                    {row.renderVisual()}
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-semibold leading-snug text-foreground">
                      {row.title}
                    </p>
                    <p className="text-[11px] leading-snug text-muted-foreground">{row.subtitle}</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-40" aria-hidden="true" />
                </a>
              ))}
            </div>
            <a
              href="#recognition"
              className="block border-t border-border/60 bg-muted/20 px-4 py-2.5 text-center text-[11px] font-medium text-primary transition hover:bg-muted/40 hover:underline"
              onClick={close}
            >
              Full accreditation section
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default StartupRecognitionWidget;
