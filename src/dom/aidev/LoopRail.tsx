import { STAGES } from '../../lib/buildLog'
import type { LoopStage } from '../../lib/buildLog'

/**
 * The loop every change goes through. The active stage is driven by whichever
 * line is live in the console, so the rail reads as a running process rather
 * than a diagram of one.
 */
export function LoopRail({ active }: { active: LoopStage }) {
  const index = STAGES.findIndex((s) => s.id === active)
  return (
    <ol className="looprail" aria-label="Delivery loop">
      {STAGES.map((s, i) => (
        <li
          key={s.id}
          className={`looprail__stage${i === index ? ' is-active' : ''}${i < index ? ' is-done' : ''}`}
        >
          <span className="looprail__mark" aria-hidden="true" />
          <span className="looprail__label">{s.label}</span>
        </li>
      ))}
    </ol>
  )
}
