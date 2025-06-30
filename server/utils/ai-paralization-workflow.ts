import { llm } from './ai-workflow'

export const parallelizationWorkflow = async (
  input: string,
  prompt: string[],
  maxConcurrent: number = 3,
): Promise<string[]> => {
  const results: string[] = []

  for (let i = 0; i < prompt.length; i += maxConcurrent) {
    const chunk = prompt.slice(i, i + maxConcurrent)

    const promises = chunk.map(async (p) => {
      const response = await llm(`${p}\n输入内容: ${input}`)
      return response.text ?? ''
    })
    const responses = await Promise.all(promises)
    results.push(...responses)
  }

  return results
}
