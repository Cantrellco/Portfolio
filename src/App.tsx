import { useEffect } from 'react'
import { Experience } from './three/Experience'
import { initSmoothScroll } from './lib/scroll'
import { journey } from './lib/journey'

/**
 * Page shell: DOM copy (crawlable, LCP = hero headline) over the fixed canvas.
 * Scroll pipeline boots once on mount and owns all motion.
 */
export default function App() {
  useEffect(() => {
    const smooth = initSmoothScroll()
    return () => smooth.destroy()
  }, [])

  return (
    <>
      <Experience />
      <main className="page">
        <header className="hero" id="hero">
          <h1 className="hero__title">
            I ship Apple-grade software at <em>AI speed</em>.
          </h1>
          <p className="hero__sub">
            Cody Cantrell — self-taught, AI-augmented developer. Built solo. Live on the App Store.
          </p>
        </header>

        {journey.map((scene) => (
          <section
            key={scene.id}
            id={scene.id}
            className="scene"
            data-depth={scene.depth === 'flat' ? undefined : scene.depth}
          >
            <p className="scene__eyebrow">{scene.eyebrow}</p>
            <h2 className="scene__title">{scene.title}</h2>
            <p className="scene__copy">{scene.copy}</p>
          </section>
        ))}
      </main>
    </>
  )
}
