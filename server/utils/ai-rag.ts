import { embedMany } from 'ai'

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
