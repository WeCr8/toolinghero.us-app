<template>
  <section class="bg-white dark:bg-gray-900 text-center pt-24 pb-32 fade-in">
    <div class="container mx-auto px-6 space-y-24">
      <!-- 💥 Hero Section -->
      <div>
        <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          Welcome to <span class="text-blue-600">Tooling Hero</span>
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-12">
          Empowering manufacturers with smarter tooling workflows — from shop floor to digital twin.
        </p>
        <button
          @click="redirectToApp"
          class="btn-primary inline-flex items-center justify-center"
          :disabled="loading"
        >
          <span v-if="loading" class="animate-spin mr-2">🔄</span>
          <span>{{ loading ? 'Loading...' : '🚀 Start App' }}</span>
        </button>
      </div>

      <!-- ⚙️ DANG Feature Block -->
      <div
        class="bg-gray-50 dark:bg-gray-800 border border-blue-100 dark:border-blue-900 p-10 rounded-xl shadow-md max-w-3xl mx-auto text-center"
      >
        <h2 class="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">🔥 Meet DANG</h2>
        <p class="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
          <strong>DANG</strong> (Description And Naming Generator) standardizes your tooling
          language across Zoller, Mastercam, and ERP systems — cutting confusion and boosting
          productivity.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button @click="redirectToApp" class="btn-primary" :disabled="loading">
            ⚙️ Launch DANG
          </button>
          <router-link to="/about" class="btn-secondary"> 📘 Learn More </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const loginModalRef = inject<{ openLogin: () => void }>('loginModalRef')
const loading = ref(false)

const handleAuthStart = () => {
  loading.value = true
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push('/dashboard')
    } else {
      loading.value = false
      loginModalRef?.openLogin()
    }
  })
}

// Expose redirectToApp for template usage
const redirectToApp = () => {
  handleAuthStart()
}
</script>
