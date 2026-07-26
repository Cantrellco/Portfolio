/**
 * Alcove content (S4) — facts verified against the local repos during the
 * research inventory (docs/research-raw.json). Case studies follow Five
 * Pack's own structure: Challenge → Approach → Results.
 */
export interface Project {
  id: string
  name: string
  tagline: string
  tech: string[]
  challenge: string
  approach: string
  results: string[]
  link?: string
  /** Real screenshots/collages captured from the shipped work. */
  media?: { src: string; alt: string }[]
  /** Hub constellation placement: angle (deg, 0 = east, CCW) + radius/size multipliers. */
  node: { angle: number; radius: number; size: number; readout: string }
}

export const projects: Project[] = [
  {
    id: 'harvest',
    node: { angle: 30, radius: 1.0, size: 1.0, readout: '31,100 VERSES OFFLINE' },
    media: [
      { src: '/assets/projects/harvest-hero.jpg', alt: 'The Harvest app icon — radiant wheat sheaf' },
      { src: '/assets/projects/harvest-2.jpg', alt: 'Original in-app artwork: dove with halo' },
    ],
    name: 'The Harvest',
    tagline: 'Native SwiftUI Bible app — zero third-party dependencies.',
    tech: ['SwiftUI', 'CloudKit', 'Core ML', 'AVFoundation'],
    challenge:
      'A congregation wanted sermon notes that keep up with the preacher — without shipping their prayers to someone else’s cloud.',
    approach:
      'Pure-Apple build: 31,100+ verses offline, on-device sermon transcription that auto-links tappable scripture references, and a documented privacy invariant — user content lives in CloudKit, never durably on AWS.',
    results: [
      'Zero third-party dependencies',
      'On-device speech-to-scripture pipeline',
      'Privacy invariant written down and kept',
    ],
  },
  {
    id: 'fusion-coffee',
    node: { angle: 150, radius: 1.0, size: 0.95, readout: 'LIVE CLIENT SITE' },
    media: [
      { src: '/assets/projects/fusion-coffee-hero.jpg', alt: 'Fusion Coffee homepage hero — real interior photography' },
      { src: '/assets/projects/fusion-coffee-2.jpg', alt: 'Our Story section with sunlit shop photography' },
    ],
    name: 'Fusion Coffee',
    tagline: 'Marketing site for a real specialty coffee shop.',
    tech: ['Next.js 14', 'Static export', 'PWA'],
    challenge: 'A downtown coffee shop needed a site that looks like the brand tastes — on a small-business budget.',
    approach:
      'Next.js static export with real photography, a single content source of truth, and an architecture ready for a future native wrap.',
    results: ['Live client site', 'PWA installable', 'Single-source content model'],
    link: 'https://github.com/Cantrellco/Fusion-Coffee',
  },
  {
    id: 'little-town',
    node: { angle: 210, radius: 1.04, size: 0.9, readout: '0 DEPENDENCIES // 37 ASSETS' },
    media: [
      { src: '/assets/projects/little-town-hero.jpg', alt: 'Little Town Playhouse homepage with bespoke illustration' },
      { src: '/assets/projects/little-town-2.jpg', alt: 'Illustration-rich interior page' },
    ],
    name: 'Little Town Playhouse',
    tagline: 'Hand-authored site with 37 bespoke illustrated assets.',
    tech: ['Zero dependencies', 'Hand-rolled CSS', 'SVG illustration'],
    challenge: 'A children’s playhouse brand needed storybook charm no template could fake.',
    approach: 'No frameworks at all — 37 original illustrated assets and a cross-brand tie-in with Fusion Coffee.',
    results: ['0 npm dependencies', '37 bespoke SVG assets', 'Cross-brand design system'],
  },
  {
    id: 'faith-outreach',
    node: { angle: 0, radius: 1.0, size: 0.9, readout: 'ZERO-DOWNTIME RELAUNCH' },
    media: [
      { src: '/assets/projects/faith-outreach-hero.jpg', alt: 'fochurch.org homepage hero after the redesign' },
      { src: '/assets/projects/faith-outreach-2.jpg', alt: 'Plan Your Visit page — editorial layout' },
    ],
    name: 'Faith Outreach Church',
    tagline: 'Zero-downtime redesign with a 12-document client binder.',
    tech: ['Astro', 'SEO redirect map', 'Client enablement'],
    challenge: 'Redesign a live church site without breaking search traffic — or the volunteers who edit it.',
    approach:
      'Duplicate → build → domain-swap launch plan, full redirect map preserving SEO, and a staff edit guide so the client owns the result.',
    results: ['Zero downtime at launch', 'SEO preserved via redirect map', '12-document handoff binder'],
  },
  {
    id: 'pc-pro',
    node: { angle: 330, radius: 1.02, size: 0.85, readout: 'BACKENDLESS LEADS' },
    media: [
      { src: '/assets/projects/pc-pro-hero.jpg', alt: 'PC Pro Inspections homepage hero' },
    ],
    name: 'PC Pro Inspections',
    tagline: 'Config-driven site with backendless lead capture.',
    tech: ['Vite', 'React', 'Serverless forms'],
    challenge: 'A home inspector needed leads, not a CMS bill.',
    approach: 'Config-driven React site; lead capture with no backend to maintain.',
    results: ['Whole site edits from one config', 'Zero server costs'],
  },
]
