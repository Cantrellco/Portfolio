import { useEffect, useState } from 'react'
import { onScreenChange } from '../lib/deviceState'

interface Callout {
  title: string
  copy: string
}

const CALLOUTS: Callout[] = [
  {
    title: 'Live on the App Store',
    copy: 'Workout Buddy v1.2 — real users, subscriptions via RevenueCat, shipped and supported solo.',
  },
  {
    title: 'AI coach in production',
    copy: 'Supabase edge function proxying Anthropic with atomic per-user budgets. Snap a gym machine or a whiteboard — it becomes your program.',
  },
  {
    title: 'Programs that progress themselves',
    copy: 'A pure, fully-tested auto-progression engine built on RP volume landmarks. No spreadsheet babysitting.',
  },
  {
    title: 'Offline-first, evidence-backed',
    copy: 'Write queue with backoff and poison-entry rotation. 473 Jest tests, 93 Swift tests, CI keeps the counts honest.',
  },
  {
    title: 'A real Apple Watch app',
    copy: 'Full SwiftUI on HKWorkoutSession — live heart rate, pause/resume, standalone starts — bridged to React Native by hand-built native modules.',
  },
]

/**
 * Sticky callout rail for S2. The active step follows the 3D screen index
 * (deviceState.screen) so DOM copy and phone screenshot stay in lockstep.
 */
export function Flagship() {
  const [active, setActive] = useState(0)

  useEffect(() => onScreenChange(setActive), [])

  return (
    <section id="flagship" className="flagship">
      <div className="flagship__sticky">
        <p className="scene__eyebrow">Workout Buddy — live on the App Store</p>
        <h2 className="scene__title">One person. The whole Apple stack.</h2>
        <ol className="flagship__callouts">
          {CALLOUTS.map((c, i) => (
            <li
              key={c.title}
              className={`flagship__callout${i === active ? ' is-active' : ''}`}
              aria-current={i === active ? 'step' : undefined}
            >
              <h3 className="flagship__calloutTitle">{c.title}</h3>
              <p className="flagship__calloutCopy">{c.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
