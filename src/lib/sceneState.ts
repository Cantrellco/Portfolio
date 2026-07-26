/**
 * Single mutable state object shared between the DOM/scroll world (GSAP,
 * ScrollTrigger, pointer handlers) and the R3F world (useFrame consumers).
 *
 * Invariant (see docs/BUILD-BRIEF.md §3): ScrollTrigger scrub timelines are the
 * single source of truth. They MUTATE this object; useFrame consumers only
 * READ it. Never route per-frame values through React state.
 */
export interface SceneState {
  /** 0..1 progress through the whole scroll journey. */
  progress: number
  /** Normalized cursor, -1..1, +y up in world terms. */
  cursorX: number
  cursorY: number
  /** True when the OS asks for reduced motion — scale motion down, never blank. */
  reducedMotion: boolean
}

export const sceneState: SceneState = {
  progress: 0,
  cursorX: 0,
  cursorY: 0,
  reducedMotion:
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
}
