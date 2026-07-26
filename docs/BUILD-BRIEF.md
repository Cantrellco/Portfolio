# BUILD BRIEF — Cody Cantrell Portfolio ("The AI-Augmented Apple Developer")

**Objective:** One Awwwards-SOTD-caliber interactive 3D site that gets Cody hired at Five Pack Creative. Target audience: Jerry Beers (co-founder, original iPhone dev — judges native Apple craft), Kevin Legg (co-founder, business — judges client-readiness and communication), Ian Campbell (GM). Deploy on Cody's own domain. Submit to Awwwards/FWA/CSSDA at launch.

---

## 1. Positioning & Narrative

**The one-line pitch:** *"I am the AI-enablement engineer you already sell to your clients — and here are the receipts."*

Five Pack markets itself as "AI First & AI Native," publicly claims AI-first collaboration "tripled development speed," sells "AI-Driven Development," "AI Enablement & Training," and "demoable POCs in unprecedented timelines" via their "Iteration 0" process. Their crown-jewel case study is an Apple Watch app "featured on stage by Apple" (American Airlines, 8-year staff-aug). They hire for iOS **and** React Native, and their revenue engine is embedding onshore engineers directly into Fortune 500 client teams.

The site therefore tells exactly three stories, in this order:

1. **Apple-platform depth that mirrors their proudest work.** Workout Buddy is a live App Store product (v1.2.0, app id 6771810116) with a full SwiftUI Apple Watch app (real `HKWorkoutSession`), Live Activities + Dynamic Island with an interactive `LogSetIntent` that works while the app is suspended, App Intents/Siri/Control Center, widgets, HealthKit both directions, and Liquid Glass design honoring Reduce Motion. This is the AA-Watch story, shipped solo.
2. **AI velocity with measurable receipts, in their vocabulary.** Not "I use AI" — a documented Claude Code + Higgsfield pipeline, commit/session/timeline stats, and the site itself as proof: a focused immersive landing page is 8–12 weeks of studio effort; an AI-augmented solo dev shipping it IS the claim, demonstrated. Echo their own "tripled development speed" language with Cody's measured numbers.
3. **Client-grade professionalism.** Every Five Pack testimonial praises proactive communication and partnership. Case studies use *their* structure (Challenge → Approach → Results-with-metrics), plus a visible process section modeled on "Iteration 0." Copy maps to their five values verbatim — **Ownership** (solo end-to-end: app, backend, watch, CI, TestFlight), **Simplicity** ("Simplicity is the ultimate sophistication" — restrained 3D, one defended idea, 60fps), **Innovation** (the AI pipeline), **Integrity/Servant Leadership** (honest writeups, transparent `/ai` colophon).

**The rare-combo hook stated explicitly:** React Native/Expo product **with** hand-built native Swift modules (two custom Expo native modules: `WorkoutActivityBridge`, `WatchBridge`). One person covering both stacks = maximum billable versatility for a staff-aug agency. Bonus hook: they actively market fitness-app development — frame Workout Buddy as "the kind of app you sell — already shipped."

**Tone:** Apple keynote, not agency chaos. Their own site is clean WordPress/Elementor, teal `#00C391`, Poppins/Roboto, zero WebGL. We out-craft it decisively but honor their Simplicity value — spectacle that never fights usability (Awwwards weights Usability 30%).

---

## 2. Creative Concept

**THE ONE IDEA: "The Keynote."** An Apple-product-launch-style scroll narrative where a procedurally built 3D iPhone and Apple Watch — running **real** Workout Buddy screenshots as emissive screen textures — travel through six choreographed scenes. Scroll is the timeline; each beat is a staged enter/hold/exit (the proven Oryzo / Shopify Editions / Cartier "scene per product" pattern). Smaller projects live in spotlit **alcoves** (Cartier/Iventions pattern) — they never compete with the hero. One unifying fragment-shader treatment (subtle grain + soft LED overlay, Vitasović-style) applied to all project media so seven disparate projects read as one art-directed body of work.

