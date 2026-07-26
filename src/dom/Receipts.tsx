import { aiPipeline, pipelineTotal } from '../lib/aiPipeline'
import { Ring } from './hud/Ring'

/**
 * S5 — numbers a CEO can check. Left: engineering stats (all real, all
 * verifiable in public repos / the shipped app). Right: the generative
 * asset pipeline log with actual credit costs.
 */
const STATS = [
  { value: '566', label: 'automated tests behind Workout Buddy (473 Jest + 93 Swift)', fraction: 0.92 },
  { value: '24', label: 'Postgres migrations in production, RLS everywhere', fraction: 0.62 },
  { value: '2', label: 'hand-built native Swift bridges (ActivityKit, WatchConnectivity)', fraction: 0.4 },
  { value: '6', label: 'products shipped end-to-end, solo', fraction: 0.75 },
  { value: '405k', label: 'tokens of agent research behind this site’s design', fraction: 0.85 },
  { value: '1', label: 'day from empty repo to working 3D site', fraction: 0.2 },
]

export function Receipts() {
  return (
    <section id="receipts" className="scene receipts" data-depth="mid">
      <p className="scene__eyebrow">Telemetry</p>
      <h2 className="scene__title">The numbers behind the work.</h2>
      <p className="scene__copy">
        Nothing here is taken on faith — each figure can be checked in the public repos, the
        App Store build, or this site’s commit history.
      </p>

      <div className="receipts__grid">
        <div className="receipts__stats">
          {STATS.map((s) => (
            <Ring key={s.label} value={s.value} label={s.label} fraction={s.fraction} />
          ))}
        </div>

        <aside className="receipts__pipeline">
          <h3>How the generative work is run</h3>
          <p>
            When I use AI to produce an asset, it gets a brief, a review, and a line in this
            ledger — model, purpose, real cost. Product screenshots stay real; generation is
            a tool I direct, not a substitute for the work.
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
