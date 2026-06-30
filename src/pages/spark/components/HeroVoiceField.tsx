/**
 * Ambient “voice field” behind the Spark hero —
 * ripples, waveform, drifting light, one-time scan.
 * Pure CSS/SVG; respects prefers-reduced-motion.
 */
export default function HeroVoiceField() {
  return (
    <div className="hero-voice-field" aria-hidden="true">
      <div className="hero-voice-aurora">
        <div className="hero-voice-orb hero-voice-orb-1" />
        <div className="hero-voice-orb hero-voice-orb-2" />
        <div className="hero-voice-orb hero-voice-orb-3" />
      </div>

      <div className="hero-voice-grid" />

      <div className="hero-voice-scan" />

      <div className="hero-voice-core">
        <span className="hero-voice-ring hero-voice-ring-1" />
        <span className="hero-voice-ring hero-voice-ring-2" />
        <span className="hero-voice-ring hero-voice-ring-3" />
        <span className="hero-voice-ring hero-voice-ring-4" />
        <span className="hero-voice-ring hero-voice-ring-5" />

        <svg
          className="hero-voice-wave"
          viewBox="0 0 480 64"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hero-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147, 197, 253, 0.1)" />
              <stop offset="35%" stopColor="rgba(96, 165, 250, 0.55)" />
              <stop offset="65%" stopColor="rgba(59, 130, 246, 0.55)" />
              <stop offset="100%" stopColor="rgba(147, 197, 253, 0.1)" />
            </linearGradient>
          </defs>
          <path
            className="hero-voice-wave-path"
            d="M0 32 C40 32, 40 12, 80 32 S120 52, 160 32 S200 12, 240 32 S280 52, 320 32 S360 12, 400 32 S440 52, 480 32"
          />
          <path
            className="hero-voice-wave-path hero-voice-wave-path-alt"
            d="M0 32 C30 32, 50 48, 80 32 S110 16, 140 32 S170 48, 200 32 S230 16, 260 32 S290 48, 320 32 S350 16, 380 32 S410 48, 440 32 S460 16, 480 32"
          />
        </svg>

        <div className="hero-voice-sparks">
          <span className="hero-voice-spark hero-voice-spark-1" />
          <span className="hero-voice-spark hero-voice-spark-2" />
          <span className="hero-voice-spark hero-voice-spark-3" />
        </div>
      </div>
    </div>
  )
}
