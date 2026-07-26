/**
 * S3 — "Watch this site build itself." Every entry below is a REAL event
 * from the site's own build log (2026-07-26, day one), verifiable against
 * the public commit history. Keep this honest: additions must come from
 * actual sessions. Times are local (CDT).
 */
export type LogKind = 'prompt' | 'agent' | 'action' | 'commit' | 'result'

export interface LogEntry {
  time: string
  kind: LogKind
  text: string
}

export const buildLog: LogEntry[] = [
  { time: '11:52', kind: 'prompt', text: 'create a new github repo and call it Portfolio… this should look like a 50k website by the time we are done' },
  { time: '11:54', kind: 'action', text: 'gh repo create Cantrellco/Portfolio --public --clone' },
  { time: '11:56', kind: 'commit', text: 'chore: init repo with README and gitignore' },
  { time: '11:57', kind: 'agent', text: 'workflow: 8 research agents in parallel — award-site techniques, stack, Five Pack Creative intel, AI wow features, Higgsfield pipeline, skill hunt, project inventory' },
  { time: '12:04', kind: 'result', text: '405k tokens of research → one build brief: "The Keynote" — an Apple-launch scroll narrative with procedural devices running real app screens' },
  { time: '12:04', kind: 'commit', text: 'docs: add build brief and raw research' },
  { time: '12:06', kind: 'action', text: 'installed 22 specialist skills (GSAP ×8, React Three Fiber ×11, Anthropic ×3)' },
  { time: '12:13', kind: 'commit', text: 'feat: scaffold Vite+R3F spine with shared-ticker scroll architecture' },
  { time: '12:15', kind: 'action', text: 'Playwright screenshots → hero framing wrong → retune camera keyframes, relight' },
  { time: '12:21', kind: 'commit', text: 'feat: flagship scene — procedural devices with real app screens' },
  { time: '12:24', kind: 'commit', text: 'feat: S4 work section — six case-study cards' },
]

/** Aggregates shown at the end of the replay — all verifiable. */
export const buildStats = [
  { value: '1', label: 'day, so far' },
  { value: '8–12', label: 'weeks: typical studio timeline for a site like this' },
  { value: '8', label: 'parallel research agents before the first line of code' },
  { value: '22', label: 'specialist skills installed mid-build' },
]
