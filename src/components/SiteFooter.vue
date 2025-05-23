<template>
  <footer
    class="w-full bg-gray-100 dark:bg-gray-800 text-xs md:text-sm text-gray-600 dark:text-gray-300 px-4 py-3 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700"
  >
    <div class="flex items-center gap-2">
      <span>&copy; {{ currentYear }} Tooling Hero</span>
      <span class="hidden md:inline">|</span>
      <span>Built by WeCr8 Solutions LLC</span>
      <span class="hidden md:inline">|</span>
      <span :class="isSynced ? 'text-green-500' : 'text-yellow-500'">
        {{ isSynced ? 'Synced' : 'Syncing...' }}
      </span>
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
      <button @click="toggleTheme" class="ml-2 hover:underline" :aria-label="themeLabel">
        {{ themeIcon }}
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import { APP_VERSION } from '@/constants/appVersion'

const APP_VERSION = '1.3.7'

const isSynced = ref(true)
const activeSuite = 'Tooling Hero' // 🔁 Update dynamically via store later
const supportLink = 'https://www.toolinghero.us/support'
const appVersion = APP_VERSION || '1.3.7'
const currentYear = new Date().getFullYear()

const themeIcon = computed(() =>
  document.documentElement.classList.contains('dark') ? '🌖' : '🌗',
)
const themeLabel = computed(() =>
  document.documentElement.classList.contains('dark')
    ? 'Switch to light mode'
    : 'Switch to dark mode',
)

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
