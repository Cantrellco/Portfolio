import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { deviceState } from '../../lib/deviceState'
import { sceneState } from '../../lib/sceneState'

export const PHONE_SCREENS = [
  '/assets/wb/shot-today.png',
  '/assets/wb/shot-buddy.png',
  '/assets/wb/shot-program.png',
  '/assets/wb/shot-progress.png',
  '/assets/wb/shot-today.png', // watch beat — phone returns to Today
]

// Screenshot ratio 1108×2201; screen sized to match so nothing stretches.
const SCREEN_W = 1.56
const SCREEN_H = SCREEN_W / (1108 / 2201)
const BODY_W = SCREEN_W + 0.16
const BODY_H = SCREEN_H + 0.2

/**
 * Procedural iPhone (BUILD-BRIEF §5 rule zero: never AI-mesh precision
 * hardware): metal frame, matte front, real screenshot as unlit screen,
 * Dynamic Island pill. Pose lerps toward deviceState.phone.
 */
export function PhoneModel() {
  const invalidate = useThree((s) => s.invalidate)
  const group = useRef<THREE.Group>(null)
  const screenMat = useRef<THREE.MeshBasicMaterial>(null)
  const textures = useTexture(PHONE_SCREENS)
  const shown = useRef(0)

  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 4
    })
  }, [textures])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const t = deviceState.phone

    if (screenMat.current && shown.current !== deviceState.screen) {
      shown.current = deviceState.screen
      screenMat.current.map = textures[shown.current]
      screenMat.current.needsUpdate = true
    }

    tmp.set(t.x, t.y, t.z)
    const before =
      g.position.distanceToSquared(tmp) +
      (g.rotation.y - t.ry) ** 2 +
      (g.scale.x - t.scale) ** 2
    g.position.lerp(tmp, 0.08)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, t.rx - sceneState.cursorY * 0.04, 0.08)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, t.ry + sceneState.cursorX * 0.07, 0.08)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, t.rz, 0.08)
    const s = THREE.MathUtils.lerp(g.scale.x, t.scale, 0.08)
    g.scale.setScalar(s)
    if (before > 1e-7) invalidate()
  })

  return (
    <group ref={group}>
      {/* frame */}
      <RoundedBox args={[BODY_W, BODY_H, 0.16]} radius={0.12} smoothness={6}>
        <meshPhysicalMaterial
          color="#2a2d33"
          metalness={0.85}
          roughness={0.28}
          clearcoat={0.9}
          clearcoatRoughness={0.18}
        />
      </RoundedBox>
      {/* matte front face under the glass */}
      <mesh position={[0, 0, 0.081]}>
        <planeGeometry args={[BODY_W - 0.06, BODY_H - 0.06]} />
        <meshStandardMaterial color="#050607" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* screen — unlit, tone mapping off so the app UI reads true */}
      <mesh position={[0, 0, 0.084]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial ref={screenMat} map={textures[0]} toneMapped={false} />
      </mesh>
      {/* Dynamic Island */}
      <RoundedBox
        args={[0.36, 0.1, 0.008]}
        radius={0.048}
        smoothness={4}
        position={[0, SCREEN_H / 2 - 0.13, 0.0855]}
      >
        <meshStandardMaterial color="#000000" roughness={0.4} />
      </RoundedBox>
    </group>
  )
}

const tmp = new THREE.Vector3()
