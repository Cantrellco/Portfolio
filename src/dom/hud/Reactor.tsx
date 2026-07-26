/**
 * Arc-reactor centerpiece — layered segmented SVG rings, counter-rotating
 * via CSS (GPU-cheap, gated by prefers-reduced-motion), one red accent arc
 * like the reference theme.
 */
export function Reactor({ size = 460 }: { size?: number }) {
  return (
    <div className="reactor" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        {/* outer fine tick ring */}
        <circle
          className="reactor__spin reactor__spin--slow"
          cx="200"
          cy="200"
          r="192"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="2 5"
          opacity="0.45"
        />
        {/* heavy segmented ring */}
        <circle
          className="reactor__spin reactor__spin--rev"
          cx="200"
          cy="200"
          r="172"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="9"
          strokeDasharray="52 14 90 14 30 14 62 14"
          opacity="0.8"
        />
        {/* red accent arc */}
        <circle
          className="reactor__spin reactor__spin--slow"
          cx="200"
          cy="200"
          r="157"
          fill="none"
          stroke="#ff4b4b"
          strokeWidth="5"
          strokeDasharray="70 940"
          opacity="0.85"
        />
        {/* dotted mid ring */}
        <circle
          className="reactor__spin reactor__spin--mid"
          cx="200"
          cy="200"
          r="142"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="7 7"
          opacity="0.6"
        />
        {/* inner segmented band */}
        <circle
          className="reactor__spin reactor__spin--revslow"
          cx="200"
          cy="200"
          r="116"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="16"
          strokeDasharray="110 26 58 26"
          opacity="0.55"
        />
        {/* thin inner track + ticks */}
        <circle
          cx="200"
          cy="200"
          r="92"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <circle
          className="reactor__spin reactor__spin--mid"
          cx="200"
          cy="200"
          r="82"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeDasharray="3 9"
          opacity="0.75"
        />
        {/* expanding shockwaves */}
        <circle className="reactor__wave" cx="200" cy="200" r="150" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <circle
          className="reactor__wave reactor__wave--late"
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        {/* orbiting satellites */}
        <g className="reactor__spin reactor__spin--mid">
          <circle cx="200" cy="28" r="4" fill="var(--accent)" />
          <circle cx="200" cy="28" r="7" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
        </g>
        <g className="reactor__spin reactor__spin--rev">
          <circle cx="372" cy="200" r="3" fill="#ffb84d" />
        </g>
        <g className="reactor__spin reactor__spin--revslow">
          <circle cx="200" cy="372" r="2.6" fill="var(--accent)" opacity="0.85" />
        </g>
        {/* glowing core */}
        <circle cx="200" cy="200" r="58" fill="url(#coreGlow)" />
        <circle className="reactor__breathe" cx="200" cy="200" r="30" fill="#bdf4ff" opacity="0.95" />
        <circle cx="200" cy="200" r="30" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#8ae8ff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#38d6ff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38d6ff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
