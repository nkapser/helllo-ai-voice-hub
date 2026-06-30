/** Build the Spark app onboarding URL with the visitor's raw URL */
export function sparkAppUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim()
  // Ensure it has a protocol so URLs parse correctly
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`
  return `https://dash.helllo.ai/console/spark?url=${encodeURIComponent(withProtocol)}`
}

/** Lightweight cx / classnames helper */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
