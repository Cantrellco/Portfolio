import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { deviceState } from '../../lib/deviceState'
import { slabGeometry, faceGeometry, roundedAlphaTexture } from '../utils/deviceGeometry'

// Watch screenshot ratio 416×496.
const SCREEN_W = 0.62
const SCREEN_H = SCREEN_W / (416 / 496)
const BODY_W = SCREEN_W + 0.14
const BODY_H = SCREEN_H + 0.14
const BODY_D = 0.2
const BODY_R = 0.3

/**
 * Procedural Apple Watch: squircle slab, rounded screen, crown with groove
 * detail, side button, dark band stubs.
 */
export function WatchModel() {
  const invalidate = useThree((s) => s.invalidate)
  const group = useRef<THREE.Group>(null)
  const snapped = useRef(false)
  const texture = useTexture('/assets/wb/watch-lift.png')

  const bodyGeo = useMemo(() => slabGeometry(BODY_W, BODY_H, BODY_D, BODY_R, 0.03), [])
  const glassGeo = useMemo(() => faceGeometry(BODY_W - 0.05, BODY_H - 0.05, BODY_R - 0.03), [])
  const screenAlpha = useMemo(
    () => roundedAlphaTexture(512, SCREEN_H / SCREEN_W, 0.28),
    [],
  )

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
  }, [texture])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const t = deviceState.watch
    if (!snapped.current) {
      snapped.current = true
      g.position.set(t.x, t.y, t.z)
      g.rotation.set(t.rx, t.ry, t.rz)
      g.scale.setScalar(t.scale)
    }
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
      <mesh geometry={bodyGeo}>
        <meshPhysicalMaterial
          color="#2b2f36"
          metalness={0.92}
          roughness={0.28}
          envMapIntensity={1.4}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </mesh>
      {/* screen */}
      <mesh position={[0, 0, BODY_D / 2 + 0.003]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={texture} alphaMap={screenAlpha} transparent toneMapped={false} />
      </mesh>
      {/* cover glass */}
      <mesh geometry={glassGeo} position={[0, 0, BODY_D / 2 + 0.007]}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0.05}
          transparent
          opacity={0.07}
          envMapIntensity={2.2}
          depthWrite={false}
        />
      </mesh>
      {/* digital crown with groove ring */}
      <group position={[BODY_W / 2 + 0.02, 0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.052, 0.052, 0.045, 24]} />
          <meshPhysicalMaterial color="#3a3f47" metalness={0.92} roughness={0.3} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.052, 0.006, 8, 24]} />
          <meshPhysicalMaterial color="#22262c" metalness={0.9} roughness={0.4} />
        </mesh>
      </group>
      {/* side button */}
      <mesh position={[BODY_W / 2 + 0.012, -0.12, 0]}>
        <boxGeometry args={[0.028, 0.15, 0.05]} />
        <meshPhysicalMaterial color="#3a3f47" metalness={0.92} roughness={0.32} />
      </mesh>
      {/* band stubs — short rounded lugs, tucked behind the body */}
      <group position={[0, BODY_H / 2 + 0.08, -0.03]} rotation={[0.35, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.34, 0.22, 0.07]} />
          <meshStandardMaterial color="#0d1218" roughness={0.9} />
        </mesh>
      </group>
      <group position={[0, -(BODY_H / 2 + 0.08), -0.03]} rotation={[-0.35, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.34, 0.22, 0.07]} />
          <meshStandardMaterial color="#0d1218" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

const tmp = new THREE.Vector3()
