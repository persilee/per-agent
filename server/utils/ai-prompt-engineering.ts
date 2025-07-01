import { string } from 'zod/v4'

export const promptTemplate =
  <T extends Record<string, unknown>>(template: string) =>
  (variables: T): string => {
    return template.replace(/\{(\w+)\}/g, (_, key) => {
      if (!(key in variables)) {
        throw new Error(`Variable ${key} not found in provided variables.`)
      }
      return String(variables[key])
    })
  }

export const mvpGeneratorPrompt = promptTemplate<{ audience: string; problem: string }>(`
  为{audience}设计一个最小可行产品（MVP），以帮助他们解决{problem}。
  `)
