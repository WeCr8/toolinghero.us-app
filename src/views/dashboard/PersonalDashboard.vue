<template>
  <div class="min-h-screen px-6 py-12 max-w-4xl mx-auto space-y-10">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">👤 Personal Dashboard</h1>
        <p class="text-sm text-gray-500 dark:text-gray-300">Welcome back, {{ user?.email || 'User' }}</p>
      </div>
      <span class="text-sm font-semibold text-blue-600 capitalize">Tier: {{ tier }}</span>
    </div>

    <!-- Available Modules -->
    <section>
      <h2 class="text-xl font-semibold text-blue-600 mb-3">Your Available Modules</h2>

      <div v-if="availableModules.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="mod in availableModules"
          :key="mod.name"
          class="p-4 rounded-lg border shadow hover:shadow-md bg-white dark:bg-gray-800 transition-all duration-200"
        >
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ mod.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ mod.description }}</p>
          <span class="text-xs text-blue-500">Tier: {{ mod.tier }}</span>
        </div>
      </div>

      <div v-else class="text-sm text-gray-500 dark:text-gray-400 italic">
        You currently have no modules enabled. Please contact support or upgrade your account.
      </div>
    </section>

    <!-- Upgrade Prompt -->
    <section>
      <h2 class="text-xl font-semibold text-blue-600 mb-2">Need More Features?</h2>
      <p class="text-sm text-gray-500 dark:text-gray-300 mb-4">
        Upgrade to Pro or Enterprise tiers for full access to all modules, AI tools, and automation features.
      </p>
      <button class="btn-primary" @click="goToUpgrade">🚀 Explore Upgrade Options</button>
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
const tier = ref('Core')
const availableModules = ref<{ name: string; description: string; tier: string }[]>([])

const defaultModules = [
  {
    name: 'DANG Tool Generator',
    description: 'Create naming conventions for CNC tooling.',
    tier: 'Core',
  },
  {
    name: 'Tool Library',
    description: 'Personal tool library tracking.',
    tier: 'Core',
  },
]

const goToUpgrade = () => router.push('/account/upgrade')

onMounted(async () => {
  if (!user.value) return

  const userRef = doc(db, 'users', user.value.uid)
  const snap = await getDoc(userRef)

  if (snap.exists()) {
    const data = snap.data()
    tier.value = data.tier || 'Core'
    availableModules.value = data.modules?.length ? data.modules : defaultModules
  } else {
    availableModules.value = defaultModules
  }
})
</script>

<style scoped>
.btn-primary {
  @apply bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition;
}
</style>