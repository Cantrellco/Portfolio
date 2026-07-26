/**
 * Bridge between the DOM/scroll world and R3F's on-demand frameloop.
 * Experience registers the canvas invalidate() once; anything that changes
 * visual state (scroll, pointer, timelines) calls requestFrame().
 */
let invalidateFn: (() => void) | null = null

export function registerInvalidate(fn: () => void): () => void {
  invalidateFn = fn
  return () => {
    if (invalidateFn === fn) invalidateFn = null
  }
}

export function requestFrame(): void {
  invalidateFn?.()
}
