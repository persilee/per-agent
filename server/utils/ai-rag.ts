import { embedMany, embed } from 'ai'
import { cosineDistance, desc, gt, sql } from 'drizzle-orm'
import { embeddings } from '~/database/schema'

const generateChunks = (input: string) => {
  const chunks = input
    .trim()
    .split('\n')
    .filter((i) => i !== '')

  return chunks
}

export const generateEmbeddings = async (input: string) => {
  const chunks = generateChunks(input)

  const { embeddings } = await embedMany({
    model: openaiProvider.embedding('text-embedding-3-small'),
    values: chunks,
  })

  const result = embeddings.map((embedding, index) => ({
    description: chunks[index],
    embedding,
  }))

  return result
}

export const generateEmbedding = async (input: string) => {
  const _text = input.replaceAll('\\n', ' ')

  const { embedding } = await embed({
    model: openaiProvider.embedding('text-embedding-3-small'),
    value: _text,
  })

  return embedding
}

export const findRelevantContent = async (query: string) => {
  const _query = await generateEmbedding(query)

  const similarity = sql<number>`1- (${cosineDistance(embeddings.embedding, _query)})`

  const items = await db
    .select({
      description: embeddings.description,
      similarity,
    })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy((table) => desc(table.similarity))
    .limit(6)

  return items
}
