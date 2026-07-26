import * as THREE from 'three'

/** Rounded-rect Shape used for device silhouettes and masks. */
export function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

/**
 * Device body: extruded rounded-rect with a chamfered edge — reads as a
 * machined slab (flat sides + soft edge highlight) instead of a soap bar.
 * Centered on z.
 */
export function slabGeometry(
  w: number,
  h: number,
  depth: number,
  r: number,
  bevel = 0.014,
): THREE.ExtrudeGeometry {
  const geo = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 24,
  })
  geo.translate(0, 0, -(depth - bevel * 2) / 2)
  geo.computeVertexNormals()
  return geo
}

/** Flat rounded-rect face (front plates, glass) matching the slab silhouette. */
export function faceGeometry(w: number, h: number, r: number): THREE.ShapeGeometry {
  return new THREE.ShapeGeometry(roundedRectShape(w, h, r), 24)
}

/** White-on-black rounded-rect alpha mask (for rounded screen corners). */
export function roundedAlphaTexture(px = 512, aspect = 1, rFrac = 0.09): THREE.CanvasTexture {
  const wpx = px
  const hpx = Math.round(px * aspect)
  const canvas = document.createElement('canvas')
  canvas.width = wpx
  canvas.height = hpx
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, wpx, hpx)
  const r = wpx * rFrac
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.roundRect(0, 0, wpx, hpx, r)
  ctx.fill()
  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  return tex
}

/** Radial-gradient disc texture for the holo pedestal. */
export function holoDiscTexture(px = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = px
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2)
  g.addColorStop(0, 'rgba(56,214,255,0.85)')
  g.addColorStop(0.35, 'rgba(56,214,255,0.28)')
  g.addColorStop(0.7, 'rgba(56,214,255,0.07)')
  g.addColorStop(1, 'rgba(56,214,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, px, px)
  return new THREE.CanvasTexture(canvas)
}
