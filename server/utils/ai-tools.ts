import { tool } from 'ai'
import { z } from 'zod'

export const getWebsiteURL = tool({
  description: '获取网站的URL地址',
  parameters: z.object({
    startup: z.string().describe('需要获取URL的网站名称'),
  }),
  execute: async ({ startup }) => {
    return {
      startup,
      website: `https://www.${startup.toLowerCase().replace('', '-')}.com`,
    }
  },
})

export const getStartupFonderBio = tool({
  description: '获取创业公司的创始人简介',
  parameters: z.object({
    startup: z.string().describe('需要获取创始人简介的创业公司名称'),
  }),
  execute: async ({ startup }) => {
    return {
      startup,
      founderBio: `创始人${startup}的简介信息。`,
    }
  },
})

export const saveToDatabase = tool({
  description: '保存数据到数据库,在使用这个工具之前，始终要寻求确认。',
  parameters: z.object({
    data: z.string().describe('需要保存到数据库的数据'),
  }),
  execute: async ({ data }) => {
    // 模拟保存到数据库的操作
    console.log('Saving to database:', data)
    return {
      success: true,
      message: '数据已成功保存到数据库。',
      savedData: data,
    }
  },
})

export const askForConfirmation = tool({
  description: '询问用户是否确认操作',
  parameters: z.object({
    question: z.string().describe('需要用户确认的问题'),
  }),
  execute: async ({ question }) => {
    // 模拟用户确认操作
    console.log('Asking for confirmation:', question)
    return {
      confirmed: true,
      message: `用户已确认：${question}`,
    }
  },
})
