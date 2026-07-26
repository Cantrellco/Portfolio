import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { CameraRig } from './CameraRig'
import { DevicesScene } from './scenes/DevicesScene'
import { registerInvalidate } from '../lib/frame'

/** Registers the canvas's invalidate() with the shared frame bridge. */
function FrameBridge() {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => registerInvalidate(invalidate), [invalidate])
  return null
}

/**
 * Fixed full-viewport canvas behind the DOM (BUILD-BRIEF §3):
 * frameloop="demand" — frames are requested by the scroll/pointer pipeline
 * (src/lib/scroll.ts) and by in-flight lerps, never by a free-running loop.
 */
export function Experience() {
  return (
    <div className="webgl" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ fov: 38, near: 0.1, far: 60, position: [0, 0.2, 6] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050a12']} />
        <fog attach="fog" args={['#050a12', 10, 26]} />
        <FrameBridge />
        <CameraRig />
        <DevicesScene />
      </Canvas>
    </div>
  )
}
