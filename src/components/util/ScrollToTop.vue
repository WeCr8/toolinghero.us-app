<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" @route-change="scrollToTop" />
    </transition>
  </RouterView>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  watch(route, () => scrollToTop(), { immediate: true })
})
</script>
