<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Global Layout -->
    <DefaultLayout>
      <router-view />
    </DefaultLayout>

    <!-- Global Modal Renderer -->
    <ModalManager />
  </div>
</template>

<script setup lang="ts">
// ✅ Layout
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// ✅ Modal system injection
import { provideModalManager } from '@/modals/manager/useModalManager'
provideModalManager()

// ✅ Modal renderer
import ModalManager from '@/modals/manager/ModalManager.vue'
</script>
