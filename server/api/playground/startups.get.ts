import { startups } from '~/database/schema'

export default defineEventHandler(async (event) => {
  const startupList = await db.select().from(startups)

  if (startupList.length === 0) {
    return { message: 'No startups found' }
  }

  return startupList
})
