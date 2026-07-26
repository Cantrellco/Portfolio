const VALUES = [
  {
    name: 'Ownership',
    proof: 'App, backend, Watch app, CI, TestFlight, support — one accountable person, end to end.',
  },
  {
    name: 'Simplicity',
    proof: 'One defended concept per build. Restraint is a feature: 60fps beats one more effect.',
  },
  {
    name: 'Innovation',
    proof: 'Agent fan-outs, generative pipelines, native bridges — used where they earn their place, logged where they don’t speak for themselves.',
  },
  {
    name: 'Integrity',
    proof: 'Honest case studies, verifiable numbers, a public repo. If a claim is on this page, you can check it.',
  },
]

/** S6 — how I work + contact. Quiet, typographic, confident close. */
export function Process() {
  return (
    <section id="process" className="scene process">
      <p className="scene__eyebrow">How I work</p>
      <h2 className="scene__title">Built like the client is in the room.</h2>

      <div className="process__values">
        {VALUES.map((v) => (
          <div key={v.name} className="process__value">
            <h3>{v.name}</h3>
            <p>{v.proof}</p>
          </div>
        ))}
      </div>

      <div className="process__contact">
        <h3 className="process__close">Let’s build something worth shipping.</h3>
        <div className="process__actions">
          <a className="process__mail" href="mailto:cantrellco.13@gmail.com">
            cantrellco.13@gmail.com
          </a>
          <a href="https://github.com/Cantrellco" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://apps.apple.com/app/id6771810116"
            target="_blank"
            rel="noreferrer"
          >
            Workout Buddy on the App Store
          </a>
        </div>
      </div>
    </section>
  )
}
