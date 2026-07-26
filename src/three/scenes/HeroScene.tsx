import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { sceneState } from '../../lib/sceneState'

/**
 * Spine placeholder for S1/S2: two device slabs (iPhone + Watch stand-ins)
 * in a dark studio. Phase 2 replaces the slabs with the procedural devices
 * carrying real screenshot textures; lighting rig carries forward.
 */
export function HeroScene() {
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!group.current) return
    // Devices counter-rotate slightly against the camera drift — magnetic feel.
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      sceneState.cursorX * 0.14,
      0.05,
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -sceneState.cursorY * 0.08,
      0.05,
    )
  })

  return (
    <group ref={group} position={[2.1, -0.1, 0]} rotation={[0, -0.28, 0]}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        {/* iPhone slab */}
        <group rotation={[0.04, 0.32, -0.04]}>
          <RoundedBox args={[1.7, 3.5, 0.18]} radius={0.13} smoothness={6}>
            <meshPhysicalMaterial
              color="#23262b"
              metalness={0.8}
              roughness={0.3}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.095]}>
            <planeGeometry args={[1.54, 3.34]} />
            <meshStandardMaterial
              color="#0b0f0e"
              emissive="#0f3b2c"
              emissiveIntensity={0.55}
              roughness={0.85}
            />
          </mesh>
        </group>
      </Float>

      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.5}>
        {/* Watch slab */}
        <group position={[1.7, -0.9, 0.7]} rotation={[0.12, -0.5, 0.06]}>
          <RoundedBox args={[0.85, 1.0, 0.28]} radius={0.24} smoothness={6}>
            <meshPhysicalMaterial
              color="#1a1d21"
              metalness={0.85}
              roughness={0.26}
              clearcoat={0.8}
              clearcoatRoughness={0.18}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.145]}>
            <planeGeometry args={[0.68, 0.84]} />
            <meshStandardMaterial
              color="#0b0f0e"
              emissive="#10493a"
              emissiveIntensity={0.7}
              roughness={0.85}
            />
          </mesh>
        </group>
      </Float>

      {/* studio rig: warm key, cool teal fill, hard rim */}
      <spotLight
        position={[5, 7, 6]}
        angle={0.45}
        penumbra={0.85}
        intensity={260}
        color="#fff4e4"
      />
      <spotLight position={[-7, 3, 3]} angle={0.6} penumbra={1} intensity={80} color="#0b8f68" />
      <directionalLight position={[-3, 4, -6]} intensity={4} color="#bff5e2" />
      <pointLight position={[0, -3, 3]} intensity={10} color="#00e5a0" />
      <ambientLight intensity={0.18} />
    </group>
  )
}
