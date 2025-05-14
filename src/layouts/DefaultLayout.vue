<template>
  <div class="min-h-screen flex flex-col">
    <SiteNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteNavbar from '@/components/layout/SiteNavbar.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>
