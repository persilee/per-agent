import { createDeepSeek } from '@ai-sdk/deepseek'
import { createOpenAI } from '@ai-sdk/openai'

const config = useRuntimeConfig()

export const deepseekProvider = createDeepSeek({
  apiKey: config.deepseekApiKey,
  baseURL: config.deepseekBaseUrl,
})

export const openaiProvider = createOpenAI({
  apiKey: config.openaiApiKey,
  baseURL: config.openaiBaseUrl,
})
