<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- 🔝 Global Navbar -->
    <Navbar />

    <!-- 📦 Main Content Area -->
    <main class="flex-1 pt-16">
      <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <!-- 📌 Optional Footer Slot -->
    <footer v-if="$slots.footer" class="mt-8">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/layouts/SiteNavbar.vue'
import SiteFooter from '@/components/layouts/SiteFooter.vue'

// Optional: Use the SiteFooter component if you have a footer slot
// if ($slots.footer) {
//   <SiteFooter />
// }
//   loading.value = false
// }
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       router.push('/dashboard')
//     } else {
//       loading.value = false
//       loginModalRef?.openLogin()
//     }
//   })
// }

// Optional head support
// import { useHead } from '@vueuse/head'
// useHead({ title: 'Tooling Hero – Default Layout' })
</script>
