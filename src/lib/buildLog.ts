/**
 * The AI-dev deck's data spine. Every entry is a REAL engineering event from
 * this site's own history, verifiable against the public repo
 * (github.com/Cantrellco/Portfolio) — commit hashes and diffstats come
 * straight out of `git log --shortstat`. Engineering artifacts only, never
 * conversation transcripts. Times local (CDT), day one: 2026-07-26.
 */
export type LogKind = 'agent' | 'action' | 'commit' | 'result'

/** Where an event sits in the direct-and-verify loop shown on the right rail. */
export type LoopStage = 'brief' | 'fanout' | 'direct' | 'build' | 'verify' | 'ship'

export interface LogEntry {
  time: string
  kind: LogKind
  stage: LoopStage
  text: string
  /** Real short SHA — deep-links to the commit on GitHub. */
  hash?: string
  /** Real `git log --shortstat` numbers. */
  diff?: { files: number; plus: number; minus: number }
  /** Repo path a visitor can open to check the claim. */
  artifact?: string
  /** One line of context for the artifact readout. */
  detail?: string
}

export const REPO = 'https://github.com/Cantrellco/Portfolio'

/** Head commit this snapshot was generated from — shown in the console bar. */
export const SNAPSHOT = 'ff90afb'

export const buildLog: LogEntry[] = [
  {
    time: '11:54',
    kind: 'action',
    stage: 'brief',
    text: 'repo created public from the first commit — the process is part of the portfolio',
    artifact: 'README.md',
    detail: 'Nothing here was staged after the fact; the history is the exhibit.',
  },
  {
    time: '11:56',
    kind: 'commit',
    stage: 'ship',
    text: 'chore: init repo with README and gitignore',
    hash: '8805601',
    diff: { files: 2, plus: 28, minus: 0 },
  },
  {
    time: '11:57',
    kind: 'agent',
    stage: 'fanout',
    text: '7 research agents dispatched in parallel — award-site teardown, stack audit, target profile, AI-showcase strategy, generative pipeline, skills hunt, project inventory',
    artifact: 'docs/research-raw.json',
    detail: 'Every agent returned a keyed result; all seven are archived verbatim in the repo.',
  },
  {
    time: '12:04',
    kind: 'result',
    stage: 'direct',
    text: '405,541 tokens of agent research reviewed and distilled into one locked build brief — concept, stack, scene list, risk table',
    artifact: 'docs/BUILD-BRIEF.md',
    detail: 'Research is input, not output: one human-owned decision document came out the other side.',
  },
  {
    time: '12:04',
    kind: 'commit',
    stage: 'ship',
    text: 'docs: add build brief and raw research',
    hash: 'dfa551d',
    diff: { files: 2, plus: 652, minus: 0 },
  },
  {
    time: '12:06',
    kind: 'action',
    stage: 'direct',
    text: '19 specialist skills installed mid-build (GSAP ×8, React Three Fiber ×11) — the toolchain upgrades itself before the first scene',
    artifact: 'docs/playbooks/',
    detail: 'Six sources vetted by the skills agent; only verified, installable ones were used.',
  },
  {
    time: '12:07',
    kind: 'commit',
    stage: 'ship',
    text: 'docs: add Higgsfield technique playbooks (scroll-scrub, wow-catalog, design-taste)',
    hash: '0686d23',
    diff: { files: 3, plus: 1635, minus: 0 },
  },
  {
    time: '12:13',
    kind: 'commit',
    stage: 'build',
    text: 'feat: scaffold Vite+R3F spine with shared-ticker scroll architecture',
    hash: '17a207a',
    diff: { files: 23, plus: 3886, minus: 0 },
    detail: 'One clock: gsap.ticker drives Lenis, Lenis drives ScrollTrigger. No second rAF loop, ever.',
  },
  {
    time: '12:15',
    kind: 'action',
    stage: 'verify',
    text: 'screenshot-verify loop wired up: Playwright renders every change headless; bad framing caught → camera keyframes retuned, scene relit',
    artifact: 'src/three/CameraRig.tsx',
    detail: 'The agent does not get to grade its own work — every visual change is re-rendered and looked at.',
  },
  {
    time: '12:21',
    kind: 'commit',
    stage: 'build',
    text: 'feat: flagship scene — procedural devices with real app screens',
    hash: '5d16cb1',
    diff: { files: 21, plus: 512, minus: 132 },
    detail: 'Precision hardware is modelled, never AI-meshed; the screens are real App Store captures.',
  },
  {
    time: '12:22',
    kind: 'commit',
    stage: 'direct',
    text: 'docs: repo CLAUDE.md — invariants, commands, status ledger',
    hash: 'b69385e',
    diff: { files: 1, plus: 53, minus: 0 },
    detail: 'Written constraints for the agent: what it may not break, what must stay green.',
  },
  {
    time: '12:24',
    kind: 'commit',
    stage: 'build',
    text: 'feat: S4 work section — six case-study cards in Challenge/Approach/Results format',
    hash: 'a3a7c5a',
    diff: { files: 6, plus: 266, minus: 15 },
  },
  {
    time: '12:26',
    kind: 'commit',
    stage: 'build',
    text: "feat: S3 build-log replay v1 — the site's real build history, scroll-scrubbed",
    hash: '1530d6f',
    diff: { files: 5, plus: 196, minus: 2 },
  },
  {
    time: '12:27',
    kind: 'commit',
    stage: 'ship',
    text: 'docs: update status ledger',
    hash: '1148b94',
    diff: { files: 1, plus: 8, minus: 4 },
  },
  {
    time: '12:43',
    kind: 'commit',
    stage: 'build',
    text: 'feat: media-first project showcases + atmosphere pass',
    hash: 'a249b01',
    diff: { files: 17, plus: 231, minus: 79 },
    detail: 'Review found the non-flagship projects were bare text — every project got real staging.',
  },
  {
    time: '13:43',
    kind: 'commit',
    stage: 'build',
    text: 'feat: nav, hero entrance, receipts dashboard, contact close, generated environment art',
    hash: 'b03b7ab',
    diff: { files: 13, plus: 540, minus: 23 },
  },
  {
    time: '14:06',
    kind: 'commit',
    stage: 'direct',
    text: 'feat!: JARVIS HUD redesign + realistic device rebuild',
    hash: '5f4f62d',
    diff: { files: 18, plus: 514, minus: 103 },
    detail: 'First art direction rejected in review. Restarted rather than patched — a reskin would have shown.',
  },
  {
    time: '14:08',
    kind: 'commit',
    stage: 'build',
    text: 'feat: AI-generated stage props (dumbbell + cup GLBs), meshopt+webp optimized 25x',
    hash: '294f5a2',
    diff: { files: 3, plus: 35, minus: 0 },
    detail: 'Generated meshes are compressed 25× before they are allowed near the bundle.',
  },
  {
    time: '14:08',
    kind: 'commit',
    stage: 'ship',
    text: 'docs: record JARVIS design direction',
    hash: '001455b',
    diff: { files: 1, plus: 10, minus: 0 },
  },
  {
    time: '15:05',
    kind: 'commit',
    stage: 'build',
    text: 'feat!: complete JARVIS dashboard rework per reference',
    hash: '9ff4b36',
    diff: { files: 13, plus: 742, minus: 80 },
  },
  {
    time: '15:24',
    kind: 'commit',
    stage: 'direct',
    text: 'feat!: restart — radial hub, every project stems from the reactor core',
    hash: 'd6a6ef1',
    diff: { files: 15, plus: 678, minus: 359 },
    detail: '359 lines deleted in one commit. When the direction changes the change is total, not cosmetic.',
  },
  {
    time: '15:25',
    kind: 'commit',
    stage: 'ship',
    text: 'docs: record radial-hub direction',
    hash: 'ec6c52b',
    diff: { files: 1, plus: 13, minus: 8 },
  },
  {
    time: '15:35',
    kind: 'commit',
    stage: 'build',
    text: 'feat: high-futurism layer — boot decrypt, living video core, targeting systems',
    hash: 'af211fe',
    diff: { files: 9, plus: 494, minus: 11 },
  },
  {
    time: '15:47',
    kind: 'commit',
    stage: 'build',
    text: 'feat!: push further — holographic file transitions, finished project pages',
    hash: '9f36543',
    diff: { files: 14, plus: 462, minus: 97 },
  },
  {
    time: '16:02',
    kind: 'commit',
    stage: 'ship',
    text: 'feat: true-center hub geometry + reframed AI/telemetry copy',
    hash: 'ff90afb',
    diff: { files: 9, plus: 81, minus: 24 },
  },
  {
    time: '16:02',
    kind: 'result',
    stage: 'ship',
    text: '4h 06m from empty repo to a working 3D site — 20 commits, 11,036 insertions, 84 files tracked, every frame verified against a screenshot',
    artifact: 'git log --shortstat',
    detail: 'Run the command yourself against the public repo; the numbers above are its output.',
  },
]

