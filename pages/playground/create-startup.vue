<script setup lang="ts">
const name = ref('')
const description = ref('')

const reset = () => {
  name.value = ''
  description.value = ''
}

const createStartup = async () => {
  try {
    const data = await $fetch('/api/playground/startups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: name.value,
        description: description.value,
      },
    })

    console.log('Startup created:', data)
    reset()
  } catch (error) {
    console.error('Error creating startup:', error)
  }
}
</script>

<template>
  <div style="padding: 32px">
    <h1>Create Startup</h1>
    <form @submit.prevent="createStartup">
      <input
        type="text"
        v-model="name"
        placeholder="Startup Name"
        required
        class="p-2 border rounded mb-4 w-full"
      />
      <textarea
        v-model="description"
        placeholder="Startup Description"
        class="p-2 border rounded mb-4 w-full"
      ></textarea>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Startup
      </button>
      <button
        type="button"
        class="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        @click="reset"
      >
        Reset
      </button>
    </form>
  </div>
</template>
