import { useMemo, useState } from 'react'
import { projects } from '../../lib/projects'
import type { Project } from '../../lib/projects'
import { Reactor } from '../hud/Reactor'
import { Panel, Readout } from '../hud/Panel'
import { FileOverlay, WorkoutBuddyFile } from './FileOverlay'

/**
 * Unit position on the constellation (CSS y is down; angle CCW from east).
 * Both the SVG wires (preserveAspectRatio="none") and the node positions map
 * the same unit fraction onto the hub rect, so they stay aligned at any
 * viewport aspect.
 */
function unit(angle: number, radius: number) {
  const a = (angle * Math.PI) / 180
  return { x: Math.cos(a) * radius, y: -Math.sin(a) * radius }
}

const WB_NODE = { angle: 90, radius: 0.98, size: 1.5, readout: 'FLAGSHIP // APP STORE: LIVE' }

/**
 * The hub — every project stems from the reactor core. Nodes sit on the
 * constellation, wired to the center; clicking one opens its file.
 */
export function Hub() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((p) => p.id === openId) ?? null

  const nodes = useMemo(
    () =>
      projects.map((p) => ({
        p,
        pos: unit(p.node.angle, p.node.radius),
      })),
    [],
  )
  const wbPos = unit(WB_NODE.angle, WB_NODE.radius)

  return (
    <section className="hub" id="hub">
      {/* connector traces */}
      <svg
        className="hub__wires"
        viewBox="-55 -55 110 110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[...nodes.map((n) => n.pos), wbPos].map((pos, i) => (
          <g key={i}>
            <line
              x1="0"
              y1="0"
              x2={pos.x * 44}
              y2={pos.y * 44}
              stroke="var(--accent)"
              strokeWidth="0.22"
              strokeDasharray="1.4 1.1"
              className="hub__wire"
              opacity="0.5"
            />
            <circle cx={pos.x * 44} cy={pos.y * 44} r="0.7" fill="var(--accent)" opacity="0.8" />
          </g>
        ))}
      </svg>

      {/* reactor core + identity */}
      <div className="hub__core">
        <Reactor size={330} />
        <h1 className="hub__name">CODY CANTRELL</h1>
        <p className="hub__tagline">
          APPLE-GRADE SOFTWARE AT <em>AI SPEED</em>
        </p>
      </div>

      {/* flagship node */}
      <button
        className="hubnode hubnode--flagship"
        style={nodeStyle(wbPos, WB_NODE.size)}
        onClick={() => setOpenId('workout-buddy')}
      >
        <span className="hubnode__ring" aria-hidden="true" />
        <span className="hubnode__thumb">
          <img src="/assets/wb/icon.png" alt="" loading="eager" />
        </span>
        <span className="hubnode__label">WORKOUT BUDDY</span>
        <span className="hubnode__readout">{WB_NODE.readout}</span>
      </button>

      {/* project nodes */}
      {nodes.map(({ p, pos }) => (
        <button
          key={p.id}
          className="hubnode"
          style={nodeStyle(pos, p.node.size)}
          onClick={() => setOpenId(p.id)}
        >
          <span className="hubnode__ring" aria-hidden="true" />
          <span className="hubnode__thumb">
            {p.media?.[0] && <img src={p.media[0].src} alt="" loading="lazy" />}
          </span>
          <span className="hubnode__label">{p.name.toUpperCase()}</span>
          <span className="hubnode__readout">{p.node.readout}</span>
        </button>
      ))}

      {/* corner instrument modules */}
      <div className="hub__corner hub__corner--left">
        <Panel title="IDENTITY">
          <Readout label="OPERATOR" value="CODY CANTRELL" />
          <Readout label="ROLE" value="AI-AUGMENTED DEV" />
          <Readout label="BASE" value="FAIRFIELD, IL" />
        </Panel>
      </div>
      <div className="hub__corner hub__corner--right">
        <Panel title="LIVE STATUS">
          <Readout label="SYSTEM" value="ONLINE" />
          <Readout label="TESTS PASSING" value="566" />
          <Readout label="PRODUCTS" value="7" />
        </Panel>
      </div>

      <p className="hub__hint" aria-hidden="true">
        ▸ SELECT A NODE — SCROLL FOR SYSTEM LOG
      </p>

      {openId === 'workout-buddy' && <WorkoutBuddyFile onClose={() => setOpenId(null)} />}
      {open && <FileOverlay project={open as Project} onClose={() => setOpenId(null)} />}
    </section>
  )
}

function nodeStyle(pos: { x: number; y: number }, size: number): React.CSSProperties {
  // 44/110 of the wire viewBox == 40% of the hub rect.
  return {
    left: `calc(50% + ${(pos.x * 40).toFixed(2)}%)`,
    top: `calc(50% + ${(pos.y * 40).toFixed(2)}%)`,
    ['--node-scale' as string]: size,
  }
}
