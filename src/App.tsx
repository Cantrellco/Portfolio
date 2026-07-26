import { useEffect } from 'react'
import gsap from 'gsap'
import { Experience } from './three/Experience'
import { initSmoothScroll } from './lib/scroll'
import { sceneState } from './lib/sceneState'
import { BuildLog } from './dom/BuildLog'
import { Receipts } from './dom/Receipts'
import { Process } from './dom/Process'
import { Hub } from './dom/hub/Hub'
import { StatusBar, Rail, ParticleField } from './dom/hud/Chrome'

/**
 * Page shell: DOM copy (crawlable, LCP = hero headline) over the fixed canvas.
 * Scroll pipeline boots once on mount and owns all motion.
 */
export default function App() {
  useEffect(() => {
    const smooth = initSmoothScroll()

    // Boot sequence: core first, then wires, nodes radiate out, chrome last.
    // Scaled down (never skipped) under reduced motion.
    const d = sceneState.reducedMotion ? 0.35 : 1
    const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })
    entrance
      .fromTo('.hub__core', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: d })
      .fromTo('.hub__wires', { opacity: 0 }, { opacity: 1, duration: d * 0.8 }, '-=0.5')
      .fromTo(
        '.hubnode',
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: d * 0.6, stagger: 0.07, ease: 'back.out(1.6)' },
        '-=0.45',
      )
      .fromTo(
        ['.statusbar', '.rail', '.hub__corner', '.hub__hint'],
        { opacity: 0 },
        { opacity: 1, duration: d * 0.5 },
        '-=0.3',
      )

    return () => {
      entrance.kill()
      smooth.destroy()
    }
  }, [])

  return (
    <>
      <Experience />
      <ParticleField />
      <StatusBar />
      <Rail />
      <main className="page">
        <Hub />
        <BuildLog />
        <Receipts />
        <Process />
      </main>
    </>
  )
}
