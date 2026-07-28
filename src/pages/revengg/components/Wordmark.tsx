interface WordmarkProps {
  className?: string;
  withDot?: boolean;
}

/**
 * RevEngg wordmark.
 * "Rev" — Satoshi Black, near-black. "Engg" — Satoshi Black Italic, gothic green.
 */
const Wordmark = ({ className = "text-2xl", withDot = false }: WordmarkProps) => (
  <span className={`rev-wordmark ${className}`}>
    <span className="rev-wm-rev">Rev</span>
    <span className="rev-wm-engg">Engg</span>
    {withDot && <span className="rev-wm-dot">.</span>}
  </span>
);

export default Wordmark;
