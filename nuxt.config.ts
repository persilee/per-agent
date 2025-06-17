// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  runtimeConfig: {
    openaiApiKey: "",
    openaiBaseUrl: "",
    deepseekApiKey: "",
    deepseekBaseUrl: "",
  },
})
