import { useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Project } from '../../lib/projects'
import { Panel, Readout } from '../hud/Panel'

function Shell({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="file" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="file__panel" onClick={(e) => e.stopPropagation()}>
        <header className="file__head">
          <span className="hudpanel__tick" aria-hidden="true" />
          <span className="file__title">{title}</span>
          <button className="file__close" onClick={onClose} aria-label="Close file">
            ✕ CLOSE
          </button>
        </header>
        <div className="file__body">{children}</div>
      </div>
    </div>
  )
}

/** Generic project file. */
export function FileOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Shell title={`FILE // ${project.name.toUpperCase()}`} onClose={onClose}>
      <p className="file__tagline">{project.tagline}</p>
      {project.media && (
        <div className="file__media">
          {project.media.map((m) => (
            <img key={m.src} src={m.src} alt={m.alt} loading="lazy" />
          ))}
        </div>
      )}
      <ul className="work__tech" aria-label="Technology">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="file__cols">
        <Panel title="CHALLENGE">
          <p>{project.challenge}</p>
        </Panel>
        <Panel title="APPROACH">
          <p>{project.approach}</p>
        </Panel>
        <Panel title="RESULTS">
          <ul>
            {project.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Panel>
      </div>
      {project.link && (
        <a className="file__link" href={project.link} target="_blank" rel="noreferrer">
          OPEN REPOSITORY ▸
        </a>
      )}
    </Shell>
  )
}

/** Flagship file — Workout Buddy, full telemetry. */
export function WorkoutBuddyFile({ onClose }: { onClose: () => void }) {
  return (
    <Shell title="FILE // WORKOUT BUDDY — FLAGSHIP" onClose={onClose}>
      <p className="file__tagline">
        iOS workout tracker, live on the App Store. React Native + Expo with hand-built Swift
        native modules — one person, the whole Apple stack.
      </p>
      <div className="file__media file__media--shots">
        <img src="/assets/wb/shot-today.png" alt="Today screen with active workout" />
        <img src="/assets/wb/shot-buddy.png" alt="AI coach chat" />
        <img src="/assets/wb/shot-program.png" alt="Programs screen" />
        <img src="/assets/wb/shot-progress.png" alt="Progress charts" />
        <img src="/assets/wb/watch-lift.png" alt="Apple Watch lift session" />
      </div>
      <div className="file__cols file__cols--wide">
        <Panel title="DEPLOYMENT">
          <Readout label="APP STORE" value="LIVE — v1.2" />
          <Readout label="SUBSCRIPTIONS" value="REVENUECAT" />
          <Readout label="BACKEND" value="SUPABASE + RLS" />
        </Panel>
        <Panel title="AI COACH">
          <Readout label="PROXY" value="EDGE FN → ANTHROPIC" />
          <Readout label="BUDGET" value="ATOMIC PER-USER" />
          <Readout label="VISION" value="PHOTO → PROGRAM" />
        </Panel>
        <Panel title="WATCH UNIT">
          <Readout label="SESSION" value="HKWORKOUTSESSION" />
          <Readout label="HEART RATE" value="LIVE / AVG / MAX" />
          <Readout label="BRIDGES" value="2 × NATIVE SWIFT" />
        </Panel>
        <Panel title="SYNC CORE">
          <Readout label="MODE" value="OFFLINE-FIRST" />
          <Readout label="QUEUE" value="BACKOFF + ROTATION" />
          <Readout label="TESTS" value="473 JEST + 93 SWIFT" />
        </Panel>
        <Panel title="LIVE ACTIVITY">
          <Readout label="DYNAMIC ISLAND" value="INTERACTIVE" />
          <Readout label="LOG SET" value="WORKS SUSPENDED" />
          <Readout label="REST TIMER" value="NEVER STALE" />
        </Panel>
        <Panel title="PROGRESSION">
          <Readout label="ENGINE" value="PURE + TESTED" />
          <Readout label="METHOD" value="RP LANDMARKS" />
          <Readout label="MIGRATIONS" value="24 IN PROD" />
        </Panel>
      </div>
      <a
        className="file__link"
        href="https://apps.apple.com/app/id6771810116"
        target="_blank"
        rel="noreferrer"
      >
        VIEW ON THE APP STORE ▸
      </a>
    </Shell>
  )
}
