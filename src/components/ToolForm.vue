<template>
  <div class="p-6 max-w-xl mx-auto bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-4">Tooling Hero: DANG</h1>
    <input v-model="toolId" placeholder="Tool ID" class="mb-2 p-2 border rounded w-full" />
    <input v-model="description" placeholder="Description" class="mb-2 p-2 border rounded w-full" />
    <button @click="saveTool" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Save to Library
    </button>
    <p v-if="saved" class="text-green-600 mt-2">✅ Tool Saved!</p>
  </div>
</template>

<script>
import { db } from '@/firebase/init'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'vue'

export default {
  name: 'ToolForm',
  setup() {
    const toolId = ref('')
    const description = ref('')
    const saved = ref(false)

    const saveTool = async () => {
      await addDoc(collection(db, 'tools'), {
        toolId: toolId.value,
        description: description.value,
        createdAt: new Date()
      })
      saved.value = true
    }

    return { toolId, description, saveTool, saved }
  }
}
</script>