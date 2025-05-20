<template>
  <div class="min-h-screen px-4 py-12 max-w-6xl mx-auto space-y-10">
    <!-- Team Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">🛠 Team Dashboard</h1>
        <p class="text-sm text-gray-500 dark:text-gray-300">Welcome, {{ user?.email }}</p>
      </div>
      <div v-if="isAdmin" class="text-sm text-green-600 font-semibold">Admin Mode</div>
    </div>

    <!-- Modules by Tier -->
    <section>
      <h2 class="text-xl font-semibold text-blue-600 mb-2">Available Modules</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="mod in availableModules"
          :key="mod.name"
          class="p-4 rounded-lg border shadow hover:shadow-md bg-white dark:bg-gray-800"
        >
          <h3 class="text-lg font-bold">{{ mod.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ mod.description }}</p>
          <span class="text-xs text-blue-500">Tier: {{ mod.tier }}</span>
        </div>
      </div>
    </section>

    <!-- Tool Library Access -->
    <section>
      <h2 class="text-xl font-semibold text-blue-600 mb-2">Shared Tool Library</h2>
      <p class="text-sm text-gray-500 dark:text-gray-300 mb-4">
        Team-wide saved tools and assemblies.
      </p>
      <button class="btn-primary" @click="goToLibrary">📂 Open Library</button>
    </section>

    <!-- Admin Controls -->
    <section v-if="isAdmin">
      <h2 class="text-xl font-semibold text-blue-600 mb-2">Admin Controls</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button class="btn-secondary" @click="manageUsers">👥 Manage Users</button>
        <button class="btn-secondary" @click="reviewApprovals">✅ Review Approvals</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const user = ref(auth.currentUser)
const isAdmin = ref(false)
const availableModules = ref<{ name: string; description: string; tier: string }[]>([])

const goToLibrary = () => {
  router.push('/library')
}

const manageUsers = () => {
  router.push('/team-dashboard/users')
}

const reviewApprovals = () => {
  router.push('/team-dashboard/approvals')
}

onMounted(async () => {
  if (!user.value) return

  const userRef = doc(db, 'users', user.value.uid)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    const data = userSnap.data()
    isAdmin.value = data.role === 'admin' || data.teamRole === 'leader'
    availableModules.value = data.modules || [
      { name: 'DANG Tool Generator', description: 'Standardize your tool naming.', tier: 'Core' },
      { name: 'Tool Library', description: 'Centralized team library.', tier: 'Core' },
      { name: 'Approval Queue', description: 'Review team submissions.', tier: 'Pro' },
    ]
  }
})
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700;
}
.btn-secondary {
  @apply bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded font-medium hover:bg-gray-200 dark:hover:bg-gray-600;
}
</style>
