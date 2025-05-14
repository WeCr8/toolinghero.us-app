<template>
  <div
    id="app"
    class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <!-- 🔓 Global Modals -->
    <LoginRegisterModal ref="loginModalRef" />
    <GlobalAlertModal ref="alertModalRef" />

    <!-- 🔼 Scroll to top -->
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

<script setup lang="ts">
import { ref, computed, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// UI Shell Components
import SiteNavbar from '@/components/layouts/SiteNavbar.vue'
import SiteFooter from '@/components/layouts/SiteFooter.vue'
import ScrollToTop from '@/components/util/ScrollToTop.vue'

// Global Modals
import LoginRegisterModal from '@/components/modals/LoginRegisterModal.vue'
import GlobalAlertModal from '@/components/modals/GlobalAlertModal.vue'

// Provide modals globally
const loginModalRef = ref(null)
const alertModalRef = ref(null)
provide('loginModalRef', loginModalRef)
provide('alertModalRef', alertModalRef)

// Route control
const route = useRoute()

// Layout assignment
const layoutComponent = computed(() => {
  const layout = route.meta.layout
  return layout === 'AuthLayout' ? AuthLayout : DefaultLayout
})

// Show/hide nav/footer by route meta
const showNavbar = computed(() => route.meta.showNavbar !== false)
const showFooter = computed(() => route.meta.showFooter !== false)

// Debug or analytics
onMounted(() => {
  console.info('✅ App mounted @', route.path)
})
</script>

<style>
html,
body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: white;
  color: #1a1a1a;
  scroll-behavior: smooth;
}

body.dark {
  background-color: #111827;
  color: #f3f4f6;
}
</style>