**Art direction:** near-black canvas, precision studio lighting (lighting quality is what won Iventions its Developer Award), editorial display type (Clash Display via Fontshare + Inter Variable body, both self-hosted subset WOFF2, same WOFF2 feeding drei `<Text>` so DOM and canvas type match), accent color a teal-adjacent green nodding to Five Pack's `#00C391`. Glass/refraction materials tie visually to Workout Buddy's Liquid Glass work. Synthesized Web Audio SFX (3 detuned sine oscillators through feedback delay) + optional score, visible mute toggle, one audio-reactive shader.

**Scroll journey, scene by scene:**

- **S0 — Preloader (0%).** Choreographed load sequence that doubles as scene warm-up: shaders compile, KTX2 textures decode via `requestIdleCallback` batches behind an animated wordmark. Never a bare percentage bar.
- **S1 — Hero (0–10%).** DOM headline (the LCP element): *"I ship Apple-grade software at AI speed."* Behind it, iPhone + Watch assemble from exploded parts in light. Cursor-reactive: devices track the mouse via lerp factor ~0.06 (magnetic feel). Sub-line: "Built solo. Live on the App Store."
- **S2 — Workout Buddy: the flagship (10–40%).** Camera choreography through the product: iPhone flies in, screen cycles real screenshots (`landing/shots/`); zoom to Dynamic Island — a faithful 3D Live Activity moment with the "Log set" button and rest countdown animating; Watch orbits in with the `HKWorkoutSession` lift screen; the existing `mascot.glb` makes a cameo. Feature callouts pinned to real geometry via raycast hover. Ends on the App Store badge + metrics strip (473 Jest tests, 93 Swift tests, 24 migrations, offline-first sync queue).
- **S3 — "Watch this site build itself" (40–55%).** The signature AI moment: scroll-driven replay of the real Claude Code build log — actual session excerpts (prompt → diff → result, timestamps) stream past while the very scene around them assembles wireframe→shaded→lit in sync. Ends on totals: N sessions, X hours, $Y — vs "typical studio timeline: 8–12 weeks."
- **S4 — The Alcoves (55–75%).** Five spotlit installations, one per project, each lit like a gallery piece with the unifying grain shader: Fusion Coffee, The Harvest, Zoo Game, Little Town Playhouse, Faith Outreach (+ PC Pro as a card). Horizontal scrub within the vertical journey; click opens a case-study overlay (DOM, crawlable).
- **S5 — The Receipts + Pipeline (75–90%).** Split scene: AI asset-pipeline exhibit (Higgsfield prompt → concept → `generate_3d` mesh → GLB in-scene, with live wireframe/raw toggle on the actual props used in S4) beside the receipts dashboard (commits, sessions, TestFlight builds, features-shipped-solo timeline).
- **S6 — Process & Contact (90–100%).** "How I work with stakeholders" — Iteration-0-shaped process, the five values mapped, links to `CASE_STUDY.md`-grade writeups, `/ai` colophon link, contact. Quiet, typographic, confident close.

Every static frame is composition-strong with animation off. `prefers-reduced-motion` **scales** motion down (Trionn pattern), never blanks the site.

---

## 3. Tech Stack (exact, npm-verified 2026-07-26)

| Layer | Package |
|---|---|
| Build | `vite@8.1.5` + `@vitejs/plugin-react` + TypeScript |
| UI | `react@19.2` + `react-dom@19.2` |
| 3D | `three@0.185.1`, `@react-three/fiber@9.6.1`, `@react-three/drei@10.7.7`, `@react-three/postprocessing@3.0.4` |
| Motion | `gsap@3.15.0` (ScrollTrigger, SplitText, Flip — all free), `lenis@1.3.25` |
| Shaders | `vite-plugin-glsl` |
| Dev-only | `leva@0.10.1`, `r3f-perf@7.2.3` |
| Asset pipeline | `@gltf-transform/cli@4.4.2` (meshopt geometry + KTX2 textures: ETC1S albedo, UASTC normals) |
| Optional | `@react-three/rapier@2.2.0` only if a physics toy earns its place; **skip** `@react-three/uikit` — all UI is DOM overlay (a11y + SEO + LCP) |

