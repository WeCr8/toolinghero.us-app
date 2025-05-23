<template>
  <div class="flex flex-col min-h-screen pt-14">
    <!-- accounts for fixed navbar height -->
    <SiteNavbar />
    <main class="flex-grow px-4 py-6 bg-white dark:bg-gray-900">
      <router-view />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteNavbar from '@/components/SiteNavbar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>
