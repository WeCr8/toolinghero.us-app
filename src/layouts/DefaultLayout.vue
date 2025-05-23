//DefaultLayout.vue
<template>
  <div
    class="layout-container flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <!-- 🔝 Top Navigation -->
    <SiteNavbar />

    <!-- 🔁 Routed Content -->
    <main class="flex-1 p-4 pt-20">
      <!-- pt-20 ensures content isn't hidden behind fixed navbar -->
      <slot />
    </main>

    <!-- 🔻 Footer -->
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
// ✅ Imports from actual location: src/components/
import SiteNavbar from '../components/SiteNavbar.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>
