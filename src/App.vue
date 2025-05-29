<template>
  <div class="flex">
    <SideNavbar />
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
    <ModalManager />
  </div>
</template>

<script setup lang="ts">
import SideNavbar from '@/components/SideNavbar.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ModalManager from '@/modals/manager/ModalManager.vue'
</script>
