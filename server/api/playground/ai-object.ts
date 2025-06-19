import { generateObject } from 'ai'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const response = await generateObject({
    model: openaiProvider('gpt-4o'),
    schema: z.object({
      startup: z.string().describe('创业公司名称'),
      website: z.string().describe('创业公司网站URL'),
      founder: z.string().describe('创业公司创始人姓名'),
      founderBio: z.string().describe('创始人简介'),
    }),
    output: 'array',
    prompt: '列出 3 家科技公司的名称、网站、创始人和创始人简介',
  })

  return response
})
