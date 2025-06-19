import { generateText, ToolExecutionError } from 'ai'
import { getStartupFonderBio, getWebsiteURL } from '~/server/utils/ai-tools'

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event)

  try {
    const response = await generateText({
      model: openaiProvider('gpt-4o'),
      tools: { getWebsiteURL, getStartupFonderBio },
      prompt: content,
    })

    return response
  } catch (error) {
    if (ToolExecutionError.isInstance(error)) {
      console.error('Tool execution error:', error.message)
      return {
        error: '工具执行失败，请稍后再试。',
        details: error.message,
      }
    }
  }
})
