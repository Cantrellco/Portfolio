import { useEffect } from 'react'
import gsap from 'gsap'
import { Experience } from './three/Experience'
import { initSmoothScroll } from './lib/scroll'
import { setupChoreography } from './lib/choreography'
import { sceneState } from './lib/sceneState'
import { Flagship } from './dom/Flagship'
import { Work } from './dom/Work'
import { BuildLog } from './dom/BuildLog'
import { Receipts } from './dom/Receipts'
import { Process } from './dom/Process'
import { HeroDashboard } from './dom/HeroDashboard'
import { StatusBar, Rail, ParticleField } from './dom/hud/Chrome'

/**
 * Page shell: DOM copy (crawlable, LCP = hero headline) over the fixed canvas.
 * Scroll pipeline boots once on mount and owns all motion.
 */
export default function App() {
  useEffect(() => {
    const smooth = initSmoothScroll()
    const teardownChoreography = setupChoreography()

    // Entrance: headline rises, sub + nav follow. Scaled down, never skipped,
    // under reduced motion.
    const d = sceneState.reducedMotion ? 0.3 : 1
    const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })
    entrance
      .fromTo(
        '.herohud__center',
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: d },
      )
      .fromTo(
        '.hudpanel',
        { opacity: 0, y: 18 * d },
        { opacity: 1, y: 0, duration: d * 0.7, stagger: 0.09 },
        '-=0.5',
      )
      .fromTo(
        ['.statusbar', '.rail'],
        { opacity: 0 },
        { opacity: 1, duration: d * 0.6 },
        '-=0.4',
      )

    return () => {
      entrance.kill()
      teardownChoreography()
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
        <HeroDashboard />

        <Flagship />

        <BuildLog />
        <Work />
        <Receipts />
        <Process />
      </main>
    </>
  )
}
