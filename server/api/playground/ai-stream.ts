import { streamText } from 'ai'

export default defineEventHandler(async (event) => {
  const response = streamText({
    model: openaiProvider('gpt-4o'),
    prompt: '请生成一段关于人工智能的介绍',
    system: '你是一个专业的AI介绍生成器，请生成简洁明了的AI介绍。',
    onFinish: (event) => {
      console.log('Stream finished:', event.text)
    },
  })

  return response.toDataStreamResponse()
})
