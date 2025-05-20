<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div
      class="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md border-2 border-dashed border-red-500"
    >
      <!-- Clipboard Tab -->
      <div
        class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 w-24 h-3 rounded-t-md"
      ></div>

      <!-- Header -->
      <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
        ⚠️ {{ title || 'Please Confirm' }}
      </h2>

      <!-- Body -->
      <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
        {{ message }}
      </p>

      <!-- Footer -->
      <div class="mt-6 flex justify-end gap-3">
        <button
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded"
          @click="$emit('confirm')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  title?: string
}>()
</script>
