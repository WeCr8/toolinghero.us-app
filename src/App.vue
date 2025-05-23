//app.vue
<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
  <ModalManager />
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
//import ModalManager from '@/modals/manager/ModalManager.vue'
// If you're using a global modal system:
// import { provideModalManager } from '@/modals/manager/useModalManager'
// provideModalManager()
</script>
