import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources/chat/completions'

export default defineEventHandler(async (event) => {
  const getWeather = async (location: string) => {
    console.log(`Fetching weather for: ${location}`)
    return {
      temperature: 25,
      condition: 'Sunny',
      location,
    }
  }

  const tools: Array<ChatCompletionTool> = [
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: 'Get the current weather for a specific location.',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: "The location to get the weather for, e.g., 'ShenZhen'.",
            },
          },
          required: ['location'],
        },
      },
    },
  ]

  const messages: Array<ChatCompletionMessageParam> = [
    {
      role: 'user',
      content: 'What is the weather like in ShenZhen?',
    },
  ]

  const completion = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages,
    tools,
  })

  if (completion.choices[0].message.tool_calls) {
    const toolCall = completion.choices[0].message.tool_calls[0]
    if (toolCall.function && toolCall.function.name === 'get_weather') {
      const args = JSON.parse(toolCall.function.arguments)
      const weather = await getWeather(args.location)
      console.log(`Weather fetched: ${JSON.stringify(weather)}`)

      // Optionally, you can add the tool call response to the messages
      messages.push(completion.choices[0].message)
      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(weather),
      })

      const finalCompletion = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
      })

      return finalCompletion
    }
  }

  return completion
})
