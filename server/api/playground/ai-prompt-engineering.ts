import { generateText } from 'ai'
import {
  mvpGeneratorPrompt,
  startupIdeaGeneratorPrompt,
} from '~/server/utils/ai-prompt-engineering'

export default defineEventHandler(async (event) => {
  const { industry, criteria } = await readBody(event)

  const prompt = startupIdeaGeneratorPrompt({ industry, criteria })

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

  const messageContent = response.messages[0].content[0] as any
  const text =
    messageContent.type === 'text' ? messageContent.text : messageContent.text.content

  console.log('AI Response:', text)

  return text
})
