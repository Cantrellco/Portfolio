/**
 * The Keynote — scene list and copy skeleton (BUILD-BRIEF §2).
 * Scroll ranges emerge from section heights; ids anchor ScrollTriggers.
 */
export interface Scene {
  id: string
  eyebrow: string
  title: string
  copy: string
  /** Section height class: 'flat' 100svh, 'mid' 180svh, 'deep' 300svh. */
  depth: 'flat' | 'mid' | 'deep'
}

export const journey: Scene[] = [
  {
    id: 'flagship',
    eyebrow: 'Workout Buddy — live on the App Store',
    title: 'One person. The whole Apple stack.',
    copy:
      'React Native + Expo product with hand-built Swift native modules: a full SwiftUI Apple Watch app on HKWorkoutSession, interactive Live Activities in the Dynamic Island, Siri and Control Center intents, HealthKit both directions — backed by Supabase, an offline-first sync queue, and 566 tests.',
    depth: 'deep',
  },
  {
    id: 'build-log',
    eyebrow: 'AI dev // orchestration deck',
    title: 'Agents draft. I direct and verify.',
    copy:
      'This is the loop running live on the repo you are looking at: brief a fleet, review what comes back, verify every change against a real screenshot, ship. Step through any line — the hash opens the diff.',
    depth: 'mid',
  },
  {
    id: 'work',
    eyebrow: 'Selected work',
    title: 'Six products, one standard.',
    copy:
      'Client sites, a native SwiftUI Bible app, a revived App Store #1 — each shipped end-to-end: design, build, launch, and the unglamorous parts in between.',
    depth: 'mid',
  },
  {
    id: 'receipts',
    eyebrow: 'The receipts',
    title: 'Numbers a CEO can check.',
    copy:
      'Commits, sessions, TestFlight builds, and the generative pipeline behind every asset on this page — logged, dated, verifiable.',
    depth: 'mid',
  },
  {
    id: 'process',
    eyebrow: 'How I work',
    title: 'Ownership, simply.',
    copy:
      'Solo does not mean siloed: written case studies, honest tradeoffs, proactive communication. I build like the client is in the room.',
    depth: 'flat',
  },
]
