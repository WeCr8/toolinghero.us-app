<template>
  <router-link
    :to="route"
    class="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition block text-left"
  >
    <div class="text-3xl mb-2">{{ icon }}</div>
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-1">{{ title }}</h3>
    <p class="text-sm text-gray-600 dark:text-gray-300">{{ description }}</p>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  route: string
}>()
</script>
<style scoped>
