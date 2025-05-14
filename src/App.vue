<template>
  <div>
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()
const layoutComponent = computed(() => {
  const layout = route.meta.layout
  return layout === 'AuthLayout' ? AuthLayout : DefaultLayout
})
</script>
