import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  KIND_ORDER,
  REPO,
  SNAPSHOT,
  buildLog,
  buildStats,
  vitals,
} from '../../lib/buildLog'
import type { LogEntry, LogKind } from '../../lib/buildLog'
import { agentFleet } from '../../lib/agentFleet'
import { journey } from '../../lib/journey'
import { sceneState } from '../../lib/sceneState'
import { FleetGraph } from './FleetGraph'
import { LoopRail } from './LoopRail'

gsap.registerPlugin(ScrollTrigger)

type Filter = LogKind | 'all'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'ALL' },
  ...KIND_ORDER.map((k) => ({ id: k as Filter, label: k.toUpperCase() })),
]

/** Repo deep-link for an entry's artifact, when it is a real tracked path. */
function artifactHref(entry: LogEntry) {
  if (entry.hash) return `${REPO}/commit/${entry.hash}`
  const a = entry.artifact
  if (!a || !/[/.]/.test(a) || a.includes(' ')) return null
  return `${REPO}/blob/main/${a}`
}

/**
 * The AI-dev deck. Left: the real build stream as a filterable console.
 * Right: the instruments that stream drives — the research fleet, the
 * direct-and-verify loop, and the artifact behind whichever line is live.
 */
export function AiDev() {
  const scene = journey.find((s) => s.id === 'build-log')!
  const [filter, setFilter] = useState<Filter>('all')
  const [index, setIndex] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [fleetKey, setFleetKey] = useState<string | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])

  const entries = useMemo(
    () => (filter === 'all' ? buildLog : buildLog.filter((e) => e.kind === filter)),
    [filter],
  )
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: buildLog.length }
    KIND_ORDER.forEach((k) => (c[k] = buildLog.filter((e) => e.kind === k).length))
    return c
  }, [])

  const safeIndex = Math.min(index, entries.length - 1)
  const active = entries[safeIndex]
  const unit = fleetKey ? agentFleet.find((u) => u.key === fleetKey) ?? null : null

  // Scroll drives the replay until the visitor takes over.
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#build-log',
      start: 'top 62%',
      end: 'bottom 92%',
      onUpdate: (self) => {
        if (pinned) return
        const n = entries.length
        const next = Math.min(n - 1, Math.max(0, Math.floor(self.progress * (n + 0.4))))
        setIndex((prev) => (prev === next ? prev : next))
      },
    })
    return () => st.kill()
  }, [entries.length, pinned])

  // Keep the live line in view inside the console without moving the page.
  useEffect(() => {
    const body = bodyRef.current
    const row = rowRefs.current[safeIndex]
    if (!body || !row) return
    const top = row.offsetTop - body.clientHeight / 2 + row.offsetHeight / 2
    body.scrollTo({ top, behavior: sceneState.reducedMotion ? 'auto' : 'smooth' })
  }, [safeIndex, entries])

  // Aggregates count up once the deck powers on.
  const rootRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const suffix = el.dataset.suffix ?? ''
        if (sceneState.reducedMotion) {
          el.textContent = target.toLocaleString() + suffix
          return
        }
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString() + suffix
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const select = useCallback((i: number) => {
    setIndex(i)
    setPinned(true)
    setFleetKey(null)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = entries.length - 1
    let next: number | null = null
    if (e.key === 'ArrowDown') next = Math.min(last, safeIndex + 1)
    else if (e.key === 'ArrowUp') next = Math.max(0, safeIndex - 1)
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    select(next)
    rowRefs.current[next]?.focus()
  }

  const href = active ? artifactHref(active) : null

  return (
    <section id="build-log" className="scene aidev" aria-labelledby="aidev-title" ref={rootRef}>
      <header className="aidev__head">
        <div>
          <p className="scene__eyebrow">{scene.eyebrow}</p>
          <h2 className="scene__title" id="aidev-title">
            {scene.title}
          </h2>
          <p className="scene__copy">{scene.copy}</p>
        </div>

        <dl className="aidev__vitals">
          <div>
            <dt>SESSION</dt>
            <dd>DAY 01 // {vitals.elapsed}</dd>
          </div>
          <div>
            <dt>COMMITS</dt>
            <dd>{vitals.commits}</dd>
          </div>
          <div>
            <dt>NET LINES</dt>
            <dd className="is-plus">
              +
              <span data-count={vitals.insertions - vitals.deletions}>
                {(vitals.insertions - vitals.deletions).toLocaleString()}
              </span>
            </dd>
          </div>
          <div>
            <dt>SNAPSHOT</dt>
            <dd>
              <a href={`${REPO}/commits/main`} target="_blank" rel="noreferrer">
                {SNAPSHOT} ↗
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <div className="aidev__deck">
        {/* ---------------- left: the stream ---------------- */}
        <div className="console">
          <div className="console__bar">
            <span className="console__led" aria-hidden="true" />
            <span className="console__name">EXECUTION STREAM</span>
            <span className="console__path">/Cantrellco/Portfolio @ {SNAPSHOT}</span>
            <button
              type="button"
              className={`console__mode${pinned ? '' : ' is-live'}`}
              onClick={() => setPinned((p) => !p)}
            >
              {pinned ? '❚❚ PINNED' : '▶ FOLLOWING SCROLL'}
            </button>
          </div>

          <div className="console__filters" role="group" aria-label="Filter log by type">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${filter === f.id ? ' is-on' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => {
                  setFilter(f.id)
                  setIndex(0)
                  setFleetKey(null)
                }}
              >
                {f.label}
                <em>{counts[f.id]}</em>
              </button>
            ))}
          </div>

          <div className="console__body" ref={bodyRef} onKeyDown={onKeyDown}>
            <ol className="console__list">
              {entries.map((e, i) => (
                <li key={`${e.time}-${e.hash ?? i}`}>
                  <button
                    type="button"
                    ref={(el) => {
                      rowRefs.current[i] = el
                    }}
                    className={`logrow${i === safeIndex ? ' is-active' : ''}${
                      i < safeIndex ? ' is-past' : ''
                    }`}
                    data-kind={e.kind}
                    onClick={() => select(i)}
                    aria-current={i === safeIndex}
                  >
                    <span className="logrow__caret" aria-hidden="true">
                      ▸
                    </span>
                    <span className="logrow__time">{e.time}</span>
                    <span className="logrow__kind">{e.kind}</span>
                    <span className="logrow__text">{e.text}</span>
                    {e.hash && <span className="logrow__hash">{e.hash}</span>}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <p className="console__hint" aria-hidden="true">
            ▸ SELECT A LINE — ↑ ↓ TO STEP — FILTERS ABOVE
          </p>
        </div>

        {/* ---------------- right: the instruments ---------------- */}
        <div className="aidev__inst">
          <section className="inst inst--fleet">
            <header className="inst__bar">
              <span className="inst__name">RESEARCH FLEET</span>
              <span className="inst__meta">{agentFleet.length} UNITS // ARCHIVED</span>
            </header>
            <FleetGraph
              activeKey={fleetKey}
              live={active?.kind === 'agent'}
              onSelect={(k) => setFleetKey((prev) => (prev === k ? null : k))}
            />
          </section>

          <section className="inst inst--loop">
            <header className="inst__bar">
              <span className="inst__name">DELIVERY LOOP</span>
              <span className="inst__meta">STAGE // {(active?.stage ?? 'brief').toUpperCase()}</span>
            </header>
            <LoopRail active={active?.stage ?? 'brief'} />
          </section>

          <section className="inst inst--readout">
            <header className="inst__bar">
              <span className="inst__name">{unit ? 'AGENT DOSSIER' : 'ARTIFACT'}</span>
              <span className="inst__meta">
                {unit ? unit.key : active?.hash ?? active?.artifact ?? '—'}
              </span>
            </header>

            {unit ? (
              <div className="readoutBody">
                <h3>{unit.callsign}</h3>
                <p className="readoutBody__mission">{unit.mission}</p>
                <p className="readoutBody__label">RETURNED</p>
                <p>{unit.finding}</p>
                <p className="readoutBody__label">DECISION</p>
                <p className="readoutBody__decision">{unit.decision}</p>
                <div className="readoutBody__actions">
                  <a href={`${REPO}/blob/main/docs/research-raw.json`} target="_blank" rel="noreferrer">
                    OPEN THE RAW RESULT ↗
                  </a>
                  <button type="button" onClick={() => setFleetKey(null)}>
                    CLOSE
                  </button>
                </div>
              </div>
            ) : active ? (
              <div className="readoutBody">
                <h3>{active.hash ? active.text.split('—')[0].trim() : active.text}</h3>
                {active.detail && <p>{active.detail}</p>}

                {active.diff && (
                  <>
                    <div className="diffbar" aria-hidden="true">
                      <span
                        style={{
                          width: `${(active.diff.plus / (active.diff.plus + active.diff.minus || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <dl className="readoutBody__stats">
                      <div>
                        <dt>FILES</dt>
                        <dd>{active.diff.files}</dd>
                      </div>
                      <div>
                        <dt>ADDED</dt>
                        <dd className="is-plus">+{active.diff.plus.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt>REMOVED</dt>
                        <dd className="is-minus">−{active.diff.minus.toLocaleString()}</dd>
                      </div>
                    </dl>
                  </>
                )}

                <div className="readoutBody__actions">
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer">
                      {active.hash ? 'READ THE DIFF' : 'OPEN THE FILE'} ↗
                    </a>
                  ) : (
                    <span className="readoutBody__cmd">{active.artifact}</span>
                  )}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>

      {/* ---------------- full-width close ---------------- */}
      <dl className="aidev__deckstats">
        {buildStats.map((s) => (
          <div key={s.label}>
            <dt className="visually-hidden">{s.label}</dt>
            <dd>
              <strong
                data-count={s.count}
                data-suffix={s.suffix}
                aria-label={s.value}
              >
                {s.value}
              </strong>
              <span>{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
