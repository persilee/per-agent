import { generateText } from 'ai'

export default defineEventHandler(async (event) => {
  const { industry } = await readBody(event)

  console.log('Received industry information:', industry)

  const response = await generateText({
    model: deepseekProvider('deepseek-chat'),
    prompt: `请根据以下行业信息，生成一段简短的介绍：${industry}`,
    system: '你是一个专业的行业介绍生成器，请根据提供的信息生成简洁明了的行业介绍。',
    temperature: 0.7,
  })

  return response
})
