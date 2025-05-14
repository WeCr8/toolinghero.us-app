<template>
  <div
    id="app"
    class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <!-- 🔓 Modals (optional global modals for auth, demo, etc) -->
    <LoginRegisterModal ref="loginModalRef" />
    <GlobalAlertModal ref="alertModalRef" />

    <!-- 🔼 Scroll to top on navigation -->
    <ScrollToTop />

    <!-- 🔁 Layout with dynamic Navbar/Footer -->
    <component :is="layoutComponent">
      <SiteNavbar v-if="showNavbar" />
      <main class="flex-1">
        <router-view />
      </main>
      <SiteFooter v-if="showFooter" />
    </component>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// Shared components
import SiteNavbar from '@/components/layout/SiteNavbar.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import ScrollToTop from '@/components/util/ScrollToTop.vue'

// Modals
import LoginRegisterModal from '@/components/modals/LoginRegisterModal.vue'
import GlobalAlertModal from '@/components/modals/GlobalAlertModal.vue'

// Modal refs
const loginModalRef = ref(null)
const alertModalRef = ref(null)
provide('loginModalRef', loginModalRef)
provide('alertModalRef', alertModalRef)

// Route
const route = useRoute()

// Dynamic layout switching
const layoutComponent = computed(() => {
  const layout = route.meta.layout
  return layout === 'AuthLayout' ? AuthLayout : DefaultLayout
})

// Conditional layout parts
const showNavbar = computed(() => route.meta.showNavbar !== false)
const showFooter = computed(() => route.meta.showFooter !== false)

// Debug / analytics hook
onMounted(() => {
  console.log('✅ App mounted. Current route:', route.path)
})
</script>

<style>
html,
body {
  @apply font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-white;
  scroll-behavior: smooth;
}
</style>
