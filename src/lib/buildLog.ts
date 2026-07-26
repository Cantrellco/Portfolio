/**
 * S3 — "AI velocity, with receipts." Every entry is a REAL engineering event
 * from this site's own history, verifiable against the public repo
 * (github.com/Cantrellco/Portfolio). Engineering artifacts only — never
 * conversation transcripts. Times local (CDT), day one: 2026-07-26.
 */
export type LogKind = 'agent' | 'action' | 'commit' | 'result'

export interface LogEntry {
  time: string
  kind: LogKind
  text: string
}

export const buildLog: LogEntry[] = [
  { time: '11:54', kind: 'action', text: 'repo created public from the first commit — the process is part of the portfolio' },
  { time: '11:57', kind: 'agent', text: '8 research agents fan out in parallel: award-site technique survey, R3F stack audit, target-company research, AI-showcase design, generative asset pipeline, project inventory' },
  { time: '12:04', kind: 'result', text: '405,541 tokens of research distilled into one locked build brief — concept, stack, scene list, risk table' },
  { time: '12:06', kind: 'action', text: '22 specialist skills installed mid-build (GSAP ×8, React Three Fiber ×11) — the toolchain upgrades itself' },
  { time: '12:13', kind: 'commit', text: 'feat: scaffold Vite+R3F spine with shared-ticker scroll architecture' },
  { time: '12:15', kind: 'action', text: 'screenshot-verify loop: Playwright renders every change headless; bad framing caught → camera keyframes retuned, scene relit' },
  { time: '12:21', kind: 'commit', text: 'feat: flagship scene — procedural devices with real app screens' },
  { time: '12:24', kind: 'commit', text: 'feat: S4 work section — six case-study cards' },
  { time: 'day 1', kind: 'result', text: 'working 3D site by lunch: device choreography, five-beat feature rail, this log — before a studio kickoff meeting would have ended' },
]

/** Aggregates shown at the end of the replay — all verifiable. */
export const buildStats = [
  { value: '1', label: 'day to a working 3D site' },
  { value: '8–12', label: 'weeks: typical studio timeline for a site like this' },
  { value: '405k', label: 'tokens of research before the first line of code' },
  { value: '100%', label: 'of this log verifiable in the public repo' },
]
