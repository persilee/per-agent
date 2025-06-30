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
