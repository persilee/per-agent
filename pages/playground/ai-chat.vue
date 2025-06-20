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
  api: '/api/playground/ai-chat',
  headers: {
    Authorization: `Bearer token_13121212`,
  },
  body: {
    socketId: 'socket_1234567890',
  },
  credentials: 'same-origin',
  onError: (err) => {
    console.error('Error occurred:', err)
  },
  onResponse: (response) => {
    console.log('Response received:', response)
  },
  onFinish: (message) => {
    console.log('Response finished:', message)
  },
  onToolCall: (toolCall) => {
    console.log('Tool call:', toolCall)
  },
})

const getAskForConfirmation = (message: Message) => {
  const result = message.parts?.find(
    (part) =>
      part.type === 'tool-invocation' &&
      part.toolInvocation.toolName === 'askForConfirmation',
  )

  return result
}

const hasAskForConfirmation = (message: Message) => {
  return getAskForConfirmation(message) !== undefined
}

const askForConfirmationToolCallId = (message: Message) => {
  const result = getAskForConfirmation(message)
  return result?.type === 'tool-invocation' ? result.toolInvocation.toolCallId : ''
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    stop()
  }
}

const onKeyUpInput = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  input.value = value.trim()
}

const onDeleteMessage = (messageId: string) => {
  setMessages((messages) => messages.filter((message) => message.id !== messageId))
}

const onSubmit = (event: Event) => {
  handleSubmit(event, {
    body: {
      timestamp: Date.now(),
    },
  })
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
      <button
        v-if="message.role === 'assistant'"
        type="button"
        class="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        @click="onDeleteMessage(message.id)"
      >
        删除
      </button>
      <div v-if="hasAskForConfirmation(message)">
        <button
          @click="
            addToolResult({
              toolCallId: askForConfirmationToolCallId(message),
              result: 'Yes',
            })
          "
        >
          确认
        </button>
        <button
          @click="
            addToolResult({
              toolCallId: askForConfirmationToolCallId(message),
              result: 'No',
            })
          "
        >
          取消
        </button>
      </div>
    </div>

    <form @submit="onSubmit">
      <input
        v-model="input"
        type="text"
        placeholder="请输入..."
        class="w-full p-2 border rounded"
        @keyup="onKeyUpInput"
      />
      <button
        type="submit"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="onSubmit"
      >
        发送
      </button>
      <button
        v-if="error"
        type="button"
        class="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        @click="reload()"
      ></button>
      <button @click="append({ role: 'user', content: '我是Persilee' })">追加消息</button>
      <div v-if="error" class="mt-2 text-red-500">
        <strong>异常:</strong> {{ error.message }}
      </div>
    </form>
  </div>
</template>