/** Snapshot aggregates — all straight from `git log --shortstat`. */
export interface BuildStat {
  value: string
  /** Set when the figure should count up on reveal. */
  count?: number
  suffix?: string
  label: string
}

export const buildStats: BuildStat[] = [
  { value: '4h 06m', label: 'from empty repo to a working 3D site — first commit 11:56, last 16:02' },
  {
    value: '20',
    count: 20,
    label: 'commits, 11,036 insertions and 937 deletions across 84 tracked files',
  },
  {
    value: '7',
    count: 7,
    label: 'research agents briefed, reviewed and distilled into one locked build brief',
  },
  {
    value: '100%',
    count: 100,
    suffix: '%',
    label: 'of this log checkable in the public repo — every hash links straight to the diff',
  },
]

/** Session vitals for the console header. */
export const vitals = {
  elapsed: '4h 06m',
  commits: buildLog.filter((e) => e.kind === 'commit').length,
  insertions: 11036,
  deletions: 937,
  files: 84,
}

export const KIND_ORDER: LogKind[] = ['agent', 'action', 'commit', 'result']

export const STAGES: { id: LoopStage; label: string }[] = [
  { id: 'brief', label: 'BRIEF' },
  { id: 'fanout', label: 'FAN OUT' },
  { id: 'direct', label: 'DIRECT' },
  { id: 'build', label: 'BUILD' },
  { id: 'verify', label: 'VERIFY' },
  { id: 'ship', label: 'SHIP' },
]
