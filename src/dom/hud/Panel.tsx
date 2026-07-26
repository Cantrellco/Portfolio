import type { ReactNode } from 'react'

/**
 * HUD module panel — bracket corners, mono title row with underline rule,
 * like the stacked label modules in the reference theme.
 */
export function Panel({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`hudpanel ${className}`}>
      <header className="hudpanel__title">
        <span className="hudpanel__tick" aria-hidden="true" />
        {title}
      </header>
      <div className="hudpanel__body">{children}</div>
    </section>
  )
}

/** Underlined readout row: label left, value right (ref's list style). */
export function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="readout">
      <span className="readout__label">{label}</span>
      <span className="readout__value">{value}</span>
    </div>
  )
}
