import { projects } from '../lib/projects'

/**
 * S4 — media-first project showcases. Each project is a full row: real
 * screenshots of the shipped work beside its case study (Five Pack's own
 * Challenge → Approach → Results structure). Rows alternate direction.
 */
export function Work() {
  return (
    <section id="work" className="scene work" data-depth="mid">
      <p className="scene__eyebrow">Selected work</p>
      <h2 className="scene__title">Six products, one standard.</h2>
      <div className="work__rows">
        {projects.map((p, i) => (
          <article key={p.id} className={`workrow${i % 2 ? ' workrow--flip' : ''}`}>
            {p.media?.length ? (
              <div className="workrow__media">
                {p.media.map((m, j) => (
                  <figure
                    key={m.src}
                    className={`workrow__shot${j === 1 ? ' workrow__shot--back' : ''}`}
                  >
                    <img src={m.src} alt={m.alt} loading="lazy" />
                  </figure>
                ))}
              </div>
            ) : (
              <div className="workrow__media workrow__media--empty" aria-hidden="true">
                <span>{p.name}</span>
              </div>
            )}
            <div className="workrow__body">
              <h3 className="workrow__name">{p.name}</h3>
              <p className="workrow__tagline">{p.tagline}</p>
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
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
