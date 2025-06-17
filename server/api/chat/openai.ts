export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: body.messages,
  })

  return completion
})
