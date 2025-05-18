<template>
  <nav
    class="bg-white dark:bg-gray-900 shadow-md flex items-center justify-between px-4 py-2 fixed top-0 inset-x-0 z-50"
  >
    <!-- Left: Menu -->
    <button
      @click="$emit('toggleDrawer')"
      class="text-xl text-gray-700 dark:text-gray-200 sm:hidden"
    >
      ☰
    </button>

    <!-- Center: Logo -->
    <router-link to="/" class="absolute left-1/2 transform -translate-x-1/2">
      <img :src="logoUrl" alt="Logo" class="h-8" />
    </router-link>

    <!-- Right: Links -->
    <div class="flex items-center gap-2">
      <router-link
        to="/create"
        class="text-sm px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded hidden sm:inline"
      >
        🧰 Create Tool
      </router-link>
      <router-link
        to="/library"
        class="text-sm px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded hidden sm:inline"
      >
        📂 Library
      </router-link>
      <router-link
        to="/login"
        class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded shadow"
      >
        Start App
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
// ✅ Hardcoded fallback for public logo path
const logoUrl = '/logo.png'
</script>

<style scoped>
nav {
  height: 56px;
}
</style>
