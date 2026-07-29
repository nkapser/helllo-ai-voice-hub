/**
 * FeatureVisuals — seven handcrafted SVG illustrations for the
 * Revenue Engineering Platform section. One shared visual system:
 * paper surfaces, hairline strokes, ink typography, green signal.
 *
 * Each visual re-animates when its parent panel gains `.rev-active`.
 */

const MONO = "'Geist Mono', ui-monospace, monospace";
const SANS = "'Inter', system-ui, sans-serif";
const DISPLAY = "'Geist', 'Inter', sans-serif";

const INK = "#1F2937";
const INK50 = "#64748B";
const INK70 = "#475569";
const GREEN = "#60A5FA"; // accent (blue flavor under review; legacy green #9FEA28)
const GREEN_DEEP = "#1D4ED8";
const HAIR = "#CBD5E1";
const PAPER = "#F8FAFC";
const SOFT = "#F1F5F9";

const d = (ms: number) => ({ "--rev-d": `${ms}ms` } as React.CSSProperties);

/* ---------- shared primitives ---------- */

const Card = ({
  x, y, w, h, r = 12, fill = "#fff",
}: { x: number; y: number; w: number; h: number; r?: number; fill?: string }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={HAIR} strokeWidth="1.5" />
);

const Label = ({
  x, y, children, size = 10, fill = INK70, anchor = "start", weight = 500,
}: {
  x: number; y: number; children: React.ReactNode; size?: number;
  fill?: string; anchor?: "start" | "middle" | "end"; weight?: number;
}) => (
  <text
    x={x} y={y} fontFamily={MONO} fontSize={size} fill={fill}
    textAnchor={anchor} letterSpacing="1" fontWeight={weight}
  >
    {children}
  </text>
);

const Body = ({
  x, y, children, size = 12, fill = INK, anchor = "start", weight = 500, family = SANS,
}: {
  x: number; y: number; children: React.ReactNode; size?: number;
  fill?: string; anchor?: "start" | "middle" | "end"; weight?: number; family?: string;
}) => (
  <text x={x} y={y} fontFamily={family} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight}>
    {children}
  </text>
);

const Tick = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r="7" fill={GREEN} />
    <path d={`M${x - 3} ${y} l2.2 2.4 l4 -4.6`} fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/* ---------- 1 · Lead Discovery ---------- */

export const DiscoveryVisual = () => {
  const sources = [
    "Facebook Ads", "Google Ads", "Website Visitors",
    "Organic Search", "WhatsApp Leads", "Marketplaces",
  ];
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="Acquisition channels flowing into one unified lead pipeline">
      {sources.map((s, i) => {
        const y = 34 + i * 58;
        return (
          <g key={s} className="rev-pop" style={d(i * 90)}>
            <Card x={24} y={y} w={168} h={40} r={20} />
            <circle cx={48} cy={y + 20} r="5" fill={GREEN} opacity="0.9" />
            <Body x={62} y={y + 24} size={12}>{s}</Body>
          </g>
        );
      })}
      {/* converging trajectories */}
      {sources.map((s, i) => {
        const y = 54 + i * 58;
        return (
          <path
            key={s}
            d={`M196 ${y} C300 ${y}, 320 200, 400 200`}
            fill="none" stroke={HAIR} strokeWidth="1.5"
          />
        );
      })}
      {sources.map((s, i) => {
        const y = 54 + i * 58;
        return (
          <path
            key={`f-${s}`}
            d={`M196 ${y} C300 ${y}, 320 200, 400 200`}
            fill="none" stroke={GREEN} strokeWidth="2" className="rev-flow"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        );
      })}
      {/* unified pipeline */}
      <g className="rev-pop" style={d(500)}>
        <Card x={400} y={128} w={136} h={144} r={16} fill={PAPER} />
        <Label x={468} y={154} anchor="middle" size={9} fill={INK50}>UNIFIED PIPELINE</Label>
        <text x={468} y={196} textAnchor="middle" fontFamily={DISPLAY} fontSize="34" fontWeight="900" fill={INK}>2,847</text>
        <Label x={468} y={216} anchor="middle" size={9} fill={GREEN_DEEP}>HIGH-INTENT LEADS</Label>
        <rect x={424} y={234} width={88} height={6} rx="3" fill={SOFT} />
        <rect x={424} y={234} width={64} height={6} rx="3" fill={GREEN} className="rev-grow-x" style={d(800)} />
        <Label x={468} y={258} anchor="middle" size={8} fill={INK50}>+312 TODAY</Label>
      </g>
      <circle cx={400} cy={200} r="6" fill={GREEN} className="rev-pulse" />
    </svg>
  );
};

