import { get } from '@nuxt/ui/runtime/utils/index.js'
import { streamText } from 'ai'
import { askForConfirmation, saveToDatabase } from '~/server/utils/ai-tools'

export default defineEventHandler(async (event) => {
  const { messages, socketId, timestamp } = await readBody(event)
  const token = getHeader(event, 'Authorization')

  console.log('Authorization token:', token)
  console.log('socketId:', socketId)
  console.log('timestamp:', timestamp)

  const cookies = parseCookies(event)
  console.log('Cookies:', cookies)

  const response = streamText({
    model: openaiProvider('gpt-4o'),
    messages,
    tools: {
      getWebsiteURL,
      getStartupFonderBio,
      saveToDatabase,
      askForConfirmation,
    },
    maxSteps: 3,
  })

  return response.toDataStreamResponse()
})
