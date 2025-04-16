import { z } from 'zod'

export const blendResultFormSchema = z.object({
  inkName: z.string().min(1).max(30),
})

export type BlendResultFormSchema = z.infer<typeof blendResultFormSchema>
