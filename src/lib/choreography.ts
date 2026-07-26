import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { deviceState, setScreen } from './deviceState'
import { requestFrame } from './frame'

gsap.registerPlugin(ScrollTrigger)

export const FLAGSHIP_STEPS = 5

/**
 * The Keynote device choreography (S1 → S2). Scrubbed timelines mutate
 * deviceState; models lerp toward it. Screen/callout steps come from a
 * second trigger quantizing flagship progress.
 */
export function setupChoreography(): () => void {
  const ctx = gsap.context(() => {
    // Phone: right-of-headline in hero → face-on center-left through flagship,
    // then drifts back and yields the stage after the section.
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#flagship',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 0.7,
          onUpdate: requestFrame,
        },
      })
      .to(deviceState.phone, { x: 1.75, y: 0, z: 0.5, ry: -0.06, rx: 0, rz: 0, scale: 1, duration: 2 })
      .to(deviceState.phone, { ry: 0.09, y: 0.08, duration: 2.5 })
      .to(deviceState.phone, { ry: -0.05, y: -0.04, duration: 2.5 })
      .to(deviceState.phone, { x: 1.05, y: 0.18, z: 0.1, ry: 0.12, scale: 0.94, duration: 2 })

    // Watch: parked far right in hero, swings center-right for the watch beat
    // (last flagship step), then settles beside the phone.
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#flagship',
          start: '60% bottom',
          end: 'bottom bottom',
          scrub: 0.7,
          onUpdate: requestFrame,
        },
      })
      .to(deviceState.watch, { x: 2.6, y: -0.55, z: 1.3, ry: 0.18, rx: 0.04, scale: 1.0, duration: 3 })
      .to(deviceState.watch, { x: 2.45, y: -0.5, z: 1.0, duration: 2 })

    // After the flagship: devices exit stage left/right and fall back into
    // the fog so later scenes own the frame. They return for the finale later.
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#build-log',
          start: 'top bottom',
          end: '40% bottom',
          scrub: 0.7,
          onUpdate: requestFrame,
        },
      })
      .to(deviceState.phone, { x: -8, y: 0.6, z: -8, ry: 0.6, scale: 0.001, duration: 3 })
      .to(deviceState.watch, { x: 9, y: -1.4, z: -9, ry: -0.7, scale: 0.001, duration: 3 }, '<')

    // Feature step → screenshot + DOM callout highlight.
    ScrollTrigger.create({
      trigger: '#flagship',
      start: 'top 45%',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScreen(Math.min(FLAGSHIP_STEPS - 1, Math.floor(self.progress * FLAGSHIP_STEPS)))
        requestFrame()
      },
    })
  })

  return () => ctx.revert()
}
