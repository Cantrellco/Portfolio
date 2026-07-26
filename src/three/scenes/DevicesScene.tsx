import { Suspense, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  useTexture,
} from '@react-three/drei'
import * as THREE from 'three'
import { sceneState } from '../../lib/sceneState'
import { holoDiscTexture } from '../utils/deviceGeometry'

/**
 * Generated holo-stage environment plate (Higgsfield, logged in
 * aiPipeline.ts) as a far backdrop. fog=false so distance doesn't swallow
 * it; the reflective floor picks up its glow.
 */
function Backdrop() {
  const texture = useTexture('/assets/env/studio.jpg')
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const mesh = useRef<THREE.Mesh>(null)
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
  }, [texture])

  useFrame(() => {
    // Full presence behind the hub's reactor, dims once the visitor scrolls
    // into the system screens.
    if (!mat.current || !mesh.current) return
    const p = sceneState.progress
    const fade = THREE.MathUtils.smoothstep(p, 0.1, 0.28)
    mat.current.opacity = THREE.MathUtils.lerp(0.9, 0.12, fade)
  })

  return (
    <mesh ref={mesh} position={[0, 0.4, -15]}>
      <planeGeometry args={[64, 35.7]} />
      <meshBasicMaterial
        ref={mat}
        map={texture}
        fog={false}
        toneMapped={false}
        opacity={0.92}
        transparent
      />
    </mesh>
  )
}

/** Hologram pedestal + slow-turning HUD rings under the devices. */
function HoloRig() {
  const disc = useMemo(() => holoDiscTexture(), [])
  const rings = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!rings.current) return
    // Rings track journey progress + cursor — alive without a free-running loop.
    rings.current.rotation.y =
      sceneState.progress * Math.PI * 3 + sceneState.cursorX * 0.15
  })

  return (
    <group position={[0, 0, 0.4]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.55, 0]}>
        <circleGeometry args={[2.9, 48]} />
        <meshBasicMaterial
          map={disc}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <group ref={rings} position={[0, -2.5, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.3, 0.008, 8, 96]} />
          <meshBasicMaterial
            color="#38d6ff"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <torusGeometry args={[2.75, 0.005, 8, 96]} />
          <meshBasicMaterial
            color="#38d6ff"
            transparent
            opacity={0.28}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

/**
 * The hub stage: holo atmosphere behind the DOM constellation — backdrop
 * plate, pedestal rings, AI-generated props, studio light rig.
 */
export function DevicesScene() {
  return (
    <>
      <Suspense fallback={null}>
        <Backdrop />
        <HoloRig />

        {/* procedural studio reflections for the metals — no HDR fetch */}
        <Environment resolution={256}>
          <Lightformer
            position={[0, 5, 2]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[9, 2.5, 1]}
            intensity={2.4}
            color="#dff4ff"
          />
          <Lightformer position={[6, 1.5, 3]} scale={[2.5, 5, 1]} intensity={1.4} color="#38d6ff" />
          <Lightformer position={[-6, 0.5, 2]} scale={[2, 4, 1]} intensity={0.8} color="#0e5f7a" />
          <Lightformer position={[0, 0.5, -6]} scale={[8, 3, 1]} intensity={0.5} color="#123a52" />
        </Environment>
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
          color="#04070c"
          metalness={0.4}
          mirror={0.35}
        />
      </mesh>

      {/* studio rig: cool key, cyan fill, ice rim */}
      <spotLight position={[5, 7, 6]} angle={0.45} penumbra={0.85} intensity={220} color="#eaf6ff" />
      <spotLight position={[-7, 3, 3]} angle={0.6} penumbra={1} intensity={55} color="#0e5f7a" />
      <directionalLight position={[-3, 4, -6]} intensity={3.5} color="#8ae8ff" />
      <pointLight position={[0, -3, 3]} intensity={6} color="#38d6ff" />
      <ambientLight intensity={0.16} />
    </>
  )
}
