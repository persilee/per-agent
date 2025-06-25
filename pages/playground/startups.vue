<script setup lang="ts">
import type { Startup } from '~/database/schema'

const list = ref<Startup[]>([])

const fetchStartups = async () => {
  try {
    const data = await $fetch<Startup[]>('/api/playground/startups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    list.value = data
  } catch (error) {
    console.error('Error fetching startups:', error)
  }
}

onMounted(() => {
  fetchStartups()
})

const edit = ref<Startup | null>(null)

const updateStartup = async (startup: Startup) => {
  try {
    const data = await $fetch<Startup>(`/api/playground/startups`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: edit.value,
    })
    const index = list.value.findIndex((s) => s.id === data.id)
    if (index !== -1) {
      list.value[index] = data
    }
    edit.value = null
  } catch (error) {
    console.error('Error updating startup:', error)
  }
}

const deleteStartup = async (id: string) => {
  try {
    await $fetch(`/api/playground/startups?id=${id}`, {
      method: 'DELETE',
      query: { id },
    })
    await fetchStartups() // Refresh the list after deletion
  } catch (error) {
    console.error('Error deleting startup:', error)
  }
}
</script>

<template>
  <div style="padding: 32px">
    <h1 class="text-2xl font-bold mb-4">Startups List</h1>

    <ul class="list-disc pl-5">
      <li v-for="startup in list" :key="startup.id" class="mb-2">
        <strong>{{ startup.name }}</strong
        >: {{ startup.description }}
        <button
          @click="edit = startup"
          class="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          @click="deleteStartup(startup.id)"
          class="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </li>
    </ul>
    <div v-if="edit">
      <h1>Edit</h1>
      <input
        type="text"
        v-model="edit.name"
        placeholder="Startup Name"
        class="p-2 border rounded mb-2 w-full"
      />
      <br />
      <textarea
        v-model="edit.description"
        placeholder="Startup Description"
        class="p-2 border rounded mb-2 w-full"
      ></textarea>
      <button
        @click="updateStartup(edit)"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Startup
      </button>
    </div>
    <p v-if="list.length === 0" class="text-gray-500">
      No startups found. Click "Fetch Startups" to load the list.
    </p>
  </div>
</template>
