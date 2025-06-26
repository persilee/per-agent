<script setup lang="ts">
import { useChat, type Message } from '@ai-sdk/vue'

const {
  messages,
  input,
  handleSubmit,
  error,
  reload,
  stop,
  setMessages,
  append,
  addToolResult,
} = useChat({
  api: '/api/playground/ai-rag',
  onError: (err) => {
    console.error('Error occurred:', err)
  },
  onResponse: (response) => {
    console.log('Response received:', response)
  },
  onFinish: (message) => {
    console.log('Response finished:', message)
  },
})
</script>

<template>
  <div style="padding: 56px; max-width: 666px">
    <div v-for="message in messages">
      <strong>{{ message.role === 'user' ? '你' : 'AI' }}</strong>
      {{ message.content }}
      <br />
      <br />
    </div>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="input" />
      <button type="submit" @click="handleSubmit">发送</button>
    </form>
  </div>
</template>
