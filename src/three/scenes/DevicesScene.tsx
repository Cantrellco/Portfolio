import { Suspense, useMemo } from 'react'
import { Float, MeshReflectorMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { PhoneModel } from '../devices/PhoneModel'
import { WatchModel } from '../devices/WatchModel'
import { sceneState } from '../../lib/sceneState'

/**
 * Generated studio environment plate (Higgsfield, logged in aiPipeline.ts)
 * as a far backdrop. fog=false so distance doesn't swallow it; the
 * reflective floor picks up its glow.
 */
function Backdrop() {
  const texture = useTexture('/assets/env/studio.jpg')
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
  }, [texture])
  return (
    // scale-x flipped: the plate's light column lands behind the devices
    // (right), leaving the dark side behind the headline.
    <mesh position={[1.5, 1.6, -15]} scale={[-1, 1, 1]}>
      <planeGeometry args={[46, 25.7]} />
      <meshBasicMaterial map={texture} fog={false} toneMapped={false} opacity={0.92} transparent />
    </mesh>
  )
}

/**
 * The Keynote stage: both devices + the studio light rig. Devices live near
 * the origin; the camera travels to them (see CameraRig keyframes).
 */
export function DevicesScene() {
  const floatScale = sceneState.reducedMotion ? 0.25 : 1

  return (
    <>
      <Suspense fallback={null}>
        <Backdrop />
        <Float
          speed={1.1}
          rotationIntensity={0.08 * floatScale}
          floatIntensity={0.3 * floatScale}
        >
          <PhoneModel />
        </Float>
        <Float
          speed={1.4}
          rotationIntensity={0.12 * floatScale}
          floatIntensity={0.4 * floatScale}
        >
          <WatchModel />
        </Float>
      </Suspense>

      {/* reflective studio floor — the single biggest "expensive" cue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[360, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={1.1}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.5}
          maxDepthThreshold={1.4}
          color="#07080a"
          metalness={0.4}
          mirror={0.35}
        />
      </mesh>

      {/* studio rig: warm key, teal fill, cool rim */}
      <spotLight position={[5, 7, 6]} angle={0.45} penumbra={0.85} intensity={260} color="#fff4e4" />
      <spotLight position={[-7, 3, 3]} angle={0.6} penumbra={1} intensity={55} color="#0b8f68" />
      <directionalLight position={[-3, 4, -6]} intensity={4} color="#bff5e2" />
      <pointLight position={[0, -3, 3]} intensity={6} color="#00e5a0" />
      <ambientLight intensity={0.18} />
    </>
  )
}
