export default defineEventHandler(async (event) => {
  const { input } = await readBody(event)

  const prompts = [
    `
    分析以下评论的情感倾向。
    将其分类为积极、中性或消极。
    仅返回分类结果
    `,
    `
    以下文章是否包含仇恨言论或冒犯性语言？
    如果是，仅返回 “仇恨言论”。
    如果否，仅返回 “通过”。
    `,
    `
    检查以下文章是否包含敏感内容（例如，暴力、骚扰、露骨内容）。
    如果是，仅返回 “敏感内容”。
    如果否，仅返回 “通过”
    `,
  ]

  const results = await parallelizationWorkflow(input, prompts)

  return results
})
