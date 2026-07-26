/**
 * S5 — the generative pipeline, on the record. Every Higgsfield generation
 * that ships on this site is logged here with its real credit cost.
 * This log IS the exhibit — receipts, not badges.
 */
export interface PipelineEntry {
  asset: string
  model: string
  purpose: string
  credits: number
}

export const aiPipeline: PipelineEntry[] = [
  {
    asset: 'Studio environment key art',
    model: 'nano_banana_2 @ 2K',
    purpose: 'Hero/OG atmosphere plate',
    credits: 2,
  },
  {
    asset: 'Aurora editorial backdrop',
    model: 'nano_banana_2 @ 2K',
    purpose: 'Section backdrop wash',
    credits: 2,
  },
  {
    asset: 'Hex dumbbell concept',
    model: 'nano_banana_2',
    purpose: 'Concept → 3D prop (Workout Buddy alcove)',
    credits: 2,
  },
  {
    asset: 'Flat-white cup concept',
    model: 'nano_banana_2',
    purpose: 'Concept → 3D prop (Fusion Coffee alcove)',
    credits: 2,
  },
  {
    asset: 'Dumbbell GLB mesh',
    model: 'image_to_3d (Meshy), textured PBR',
    purpose: 'Live 3D prop in the flagship scene',
    credits: 30,
  },
  {
    asset: 'Coffee cup GLB mesh',
    model: 'image_to_3d (Meshy), textured PBR',
    purpose: 'Live 3D prop in the work section',
    credits: 30,
  },
]

export const pipelineTotal = () => aiPipeline.reduce((sum, e) => sum + e.credits, 0)
