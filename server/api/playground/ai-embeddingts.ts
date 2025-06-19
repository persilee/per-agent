import { cosineSimilarity, embed, embedMany } from 'ai'

export default defineEventHandler(async (event) => {
  const { query } = await readBody(event)

  const { embedding: queryEmbedding } = await embed({
    model: openaiProvider.embedding('text-embedding-3-small'),
    value: query,
  })

  const { values, embeddings } = await embedMany({
    model: openaiProvider.embedding('text-embedding-3-small'),
    values: [
      '人工智能是计算机科学的一个分支，旨在创建能够执行通常需要人类智能的任务的系统。',
      '机器学习是人工智能的一个子领域，涉及使用算法和统计模型使计算机系统能够执行特定任务而无需使用明确的指令。',
      '深度学习是机器学习的一个子领域，使用多层神经网络来分析各种形式的数据。',
    ],
  })

  const result = embeddings
    .map((embedding, index) => ({
      text: values[index],
      similarity: cosineSimilarity(queryEmbedding, embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)

  return result
})
