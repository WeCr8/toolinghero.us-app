<template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div class="bg-white dark:bg-gray-900 p-8 rounded-lg max-w-md w-full relative shadow-lg transition-all duration-300">
  
        <!-- Close Button -->
        <button
          @click="close"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
          aria-label="Close"
        >
          <i class="fas fa-times"></i>
        </button>
  
        <!-- Modal Header -->
        <div class="text-center mb-6">
          <h2 class="text-3xl font-extrabold text-[#1B2A41] dark:text-white">
            🎯 Request a Demo
          </h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Let's help you streamline your tooling workflow!
          </p>
        </div>
  
        <!-- Form -->
        <form @submit.prevent="submit" class="space-y-4">
          <input v-model="name" type="text" placeholder="Your Name" class="input" required />
          <input v-model="email" type="email" placeholder="Your Email" class="input" required />
          <textarea v-model="message" placeholder="Tell us what you're looking for..." class="input h-24" required></textarea>
  
          <button type="submit" class="btn bg-[#0077B6] hover:bg-[#0096C7] mt-4">
            📩 Send Request
          </button>
  
          <p v-if="success" class="text-green-600 text-sm text-center mt-4">{{ success }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const open = ref(false)
  const name = ref('')
  const email = ref('')
  const message = ref('')
  const success = ref('')
  
  const openModal = () => {
    open.value = true
  }
  const close = () => {
    open.value = false
    name.value = ''
    email.value = ''
    message.value = ''
    success.value = ''
  }
  
  const submit = () => {
    // Here you could eventually hook this to Firestore, Sendgrid API, or your own webhook
    success.value = '✅ Request sent successfully! We will contact you shortly.'
    setTimeout(close, 2500)
  }
  
  defineExpose({ open: openModal, close })
  </script>
  
  <style scoped>
  .input {
    @apply w-full border border-gray-300 dark:border-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0077B6];
  }
  .btn {
    @apply w-full text-white py-2 rounded font-semibold transition duration-150;
  }
  </style>
  