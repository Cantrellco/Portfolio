import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { deviceState } from '../../lib/deviceState'

// Watch screenshot ratio 416×496.
const SCREEN_W = 0.66
const SCREEN_H = SCREEN_W / (416 / 496)
const BODY_W = SCREEN_W + 0.11
const BODY_H = SCREEN_H + 0.11

/** Procedural Apple Watch: rounded body, crown, unlit lift-session screen. */
export function WatchModel() {
  const invalidate = useThree((s) => s.invalidate)
  const group = useRef<THREE.Group>(null)
  const texture = useTexture('/assets/wb/watch-lift.png')

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
  }, [texture])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const t = deviceState.watch
    tmp.set(t.x, t.y, t.z)
    const before =
      g.position.distanceToSquared(tmp) +
      (g.rotation.y - t.ry) ** 2 +
      (g.scale.x - t.scale) ** 2
    g.position.lerp(tmp, 0.08)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, t.rx, 0.08)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, t.ry, 0.08)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, t.rz, 0.08)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, t.scale, 0.08))
    if (before > 1e-7) invalidate()
  })

  return (
    <group ref={group}>
      <RoundedBox args={[BODY_W, BODY_H, 0.26]} radius={0.2} smoothness={6}>
        <meshPhysicalMaterial
          color="#1d2025"
          metalness={0.88}
          roughness={0.24}
          clearcoat={0.9}
          clearcoatRoughness={0.16}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.131]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* digital crown + side button */}
      <mesh position={[BODY_W / 2 + 0.02, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 0.05, 20]} />
        <meshPhysicalMaterial color="#33373d" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[BODY_W / 2 + 0.012, -0.12, 0]}>
        <boxGeometry args={[0.03, 0.16, 0.05]} />
        <meshPhysicalMaterial color="#33373d" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  )
}

const tmp = new THREE.Vector3()
