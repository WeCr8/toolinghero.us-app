<template>
  <main
    class="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    :class="{ 'opacity-50 pointer-events-none': isLocked }"
  >
    <transition name="fade">
      <div v-if="!isLoading">
        <slot />
      </div>
      <div v-else class="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <span class="animate-pulse">Loading Tooling Hero Workspace...</span>
      </div>
    </transition>
  </main>
</template>

<script setup lang="ts">
// MainContentContainer.vue – Wrapper for role-based views and modules

import { useUserSession } from '@/composables/useUserSession'

const { isLoading, isLocked } = useUserSession()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
