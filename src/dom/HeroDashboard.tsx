import { Reactor } from './hud/Reactor'
import { Panel, Readout } from './hud/Panel'

/**
 * S1 — the OS overview screen. Center: arc reactor + identity. Flanks:
 * stacked instrument modules, all real data.
 */
export function HeroDashboard() {
  return (
    <header className="hero herohud" id="hero">
      <div className="herohud__col herohud__col--left">
        <Panel title="IDENTITY">
          <Readout label="OPERATOR" value="CODY CANTRELL" />
          <Readout label="ROLE" value="AI-AUGMENTED DEV" />
          <Readout label="TRAINING" value="SELF-TAUGHT" />
          <Readout label="BASE" value="FAIRFIELD, IL" />
        </Panel>
        <Panel title="CAPABILITIES">
          <Readout label="MOBILE" value="REACT NATIVE + EXPO" />
          <Readout label="NATIVE" value="SWIFT / SWIFTUI" />
          <Readout label="BACKEND" value="SUPABASE / POSTGRES" />
          <Readout label="3D / WEB" value="THREE.JS / R3F" />
          <Readout label="AI STACK" value="CLAUDE CODE + HIGGSFIELD" />
        </Panel>
      </div>

      <div className="herohud__center">
        <Reactor />
        <h1 className="herohud__name">CODY CANTRELL</h1>
        <p className="herohud__tagline">
          I ship Apple-grade software at <em>AI speed</em>. Built solo. Live on the App Store.
        </p>
      </div>

      <div className="herohud__col herohud__col--right">
        <Panel title="LIVE STATUS">
          <Readout label="SYSTEM" value="ONLINE" />
          <Readout label="FLAGSHIP" value="WORKOUT BUDDY v1.2" />
          <Readout label="APP STORE" value="LIVE" />
          <Readout label="TESTS PASSING" value="566" />
        </Panel>
        <Panel title="CURRENT OP">
          <Readout label="MISSION" value="THIS WEBSITE" />
          <Readout label="DAY" value="01" />
          <Readout label="AGENTS DEPLOYED" value="8" />
          <Readout label="STUDIO EQUIV." value="8–12 WKS" />
        </Panel>
      </div>

      <p className="herohud__hint" aria-hidden="true">
        ▼ SCROLL TO SCAN FLAGSHIP
      </p>
    </header>
  )
}
