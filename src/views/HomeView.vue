//Homeiew.vue
<template>
  <section class="pt-24 pb-12 px-6 sm:px-12 bg-white dark:bg-gray-900 min-h-screen fade-in">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">
        🛠 Tooling Hero Modules
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <ModuleCard
          icon="⚙️"
          title="DANG Generator"
          description="Generate standardized, AI-powered descriptions and IDs for new and used tooling."
          route="/dang"
        />
        <ModuleCard
          icon="📊"
          title="DARN Tracker"
          description="Track usage, check-in/out logs, and lifecycle history with BLE/RFID support."
          route="/darn"
        />
        <ModuleCard
          icon="📦"
          title="Tool Library"
          description="Access your entire tool database, filter by suite, and manage asset tags."
          route="/library"
        />
        <ModuleCard
          icon="🔗"
          title="Blockchain Records"
          description="View and verify Arweave & VeChain digital twins and audit records."
          route="/blockchain"
        />
        <ModuleCard
          icon="📁"
          title="Import Tool Data"
          description="Connect to MachiningCloud or CSV import to accelerate onboarding."
          route="/import"
        />
        <ModuleCard
          icon="🔐"
          title="Admin Settings"
          description="User roles, suites, billing, and API access (Enterprise only)."
          route="/settings"
          v-if="user?.role === 'admin'"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ModuleCard from '@/components/dashboard/ModuleCard.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

interface AppUser {
  uid: string
  email: string
  role?: string // Extend this if you load roles from Firestore
}

const user = ref<AppUser | null>(null)
let unsubscribe: (() => void) | null = null

onMounted(() => {
  const auth = getAuth()
  unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        // Optionally merge Firestore profile here
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe?.()
})
</script>
