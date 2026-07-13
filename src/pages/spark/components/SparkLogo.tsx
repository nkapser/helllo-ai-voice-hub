import { useId } from 'react'

type SparkLogoProps = {
  /** Rendered height in px (width scales automatically) */
  size?: number
  /** 'gradient' (brand), 'white', or any CSS color */
  fill?: 'gradient' | 'white' | string
  /** Show the voice ripples on both sides (drop below ~24px) */
  ripples?: boolean
  className?: string
  title?: string
}

/**
 * SparkLogo — "the speaking bubble".
 * A chat bubble with an integrated short tail, a four-point spark
 * cut out of its center (true negative space via evenodd), and
 * voice ripples radiating from both sides.
 */
export default function SparkLogo({
  size = 32,
  fill = 'gradient',
  ripples = true,
  className,
  title = 'Spark',
}: SparkLogoProps) {
  const gradId = useId()
  const paint =
    fill === 'gradient' ? `url(#${gradId})` : fill === 'white' ? '#ffffff' : fill

  const viewBox = ripples ? '8 20 144 84' : '36 22 88 80'
  const [, , vw, vh] = viewBox.split(' ').map(Number)
  const width = Math.round(size * (vw / vh))

  return (
    <svg
      width={width}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      {fill === 'gradient' && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--spark, #60a5fa)" />
            <stop offset="100%" stopColor="var(--spark-ember, #3b82f6)" />
          </linearGradient>
        </defs>
      )}

      {/* Bubble with short tail + spark cutout (negative space) */}
      <path
        fillRule="evenodd"
        fill={paint}
        d="M40 42 A16 16 0 0 1 56 26 H104 A16 16 0 0 1 120 42 V66 A16 16 0 0 1 104 82 H74 C71 90.5 65 95.5 55.5 98 C60.5 92.5 62.5 87 62 82 H56 A16 16 0 0 1 40 66 V42 Z M80 34 C82.5 49 88 51.5 97 54 C88 56.5 82.5 59 80 74 C77.5 59 72 56.5 63 54 C72 51.5 77.5 49 80 34 Z"
      />

      {ripples && (
        <g fill="none" stroke={paint} strokeWidth="5.5" strokeLinecap="round">
          <path d="M128 39 A22 22 0 0 1 128 69" />
          <path d="M142 31 A34 34 0 0 1 142 77" opacity="0.55" />
          <path d="M32 39 A22 22 0 0 0 32 69" />
          <path d="M18 31 A34 34 0 0 0 18 77" opacity="0.55" />
        </g>
      )}
    </svg>
  )
}
