<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </div>
</template>

<script setup lang="ts">
// ✅ Only import layouts here. Leave SiteNavbar/Footer inside the layout file.
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
