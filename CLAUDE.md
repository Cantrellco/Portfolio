# Portfolio — Cody Cantrell's 3D portfolio site

Interactive 3D portfolio ("The Keynote") targeting a job at Five Pack Creative.
**Read `docs/BUILD-BRIEF.md` before making design or scope decisions** — it locks
positioning, art direction, scene list, wow features, asset plan, and phases.
`docs/playbooks/` holds technique references (scroll-scrub video chains, wow
catalog, design taste). `docs/research-raw.json` is the full research dump.

## Commands

- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — `tsc -b && vite build` (must stay green)
- Visual check: webapp-testing skill → Playwright screenshots against dev server

## Architecture invariants (do not break)

- **One clock.** `gsap.ticker` drives Lenis (`src/lib/scroll.ts`); Lenis drives
  ScrollTrigger. No second rAF loop, ever.
- **Timelines mutate, frames read.** GSAP scrub timelines are the single source
  of truth: they mutate plain state objects (`sceneState`, `deviceState`);
  R3F `useFrame` consumers only read + lerp toward them. Never route per-frame
  values through React state.
- **On-demand rendering.** Canvas is `frameloop="demand"`. Anything changing
  visual state calls `requestFrame()` (`src/lib/frame.ts`); in-flight lerps
  self-sustain by calling `invalidate()` until settled.
- **Camera keyframes** live in `src/three/CameraRig.tsx` (`KEYS`, journey-progress
  keyed). Devices stay near the origin; the camera travels. Retune keys whenever
  section heights change scroll shares.
- **DOM owns copy.** All prose is crawlable DOM (hero h1 = LCP). The canvas is
  `aria-hidden` decoration. No drei ScrollControls, no @react-three/uikit.
- **Never AI-mesh precision hardware.** iPhone/Watch are procedural + real
  screenshots (`public/assets/wb/`). Higgsfield only for organic props, stills,
  video loops (budget ≤400 credits, log every generation — the log is S5 content).

## Gotchas

- Git push requires `user.email 215689510+Cantrellco@users.noreply.github.com`
  (repo-local config, already set) — GitHub rejects the private gmail.
- `vite-plugin-glsl` does not support Vite 8 — shaders are `.frag`/`.vert`
  imported with `?raw`.
- Screenshot sources live in `/Users/cody/workout-buddy/WorkoutBuddy/`
  (`landing/shots/`, `store-assets/appstore/`); there are NO bezel image assets
  there — bezels are procedural here by design.
- three.js chunk ~1.2MB: code-split + KTX2/webp compression queued for the perf
  pass (Phase 6), not yet done.

## Status ledger

Done: research, brief, scaffold, spine (Lenis+ScrollTrigger+camera rig), Phase 2
flagship v1 (procedural devices, real screens, choreography, callout rail).
Next: S3 build-log replay (bake real Claude Code session excerpts to JSON),
alcoves (S4), receipts (S5), Higgsfield asset run, preloader, audio, concierge
agent (Phase 5), perf/a11y hardening, deploy (Vercel + custom domain).
