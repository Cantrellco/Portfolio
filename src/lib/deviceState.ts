/**
 * Choreography targets for the two hero devices. GSAP scrub timelines mutate
 * these plain objects (single source of truth); the R3F models lerp toward
 * them in useFrame. `screen` is the flagship feature step — it also drives
 * the DOM callout rail via the listener set.
 */
export interface DevicePose {
  x: number
  y: number
  z: number
  rx: number
  ry: number
  rz: number
  scale: number
}

export const deviceState = {
  phone: { x: 2.1, y: -0.1, z: 0, rx: 0.04, ry: -0.24, rz: -0.04, scale: 1 } as DevicePose,
  watch: { x: 3.7, y: -1.3, z: 0.6, rx: 0.12, ry: -0.5, rz: 0.06, scale: 1 } as DevicePose,
  /** Active flagship feature step / phone screenshot index. */
  screen: 0,
}

if (import.meta.env.DEV) {
  ;(window as unknown as Record<string, unknown>).__deviceState = deviceState
}

type ScreenListener = (index: number) => void
const listeners = new Set<ScreenListener>()

export function onScreenChange(fn: ScreenListener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function setScreen(index: number): void {
  if (deviceState.screen === index) return
  deviceState.screen = index
  listeners.forEach((fn) => fn(index))
}
