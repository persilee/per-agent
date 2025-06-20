import { streamText } from 'ai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const response = streamText({
    model: openaiProvider('gpt-4o'),
    messages,
  })

  return response.toDataStreamResponse()
})
