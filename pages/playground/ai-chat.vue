<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'

const { messages, input, handleSubmit } = useChat({
  api: '/api/playground/ai-chat',
})
</script>

<template>
  <div style="padding: 56px; max-width: 600px">
    <div v-for="message in messages" :key="message.id" style="margin-bottom: 20px">
      <strong>{{ message.role === 'user' ? 'User:' : 'AI:' }}</strong>
      {{ message.content }}
    </div>

    <form @submit="handleSubmit">
      <input
        v-model="input"
        type="text"
        placeholder="Type your message here..."
        class="w-full p-2 border rounded"
      />
      <button
        type="submit"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="handleSubmit"
      >
        Send
      </button>
    </form>
  </div>
</template>
