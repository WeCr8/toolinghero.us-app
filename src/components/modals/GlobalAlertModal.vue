<template>
  <div
    v-if="visible"
    class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded shadow-lg z-50"
  >
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')

function showAlert(msg: string) {
  message.value = msg
  visible.value = true
  setTimeout(() => (visible.value = false), 3000)
}

defineExpose({ showAlert })
</script>
