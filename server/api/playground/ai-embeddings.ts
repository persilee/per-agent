import { startups, embeddings as embeddingsSchema } from '~/database/schema'

export default defineEventHandler(async (event) => {
  const { name, description, founder, revenue } = await readBody(event)

  const [startup] = await db
    .insert(startups)
    .values({ name, description, founder, revenue })
    .returning()

  const text = [
    `startup: ${name} description: ${description}`,
    `startup: ${name} founder: ${founder}`,
    `startup: ${name} revenue: ${revenue}`,
  ].join('\n')

  const embeddings = await generateEmbeddings(text)

  const _embeddings = embeddings.map((embedding) => ({
    startupId: startup.id,
    ...embedding,
  }))

  await db.insert(embeddingsSchema).values(_embeddings)

  return startup
})
