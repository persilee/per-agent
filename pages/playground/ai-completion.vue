<script setup lang="ts">
import { useCompletion } from '@ai-sdk/vue'

const { completion, input, handleSubmit } = useCompletion({
  api: '/api/playground/ai-completion',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">AI Completion Playground</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
      <textarea
        v-model="input"
        placeholder="Type your prompt here..."
        class="p-2 border rounded"
        rows="4"
      ></textarea>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
    <div v-if="completion" class="mt-4 p-4 border rounded bg-gray-100">
      <h2 class="text-xl font-semibold">Completion Result:</h2>
      <p>{{ completion }}</p>
    </div>
  </div>
</template>
