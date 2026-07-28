import { useInView, useReducedMotion } from "../lib/hooks";

/**
 * Horizontal customer-lifecycle visual:
 * Acquire → Qualify → Convert → Retain → Grow
 * A single smooth path with signal flow and nodes that light up.
 */
const stages = [
  { label: "Acquire", x: 60 },
  { label: "Qualify", x: 270 },
  { label: "Convert", x: 480 },
  { label: "Retain", x: 690 },
  { label: "Grow", x: 900 },
];

// gentle rising wave through the five nodes
const PATH =
  "M60 84 C130 84 200 62 270 62 C340 62 410 78 480 78 C550 78 620 54 690 54 C760 54 830 34 900 34";

const Lifecycle = () => {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();

  return (
    <section className="relative z-10 px-5 pb-8 pt-20 md:px-8 lg:pt-6">
      <div
        ref={ref}
        className={`rev-reveal ${inView ? "rev-in" : ""} mx-auto max-w-5xl`}
      >
        <p className="rev-eyebrow mb-6 text-center">The lifecycle RevEngg runs for you</p>
        <svg
          viewBox="0 0 960 130"
          className="w-full"
          role="img"
          aria-label="Customer lifecycle: acquire, qualify, convert, retain, grow"
        >
          {/* base path */}
          <path d={PATH} fill="none" stroke="#CBD5E1" strokeWidth="2" />
          {/* drawn-in ink path */}
          <path
            d={PATH}
            fill="none"
            stroke="#1F2937"
            strokeWidth="2"
            strokeLinecap="round"
            className="rev-draw"
            style={{ "--rev-draw-len": "900" } as React.CSSProperties}
          />
          {/* flowing signal */}
          {!reduced && (
            <path
              d={PATH}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="rev-flow"
              opacity="0.9"
            />
          )}
          {/* travelling dot */}
          {!reduced && inView && (
            <circle r="4" fill="#60A5FA" stroke="#1F2937" strokeWidth="1.5">
              <animateMotion dur="6s" repeatCount="indefinite" path={PATH} />
            </circle>
          )}

          {stages.map((s, i) => {
            // y from path definition at each node
            const ys = [84, 62, 78, 54, 34];
            const y = ys[i];
            return (
              <g key={s.label} className="rev-pop" style={{ "--rev-d": `${i * 140}ms` } as React.CSSProperties}>
                <circle cx={s.x} cy={y} r="10" fill="#60A5FA" opacity="0.18" className={!reduced ? "rev-pulse" : undefined} />
                <circle cx={s.x} cy={y} r="5" fill="#F8FAFC" stroke="#1F2937" strokeWidth="2" />
                <text
                  x={s.x}
                  y={y + 32}
                  textAnchor="middle"
                  fontFamily="var(--rev-font-mono)"
                  fontSize="11"
                  letterSpacing="1.5"
                  fill="#1F2937"
                  fontWeight="500"
                >
                  {s.label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default Lifecycle;
