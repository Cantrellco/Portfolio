import { projects } from '../lib/projects'

/**
 * S4 alcoves, DOM tier: crawlable case-study cards in Five Pack's own
 * Challenge → Approach → Results format. The 3D alcove staging (spotlit
 * Higgsfield props, grain shader) lands on top of this in Phase 3.
 */
export function Work() {
  return (
    <section id="work" className="scene work" data-depth="mid">
      <p className="scene__eyebrow">Selected work</p>
      <h2 className="scene__title">Six products, one standard.</h2>
      <div className="work__grid">
        {projects.map((p) => (
          <article key={p.id} className="work__card">
            <h3 className="work__name">{p.name}</h3>
            <p className="work__tagline">{p.tagline}</p>
            <ul className="work__tech" aria-label="Technology">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <details className="work__study">
              <summary>Case study</summary>
              <dl>
                <dt>Challenge</dt>
                <dd>{p.challenge}</dd>
                <dt>Approach</dt>
                <dd>{p.approach}</dd>
                <dt>Results</dt>
                <dd>
                  <ul>
                    {p.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </dd>
              </dl>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer">
                  View repository
                </a>
              )}
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}
