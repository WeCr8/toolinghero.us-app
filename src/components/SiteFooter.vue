<template>
  <footer
    class="w-full bg-gray-100 dark:bg-gray-800 text-xs md:text-sm text-gray-600 dark:text-gray-300 px-4 py-3 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700"
  >
    <div class="flex items-center gap-2">
      <span>&copy; 2025 Tooling Hero</span>
      <span class="hidden md:inline">|</span>
      <span>Built by WeCr8 Solutions LLC</span>
      <span class="hidden md:inline">|</span>
      <span class="text-green-500" v-if="isSynced">Synced</span>
      <span class="text-yellow-500" v-else>Syncing...</span>
    </div>

    <div class="flex items-center gap-3 mt-2 md:mt-0">
      <span class="italic text-blue-600 dark:text-blue-300">{{ activeSuite }}</span>
      <a
        :href="supportLink"
        target="_blank"
        rel="noopener"
        class="hover:underline text-blue-500 dark:text-blue-300"
      >
        Support
      </a>
      <span>|</span>
      <span>v{{ appVersion }}</span>
      <button @click="toggleTheme" class="ml-2 hover:underline">🌗</button>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Props or composables could drive these dynamically
import { ref } from 'vue'

const isSynced = ref(true)
const activeSuite = 'Construction Hero' // Could be dynamic via store
const supportLink = 'https://toolinghero.us/support'
const appVersion = '1.3.7'

function toggleTheme() {
  const html = document.documentElement
  html.classList.toggle('dark')
}
</script>

<style scoped>
footer {
  font-family: 'Inter', sans-serif;
}
</style>
