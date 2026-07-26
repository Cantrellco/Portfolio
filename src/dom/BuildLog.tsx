import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buildLog, buildStats } from '../lib/buildLog'
import { journey } from '../lib/journey'

gsap.registerPlugin(ScrollTrigger)

/**
 * S3 — scroll-scrubbed replay of the site's real build log. Entries light up
 * in sequence as the visitor scrolls; the totals strip lands at the end.
 * (Phase 4 syncs the 3D scene assembling wireframe→lit behind this.)
 */
export function BuildLog() {
  const scene = journey.find((s) => s.id === 'build-log')!
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = Array.from(list.children)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0.12, x: -8 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: '#build-log',
            start: 'top 55%',
            end: 'bottom 95%',
            scrub: 0.5,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="build-log" className="scene buildlog" data-depth="mid">
      <p className="scene__eyebrow">{scene.eyebrow}</p>
      <h2 className="scene__title">{scene.title}</h2>
      <p className="scene__copy">{scene.copy}</p>

      <ol className="buildlog__stream" ref={listRef}>
        {buildLog.map((e, i) => (
          <li key={i} className="buildlog__entry" data-kind={e.kind}>
            <span className="buildlog__time">{e.time}</span>
            <span className="buildlog__kind">{e.kind}</span>
            <span className="buildlog__text">{e.text}</span>
          </li>
        ))}
      </ol>

      <dl className="buildlog__stats">
        {buildStats.map((s) => (
          <div key={s.label} className="buildlog__stat">
            <dt className="visually-hidden">{s.label}</dt>
            <dd>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
