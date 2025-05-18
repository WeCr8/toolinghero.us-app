<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div
      class="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md border-2 border-dashed border-blue-500"
    >
      <!-- Clipboard Top Tab -->
      <div
        class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 w-24 h-3 rounded-t-md"
      ></div>

      <!-- Modal Header -->
      <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
        📋 {{ title }}
      </h2>

      <!-- Modal Body -->
      <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
        {{ description }}
      </p>

      <!-- Modal Footer -->
      <div class="mt-6 text-right">
        <button
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
          @click="$emit('close')"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props expected from modal injection
defineProps<{
  title: string
  description: string
}>()
</script>
