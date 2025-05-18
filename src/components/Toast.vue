<template>
    <div>
      <!-- Global Toast -->
      <Toast ref="toastRef" />
  
      <!-- Global Login/Register Modal -->
      <LoginRegisterModal ref="loginModalRef" />
  
      <!-- Dynamic Layouts -->
      <component :is="layoutComponent">
        <router-view />
      </component>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, provide } from 'vue'
  import { useRoute } from 'vue-router'
  
  // Layouts
  import DefaultLayout from '@/layouts/DefaultLayout.vue'
  import AuthLayout from '@/layouts/AuthLayout.vue'
  import MarketingLayout from '@/layouts/MarketingLayout.vue'
  
  // Components
  import LoginRegisterModal from '@/components/LoginRegisterModal.vue'
  import Toast from '@/components/Toast.vue'
  
  const route = useRoute()
  
  const loginModalRef = ref(null)
  const toastRef = ref(null)
  
  // Provide both to children
  provide('loginModalRef', loginModalRef)
  provide('toastRef', toastRef)
  
  // Dynamically select layout
  const layoutComponent = computed(() => {
    const layout = route.meta.layout
    return layout === 'AuthLayout'
      ? AuthLayout
      : layout === 'MarketingLayout'
      ? MarketingLayout
      : DefaultLayout
  })
  </script>
  