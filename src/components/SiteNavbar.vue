<template>
  <nav
    class="bg-white dark:bg-gray-900 shadow-md flex items-center justify-between px-4 py-2 fixed top-0 inset-x-0 z-50"
  >
    <!-- Left: Hamburger -->
    <button
      @click="$emit('toggleDrawer')"
      aria-label="Toggle menu"
      class="text-xl text-gray-700 dark:text-gray-200 sm:hidden"
    >
      ☰
    </button>

    <!-- Center: Logo (Home Link) -->
    <router-link to="/" class="absolute left-1/2 transform -translate-x-1/2" aria-label="Home">
      <img :src="logoUrl" alt="Tooling Hero Logo" class="h-8" />
    </router-link>

    <!-- Right: Navigation & Auth -->
    <div class="flex items-center gap-2 sm:gap-4">
      <!-- Navigation Buttons -->
      <router-link
        to="/DangView"
        class="text-sm px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded hidden sm:inline"
      >
        ⚙️ DANG
      </router-link>
      <router-link
        to="/library"
        class="text-sm px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 rounded hidden sm:inline"
      >
        📂 Library
      </router-link>

      <!-- Authenticated User Dropdown -->
      <div v-if="user" class="relative" ref="dropdownRef">
        <button
          @click="toggleDropdown"
          class="text-gray-700 dark:text-gray-200 flex items-center gap-1 text-sm font-medium"
          aria-haspopup="true"
          :aria-expanded="dropdownOpen"
        >
          <i class="fas fa-user-circle text-xl"></i>
          <span class="hidden sm:inline">Account</span>
        </button>

        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-lg z-50"
        >
          <router-link
            to="/dashboard"
            class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            🏠 Dashboard
          </router-link>
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <!-- Guest Login -->
      <button
        v-else
        @click="openLogin"
        class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded shadow"
      >
        🔐 Login / Register
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged, signOut, getAuth, type User } from 'firebase/auth'

const router = useRouter()
const logoUrl = '/logo.png'

const user = ref<User | null>(null)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const loginModalRef = inject<{ openLogin: () => void }>('loginModalRef')

const openLogin = () => loginModalRef?.openLogin?.()
const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value)
const closeDropdown = () => (dropdownOpen.value = false)

const logout = async () => {
  await signOut(getAuth())
  user.value = null
  closeDropdown()
  router.push('/')
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeDropdown()
}

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownOpen.value && dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })

  document.addEventListener('keydown', handleEscape)
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>
