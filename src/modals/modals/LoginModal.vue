<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div
      class="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md border-2 border-dashed border-blue-500"
    >
      <!-- Clipboard Tab -->
      <div
        class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 w-24 h-3 rounded-t-md"
      ></div>

      <!-- Header -->
      <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        🔐 Login Required
      </h2>

      <!-- Body -->
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Please login or register to access this feature.
      </p>

      <!-- Placeholder Login Form -->
      <div class="space-y-3">
        <input
          type="email"
          placeholder="Email"
          class="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 text-sm bg-white dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          class="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 text-sm bg-white dark:bg-gray-700 dark:text-white"
        />
        <button
          class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold"
        >
          Log In
        </button>
      </div>

      <!-- Close Footer -->
      <div class="mt-4 text-right">
        <button class="text-xs text-blue-500 hover:underline" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>
