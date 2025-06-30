import { generateText } from 'ai'

export const llm = async (prompt: string) => {
  const response = await generateText({
    model: openaiProvider('gpt-4o'),
    prompt,
  })
  return response
}

export const chainingWorkflow = async (input: string, prompts: string[]) => {
  let result = input

  for (const [index, prompt] of prompts.entries()) {
    console.log(`\nStep ${index + 1}: ${prompt}`)
    const llmResponse = await llm(`${prompt}\nInput: ${result}`)
    result = llmResponse.text ?? ''
    console.log(`Result after step ${index + 1}:`, result)
  }

  return result
}

interface Routes {
  [key: string]: string
}

export const routingWorkflow = async (input: string, routes: Routes) => {
  console.log('可用路由:', Object.keys(routes).join(', '))

  const classifier = `你是一名客服咨询分类员。将输入内容归入以下类别之一：${Object.keys(
    routes,
  ).join(', ')}。请只返回类别名称，不要添加其他内容。
  
  输入内容: ${input}`

  const route = await llm(classifier)
  console.log('分类结果:', route)

  const routeKey = route.text?.trim() || ''
  const prompt = routes[routeKey] || '默认处理流程'

  return llm(`${prompt}\n输入内容: ${input}`)
}

const generator = async (prompt: string, task: string, context: string = '') => {
  const fullPrompt = context
    ? `${prompt}\n\n${context}\n\n任务：${task}`
    : `${prompt}\n\n任务：${task}`
  const response = await llm(fullPrompt)
  const thoughts = extractor(response.text ?? '', 'thoughts')
  const result = extractor(response.text ?? '', 'result')

  console.log('Thoughts:', thoughts)
  console.log('Result:', result)

  return { thoughts, result }
}

const evaluator = async (prompt: string, task: string, context: string = '') => {
  const fullPrompt = `${prompt}\n\n待评估的内容${context}\n\n原始任务：${task}`
  const response = await llm(fullPrompt)
  const evaluation = extractor(response.text ?? '', 'evaluation')
  const feedback = extractor(response.text ?? '', 'feedback')

  console.log('Evaluation:', evaluation)
  console.log('Feedback:', feedback)

  return { evaluation, feedback }
}

export const evaluatorOptimizerWorkflow = async (
  task: string,
  generatePrompts: string,
  evaluatorPrompts: string,
) => {
  const memory: string[] = []

  const chainOfThought: Array<{ thoughts: string; result: string }> = []

  const { thoughts, result } = await generator(generatePrompts, task)

  memory.push(thoughts)

  chainOfThought.push({ thoughts, result })

  while (true) {
    const { evaluation, feedback } = await evaluator(evaluatorPrompts, task, result)

    if (evaluation === '通过') {
      console.log('所有标准都满足，流程结束。')
      return { result, chainOfThought }
    }

    const context = [
      '先前的尝试:',
      ...memory.map((m) => `- ${m}`),
      `\n反馈: ${feedback}`,
    ].join('\n')

    const { thoughts: newThoughts, result: newResult } = await generator(
      generatePrompts,
      task,
      context,
    )

    memory.push(newThoughts)
    chainOfThought.push({ thoughts: newThoughts, result: newResult })

    console.log('新的结果:', newResult)
  }
}

export const extractor = (response: string, tag: string) => {
  const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's')
  const match = response.match(regex)
  return match ? match[1].trim() : ''
}
