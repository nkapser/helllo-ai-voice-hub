/** Startup India — DPIIT startup recognition programme (official portal). */
const STARTUP_INDIA_URL =
  "https://www.startupindia.gov.in/content/sih/en/government-schemes.html";

/** Small fixed edge strip below the header — reads as a light ribbon without dominating the layout. */
export function DpiitRibbon() {
  return (
    <a
      href={STARTUP_INDIA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-[4.25rem] right-0 z-40 rounded-l border border-r-0 border-border bg-background/90 px-2 py-1 text-[10px] font-medium leading-tight text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground"
      aria-label="DPIIT recognised startup — Startup India (opens in new tab)"
    >
      <span className="flex flex-col items-center gap-0.5">
        <span className="text-[13px] leading-none" aria-hidden="true">
          🇮🇳
        </span>
        <span className="block uppercase tracking-wide">DPIIT</span>
        <span className="block text-center text-[9px] font-normal opacity-90">recognised</span>
      </span>
    </a>
  );
}
