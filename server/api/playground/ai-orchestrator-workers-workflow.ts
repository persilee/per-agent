import { orchestratorWorkflow } from '~/server/utils/ai-orchestrator-workers-workflow'

export default defineEventHandler(async (event) => {
  const { input: originalTask } = await readBody(event)

  const orchestratorPrompt = `
  分析这项任务，并将其分解为5种不同的方法
  任务:{task}
  
  以这种格式返回你的回复：
  <analysis>
    解释你对任务的理解以及哪些变体可能有价值。重点关注每种方法如何服务于任务的不同方面。
  </analysis>

  <tasks>
    <task>
      <type>正式的</type>
      <description>撰写一个精确的、技术版本，强调规格说明</description>
    </task>
    <task>
      <type>对话的</type>
      <description>撰写一个引人入胜、亲切友好且能与读者产生共鸣的版本</description>
    </task>
  </tasks>
  `

  const workPrompt = `
  根据以下内容生成内容：
  任务:{original_task}
  风格:{orchestrator_task_type}
  描述:{orchestrator_task_description}
  以这种格式返回你的回复：
  <result>
    在此处输入你的内容，保持指定的风格并全面满足要求
  </result>
  `

  const result = await orchestratorWorkflow(orchestratorPrompt, workPrompt, originalTask)

  return result
})
