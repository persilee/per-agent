import { generateText } from 'ai'

export default defineEventHandler(async (event) => {
  const response = await generateText({
    model: openaiProvider('gpt-4o'),
    prompt: '你好！',
  })

  return response
})
