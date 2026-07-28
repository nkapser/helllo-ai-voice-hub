import { TrendingUp, Radio, MessageSquare, Megaphone, Users } from "lucide-react";
import { useCountUp, useInView } from "../lib/hooks";

/**
 * Hero dashboard — a believable RevEngg "Revenue Overview" screen,
 * built entirely from markup + SVG. No stock imagery.
 */

const channels = [
  { label: "WhatsApp", value: 38, cls: "bg-[var(--rev-green)]" },
  { label: "Voice", value: 27, cls: "bg-[#1F2937]" },
  { label: "Email", value: 21, cls: "bg-[#94A3B8]" },
  { label: "Web", value: 14, cls: "bg-[#CBD5E1]" },
];

const kpis = [
  { icon: Users, label: "Qualified Leads", value: 1284, delta: "+18.2%" },
  { icon: Megaphone, label: "Campaigns", value: 24, delta: "+6 live" },
  { icon: MessageSquare, label: "Conversations", value: 8931, delta: "+31.4%" },
];

function formatInt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

const DashboardIllustration = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const revenue = useCountUp(482630, inView, 1800);
  const repeat = useCountUp(41.8, inView, 1600);

  return (
    <div
      ref={ref}
      className={`rev-reveal ${inView ? "rev-in" : ""} relative`}
      aria-label="RevEngg revenue overview dashboard illustration"
      role="img"
    >
      {/* soft green glow behind the app frame */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(159,234,40,0.18),transparent_70%)]"
      />

      <div className="rev-card relative overflow-hidden !rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(15,23,42,0.25)]">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-[var(--rev-hairline)] px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="rev-mono ml-3 text-[10px] text-[var(--rev-ink-50)]">
            app.revengg.ai / revenue
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[var(--rev-green-soft)] px-2.5 py-1">
            <span className="rev-blink h-1.5 w-1.5 rounded-full bg-[var(--rev-green-deep)]" />
            <span className="rev-mono text-[9px] text-[var(--rev-green-deep)]">live</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-5">
          {/* Revenue overview */}
          <div className="sm:col-span-3">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="rev-mono text-[10px] text-[var(--rev-ink-50)]">Revenue Overview</p>
                <p className="rev-display mt-1 text-3xl tabular-nums">
                  ${formatInt(revenue)}
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-[var(--rev-green-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--rev-green-deep)]">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                +24.6%
              </span>
            </div>

            {/* Revenue trend */}
            <svg
              viewBox="0 0 320 120"
              className="mt-4 w-full"
              aria-hidden="true"
              style={{ contain: "paint" }}
            >
              <defs>
                <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9FEA28" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#9FEA28" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[24, 56, 88].map((y) => (
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#E2E8F0" strokeWidth="1" />
              ))}
              <path
                d="M0 96 C30 92 44 84 62 82 C84 79 92 68 116 66 C140 64 150 52 176 50 C202 48 212 40 238 34 C260 29 282 22 320 12 L320 120 L0 120 Z"
                fill="url(#revArea)"
                className={inView ? "rev-active rev-pop" : "opacity-0"}
                style={{ "--rev-d": "900ms" } as React.CSSProperties}
              />
              <path
                d="M0 96 C30 92 44 84 62 82 C84 79 92 68 116 66 C140 64 150 52 176 50 C202 48 212 40 238 34 C260 29 282 22 320 12"
                fill="none"
                stroke="#1F2937"
                strokeWidth="2"
                strokeLinecap="round"
                className="rev-draw"
                style={{ "--rev-draw-len": "420" } as React.CSSProperties}
              />
              <circle cx="320" cy="12" r="3.5" fill="#9FEA28" stroke="#1F2937" strokeWidth="1.5" />
              <circle cx="320" cy="12" r="8" fill="#9FEA28" opacity="0.25" className="rev-pulse" />
            </svg>
            <div className="rev-mono mt-1 flex justify-between text-[9px] text-[var(--rev-ink-30)]">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span>
            </div>
          </div>

          {/* right rail */}
          <div className="flex flex-col gap-3 sm:col-span-2">
            {/* Repeat purchase rate */}
            <div className="rounded-xl border border-[var(--rev-hairline)] p-4">
              <p className="rev-mono text-[10px] text-[var(--rev-ink-50)]">Repeat Purchase Rate</p>
              <div className="mt-2 flex items-center gap-3">
                <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90" aria-hidden="true">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                  <circle
                    cx="22" cy="22" r="18" fill="none" stroke="#9FEA28" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="113"
                    strokeDashoffset={113 - (113 * repeat) / 100}
                  />
                </svg>
                <div>
                  <p className="rev-display text-xl tabular-nums">{repeat.toFixed(1)}%</p>
                  <p className="text-[11px] text-[var(--rev-ink-50)]">vs 28.4% last qtr</p>
                </div>
              </div>
            </div>

            {/* Revenue channels */}
            <div className="rounded-xl border border-[var(--rev-hairline)] p-4">
              <p className="rev-mono mb-3 text-[10px] text-[var(--rev-ink-50)]">Revenue Channels</p>
              <div className="flex flex-col gap-2.5">
                {channels.map((c, i) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <span className="w-16 text-[11px] font-medium text-[var(--rev-ink-70)]">
                      {c.label}
                    </span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
                      <span
                        className={`absolute inset-y-0 left-0 rounded-full ${c.cls} ${inView ? "rev-active rev-grow-x" : "scale-x-0"}`}
                        style={{ width: `${c.value * 2.4}%`, "--rev-d": `${300 + i * 120}ms` } as React.CSSProperties}
                      />
                    </span>
                    <span className="rev-mono w-8 text-right text-[9px] text-[var(--rev-ink-50)]">
                      {c.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-3 gap-3 sm:col-span-5">
            {kpis.map((k) => (
              <KpiTile key={k.label} {...k} start={inView} />
            ))}
          </div>
        </div>
      </div>

      {/* floating agent chip */}
      <div className="rev-card absolute -left-4 -bottom-5 hidden items-center gap-2.5 !rounded-full px-4 py-2.5 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.35)] sm:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--rev-ink)]">
          <Radio className="h-3.5 w-3.5 text-[var(--rev-green)]" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[11px] font-semibold leading-tight">Agent closed order #4817</p>
          <p className="rev-mono text-[8px] text-[var(--rev-ink-50)]">WhatsApp · 14s ago</p>
        </div>
      </div>
    </div>
  );
};

const KpiTile = ({
  icon: Icon,
  label,
  value,
  delta,
  start,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  delta: string;
  start: boolean;
}) => {
  const v = useCountUp(value, start, 1500);
  return (
    <div className="rounded-xl border border-[var(--rev-hairline)] p-3.5">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-[var(--rev-ink-50)]" aria-hidden="true" />
        <p className="rev-mono text-[9px] text-[var(--rev-ink-50)]">{label}</p>
      </div>
      <p className="rev-display mt-1.5 text-lg tabular-nums">{formatInt(v)}</p>
      <p className="text-[10px] font-medium text-[var(--rev-green-deep)]">{delta}</p>
    </div>
  );
};

export default DashboardIllustration;
