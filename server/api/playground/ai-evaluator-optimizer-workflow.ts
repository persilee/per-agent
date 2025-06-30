import { evaluatorOptimizerWorkflow } from '~/server/utils/ai-workflow'

export default defineEventHandler(async (event) => {
  const { input } = await readBody(event)

  const task = `<user-input>${input}</user-input>`

  const generatePrompts = `
  我们的目标是根据用户输入撰写一篇文章。如果您之前的草稿有反馈，您应该反思这些反馈以提高写作水平。
  请以以下简洁格式输出您的答案：
  <thoughts>
  [您对主题和反馈的理解，以及您计划如何改进]
  </thoughts>
  <result>
  [您的文章草稿在此处]
  </result>
  `

  const evaluatorPrompts = `
  从以下方面评估这篇文章草稿：
  1. 清晰度与连贯性
  2. 吸引力与流畅性
  3. 语法与风格
  你只应进行评估，而不应尝试撰写文章。
  只有当所有标准都满足且你没有进一步的改进建议时，才输出“通过”。
  以以下简洁格式输出你的评估：
  <evaluation>
  [通过、需要改进或未通过]
  </evaluation>
  <feedback>
  [哪些方面需要改进以及原因。]
  </feedback>
  `

  const result = await evaluatorOptimizerWorkflow(task, generatePrompts, evaluatorPrompts)

  return result
})
