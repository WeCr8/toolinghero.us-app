<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 text-center">Login or Register</h2>
      <input v-model="email" type="email" placeholder="Email" class="input mb-2" />
      <input v-model="password" type="password" placeholder="Password" class="input mb-4" />
      <div class="flex justify-between">
        <button @click="login" class="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        <button @click="register" class="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </div>
      <button @click="close" class="mt-4 text-sm text-gray-500 hover:underline w-full text-center">
        Cancel
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const email = ref('')
const password = ref('')

function open() {
  show.value = true
}
function close() {
  show.value = false
}
function login() {
  console.log('Logging in:', email.value)
  close()
}
function register() {
  console.log('Registering:', email.value)
  close()
}

defineExpose({ open, close })
</script>

<style scoped>
.input {
  @apply w-full p-2 border border-gray-300 rounded;
}
</style>
