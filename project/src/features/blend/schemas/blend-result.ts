import { z } from 'zod'

export const blendResultFormSchema = z.object({
  inkName: z
    .string()
    .min(1, { message: '文字数は1文字以上で入力してください。' })
    .max(30, { message: '文字数は最大30文字までです。' }),
})

export type BlendResultFormSchema = z.infer<typeof blendResultFormSchema>
