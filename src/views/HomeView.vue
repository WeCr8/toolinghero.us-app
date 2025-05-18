<template>
  <section class="bg-white dark:bg-gray-900 text-center pt-24 pb-32 fade-in">
    <div class="container mx-auto px-6">
      <!-- Hero Heading -->
      <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
        Welcome to <span class="text-blue-600">Tooling Hero</span>
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-12">
        Empowering manufacturers with smarter tooling workflows — from shop floor to digital twin.
      </p>

      <!-- Start App -->
      <div class="mb-20">
        <button
          @click="handleAuthStart"
          class="btn-primary inline-flex items-center justify-center"
          :disabled="loading"
        >
          <span v-if="loading" class="animate-spin mr-2">🔄</span>
          <span>{{ loading ? 'Loading...' : '🚀 Start App' }}</span>
        </button>
      </div>

      <!-- DANG Feature Block -->
      <div
        class="bg-gray-50 dark:bg-gray-800 border border-blue-100 dark:border-blue-900 p-10 rounded-xl shadow-md max-w-3xl mx-auto text-left"
      >
        <h2 class="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4 text-center">
          🔥 Meet DANG
        </h2>
        <p class="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed text-center">
          <strong>DANG</strong> (Description And Naming Generator) standardizes your tooling
          language across Zoller, Mastercam, and ERP systems — cutting confusion and boosting
          productivity.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button @click="handleAuthStart" class="btn-primary" :disabled="loading">
            ⚙️ Launch DANG
          </button>
          <router-link to="/about" class="btn-secondary"> 📘 Learn More </router-link>
        </div>
      </div>
    </div>

    <footer class="text-center text-sm text-gray-400 mt-24">
      © 2025 Tooling Hero by WeCr8 Solutions · All rights reserved
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const loginModalRef = inject('loginModalRef')
const loading = ref(false)

const handleAuthStart = () => {
  const auth = getAuth()
  loading.value = true

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push('/dashboard')
    } else {
      loading.value = false
      loginModalRef?.openLogin()
    }
  })
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.8s ease-in-out both;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply border border-blue-500 text-blue-600 dark:text-blue-300 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-200;
}
</style>
