/**
 * Circular HUD gauge — tick track + value arc + big number, like the
 * CPU/RAM/energy dials in the reference theme.
 */
export function Ring({
  value,
  label,
  fraction,
  size = 150,
}: {
  value: string
  label: string
  /** 0..1 fill of the arc. */
  fraction: number
  size?: number
}) {
  const r = 56
  const c = 2 * Math.PI * r
  return (
    <div className="ring" style={{ width: size }}>
      <svg viewBox="0 0 140 140" width={size} height={size} aria-hidden="true">
        <circle
          cx="70"
          cy="70"
          r="64"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="2 4"
          opacity="0.4"
        />
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(56,214,255,0.16)" strokeWidth="7" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="butt"
          strokeDasharray={`${c * fraction} ${c}`}
          transform="rotate(-90 70 70)"
          style={{ filter: 'drop-shadow(0 0 6px rgba(56,214,255,0.7))' }}
        />
      </svg>
      <div className="ring__value">{value}</div>
      <p className="ring__label">{label}</p>
    </div>
  )
}
