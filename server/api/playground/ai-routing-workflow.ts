export default defineEventHandler(async (event) => {
  const input = '我的产品到货时已损坏。'

  const routes = {
    general: '你是一个通用问题处理者。',
    refund: '你是一名退款处理人员。',
    technical: '你是一名技术支持处理人员。',
  }

  const result = await routingWorkflow(input, routes)

  return result
})
