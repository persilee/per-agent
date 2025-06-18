import { generateText } from 'ai'

export default defineEventHandler(async (event) => {
  const response = await generateText({
    model: deepseekProvider('deepseek-chat'),
    prompt: '你好！',
  })

  return response
})
