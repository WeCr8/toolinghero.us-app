<template>
  <div>
    <!-- Global Modals -->
    <LoginRegisterModal ref="loginModalRef" />
    <DemoModal ref="demoModalRef" />

    <!-- Dynamic Layouts -->
    <component :is="layoutComponent">
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { computed, ref, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase/init'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MarketingLayout from '@/layouts/MarketingLayout.vue'

// Modals
import LoginRegisterModal from '@/components/modals/LoginRegisterModal.vue'
import DemoModal from '@/components/modals/DemoModal.vue'

// Provide modal refs globally
const loginModalRef = ref(null)
const demoModalRef = ref(null)
provide('loginModalRef', loginModalRef)
provide('demoModalRef', demoModalRef)

// Router-based layout switching
const route = useRoute()
const layoutComponent = computed(() => {
  const layout = route.meta.layout
  return layout === 'AuthLayout'
    ? AuthLayout
    : layout === 'MarketingLayout'
      ? MarketingLayout
      : DefaultLayout
})

// Optional: persist login
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('✅ User signed in:', user.email)
    } else {
      console.log('🚪 No user signed in')
    }
  })
})
</script>

<style>
body {
  @apply bg-gray-100 text-gray-900 font-sans;
}
</style>
