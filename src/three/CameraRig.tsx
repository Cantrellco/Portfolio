import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { sceneState } from '../lib/sceneState'

/**
 * Camera path for the whole Keynote journey, driven by sceneState.progress.
 * Placeholder path for the spine: a slow dolly-back with gentle drift; each
 * scene's real choreography replaces segments of this curve in Phase 2+.
 *
 * On-demand frameloop: while the camera is still lerping toward its target
 * we request another frame, so motion settles smoothly then stops costing.
 */
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0.2, 6),
  new THREE.Vector3(0.8, 0.4, 8.5),
  new THREE.Vector3(-0.9, 0.1, 11),
  new THREE.Vector3(0.4, 0.6, 14),
  new THREE.Vector3(0, 0.3, 17),
])

const target = new THREE.Vector3()
const lookAt = new THREE.Vector3(0, 0, 0)

export function CameraRig() {
  const invalidate = useThree((s) => s.invalidate)
  const settled = useRef(false)

  useFrame(({ camera }) => {
    path.getPoint(THREE.MathUtils.clamp(sceneState.progress, 0, 1), target)

    const cursorScale = sceneState.reducedMotion ? 0.12 : 0.45
    target.x += sceneState.cursorX * cursorScale
    target.y += sceneState.cursorY * cursorScale * 0.6

    const before = camera.position.distanceToSquared(target)
    camera.position.lerp(target, 0.06)
    camera.lookAt(lookAt)

    settled.current = before < 1e-6
    if (!settled.current) invalidate()
  })

  return null
}
