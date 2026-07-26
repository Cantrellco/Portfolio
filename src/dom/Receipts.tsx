import { aiPipeline, pipelineTotal } from '../lib/aiPipeline'

/**
 * S5 — numbers a CEO can check. Left: engineering stats (all real, all
 * verifiable in public repos / the shipped app). Right: the generative
 * asset pipeline log with actual credit costs.
 */
const STATS = [
  { value: '566', label: 'automated tests behind Workout Buddy (473 Jest + 93 Swift)' },
  { value: '24', label: 'Postgres migrations in production, RLS everywhere' },
  { value: '2', label: 'hand-built native Swift bridges (ActivityKit, WatchConnectivity)' },
  { value: '6', label: 'products shipped end-to-end, solo' },
  { value: '405k', label: 'tokens of agent research behind this site’s design' },
  { value: '1', label: 'day from empty repo to working 3D site' },
]

export function Receipts() {
  return (
    <section id="receipts" className="scene receipts" data-depth="mid">
      <p className="scene__eyebrow">The receipts</p>
      <h2 className="scene__title">Numbers a CEO can check.</h2>
      <p className="scene__copy">
        Everything below is verifiable — in the public repos, the App Store build, or this
        site’s own commit history.
      </p>

      <div className="receipts__grid">
        <dl className="receipts__stats">
          {STATS.map((s) => (
            <div key={s.label} className="receipts__stat">
              <dt className="visually-hidden">{s.label}</dt>
              <dd>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <aside className="receipts__pipeline">
          <h3>The generative pipeline, on the record</h3>
          <p>
            Every AI-generated asset on this page is logged — model, purpose, and what it
            actually cost. The devices are deliberately <em>not</em> AI: procedural geometry
            with real App Store screenshots.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Asset</th>
                <th scope="col">Model</th>
                <th scope="col">Credits</th>
              </tr>
            </thead>
            <tbody>
              {aiPipeline.map((e) => (
                <tr key={e.asset}>
                  <td>
                    {e.asset}
                    <small>{e.purpose}</small>
                  </td>
                  <td>{e.model}</td>
                  <td>{e.credits}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Total spent on generative assets</td>
                <td>{pipelineTotal()}</td>
              </tr>
            </tfoot>
          </table>
        </aside>
      </div>
    </section>
  )
}
