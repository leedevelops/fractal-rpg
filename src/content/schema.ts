import { z } from 'zod'

export const FractalChapterZ = z.object({
  id: z.number().int().min(1).max(27),
  book: z.enum(['Book 1','Book 2','Book 3','Book 4','Book 5']),
  divineName: z.enum(['Yod','Heh','Vav','Final Heh','YESHUA']),
  bookName: z.string(),
  bookTheme: z.string(),
  chapterTitle: z.string(),
  geometryIcon: z.string(),
  stone: z.string(),
  element: z.enum(['Fire','Air','Water','Earth','Plasma']),
  templeSpace: z.enum(['Altar','Holy Place','Inner Light','Holy of Holies','Ark']),
  storyStage: z.string(),
  dimension: z.string(),
  fractalGate: z.string(),
  spiritualFrequency: z.string(),
  bookColor: z.string(),
  tribe: z.string().optional(),
  prf: z.string().optional(),
  apostle: z.string().optional()
})

export type FractalChapter = z.infer<typeof FractalChapterZ>
export const FractalMatrixZ = z.array(FractalChapterZ)
export type FractalMatrix = FractalChapter[]
