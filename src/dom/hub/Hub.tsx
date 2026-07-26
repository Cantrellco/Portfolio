import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { projects } from '../../lib/projects'
import type { Project } from '../../lib/projects'
import { Reactor } from '../hud/Reactor'
import { Panel, Readout } from '../hud/Panel'
import { FileOverlay, WorkoutBuddyFile } from './FileOverlay'
import type { FileOrigin } from './FileOverlay'
import { sceneState } from '../../lib/sceneState'

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

const WB_NODE = { angle: 90, radius: 0.86, size: 1.5, readout: 'FLAGSHIP // APP STORE: LIVE' }

// Deterministic pseudo-EKG waveform points.
const WAVE_POINTS = Array.from({ length: 100 }, (_, i) => {
  const x = i * 4
  const spike = i % 25 === 12 ? 9 : i % 25 === 13 ? -7 : 0
  const y = 12 + Math.sin(i * 0.7) * 2.2 + Math.sin(i * 0.23) * 1.6 + spike
  return `${x},${y.toFixed(1)}`
}).join(' ')

/**
 * The hub — every project stems from the reactor core. Nodes sit on the
 * constellation, wired to the center; clicking one opens its file.
 */
export function Hub() {
  const [open, setOpen] = useState<{ id: string; origin: FileOrigin } | null>(null)
  const openProject = projects.find((p) => p.id === open?.id) ?? null
  const stage = useRef<HTMLDivElement>(null)

  const nodes = useMemo(
    () =>
      projects.map((p) => ({
        p,
        pos: unit(p.node.angle, p.node.radius),
      })),
    [],
  )
  const wbPos = unit(WB_NODE.angle, WB_NODE.radius)

  const openFrom = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOpen({ id, origin: { x: r.left + r.width / 2, y: r.top + r.height / 2 } })
  }

  // Holographic depth: constellation drifts with the cursor.
  useEffect(() => {
    if (sceneState.reducedMotion) return
    const el = stage.current
    if (!el) return
    const qx = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power2.out' })
    const qy = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power2.out' })
    const move = (e: PointerEvent) => {
      qx(((e.clientX / window.innerWidth) * 2 - 1) * 13)
      qy(((e.clientY / window.innerHeight) * 2 - 1) * 9)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <section className="hub" id="hub">
      {/* living core — Higgsfield loop (logged in aiPipeline.ts) */}
      {!window.matchMedia('(prefers-reduced-motion: reduce)').matches && (
        <video
          className="hub__video"
          src="/assets/env/core-loop.mp4"
          poster="/assets/env/studio.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      <div className="hub__stage" ref={stage}>
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
            {/* data pulse traveling core → node */}
            <circle className="hub__pulse" r="0.55" fill="#bdf4ff">
              <animateMotion
                dur={`${2.6 + (i % 4) * 0.7}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
                path={`M0,0 L${pos.x * 44},${pos.y * 44}`}
              />
            </circle>
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
        onClick={openFrom('workout-buddy')}
      >
        <span className="hubnode__ring" aria-hidden="true" />
        <span className="hubnode__target" aria-hidden="true" />
        <span className="hubnode__thumb">
          <img src="/assets/wb/icon.png" alt="" loading="eager" />
        </span>
        <span className="hubnode__label">WORKOUT BUDDY</span>
        <span className="hubnode__readout">{WB_NODE.readout}</span>
      </button>

      {/* project nodes */}
      {nodes.map(({ p, pos }, i) => (
        <button
          key={p.id}
          className="hubnode"
          style={nodeStyle(pos, p.node.size, i)}
          onClick={openFrom(p.id)}
        >
          <span className="hubnode__ring" aria-hidden="true" />
          <span className="hubnode__target" aria-hidden="true" />
          <span className="hubnode__thumb">
            {p.media?.[0] && <img src={p.media[0].src} alt="" loading="lazy" />}
          </span>
          <span className="hubnode__label">{p.name.toUpperCase()}</span>
          <span className="hubnode__readout">{p.node.readout}</span>
        </button>
      ))}
      </div>

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
          <Readout label="PRODUCTS" value="6" />
        </Panel>
      </div>

      {/* ambient telemetry glyphs */}
      <div className="hub__glyphs" aria-hidden="true">
        <span style={{ left: '13%', top: '18%' }}>38.3781 // -88.3595</span>
        <span style={{ right: '7%', top: '47%', animationDelay: '-4s' }}>THREADS 08 // OK</span>
        <span style={{ left: '9%', top: '62%', animationDelay: '-7s' }}>LATENCY 12MS</span>
        <span style={{ right: '16%', bottom: '20%', animationDelay: '-2s' }}>SIG ▮▮▮▮▯ 92%</span>
      </div>

      {/* ambient waveform */}
      <svg className="hub__wave" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
        <polyline
          className="hub__waveline"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          points={WAVE_POINTS}
        />
      </svg>

      <p className="hub__hint" aria-hidden="true">
        ▸ SELECT A NODE — SCROLL FOR SYSTEM LOG
      </p>

      {open?.id === 'workout-buddy' && (
        <WorkoutBuddyFile origin={open.origin} onClose={() => setOpen(null)} />
      )}
      {openProject && open && (
        <FileOverlay
          project={openProject as Project}
          origin={open.origin}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  )
}

function nodeStyle(
  pos: { x: number; y: number },
  size: number,
  index = 0,
): React.CSSProperties {
  // 44/110 of the wire viewBox == 40% of the hub rect.
  return {
    left: `calc(50% + ${(pos.x * 40).toFixed(2)}%)`,
    top: `calc(50% + ${(pos.y * 40).toFixed(2)}%)`,
    ['--node-scale' as string]: size,
    ['--bob-delay' as string]: `${(index * 1.3).toFixed(1)}s`,
  }
}
