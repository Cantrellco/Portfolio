import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Targeting-reticle cursor — ring lags the dot; locks onto interactives. */
export function Reticle() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('has-reticle')

    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power2.out' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power2.out' })
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 })

    const move = (e: PointerEvent) => {
      rx(e.clientX)
      ry(e.clientY)
      dx(e.clientX)
      dy(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest('a, button, summary')
      ring.current?.classList.toggle('is-locked', !!hit)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.classList.remove('has-reticle')
    }
  }, [])

  return (
    <>
      <div className="reticle" ref={ring} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="reticle-dot" ref={dot} aria-hidden="true" />
    </>
  )
}
