<template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 p-8 rounded-lg w-full max-w-sm mx-4 relative">
  
        <!-- Close Button -->
        <button @click="close" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
          <i class="fas fa-times"></i>
        </button>
  
        <!-- Toggle Between Login/Register -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-[#1B2A41] dark:text-white">
            {{ mode === 'login' ? 'Sign In' : 'Create Account' }}
          </h2>
        </div>
  
        <!-- Form -->
        <form @submit.prevent="submit">
          <div class="space-y-4">
            <input v-model="email" type="email" placeholder="Email" class="input" required />
            <input v-model="password" type="password" placeholder="Password" class="input" required />
          </div>
  
          <button type="submit" class="btn bg-[#0077B6] hover:bg-[#0096C7] mt-6">
            {{ mode === 'login' ? 'Sign In' : 'Register' }}
          </button>
  
          <p v-if="error" class="text-red-500 text-sm text-center mt-4">{{ error }}</p>
  
          <p class="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
            {{ mode === 'login' ? "Don't have an account?" : "Already have an account?" }}
            <button type="button" @click="toggleMode" class="text-blue-600 hover:underline">
              {{ mode === 'login' ? 'Register' : 'Login' }}
            </button>
          </p>
        </form>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, inject } from 'vue'
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '@/firebase/init'
  
  // Inject Toast globally
  const toastRef = inject('toastRef')
  
  const open = ref(false)
  const mode = ref('login') // 'login' or 'register'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  
  const close = () => {
    open.value = false
    email.value = ''
    password.value = ''
    error.value = ''
  }
  
  const openLogin = () => {
    mode.value = 'login'
    open.value = true
  }
  
  const openRegister = () => {
    mode.value = 'register'
    open.value = true
  }
  
  const toggleMode = () => {
    mode.value = mode.value === 'login' ? 'register' : 'login'
  }
  
  const submit = async () => {
    try {
      if (mode.value === 'login') {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        toastRef?.show('✅ Welcome back!')
      } else {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        toastRef?.show('✅ Account created!')
      }
      close()
    } catch (err) {
      console.error(err)
      error.value = err.message
    }
  }
  
  // Export for App.vue / Navbar.vue to control
  defineExpose({ open, openLogin, openRegister, close })
  </script>
  
  <style scoped>
  .input {
    @apply w-full border border-gray-300 dark:border-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0077B6];
  }
  .btn {
    @apply w-full text-white py-2 rounded font-semibold transition duration-150;
  }
  </style>
  