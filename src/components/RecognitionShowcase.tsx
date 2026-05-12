import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import {
  GOOGLE_CLOUD_STARTUP_URL,
  SAP_STARTUP_URL,
  STARTUP_INDIA_URL,
} from "@/lib/recognition-programmes";

type RecognitionCardProps = {
  href: string;
  ariaLabel: string;
  children: ReactNode;
};

function RecognitionCard({ href, ariaLabel, children }: RecognitionCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group relative flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
    >
      {children}
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
        View programme
        <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
      </span>
    </a>
  );
}

function DpiitLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className="flex h-2 w-full max-w-[10rem] overflow-hidden rounded-full shadow-sm ring-1 ring-black/5"
        aria-hidden="true"
      >
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-lg font-bold tracking-tight text-foreground">DPIIT recognised</p>
        <p className="text-xs leading-snug text-muted-foreground">
          Startup India · Govt. of India
        </p>
      </div>
    </div>
  );
}

/** Compact logos for the footer — reinforces credibility without repeating the full section. */
export function RecognitionLogoStrip() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
      role="list"
      aria-label="Programme and recognition partners"
    >
      <a
        href={SAP_STARTUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-background/5 px-4 py-2 transition-colors hover:bg-background/10"
        aria-label="SAP startup programmes (opens in new tab)"
        role="listitem"
      >
        <img
          src="/logos/sap-logo.svg"
          alt="SAP"
          className="h-6 w-auto"
          width={120}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </a>
      <a
        href={GOOGLE_CLOUD_STARTUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-background/5 px-4 py-2 transition-colors hover:bg-background/10"
        aria-label="Google for Startups Cloud Program (opens in new tab)"
        role="listitem"
      >
        <div className="flex flex-col items-center gap-1">
          <img
            src="/logos/google-wordmark.svg"
            alt="Google"
            className="h-[18px] w-auto sm:h-5"
            width={272}
            height={92}
            loading="lazy"
            decoding="async"
          />
          <span className="text-[10px] font-medium tracking-wide text-background/55">
            for Startups · Cloud
          </span>
        </div>
      </a>
      <a
        href={STARTUP_INDIA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-background/5 px-4 py-3 transition-colors hover:bg-background/10"
        aria-label="DPIIT recognised startup — Startup India (opens in new tab)"
        role="listitem"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none" aria-hidden="true">
            🇮🇳
          </span>
          <div className="text-left">
            <p className="text-xs font-semibold leading-tight text-background/90">DPIIT</p>
            <p className="text-[10px] leading-tight text-background/55">Startup India</p>
          </div>
        </div>
      </a>
    </div>
  );
}

const RecognitionShowcase = () => {
  return (
    <section
      id="recognition"
      className="relative snap-start border-y border-border/60 bg-gradient-to-b from-muted/40 via-background to-background py-14 md:py-20"
      aria-labelledby="recognition-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]"
        aria-hidden="true"
      />
      <div className="container relative mx-auto px-4 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Backed by recognised programmes
          </p>
          <h2
            id="recognition-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Vetted by industry leaders you already trust
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            From India’s national startup registry to SAP and Google accelerators — proof
            you can diligence, whether you are investing or buying enterprise voice AI.
          </p>
        </header>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3 md:gap-5">
          <RecognitionCard
            href={SAP_STARTUP_URL}
            ariaLabel="SAP startup programmes — SAP Startup Studio (opens in new tab)"
          >
            <div className="flex min-h-[100px] flex-col items-center justify-center gap-3">
              <img
                src="/logos/sap-logo.svg"
                alt="SAP"
                className="h-10 w-auto max-w-[9rem] object-contain md:h-11"
                width={180}
                height={89}
                loading="eager"
                decoding="async"
              />
              <p className="text-sm font-semibold text-foreground">SAP Startup Studio</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Building enterprise-grade voice workflows alongside SAP’s innovation ecosystem.
              </p>
            </div>
          </RecognitionCard>

          <RecognitionCard
            href={GOOGLE_CLOUD_STARTUP_URL}
            ariaLabel="Google for Startups Cloud Program (opens in new tab)"
          >
            <div className="flex min-h-[100px] flex-col items-center justify-center gap-2">
              <img
                src="/logos/google-wordmark.svg"
                alt="Google"
                className="h-8 w-auto max-w-[8.5rem] object-contain md:h-9"
                width={272}
                height={92}
                loading="eager"
                decoding="async"
              />
              <p className="text-sm font-semibold text-foreground">
                for Startups · Cloud Program
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Cloud, credits, and technical depth to ship secure, scalable AI voice at speed.
              </p>
            </div>
          </RecognitionCard>

          <RecognitionCard
            href={STARTUP_INDIA_URL}
            ariaLabel="DPIIT recognised startup — Startup India (opens in new tab)"
          >
            <div className="flex min-h-[100px] flex-col items-center justify-center">
              <DpiitLockup />
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                National recognition under DPIIT — the standard banks, enterprises, and LPs look for
                in India.
              </p>
            </div>
          </RecognitionCard>
        </div>
      </div>
    </section>
  );
};

export default RecognitionShowcase;
