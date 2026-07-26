import { scrollToSection } from '../lib/scroll'

const LINKS = [
  { href: '#flagship', label: 'Workout Buddy' },
  { href: '#build-log', label: 'The build' },
  { href: '#work', label: 'Work' },
  { href: '#receipts', label: 'Receipts' },
]

function go(e: React.MouseEvent<HTMLAnchorElement>, hash: string) {
  e.preventDefault()
  scrollToSection(hash)
}

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <a className="nav__wordmark" href="#hero" onClick={(e) => go(e, '#hero')}>
        Cody Cantrell
      </a>
      <div className="nav__links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </div>
      <a className="nav__cta" href="mailto:cantrellco.13@gmail.com">
        Get in touch
      </a>
    </nav>
  )
}
