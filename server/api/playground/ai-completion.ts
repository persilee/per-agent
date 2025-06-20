import { streamText } from 'ai'

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event)

  const response = streamText({
    model: openaiProvider('gpt-4o'),
    prompt,
    onFinish: (event) => {
      console.log('Stream finished:', event.text)
    },
  })

  return response.toDataStreamResponse()
})
