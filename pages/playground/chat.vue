<template>
  <div>
    <h1>chat</h1>
    <input
      v-model="text"
      placeholder="在此处输入你的消息"
      type="text"
      @keyup.enter="send"
    />
    <button @click="send">发送</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
const text = ref("")
const message = ref("")

interface ChatResponse {
  choices: { message: { content: string } }[]
}

const send = async () => {
  const response = await $fetch<ChatResponse>("/api/chat/deepseek", {
    method: "POST",
    body: {
      messages: [{ role: "user", content: text.value }],
    },
  })
  message.value = response.choices[0].message.content ?? ""
}
</script>