**Decisions locked:** No Next.js — client-only canvas app, RSC adds nothing, `next/image` is dead under static export, Vite HMR is critical for shader iteration. **No drei `ScrollControls`** — documented conflicts with ScrollTrigger pinning. Architecture is the Trionn pattern: **one shared `gsap.ticker`** drives Lenis (`lenis.on('scroll', ScrollTrigger.update)`), all scrub timelines, and on-demand R3F renders (`frameloop="demand"` + `invalidate()` where scenes are static); ScrollTrigger scrub timelines are the single source of truth, mutating camera/scene refs consumed in `useFrame`. Unified normalized interaction state (hover/scroll feed one 0–1 value via `Math.max`) so modes never fight. One optional WebGPU/TSL flourish with WebGL fallback as the forward-looking flex.

**Deploy:** Vercel free tier (Brotli + immutable cache headers on hashed GLB/KTX2 — GitHub Pages can't do this), custom domain, preview URLs to share with Five Pack. Public GitHub repo — the repo itself is part of the "built with Claude Code" pitch. Chat proxy (feature #4): one Cloudflare Worker (free tier) fronting Gemini Flash free tier (~1,500 req/day).

---

## 4. Wow Features (ranked — build in this order of priority)

1. **"Watch this site build itself" — Claude Code log replay (S3).** Scroll-synced replay of real build-session excerpts while the 3D scene assembles around them. *Why it lands:* Five Pack literally sells "AI-generated POCs in unprecedented timelines" — this dramatizes their own sales pitch; no found precedent of an interactive agent-log replay inside the site itself (the slot is open). *Feasibility:* fully static — baked JSON transcripts, zero API risk.
2. **Receipts dashboard (S5).** Commits, Claude Code sessions, TestFlight builds, "Watch app + Live Activities + AI coach shipped solo in N weeks." *Why:* outcome framing is what hiring executives respond to hardest; echoes their "tripled development speed" claim with Cody's measured multiplier. *Feasibility:* build-time-baked JSON (+ optional client-side GitHub REST, 60 req/hr unauth suffices).
3. **AI asset-pipeline exhibit with wireframe toggle (S5).** The site's own props labeled AI-generated, pipeline shown inline (Higgsfield prompt → concept image → `generate_3d` → GLB), live raw/wireframe toggle on real in-scene models. *Why:* proves generative-media mastery fused into an engineering pipeline — Higgsfield receipts, not badges. *Feasibility:* fully static.
4. **Concierge agent that DRIVES the site.** "Ask about Cody / Workout Buddy" chat with function-calling that flies the camera, opens case studies, filters projects ("show me the Watch app" → camera goes there). Grounded RAG over baked site JSON; visible "how this is guarded" note (prompt hardening, rate limit, static-FAQ fallback when the proxy is down). *Why:* resume chatbots are commodity; **tool-use + visible guardrails** is the differentiator — shows the hidden 90%. *Feasibility:* one Cloudflare Worker + Gemini Flash free tier; degrade to static FAQ, never a broken feature.
5. **Faithful 3D Dynamic Island / Live Activity moment (S2).** The Crumbl-style progress bar and "Log set" AppIntent rendered as a working 3D vignette. *Why:* Jerry Beers is an original iPhone dev — current-API fluency (ActivityKit, App Intents) is his scoreboard; mirrors the AA Watch-on-Apple's-stage story. *Feasibility:* procedural geometry + real screenshot/recording textures; pure craft, no API.
6. **Synthesized sound + one audio-reactive shader.** Web Audio oscillator SFX, optional score, visible mute; fBm fog reacting to `AnalyserNode`. *Why:* cheap differentiation that separates $50k-feel from template-feel. *Feasibility:* trivial, fully static.
7. **Adaptive entry — "I'm a CEO / an engineer / a designer."** Deterministic re-ordering of section depth and copy per audience. *Why:* rides the 2026 generative-UI trend with zero backend; personalizes the pitch for whoever at Five Pack opens it. *Feasibility:* pure client-side state. Build last.

**Explicitly avoided:** AI avatar/twin greeters (uncanny, vendor-tool vibe), plain resume-Q&A bot, WebLLM as a default path (Safari = Technology Preview — dead feature on the CEO's iPhone), runtime image generation.

---

## 5. Higgsfield Asset Plan (1,909 credits available; budget ≤400)

**Rule zero: do NOT AI-mesh the iPhone or Apple Watch.** Hard-surface precision hardware comes out melty. Devices are procedural: `RoundedBoxGeometry` frames + emissive planes textured with **real** screenshots — also more credible to reviewers than AI renders of the app.

| Asset | Tool/model | Spec | Cost |
|---|---|---|---|
| 4–6 hero/section key-art stills (S1 backdrop, alcove environments, OG image) | `nano_banana_pro` (best when art includes rendered text); `recraft_v4_1` for any clean vector/logo needs | 2K gen → `upscale_image` (bytedance) to 4K | confirm image pricing interactively first (preflight was permission-blocked) |
| 3–4 stylized organic props: dumbbell/kettlebell (Workout Buddy), coffee cup + beans (Fusion), arctic fox or penguin (Zoo Game), optional parchment/quill (Harvest) | `tripo_h3_1_image_to_3d` — pipeline: nano_banana_pro concept → `generate_3d` (texture_alignment `original_image`, face_limit ~50–100k) → `gltf-transform optimize --compress meshopt --texture-compress ktx2` | textured PBR GLB → `MeshStandardMaterial` | 9–18 cr each (~40–70 total) |
| 2–3 seamless cinematic loops (S1 atmosphere, S4 alcove backdrops) | `seedance_2_0`, same still as `start_image` **and** `end_image` for the loop, `generate_audio:false` | 5s 1080p std = 45 cr; upscale via `upscale_video` provider `topaz` `2160p` if needed | ~135–150 cr |
| Budget fallback loops for mobile tier | `kling3_0_turbo` | 5s = 7.5 cr | ~25 cr |

**Already on disk, use as-is:** `mascot.glb`, `bezel-iphone-v16.webp`, `bezel-watch-v16.webp`, all App Store/watch/landing screenshots, Fusion photography, Little Town's 37 SVGs, Zoo Game's 25 sprites. Everything generative gets logged (prompt, model, credits) — that log **is** the S5 exhibit content. Preflight every generation with `get_cost:true`. Before the asset run, read the free Higgsfield playbooks: `references/scroll-scrub.md`, `references/wow-catalog.md`, `references/design-taste-frontend.md` via `get_website_creation_bundle_file` (zero credits; do **not** use `create_website` itself — imposed stack + Higgsfield subdomain is the wrong vehicle).

---

## 6. Project Showcase Content

All case studies use Five Pack's own format: **Challenge → Approach → Results with metrics.**

### Flagship — Workout Buddy (S2, ~30% of the site)
- **Live on the App Store** — v1.2.0, id 6771810116, badge + link.
- **Watch:** full SwiftUI app, real `HKWorkoutSession` (pause/resume, live/avg/max HR + active kcal round-tripping into phone history), standalone start, complication deep link, watchOS 26 Smart Stack — driven by a pure, fully-tested state machine (`WorkoutSessionStateMachine.swift`).
- **Live Activity + Dynamic Island:** interactive "Log set" `AppIntent` that works while the app is suspended; rest countdown that can't go stale.
- **Platform breadth:** Siri/Shortcuts/Spotlight App Intents, iOS 18 Control Center + Action button (`StartWorkoutControl.swift`), self-refreshing pedometer widgets.
- **The bridge story (the hiring hook):** two hand-built Expo native modules — `WorkoutActivityBridge` (ActivityKit + App Group queue + Darwin notifications) and `WatchBridge` (WatchConnectivity, latest-wins snapshots + guaranteed `transferUserInfo`).
- **AI in production:** `buddy-chat` Supabase edge function proxying Anthropic with an atomic per-user dollar budget; chat proposes program changes the app validates; accepts photos (identify a gym machine / whiteboard → program).
- **Engineering rigor:** offline-first write queue with backoff + poison-entry rotation; Postgres + RLS, 24 migrations; pure tested auto-progression engine (RP volume landmarks); **473 Jest tests / 22 suites + 93 native Swift tests**, CI drift-gate keeping README counts honest; HealthKit both directions with cross-device dedupe; RevenueCat + webhook; Liquid Glass honoring Reduce Motion/Transparency.
- **Depth link:** `CASE_STUDY.md` — 7 contested architecture decisions (e.g., why a JS Live-Activity wrapper is impossible: lock-screen `perform()` runs where the RN bridge may not exist). This is Jerry-bait; surface it prominently.

### Alcoves (one tight card + case-study overlay each)
- **The Harvest** — native SwiftUI Bible app, zero third-party deps; 31,100+ offline verses; on-device sermon transcription → auto-notes with tappable scripture chips; documented privacy invariant (CloudKit holds user content, AWS never durably stores a prayer). *Angle: pure-Apple craft + on-device AI — maps to their "On-device Core ML" service line.* (Needs Simulator screenshot capture.)
- **Zoo Game** — Phaser 4 + Capacitor 8 revival of Tap Zoo: Arctic (Apple's #1 top-grossing iPhone app of 2011); 21 research agents + Internet Archive teardown; 25 original AI-generated sprites in consistent style; zero dark patterns. *Angle: AI research + AI art direction discipline.*
- **Fusion Coffee** — Next.js 14 static export, real photography, single content source-of-truth, PWA, architected for future native wrap. *Angle: client work, real business.*
- **Little Town Playhouse** — zero-dependency hand-authored site, 37 bespoke illustrated assets, cross-brand tie-in with Fusion. *Angle: range + craft without frameworks.*
- **Faith Outreach Church** — 12-document redesign binder, redirect map preserving SEO, zero-downtime duplicate→build→domain-swap launch, staff edit guide. *Angle: client communication + process maturity — Kevin-bait.*
- **PC Pro Inspections** — config-driven Vite/React site, backendless lead capture. Card only.

Plus: **`/ai` colophon page** — tools used (Claude Code, Higgsfield), what was human judgment vs AI labor, full generation log. The transparency convention that builds trust.

---

## 7. Skills to Install (run before build starts; global per Cody's rule)

```bash
# 1. Official GSAP skills (8 skills: scrolltrigger, timeline, react, performance…)
git clone https://github.com/greensock/gsap-skills /tmp/gsap-skills && cp -R /tmp/gsap-skills/skills/. ~/.claude/skills/

# 2. R3F skills (11 skills: shaders, loaders, postprocessing, instancing…)
git clone https://github.com/EnzeD/r3f-skills /tmp/r3f-skills && cp -R /tmp/r3f-skills/skills/. ~/.claude/skills/

# 3. Anthropic official — net-new three only
git clone https://github.com/anthropics/skills /tmp/anthropic-skills && cp -R /tmp/anthropic-skills/skills/algorithmic-art /tmp/anthropic-skills/skills/canvas-design /tmp/anthropic-skills/skills/theme-factory ~/.claude/skills/

# 4. Optional, only when hand-writing GLSL particles: clone https://github.com/iart-ai/webgl-animation-skills and copy its skill folders to ~/.claude/skills/

# Verify + clean up
ls ~/.claude/skills/*/SKILL.md && rm -rf /tmp/gsap-skills /tmp/r3f-skills /tmp/anthropic-skills
```

Keep **one** GSAP source (greensock) + **one** R3F source (EnzeD) as canon — overlapping packs compete for auto-triggering. Skip freshtechbro marketplace and OpenAEC pack.

---

## 8. Risks / Pitfalls → Mitigations

| Risk | Mitigation (locked in) |
|---|---|
| iOS Safari VRAM tab-crash on multi-MB textures | KTX2/Basis everywhere (~10× VRAM reduction); first-load 3D payload < 3–5MB; `dpr={[1,2]}`, antialias off on mobile |
| Janky mid-range phones | Real mobile strategy: drei `useDetectGPU` tiers + `PerformanceMonitor` adaptive quality; tier-0/WebGL-fail/reduced-motion get a **designed** static/video fallback (Vitasović pattern) — never a degraded desktop scene. Test throttled mid-range Android + real iPhone before every milestone sign-off |
| >100 draw calls / perf death | Instancing + batching budget enforced via `r3f-perf`; 1024 shadow maps; dispose all geometry/materials; on-demand rendering, not continuous rAF |
| "Tutorial template" look (the adrianhajdin iPhone-clone is a commodity juries clock instantly) | Original art direction (custom lighting, unifying grain shader, editorial type, synthesized audio); the Live Activity/Watch vignettes and agent-log replay have no template ancestor |
| Effect soup diluting the hero | One defended concept (The Keynote); alcoves deliberately quiet; every effect must serve a scene beat or it's cut |
| Scroll-jacking / bad pacing | Real DOM scroll + Lenis (no fake scroll container); enter/hold/exit beats with quiet moments; nav always available |
| SEO/LCP (WebGL-before-HTML) | Hero headline is DOM text (the LCP element); canvas lazy-mounts after first paint; all case-study copy is crawlable DOM; preload primary font + first GLB |
| No reduced-motion path (jurors check) | `prefers-reduced-motion` scales motion down, not off; static frames composition-strong standalone |
| Chat feature dies in front of the CEO | Worker + Gemini Flash with rate limiting; hard fallback to static FAQ; chat ships in Phase 5 only after everything static is polished |
| WebLLM Safari dead-end | Not used as any default path; at most a labeled desktop-Chrome easter egg, probably cut |
| AI-meshed devices look melty | Devices procedural + real screenshots; Higgsfield only for organic/stylized props, stills, loops |
| Contradicting Five Pack's "Simplicity" value | Restraint as a stated design principle; 60fps gate on mid-range hardware; Usability-first nav (30% of Awwwards score) |

---

## 9. Build Phases

**Phase 0 — Setup (day 1).** Install skills (§7). Read Higgsfield playbooks (`scroll-scrub.md`, `wow-catalog.md`, `design-taste-frontend.md`). Scaffold Vite + R3F + GSAP + Lenis with the shared-ticker architecture; deploy hello-scene to Vercel with a custom domain; public repo; CI. Confirm Higgsfield image pricing interactively.

**Phase 1 — Spine (week 1).** Lenis + ScrollTrigger master timeline across six empty scenes; camera choreography rig; DOM hero headline + section copy skeleton (SEO-complete from day one); Lighthouse baseline; mobile tier detection + fallback shell; reduced-motion path wired.

**Phase 2 — Flagship scene (weeks 1–2).** Procedural iPhone + Watch with real screenshot textures; S2 full choreography incl. the Dynamic Island vignette; raycast feature callouts; lighting pass; unifying grain shader; first phone-throttle perf gate.

**Phase 3 — Asset run + Alcoves (week 2).** Higgsfield batch (§5) with logged prompts/costs; gltf-transform pipeline; S4 alcoves with all six projects + case-study overlays written in Challenge→Approach→Results format; mascot cameo.

**Phase 4 — Signature AI features, static tier (week 3).** S3 agent-log replay (bake real transcripts to JSON); S5 receipts dashboard + pipeline exhibit with wireframe toggle; `/ai` colophon; choreographed preloader doubling as scene warm-up; synthesized audio + reactive shader + mute toggle.

**Phase 5 — Concierge agent (week 3–4).** Cloudflare Worker + Gemini Flash; function-calling camera navigation; grounding JSON; guardrails note; static-FAQ fallback tested by killing the Worker.

**Phase 6 — Polish & hardening (week 4).** S6 process/values/contact; adaptive entry (feature #7) if time allows; full device matrix (throttled Android, iPhone Safari, iPad); draw-call/memory audit; a11y pass (keyboard nav, focus, contrast); every static frame reviewed animation-off; copy edit against Five Pack's five values.

**Phase 7 — Launch (end week 4).** Custom domain live; OG images; submit Awwwards SOTD + FWA + CSSDA; record a short Loom walkthrough (communication proof); outreach — BambooHR portal via fivepackcreative.com/join-our-team, direct to info@fivepackcreative.com, LinkedIn to Ian Campbell / Kevin Legg / Jerry Beers, leading with the Watch/Live-Activity story + the build-timeline receipt.

**Throughout:** every Claude Code session and Higgsfield generation is logged — the build process is itself the content of S3/S5. The 4-week solo timeline vs an 8–12-week studio norm is the closing argument.