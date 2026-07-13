type SectionHeaderProps = {
  index?: string
  label: string
  title: string
  sub?: string
  className?: string
}

/**
 * Numbered section header — `[01] Label` eyebrow followed by a
 * two-tone display headline (primary lead, muted follow-on).
 */
export default function SectionHeader({
  index,
  label,
  title,
  sub,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`reveal mb-10 sm:mb-12 ${className}`}>
      <div className="section-eyebrow">
        {index && <span className="section-eyebrow-idx">[{index}]</span>}
        <span className="section-eyebrow-label">{label}</span>
      </div>
      <h2 className="section-duo-head spark-text-primary">
        {title}{' '}
        {sub && <span className="duo-muted">{sub}</span>}
      </h2>
    </div>
  )
}