/* ---------- 2 · Creative Intelligence ---------- */

export const CreativeVisual = () => {
  const variants = [
    { x: 232, y: 24, tag: "VAR A", score: "3.4% CTR", top: true },
    { x: 400, y: 24, tag: "VAR B", score: "2.1% CTR", top: false },
    { x: 232, y: 212, tag: "VAR C", score: "1.8% CTR", top: false },
    { x: 400, y: 212, tag: "VAR D", score: "2.7% CTR", top: false },
  ];
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="AI generating ad creative variations with headlines and copy">
      {/* brief card */}
      <g className="rev-pop" style={d(0)}>
        <Card x={24} y={120} w={168} h={160} r={16} fill={PAPER} />
        <Label x={44} y={148} size={9} fill={INK50}>CAMPAIGN BRIEF</Label>
        <rect x={44} y={162} width={120} height={7} rx="3.5" fill={INK} opacity="0.85" />
        <rect x={44} y={178} width={94} height={7} rx="3.5" fill={INK} opacity="0.35" />
        <rect x={44} y={194} width={108} height={7} rx="3.5" fill={INK} opacity="0.2" />
        {/* sparkle */}
        <path d="M156 236 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 z" fill={GREEN} />
        <Label x={44} y={262} size={9} fill={GREEN_DEEP}>GENERATING…</Label>
      </g>
      {/* generation beams */}
      {variants.map((v, i) => (
        <path
          key={v.tag}
          d={`M192 200 C215 200, 210 ${v.y + 84}, ${v.x} ${v.y + 84}`}
          fill="none" stroke={GREEN} strokeWidth="1.5" className="rev-flow-slow"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      {/* creative variants */}
      {variants.map((v, i) => (
        <g key={v.tag} className="rev-pop" style={d(200 + i * 130)}>
          <Card x={v.x} y={v.y} w={136} h={164} r={14} />
          {/* image block */}
          <rect x={v.x + 12} y={v.y + 12} width={112} height={62} rx="8" fill={v.top ? GREEN : SOFT} opacity={v.top ? 0.55 : 1} />
          <circle cx={v.x + 34} cy={v.y + 34} r="9" fill="#fff" opacity="0.9" />
          <path d={`M${v.x + 12} ${v.y + 62} l30 -20 24 14 34 -22 24 16 v24 h-112 z`} fill={INK} opacity="0.12" />
          {/* headline lines */}
          <rect x={v.x + 12} y={v.y + 86} width={100} height={6} rx="3" fill={INK} opacity="0.8" />
          <rect x={v.x + 12} y={v.y + 99} width={72} height={6} rx="3" fill={INK} opacity="0.3" />
          {/* CTA chip */}
          <rect x={v.x + 12} y={v.y + 116} width={58} height={20} rx="10" fill={v.top ? GREEN : SOFT} />
          <Body x={v.x + 41} y={v.y + 129} size={8.5} anchor="middle" weight={600}>Shop Now</Body>
          <Label x={v.x + 12} y={v.y + 154} size={8} fill={INK50}>{v.tag}</Label>
          <Label x={v.x + 124} y={v.y + 154} size={8} fill={v.top ? GREEN_DEEP : INK50} anchor="end">{v.score}</Label>
          {v.top && (
            <g>
              <rect x={v.x + 78} y={v.y - 9} width={58} height={18} rx="9" fill={INK} />
              <Label x={v.x + 107} y={v.y + 3} size={7.5} fill={GREEN} anchor="middle">WINNER</Label>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
};

/* ---------- 3 · Lead Enrichment ---------- */

export const EnrichmentVisual = () => {
  const rows = [
    ["Company", "Glowory Naturals"],
    ["Revenue", "$2.1M ARR"],
    ["Industry", "Beauty · B2C"],
    ["Buying Intent", "High"],
    ["Location", "Mumbai, IN"],
    ["Social", "@glowory · 48k"],
  ];
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="Customer profile automatically enriched with firmographic and behavioral intelligence">
      {/* base profile */}
      <g className="rev-pop" style={d(0)}>
        <Card x={40} y={96} w={180} h={110} r={16} />
        <circle cx={76} cy={132} r="18" fill={SOFT} />
        <circle cx={76} cy={126} r="7" fill={INK} opacity="0.35" />
        <path d="M62 144 a14 9 0 0 1 28 0" fill={INK} opacity="0.35" />
        <Body x={104} y={128} size={13} weight={600} family={DISPLAY}>Ananya S.</Body>
        <Label x={104} y={146} size={8.5} fill={INK50}>ananya@glowory.in</Label>
        <rect x={56} y={168} width={70} height={18} rx="9" fill={GREEN} opacity="0.2" />
        <Label x={91} y={180} size={7.5} fill={GREEN_DEEP} anchor="middle">NEW LEAD</Label>
      </g>
      {/* enrichment feed lines */}
      <path d="M220 150 C260 150, 260 60, 300 60" fill="none" stroke={HAIR} strokeWidth="1.5" />
      <path d="M220 150 C260 150, 260 60, 300 60" fill="none" stroke={GREEN} strokeWidth="1.5" className="rev-flow-slow" />
      <path d="M220 160 C270 165, 270 340, 300 340" fill="none" stroke={HAIR} strokeWidth="1.5" />
      <path d="M220 160 C270 165, 270 340, 300 340" fill="none" stroke={GREEN} strokeWidth="1.5" className="rev-flow-slow" style={{ animationDelay: "1s" }} />
      {/* expanding intelligence rows */}
      {rows.map(([k, v], i) => {
        const y = 32 + i * 56;
        return (
          <g key={k} className="rev-pop" style={d(150 + i * 130)}>
            <Card x={300} y={y} w={228} h={44} r={12} fill={i === 3 ? PAPER : "#fff"} />
            <Label x={318} y={y + 19} size={8} fill={INK50}>{k.toUpperCase()}</Label>
            <Body x={318} y={y + 34} size={11.5} weight={600}>{v}</Body>
            <Tick x={508} y={y + 22} />
            {k === "Buying Intent" && (
              <g>
                <rect x={402} y={y + 24} width={80} height={5} rx="2.5" fill={SOFT} />
                <rect x={402} y={y + 24} width={66} height={5} rx="2.5" fill={GREEN} className="rev-grow-x" style={d(700)} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* ---------- 4 · Qualification ---------- */

export const QualificationVisual = () => {
  const signals = [
    "Visited pricing ×3", "Cart value $184", "Replied on WhatsApp", "Opened 4 emails",
  ];
  const queue = [
    { p: "P1", name: "Ananya S.", score: 92 },
    { p: "P2", name: "Rahul M.", score: 78 },
    { p: "P3", name: "Devika K.", score: 61 },
  ];
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="AI lead scoring with buying signals and priority queue">
      {/* score gauge */}
      <g className="rev-pop" style={d(0)}>
        <Card x={32} y={40} w={200} h={190} r={18} />
        <Label x={132} y={70} size={9} fill={INK50} anchor="middle">LEAD SCORE</Label>
        <g transform="translate(132 150)">
          <path d="M-58 28 A 64 64 0 1 1 58 28" fill="none" stroke={SOFT} strokeWidth="11" strokeLinecap="round" />
          <path
            d="M-58 28 A 64 64 0 1 1 58 28"
            fill="none" stroke={GREEN} strokeWidth="11" strokeLinecap="round"
            className="rev-draw" style={{ "--rev-draw-len": "320" } as React.CSSProperties}
            pathLength={366}
          />
          <text x="0" y="8" textAnchor="middle" fontFamily={DISPLAY} fontSize="42" fontWeight="900" fill={INK}>87</text>
          <Label x={0} y={30} size={8.5} fill={GREEN_DEEP} anchor="middle">SALES-READY</Label>
        </g>
      </g>
      {/* buying signals */}
      <Label x={32} y={266} size={9} fill={INK50}>BUYING SIGNALS</Label>
      {signals.map((s, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 32 + col * 128;
        const y = 280 + row * 42;
        return (
          <g key={s} className="rev-pop" style={d(300 + i * 110)}>
            <rect x={x} y={y} width={118} height={30} rx="15" fill="#fff" stroke={HAIR} strokeWidth="1.5" />
            <circle cx={x + 16} cy={y + 15} r="3.5" fill={GREEN} />
            <Body x={x + 27} y={y + 19} size={9}>{s}</Body>
          </g>
        );
      })}
      {/* priority queue */}
      <Label x={300} y={62} size={9} fill={INK50}>PRIORITY QUEUE</Label>
      {queue.map((q, i) => {
        const y = 76 + i * 62;
        return (
          <g key={q.p} className="rev-pop" style={d(200 + i * 140)}>
            <Card x={300} y={y} w={228} h={50} r={12} fill={i === 0 ? PAPER : "#fff"} />
            <rect x={314} y={y + 14} width={30} height={22} rx="11" fill={i === 0 ? GREEN : SOFT} />
            <Body x={329} y={y + 29} size={9.5} anchor="middle" weight={700}>{q.p}</Body>
            <Body x={356} y={y + 24} size={11.5} weight={600}>{q.name}</Body>
            <Label x={356} y={y + 39} size={7.5} fill={INK50}>INTENT {q.score}/100</Label>
            <rect x={452} y={y + 21} width={62} height={5} rx="2.5" fill={SOFT} />
            <rect x={452} y={y + 21} width={(62 * q.score) / 100} height={5} rx="2.5" fill={i === 0 ? GREEN : "#94A3B8"} className="rev-grow-x" style={d(500 + i * 140)} />
          </g>
        );
      })}
      {/* routing arrow */}
      <path d="M300 300 C340 300, 350 260, 390 260" fill="none" stroke={GREEN} strokeWidth="1.5" className="rev-flow-slow" transform="translate(0 40)" />
      <g className="rev-pop" style={d(700)}>
        <rect x={390} y={284} width={138} height={32} rx="16" fill={INK} />
        <Label x={459} y={304} size={8.5} fill={GREEN} anchor="middle">→ ROUTED TO AGENT</Label>
      </g>
    </svg>
  );
};

/* ---------- 5 · Planning ---------- */

export const PlanningVisual = () => {
  const steps = [
    { label: "Observe", sub: "signals in", x: 280, y: 52 },
    { label: "Reason", sub: "context + memory", x: 470, y: 200 },
    { label: "Recommend", sub: "next best action", x: 280, y: 348 },
    { label: "Execute", sub: "across channels", x: 90, y: 200 },
  ];
  const R = 128;
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="Decision engine loop: observe, reason, recommend, execute">
      {/* orbit */}
      <circle cx={280} cy={200} r={R} fill="none" stroke={HAIR} strokeWidth="1.5" />
      <circle cx={280} cy={200} r={R} fill="none" stroke={GREEN} strokeWidth="2" className="rev-flow" strokeLinecap="round" />
      {/* center engine */}
      <g className="rev-pop" style={d(0)}>
        <circle cx={280} cy={200} r={62} fill="#fff" stroke={HAIR} strokeWidth="1.5" />
        <circle cx={280} cy={200} r={50} fill={PAPER} stroke={HAIR} strokeWidth="1" />
        <text x={280} y={196} textAnchor="middle" fontFamily={DISPLAY} fontSize="15" fontWeight="900" fill={INK}>Decision</text>
        <text x={280} y={214} textAnchor="middle" fontFamily={DISPLAY} fontSize="15" fontWeight="900" fill={INK}>Engine</text>
        <circle cx={280} cy={148} r="3" fill={GREEN} className="rev-pulse" />
      </g>
      {/* steps */}
      {steps.map((s, i) => (
        <g key={s.label} className="rev-pop" style={d(150 + i * 160)}>
          <rect x={s.x - 62} y={s.y - 26} width={124} height={52} rx="14" fill="#fff" stroke={HAIR} strokeWidth="1.5" />
          <rect x={s.x - 62} y={s.y - 26} width={4} height={52} rx="2" fill={GREEN} />
          <Body x={s.x + 2} y={s.y - 4} size={13} anchor="middle" weight={700} family={DISPLAY}>{s.label}</Body>
          <Label x={s.x + 2} y={s.y + 13} size={7.5} fill={INK50} anchor="middle">{s.sub.toUpperCase()}</Label>
        </g>
      ))}
      {/* memory chips feeding in */}
      {["past orders", "conversations", "browse history"].map((m, i) => (
        <g key={m} className="rev-pop" style={d(700 + i * 120)}>
          <rect x={12} y={40 + i * 36} width={112} height={26} rx="13" fill={PAPER} stroke={HAIR} strokeWidth="1" />
          <circle cx={28} cy={53 + i * 36} r="3" fill={GREEN} opacity="0.8" />
          <Label x={38} y={57 + i * 36} size={7.5} fill={INK70}>{m.toUpperCase()}</Label>
        </g>
      ))}
      <path d="M124 66 C180 80, 190 120, 232 152" fill="none" stroke={HAIR} strokeWidth="1.2" strokeDasharray="3 5" />
      <path d="M124 138 C170 150, 190 160, 222 176" fill="none" stroke={HAIR} strokeWidth="1.2" strokeDasharray="3 5" />
    </svg>
  );
};

/* ---------- 6 · Conversation Agents ---------- */

export const AgentsVisual = () => {
  const channels = [
    { label: "Voice", x: 280, y: 44 },
    { label: "WhatsApp", x: 484, y: 132 },
    { label: "Email", x: 448, y: 316 },
    { label: "Website", x: 112, y: 316 },
    { label: "SMS", x: 76, y: 132 },
  ];
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="Voice, WhatsApp, Email, Website and SMS agents connected through contextual memory">
      {/* spokes */}
      {channels.map((c, i) => (
        <g key={`l-${c.label}`}>
          <path d={`M280 200 L${c.x} ${c.y}`} stroke={HAIR} strokeWidth="1.5" />
          <path d={`M280 200 L${c.x} ${c.y}`} stroke={GREEN} strokeWidth="1.5" className="rev-flow-slow" style={{ animationDelay: `${i * 0.6}s` }} />
        </g>
      ))}
      {/* memory core */}
      <g className="rev-pop" style={d(0)}>
        <circle cx={280} cy={200} r={58} fill={INK} />
        <circle cx={280} cy={200} r={58} fill="none" stroke={GREEN} strokeWidth="1.5" opacity="0.5" strokeDasharray="4 6" className="rev-flow-slow" />
        <text x={280} y={194} textAnchor="middle" fontFamily={DISPLAY} fontSize="13" fontWeight="900" fill="#fff">Contextual</text>
        <text x={280} y={211} textAnchor="middle" fontFamily={DISPLAY} fontSize="13" fontWeight="900" fill={GREEN} fontStyle="italic">Memory</text>
      </g>
      {/* channel nodes */}
      {channels.map((c, i) => (
        <g key={c.label} className="rev-pop" style={d(150 + i * 120)}>
          <rect x={c.x - 48} y={c.y - 20} width={96} height={40} rx="20" fill="#fff" stroke={HAIR} strokeWidth="1.5" />
          <circle cx={c.x - 28} cy={c.y} r="4" fill={GREEN} />
          <Body x={c.x + 6} y={c.y + 4} size={11} anchor="middle" weight={600}>{c.label}</Body>
        </g>
      ))}
      {/* conversation snippets */}
      <g className="rev-pop" style={d(800)}>
        <rect x={330} y={30} width={190} height={46} rx="12" fill="#fff" stroke={HAIR} strokeWidth="1.5" />
        <Label x={344} y={48} size={7.5} fill={INK50}>VOICE AGENT · 00:42</Label>
        <Body x={344} y={64} size={9.5}>"Your order ships tonight — anything else?"</Body>
      </g>
      <g className="rev-pop" style={d(950)}>
        <rect x={36} y={356} width={216} height={34} rx="12" fill={GREEN} opacity="0.9" />
        <Body x={50} y={377} size={9.5} weight={600}>Cart recovered · $184 · WhatsApp</Body>
      </g>
    </svg>
  );
};

/* ---------- 7 · CRM Intelligence ---------- */

export const CrmVisual = () => {
  const crms = ["HubSpot", "Salesforce", "Zoho", "Freshsales", "Pipedrive"];
  const updates = ["Stage → Qualified", "Score 87 logged", "Call summary added", "Next step scheduled", "Deal value updated"];
  return (
    <svg viewBox="0 0 560 400" className="w-full" role="img" aria-label="Every interaction updating HubSpot, Salesforce, Zoho, Freshsales and Pipedrive automatically">
      {/* interaction event */}
      <g className="rev-pop" style={d(0)}>
        <Card x={24} y={128} w={192} h={144} r={16} fill={PAPER} />
        <Label x={44} y={156} size={8.5} fill={INK50}>INTERACTION</Label>
        <Body x={44} y={180} size={12.5} weight={700} family={DISPLAY}>WhatsApp · Ananya S.</Body>
        <rect x={44} y={194} width={140} height={6} rx="3" fill={INK} opacity="0.16" />
        <rect x={44} y={208} width={110} height={6} rx="3" fill={INK} opacity="0.16" />
        <rect x={44} y={230} width={104} height={24} rx="12" fill={INK} />
        <Label x={96} y={246} size={7.5} fill={GREEN} anchor="middle">AI STRUCTURED</Label>
      </g>
      {/* sync fan-out */}
      {crms.map((c, i) => {
        const y = 52 + i * 66;
        return (
          <g key={`p-${c}`}>
            <path d={`M216 200 C276 200, 276 ${y + 20}, 324 ${y + 20}`} fill="none" stroke={HAIR} strokeWidth="1.5" />
            <path d={`M216 200 C276 200, 276 ${y + 20}, 324 ${y + 20}`} fill="none" stroke={GREEN} strokeWidth="1.5" className="rev-flow-slow" style={{ animationDelay: `${i * 0.45}s` }} />
          </g>
        );
      })}
      {/* CRM rows */}
      {crms.map((c, i) => {
        const y = 52 + i * 66;
        return (
          <g key={c} className="rev-pop" style={d(150 + i * 130)}>
            <Card x={324} y={y} w={212} h={48} r={12} />
            <rect x={338} y={y + 13} width={22} height={22} rx="7" fill={SOFT} />
            <text x={349} y={y + 29} textAnchor="middle" fontFamily={DISPLAY} fontSize="11" fontWeight="900" fill={INK}>{c[0]}</text>
            <Body x={370} y={y + 22} size={11} weight={600}>{c}</Body>
            <Label x={370} y={y + 37} size={7} fill={INK50}>{updates[i].toUpperCase()}</Label>
            <Tick x={514} y={y + 24} />
          </g>
        );
      })}
    </svg>
  );
};
