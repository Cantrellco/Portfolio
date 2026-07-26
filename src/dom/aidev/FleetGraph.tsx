import { agentFleet } from '../../lib/agentFleet'
import { sceneState } from '../../lib/sceneState'

/** Unit position on the fleet ring (CSS y is down; angle CCW from east). */
function unit(angle: number) {
  const a = (angle * Math.PI) / 180
  return { x: Math.cos(a), y: -Math.sin(a) }
}

/**
 * The research fan-out, drawn as it actually ran: one director at the centre,
 * seven agents on the ring, findings pulsing back inward. Nodes are real
 * buttons — selecting one reads its archived result into the right-hand rail.
 */
export function FleetGraph({
  activeKey,
  live,
  onSelect,
}: {
  activeKey: string | null
  /** True while the fan-out entry is the active line in the console. */
  live: boolean
  onSelect: (key: string) => void
}) {
  const reduced = sceneState.reducedMotion
  const nodes = agentFleet.map((u) => ({ u, pos: unit(u.angle) }))

  return (
    <div className={`fleet${live ? ' is-live' : ''}`}>
      <svg className="fleet__wires" viewBox="-50 -50 100 100" preserveAspectRatio="none" aria-hidden="true">
        <circle r="38" fill="none" stroke="var(--accent)" strokeWidth="0.18" strokeDasharray="0.6 2.2" opacity="0.45" />
        <circle r="20" fill="none" stroke="var(--accent)" strokeWidth="0.14" opacity="0.3" />
        {nodes.map(({ u, pos }, i) => {
          const on = activeKey === u.key
          return (
            <g key={u.key}>
              <line
                x1="0"
                y1="0"
                x2={pos.x * 38}
                y2={pos.y * 38}
                stroke={on ? 'var(--accent-bright)' : 'var(--accent)'}
                strokeWidth={on ? 0.55 : 0.22}
                strokeDasharray="1.6 1.2"
                opacity={on ? 0.95 : 0.42}
              />
              {!reduced && (
                <circle r="0.6" fill="#bdf4ff" opacity={on ? 1 : 0.7}>
                  <animateMotion
                    dur={`${2.4 + (i % 3) * 0.6}s`}
                    begin={`${i * 0.35}s`}
                    repeatCount="indefinite"
                    path={`M${pos.x * 38},${pos.y * 38} L0,0`}
                  />
                </circle>
              )}
            </g>
          )
        })}
      </svg>

      <div className="fleet__core" aria-hidden="true">
        <span className="fleet__coreRing" />
        <span className="fleet__coreLabel">
          C.C
          <em>DIRECTOR</em>
        </span>
      </div>

      {nodes.map(({ u, pos }) => (
        <button
          key={u.key}
          type="button"
          className={`fleetnode${activeKey === u.key ? ' is-on' : ''}`}
          style={{
            left: `calc(50% + ${(pos.x * 38).toFixed(2)}%)`,
            top: `calc(50% + ${(pos.y * 38).toFixed(2)}%)`,
          }}
          onClick={() => onSelect(u.key)}
          aria-pressed={activeKey === u.key}
        >
          <span className="fleetnode__dot" aria-hidden="true" />
          <span className="fleetnode__name">{u.callsign}</span>
        </button>
      ))}
    </div>
  )
}
