/**
 * The research fan-out that opened this build. Every unit here is a real
 * agent whose keyed result is archived verbatim in `docs/research-raw.json`
 * — the callsigns are the record's own keys. `finding` is what the agent came
 * back with; `decision` is what I did about it, which is the part that matters.
 */
export interface AgentUnit {
  /** Key as stored in docs/research-raw.json. */
  key: string
  callsign: string
  mission: string
  finding: string
  decision: string
  /** Position on the fleet ring: degrees CCW from east, 0..1 radius. */
  angle: number
}

export const agentFleet: AgentUnit[] = [
  {
    key: 'research:award-3d-sites',
    callsign: 'AWARD-3D',
    mission: 'Teardown of Awwwards / FWA / CSSDA winners, 2024–2026',
    finding:
      'Juries score Design 40 / Usability 30 / Creativity 20 / Content 10. Winners defend ONE concept with restraint; effect piles lose to polished and navigable.',
    decision: 'One concept, defended: the whole site is a single command deck.',
    angle: 90,
  },
  {
    key: 'research:stack',
    callsign: 'STACK',
    mission: '2026 render-stack audit with versions pinned',
    finding:
      'Vite 8 + React 19 + three 0.185 through R3F 9 and drei 10; GSAP 3.15 with ScrollTrigger now fully free; Lenis smooth scroll on a shared ticker.',
    decision: 'Shipped exactly that — one clock drives scroll, timelines and camera.',
    angle: 141,
  },
  {
    key: 'research:fivepack',
    callsign: 'TARGET',
    mission: 'Profile of the studio this site is aimed at',
    finding:
      'Onshore iOS-first studio, founded 2008, two US offices, 51–200 people — and it markets itself as AI First and AI Native.',
    decision: 'Speak their language: prove AI-augmented delivery instead of describing it.',
    angle: 193,
  },
  {
    key: 'research:ai-wow',
    callsign: 'AI-WOW',
    mission: 'How to show AI work without it reading as a gimmick',
    finding:
      'The target publicly sells AI-generated POCs "in unprecedented timelines". An interactive, verifiable agent log has no template ancestor on any award site.',
    decision: 'This deck. Receipts with hashes, not badges.',
    angle: 244,
  },
  {
    key: 'research:higgsfield',
    callsign: 'PIPELINE',
    mission: 'Generative asset survey and credit budget',
    finding:
      'Nano Banana 2 for photoreal plates up to 4K, image-to-3D for props, video models for ambient loops — 1,909 credits available on the account.',
    decision: 'Budget capped at 400 credits; every generation logged with its real cost.',
    angle: 296,
  },
  {
    key: 'research:skills-hunt',
    callsign: 'SKILLS',
    mission: 'Verify installable specialist skills for this exact build',
    finding:
      'Six real sources confirmed, including the official GreenSock skill pack — ScrollTrigger, SplitText and Flip are the backbone of award-tier scroll work.',
    decision: '19 skills installed mid-build: GSAP ×8, React Three Fiber ×11.',
    angle: 348,
  },
  {
    key: 'research:local-projects',
    callsign: 'INVENTORY',
    mission: 'Audit every shipped product on disk for real specs',
    finding:
      'Six products catalogued with actual stacks, repo paths and store status — from an App Store fitness app to a Phaser game revival.',
    decision: 'No invented case studies: every project on this site was read off the source.',
    angle: 39,
  },
]
