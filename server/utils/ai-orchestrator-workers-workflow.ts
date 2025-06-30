const formatPrompt = (template: string, variables: Record<string, string>) => {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    if (!(key in variables)) {
      throw new Error(`Variable ${key} not found in provided variables.`)
    }

    return variables[key] || ''
  })
}

const parseTasks = (tasksXml: string) => {
  const taskPattern =
    /<task>[\s\S]*?<type>(.*?)<\/type>[\s\S]*?<description>(.*?)<\/description>[\s\S]*?<\/task>/g

  const tasks = []

  for (const match of tasksXml.matchAll(taskPattern)) {
    tasks.push({
      type: match[1].trim(),
      description: match[2].trim(),
    })
  }

  return tasks
}

const orchestrator = async (prompt: string, task: string) => {
  const input = formatPrompt(prompt, { task })

  const response = await llm(input)

  const analysis = extractor(response.text ?? '', 'analysis')
  const tasksXml = extractor(response.text ?? '', 'tasks')

  console.log('Analysis:', analysis)
  console.log('Tasks XML:', tasksXml)
  const tasks = parseTasks(tasksXml)
  console.log('Parsed Tasks:', tasks)

  return { analysis, tasks }
}

type OrchestratorTask = { type: string; description: string }

const worker = async (
  prompt: string,
  originalTask: string,
  orchestratorTasks: OrchestratorTask[],
) => {
  const results = []

  for (const { type, description } of orchestratorTasks) {
    const input = formatPrompt(prompt, {
      original_task: originalTask,
      orchestrator_task_type: type,
      orchestrator_task_description: description,
    })

    const response = await llm(input)
    const result = extractor(response.text ?? '', 'result')

    console.log(`Result for ${type}:`, result)
    results.push({
      type,
      description,
      result,
    })
  }

  return results
}

export const orchestratorWorkflow = async (
  orchestratorPrompt: string,
  workerPrompt: string,
  originalTask: string,
) => {
  const { analysis, tasks: orchestratorTasks } = await orchestrator(
    orchestratorPrompt,
    originalTask,
  )
  const results = await worker(workerPrompt, originalTask, orchestratorTasks)

  return { analysis, orchestratorTasks, results }
}
