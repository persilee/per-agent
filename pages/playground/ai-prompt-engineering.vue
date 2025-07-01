<script setup lang="ts">
import { micromark } from 'micromark'

const result = await $fetch('/api/playground/ai-prompt-engineering', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    industry: '开发者',
    criteria: '如何使用 AI SDK 提示工程接口？',
  }),
})

const rendered = computed(() => {
  return micromark(result)
})
</script>

<template>
  <div v-html="rendered"></div>
</template>
