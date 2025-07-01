import { string } from 'zod'

export const promptTemplate =
  <T extends Record<string, unknown>>(template: string) =>
  (variables: T): string => {
    return template.replace(/\{(\w+)\}/g, (_, key) => {
      if (!(key in variables)) {
        throw new Error(`Variable ${key} not found in provided variables.`)
      }
      return String(variables[key])
    })
  }

export const mvpGeneratorPrompt = promptTemplate<{ audience: string; problem: string }>(`
  为{audience}设计一个最小可行产品（MVP），以帮助他们解决{problem}。
  `)

export const startupIdeaGeneratorPrompt = promptTemplate<{
  industry: string
  criteria: string
}>(`
    生成针对<industry>{industry}</industry>当前趋势、挑战和机遇的创新型创业想法。这些想法应符合<criteria>{criteria}</criteria>。每个想法应包括：
    1. 对其解决问题的简要描述。
    2. 目标受众或市场。
    3. 解决方案的运作方式。
    4. 创收策略。
`)

export const startupIdeaGeneratorJsonPrompt = promptTemplate<{
  industry: string
  criteria: string
}>(`
    生成针对<industry>{industry}</industry>当前趋势、挑战和机遇的创新型创业想法。这些想法应符合<criteria>{criteria}</criteria>。每个想法应包括：
    1. 对其解决问题的简要描述。
    2. 目标受众或市场。
    3. 解决方案的运作方式。
    4. 创收策略。
    请以JSON格式返回结果，键为“title”、“description”、“targetAudience”、“solution”、“revenueModel”。
不要包含任何额外的文本、注释或Markdown格式。
`)

export const extractJsonCodeBlock = (text: string): string => {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/)
  const result = match ? match[1].trim() : text
  return JSON.parse(result)
}
