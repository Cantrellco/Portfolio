import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { sceneState } from './sceneState'
import { requestFrame } from './frame'

gsap.registerPlugin(ScrollTrigger)

export interface SmoothScroll {
  lenis: Lenis
  destroy: () => void
}

let activeLenis: Lenis | null = null

/** Smooth-scroll to an anchor (used by nav) so the 3D journey plays through. */
export function scrollToSection(hash: string): void {
  const el = document.querySelector(hash)
  if (!el) return
  if (activeLenis) activeLenis.scrollTo(el as HTMLElement, { duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/**
 * One shared clock (BUILD-BRIEF §3): gsap.ticker drives Lenis, Lenis drives
 * ScrollTrigger, ScrollTrigger scrubs mutate sceneState, and requestFrame()
 * asks R3F for a render. No second rAF loop anywhere.
 */
export function initSmoothScroll(): SmoothScroll {
  const lenis = new Lenis({
    autoRaf: false,
    lerp: sceneState.reducedMotion ? 1 : 0.11,
  })
  activeLenis = lenis

  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const master = ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      sceneState.progress = self.progress
      requestFrame()
    },
  })

  const onPointerMove = (e: PointerEvent) => {
    sceneState.cursorX = (e.clientX / window.innerWidth) * 2 - 1
    sceneState.cursorY = -((e.clientY / window.innerHeight) * 2 - 1)
    requestFrame()
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  return {
    lenis,
    destroy: () => {
      window.removeEventListener('pointermove', onPointerMove)
      master.kill()
      gsap.ticker.remove(tick)
      if (activeLenis === lenis) activeLenis = null
      lenis.destroy()
    },
  }
}
