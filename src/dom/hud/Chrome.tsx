import { useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../../lib/scroll'

const SECTIONS = [
  { href: '#hub', label: 'HUB' },
  { href: '#build-log', label: 'SYSTEM LOG' },
  { href: '#receipts', label: 'TELEMETRY' },
  { href: '#process', label: 'COMMS' },
]

/** Top status bar — system readouts + live clock, ref-theme style. */
export function StatusBar() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const date = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  })
  const time = now.toLocaleTimeString('en-US', { hour12: false })
  return (
    <div className="statusbar">
      <span className="statusbar__id">C.CANTRELL // OS</span>
      <span className="statusbar__sep" />
      <span>{date.toUpperCase()}</span>
      <span className="statusbar__time">{time}</span>
      <span className="statusbar__sep" />
      <span className="statusbar__loc">FAIRFIELD, IL</span>
      <span className="statusbar__online">
        <span className="pulse" aria-hidden="true" /> SYS ONLINE
      </span>
      <a className="statusbar__cta" href="mailto:cantrellco.13@gmail.com">
        OPEN COMMS
      </a>
    </div>
  )
}

/** Left vertical rail — section indicators with ticks. */
export function Rail() {
  return (
    <nav className="rail" aria-label="Sections">
      {SECTIONS.map((s) => (
        <a
          key={s.href}
          href={s.href}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(s.href)
          }}
        >
          <span className="rail__tick" aria-hidden="true" />
          {s.label}
        </a>
      ))}
    </nav>
  )
}

/** Static bokeh particle field — drawn once to a canvas, never animated. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    const ctx = canvas.getContext('2d')!
    // Deterministic scatter (mulberry32) so every load matches.
    let seed = 1337
    const rand = () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
    for (let i = 0; i < 170; i++) {
      const x = rand() * canvas.width
      const y = rand() * canvas.height
      const r = (rand() * 2.2 + 0.4) * dpr
      const a = rand() * 0.5 + 0.08
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3)
      g.addColorStop(0, `rgba(120,225,255,${a})`)
      g.addColorStop(1, 'rgba(120,225,255,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r * 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}
