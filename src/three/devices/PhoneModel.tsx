import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { deviceState } from '../../lib/deviceState'
import { sceneState } from '../../lib/sceneState'
import { slabGeometry, faceGeometry, roundedAlphaTexture } from '../utils/deviceGeometry'

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
const BODY_W = SCREEN_W + 0.1
const BODY_H = SCREEN_H + 0.12
const BODY_D = 0.15
const BODY_R = 0.24

/**
 * Procedural iPhone (BUILD-BRIEF §5 rule zero: never AI-mesh precision
 * hardware): machined titanium slab, rounded-corner screen with a real
 * screenshot, glass layer, Dynamic Island, side buttons. Pose lerps toward
 * deviceState.phone.
 */
export function PhoneModel() {
  const invalidate = useThree((s) => s.invalidate)
  const group = useRef<THREE.Group>(null)
  const screenMat = useRef<THREE.MeshBasicMaterial>(null)
  const textures = useTexture(PHONE_SCREENS)
  const shown = useRef(0)
  const snapped = useRef(false)

  const bodyGeo = useMemo(() => slabGeometry(BODY_W, BODY_H, BODY_D, BODY_R), [])
  const frontGeo = useMemo(() => faceGeometry(BODY_W - 0.03, BODY_H - 0.03, BODY_R - 0.02), [])
  const glassGeo = useMemo(() => faceGeometry(BODY_W - 0.045, BODY_H - 0.045, BODY_R - 0.03), [])
  const screenAlpha = useMemo(
    () => roundedAlphaTexture(512, SCREEN_H / SCREEN_W, 0.115),
    [],
  )

  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 8
    })
  }, [textures])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const t = deviceState.phone

    if (!snapped.current) {
      // First frame: snap straight to pose — never lerp in from the origin.
      snapped.current = true
      g.position.set(t.x, t.y, t.z)
      g.rotation.set(t.rx, t.ry, t.rz)
      g.scale.setScalar(t.scale)
    }

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
      {/* titanium body */}
      <mesh geometry={bodyGeo}>
        <meshPhysicalMaterial
          color="#4a4e55"
          metalness={0.92}
          roughness={0.32}
          envMapIntensity={1.35}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </mesh>
      {/* matte front face under the glass */}
      <mesh geometry={frontGeo} position={[0, 0, BODY_D / 2 + 0.001]}>
        <meshStandardMaterial color="#04060a" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* screen — rounded corners via alpha mask, unlit so the UI reads true */}
      <mesh position={[0, 0, BODY_D / 2 + 0.004]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial
          ref={screenMat}
          map={textures[0]}
          alphaMap={screenAlpha}
          transparent
          toneMapped={false}
        />
      </mesh>
      {/* cover glass — thin reflective sheet */}
      <mesh geometry={glassGeo} position={[0, 0, BODY_D / 2 + 0.009]}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0.06}
          transparent
          opacity={0.07}
          envMapIntensity={2.2}
          depthWrite={false}
        />
      </mesh>
      {/* Dynamic Island */}
      <RoundedBox
        args={[0.36, 0.1, 0.006]}
        radius={0.048}
        smoothness={4}
        position={[0, SCREEN_H / 2 - 0.15, BODY_D / 2 + 0.006]}
      >
        <meshStandardMaterial color="#000000" roughness={0.35} />
      </RoundedBox>
      {/* side buttons: power right, volumes + action left */}
      <mesh position={[BODY_W / 2 + 0.008, 0.5, 0]}>
        <boxGeometry args={[0.022, 0.34, 0.06]} />
        <meshPhysicalMaterial color="#4a4e55" metalness={0.92} roughness={0.35} />
      </mesh>
      <mesh position={[-BODY_W / 2 - 0.008, 0.68, 0]}>
        <boxGeometry args={[0.022, 0.16, 0.06]} />
        <meshPhysicalMaterial color="#4a4e55" metalness={0.92} roughness={0.35} />
      </mesh>
      <mesh position={[-BODY_W / 2 - 0.008, 0.44, 0]}>
        <boxGeometry args={[0.022, 0.16, 0.06]} />
        <meshPhysicalMaterial color="#4a4e55" metalness={0.92} roughness={0.35} />
      </mesh>
      <mesh position={[-BODY_W / 2 - 0.008, 0.94, 0]}>
        <boxGeometry args={[0.022, 0.09, 0.055]} />
        <meshPhysicalMaterial color="#4a4e55" metalness={0.92} roughness={0.35} />
      </mesh>
    </group>
  )
}

const tmp = new THREE.Vector3()
