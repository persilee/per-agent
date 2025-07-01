import { generateText } from 'ai'
import { mvpGeneratorPrompt } from '~/server/utils/ai-prompt-engineering'

export default defineEventHandler(async (event) => {
  const { audience, problem } = await readBody(event)

  const prompt = mvpGeneratorPrompt({ audience, problem })

  console.log('Generated Prompt:', prompt)

  const systemPrompt = `用中文回答。`

  const { response } = await generateText({
    model: openaiProvider('gpt-4o'),
    temperature: 0,
    maxTokens: 2000,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  return response.messages[0]
})
