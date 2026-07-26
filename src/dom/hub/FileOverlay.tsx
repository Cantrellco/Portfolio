import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import type { Project } from '../../lib/projects'
import { Panel, Readout } from '../hud/Panel'
import { sceneState } from '../../lib/sceneState'

export interface FileOrigin {
  x: number
  y: number
}

function Shell({
  title,
  onClose,
  origin,
  children,
}: {
  title: string
  onClose: () => void
  origin?: FileOrigin
  children: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  // Materialize from the clicked node: backdrop irises out from the click
  // point while the panel flies in from the node, over-bright, with a
  // one-frame glitch as it locks into place.
  useEffect(() => {
    const rootEl = root.current
    const panelEl = panel.current
    if (!rootEl || !panelEl) return
    if (sceneState.reducedMotion) return

    const ox = origin?.x ?? window.innerWidth / 2
    const oy = origin?.y ?? window.innerHeight / 2
    const rect = panelEl.getBoundingClientRect()
    const dx = ox - (rect.left + rect.width / 2)
    const dy = oy - (rect.top + rect.height / 2)

    const tl = gsap.timeline()
    tl.fromTo(
      rootEl,
      { clipPath: `circle(24px at ${ox}px ${oy}px)` },
      { clipPath: `circle(142% at ${ox}px ${oy}px)`, duration: 0.55, ease: 'power3.inOut' },
    )
      .fromTo(
        panelEl,
        { x: dx, y: dy, scale: 0.06, opacity: 0.3, filter: 'brightness(2.4) saturate(1.6)' },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'brightness(1) saturate(1)',
          duration: 0.6,
          ease: 'expo.out',
        },
        0.12,
      )
      .add(() => panelEl.classList.add('is-glitch'), 0.55)
      .add(() => panelEl.classList.remove('is-glitch'), 0.85)
      .fromTo(
        panelEl.querySelectorAll('.file__body > *'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        0.4,
      )
    return () => {
      tl.kill()
    }
  }, [origin])

  const close = useCallback(() => {
    if (closing.current) return
    closing.current = true
    const rootEl = root.current
    const panelEl = panel.current
    if (sceneState.reducedMotion || !rootEl || !panelEl) {
      onClose()
      return
    }
    const ox = origin?.x ?? window.innerWidth / 2
    const oy = origin?.y ?? window.innerHeight / 2
    gsap
      .timeline({ onComplete: onClose })
      .to(panelEl, { scale: 0.08, opacity: 0, duration: 0.32, ease: 'power3.in' })
      .to(
        rootEl,
        { clipPath: `circle(20px at ${ox}px ${oy}px)`, duration: 0.3, ease: 'power3.in' },
        0.08,
      )
  }, [onClose, origin])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [close])

  return (
    <div className="file" role="dialog" aria-modal="true" aria-label={title} onClick={close} ref={root}>
      <div className="file__panel" onClick={(e) => e.stopPropagation()} ref={panel}>
        <header className="file__head">
          <span className="hudpanel__tick" aria-hidden="true" />
          <span className="file__title">{title}</span>
          <button className="file__close" onClick={close} aria-label="Close file">
            ✕ CLOSE
          </button>
        </header>
        <div className="file__body">{children}</div>
      </div>
    </div>
  )
}

/** Browser-chrome frame around a desktop capture. */
function BrowserFrame({ src, alt, url }: { src: string; alt: string; url?: string }) {
  return (
    <div className="browserframe">
      <div className="browserframe__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{url ?? 'PREVIEW // PRODUCTION BUILD'}</span>
      </div>
      <img src={src} alt={alt} />
    </div>
  )
}

/** Phone frame around a mobile/app capture. */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phoneframe">
      <span className="phoneframe__island" aria-hidden="true" />
      <img src={src} alt={alt} />
    </div>
  )
}

/** Generic project file — device-framed showcase, case-study modules. */
export function FileOverlay({
  project,
  origin,
  onClose,
}: {
  project: Project
  origin?: FileOrigin
  onClose: () => void
}) {
  const hero = project.shots?.hero ?? project.media?.[0]?.src
  const rest = project.media?.slice(1) ?? []
  return (
    <Shell title={`FILE // ${project.name.toUpperCase()}`} onClose={onClose} origin={origin}>
      {project.appShots ? (
        <div className="file__appshots">
          {project.appShots.map((s) => (
            <PhoneFrame key={s} src={s} alt={`${project.name} app screen`} />
          ))}
        </div>
      ) : (
        hero && (
          <div className="file__showcase">
            <BrowserFrame src={hero} alt={`${project.name} — live product`} url={project.url} />
            {project.shots?.mobile && (
              <PhoneFrame src={project.shots.mobile} alt={`${project.name} on mobile`} />
            )}
          </div>
        )
      )}
      <p className="file__tagline">{project.tagline}</p>
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
      {(project.shots?.interior || rest.length > 0) && (
        <div className="file__media">
          {project.shots?.interior && (
            <img src={project.shots.interior} alt={`${project.name} — interior view`} loading="lazy" />
          )}
          {!project.shots?.interior &&
            rest.map((m) => <img key={m.src} src={m.src} alt={m.alt} loading="lazy" />)}
        </div>
      )}
      {project.link && (
        <a className="file__link" href={project.link} target="_blank" rel="noreferrer">
          OPEN REPOSITORY ▸
        </a>
      )}
    </Shell>
  )
}

/** Flagship file — Workout Buddy, current App Store captures + telemetry. */
export function WorkoutBuddyFile({
  origin,
  onClose,
}: {
  origin?: FileOrigin
  onClose: () => void
}) {
  return (
    <Shell title="FILE // WORKOUT BUDDY — FLAGSHIP" onClose={onClose} origin={origin}>
      <div className="file__metrics" aria-label="Key metrics">
        <div>
          <strong>LIVE</strong>
          <span>APP STORE v1.2</span>
        </div>
        <div>
          <strong>566</strong>
          <span>AUTOMATED TESTS</span>
        </div>
        <div>
          <strong>24</strong>
          <span>PROD MIGRATIONS</span>
        </div>
        <div>
          <strong>2</strong>
          <span>NATIVE SWIFT BRIDGES</span>
        </div>
      </div>
      <p className="file__tagline">
        iOS workout tracker, live on the App Store. React Native + Expo with hand-built Swift
        native modules — one person, the whole Apple stack.
      </p>
      <div className="file__media file__media--shots">
        <img src="/assets/wb/store-today.jpg" alt="Today screen — current App Store capture" />
        <img src="/assets/wb/store-buddy.jpg" alt="AI coach chat — current App Store capture" />
        <img src="/assets/wb/store-program.jpg" alt="Programs — current App Store capture" />
        <img src="/assets/wb/store-progress.jpg" alt="Progress — current App Store capture" />
        <img src="/assets/wb/watch-lift.png" alt="Apple Watch live lift session" />
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
