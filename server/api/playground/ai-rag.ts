import { streamText } from 'ai'
import { getInformation } from '~/server/utils/ai-tools'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const system = `
你是一个乐于助人的助手。在回答任何问题之前，请先查阅你的知识库。
仅使用工具调用中的信息来回答问题。
如果在工具调用中未找到相关信息，请回复 “抱歉，我不知道。”
`

  const response = streamText({
    model: openaiProvider('gpt-4o'),
    messages,
    system,
    maxSteps: 2,
    tools: { getInformation },
    onFinish: (event) => {
      console.log('Stream finished:', event.text)
    },
  })

  return response.toDataStreamResponse()
})
