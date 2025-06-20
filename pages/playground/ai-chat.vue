<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'

const { messages, input, handleSubmit, error, reload, stop } = useChat({
  api: '/api/playground/ai-chat',
})

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    stop()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div style="padding: 56px; max-width: 600px">
    <div v-for="message in messages" :key="message.id" style="margin-bottom: 20px">
      <strong>{{ message.role === 'user' ? '你:' : 'AI:' }}</strong>
      {{ message.content }}
    </div>

    <form @submit="handleSubmit">
      <input
        v-model="input"
        type="text"
        placeholder="请输入..."
        class="w-full p-2 border rounded"
      />
      <button
        type="submit"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="handleSubmit"
      >
        发送
      </button>
      <button
        v-if="error"
        type="button"
        class="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        @click="reload()"
      ></button>
      <div v-if="error" class="mt-2 text-red-500">
        <strong>异常:</strong> {{ error.message }}
      </div>
    </form>
  </div>
</template>
