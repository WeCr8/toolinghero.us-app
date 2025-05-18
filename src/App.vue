<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>

    <!-- Global Modal Manager -->
    <ModalManager />
  </div>
</template>

<script setup lang="ts">
// ✅ Import the layout as you already do
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// ✅ Inject the modal system
import { provideModalManager } from '@/modals/manager/useModalManager'
provideModalManager()

// ✅ Import the modal renderer
import ModalManager from '@/modals/manager/ModalManager.vue'
</script>
