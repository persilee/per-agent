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
