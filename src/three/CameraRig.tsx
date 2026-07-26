import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneState } from '../lib/sceneState'

/**
 * Camera driven by journey progress through explicit per-scene keyframes
 * (position + look-at). Devices stay near the origin; the camera travels
 * to them. While any lerp is still settling we request another frame, so
 * the on-demand loop keeps running exactly as long as needed.
 */
interface CamKey {
  p: number
  pos: [number, number, number]
  look: [number, number, number]
}

// p values match section boundaries by scroll share (hero ~0–0.09,
// flagship ~0.09–0.38, build-log ~0.38–0.55, work ~0.55–0.72,
// receipts ~0.72–0.9, process → 1). Retuned whenever section heights change.
const KEYS: CamKey[] = [
  { p: 0.0, pos: [0, 0.2, 7.5], look: [0, 0, 0] },
  { p: 0.09, pos: [0, 0.1, 7.3], look: [0.55, 0, 0] },
  { p: 0.2, pos: [0.1, 0.12, 7.0], look: [0.68, 0.02, 0] },
  { p: 0.32, pos: [-0.1, 0.18, 7.1], look: [0.62, -0.02, 0] },
  { p: 0.38, pos: [0.1, 0.25, 7.6], look: [0.4, -0.05, 0] },
  { p: 0.55, pos: [-0.6, 0.5, 8.8], look: [0, 0.1, 0] },
  { p: 0.72, pos: [0.6, 0.4, 10.5], look: [0, 0.1, 0] },
  { p: 0.9, pos: [0, 0.5, 12.5], look: [0, 0.2, 0] },
  { p: 1.0, pos: [0, 0.7, 14.5], look: [0, 0.3, 0] },
]

const posTarget = new THREE.Vector3()
const lookTarget = new THREE.Vector3()
const lookCurrent = new THREE.Vector3(0, 0, 0)
const tmpA = new THREE.Vector3()
const tmpB = new THREE.Vector3()

function sample(p: number, out: THREE.Vector3, field: 'pos' | 'look') {
  const clamped = THREE.MathUtils.clamp(p, 0, 1)
  let i = 0
  while (i < KEYS.length - 2 && KEYS[i + 1].p < clamped) i++
  const a = KEYS[i]
  const b = KEYS[i + 1]
  const t = THREE.MathUtils.smoothstep((clamped - a.p) / (b.p - a.p), 0, 1)
  tmpA.set(...a[field])
  tmpB.set(...b[field])
  out.copy(tmpA).lerp(tmpB, t)
}

export function CameraRig() {
  const invalidate = useThree((s) => s.invalidate)
  const settled = useRef(false)

  useFrame(({ camera }) => {
    sample(sceneState.progress, posTarget, 'pos')
    sample(sceneState.progress, lookTarget, 'look')

    const cursorScale = sceneState.reducedMotion ? 0.1 : 0.35
    posTarget.x += sceneState.cursorX * cursorScale
    posTarget.y += sceneState.cursorY * cursorScale * 0.55

    const before =
      camera.position.distanceToSquared(posTarget) + lookCurrent.distanceToSquared(lookTarget)
    camera.position.lerp(posTarget, 0.07)
    lookCurrent.lerp(lookTarget, 0.07)
    camera.lookAt(lookCurrent)

    settled.current = before < 1e-6
    if (!settled.current) invalidate()
  })

  return null
}
