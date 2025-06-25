import { startups } from '~/database/schema'

export default defineEventHandler(async (event) => {
  const { name, description } = await readBody(event)

  const result = await db.insert(startups).values({ name, description })

  return result
})
