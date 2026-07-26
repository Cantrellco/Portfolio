import { useEffect } from 'react'
import gsap from 'gsap'
import { Experience } from './three/Experience'
import { initSmoothScroll } from './lib/scroll'
import { setupChoreography } from './lib/choreography'
import { sceneState } from './lib/sceneState'
import { Flagship } from './dom/Flagship'
import { Work } from './dom/Work'
import { BuildLog } from './dom/BuildLog'
import { Nav } from './dom/Nav'
import { Receipts } from './dom/Receipts'
import { Process } from './dom/Process'

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
      .fromTo('.hero__title', { y: 44 * d, opacity: 0 }, { y: 0, opacity: 1, duration: d })
      .fromTo(
        '.hero__sub',
        { y: 24 * d, opacity: 0 },
        { y: 0, opacity: 1, duration: d * 0.8 },
        '-=0.55',
      )
      .fromTo('.nav', { opacity: 0 }, { opacity: 1, duration: d * 0.6 }, '-=0.4')

    return () => {
      entrance.kill()
      teardownChoreography()
      smooth.destroy()
    }
  }, [])

  return (
    <>
      <Experience />
      <Nav />
      <main className="page">
        <header className="hero" id="hero">
          <h1 className="hero__title">
            I ship Apple-grade software at <em>AI speed</em>.
          </h1>
          <p className="hero__sub">
            Cody Cantrell — self-taught, AI-augmented developer. Built solo. Live on the App Store.
          </p>
        </header>

        <Flagship />

        <BuildLog />
        <Work />
        <Receipts />
        <Process />
      </main>
    </>
  )
}
