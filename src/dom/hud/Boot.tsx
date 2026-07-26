import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { sceneState } from '../../lib/sceneState'

gsap.registerPlugin(ScrambleTextPlugin)

const LINES = [
  '> C.CANTRELL OS v2.6',
  '> NEURAL CORE ............ ONLINE',
  '> PROJECT GRAPH .......... 6 NODES',
  '> TELEMETRY .............. VERIFIED',
  '> ACCESS GRANTED',
]

const CHARS = '01▮▯#/<>+=—'

/** Boot/decrypt sequence — plays once per load, then hands off to the hub. */
export function Boot({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    if (sceneState.reducedMotion) {
      done.current()
      return
    }
    const el = root.current
    if (!el) return
    const rows = Array.from(el.querySelectorAll('.boot__line'))
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, { opacity: 0, duration: 0.35, onComplete: () => done.current() })
      },
    })
    rows.forEach((row, i) => {
      tl.to(
        row,
        {
          duration: 0.34,
          scrambleText: { text: LINES[i], chars: CHARS, speed: 2 },
          opacity: 1,
        },
        i * 0.24,
      )
    })
    tl.to({}, { duration: 0.35 }) // hold on ACCESS GRANTED

    // Hard fallback: a throttled tab (background load, low-power mode) must
    // never leave the visitor stuck on the boot screen.
    const failsafe = window.setTimeout(() => {
      tl.kill()
      gsap.set(el, { opacity: 0 })
      done.current()
    }, 3200)

    return () => {
      window.clearTimeout(failsafe)
      tl.kill()
    }
  }, [])

  return (
    <div className="boot" ref={root} aria-hidden="true">
      <div className="boot__panel">
        {LINES.map((l) => (
          <p key={l} className="boot__line">
            {' '}
          </p>
        ))}
      </div>
    </div>
  )
}
