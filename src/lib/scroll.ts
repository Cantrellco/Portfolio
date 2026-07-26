import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneState } from './sceneState'
import { requestFrame } from './frame'

gsap.registerPlugin(ScrollTrigger)

export interface SmoothScroll {
  destroy: () => void
}

/** Smooth-scroll to a screen (used by the rail). */
export function scrollToSection(hash: string): void {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Native scroll + CSS scroll-snap drive the OS screens; ScrollTrigger reads
 * it directly. The master trigger mutates sceneState.progress (single source
 * of truth for the 3D journey) and requests GL frames on demand.
 */
export function initSmoothScroll(): SmoothScroll {
  // Throttled tabs must not stall one-shot timelines (boot, entrance):
  // with lag smoothing off, tweens jump to wall-clock time on each tick.
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
    destroy: () => {
      window.removeEventListener('pointermove', onPointerMove)
      master.kill()
    },
  }
}
