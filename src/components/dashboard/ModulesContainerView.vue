<template>
  <aside class="h-screen w-20 lg:w-64 bg-[#000B19] text-white flex flex-col items-center py-6 shadow-lg">
    <!-- Logo -->
    <div class="mb-10">
      <img src="/logo.png" alt="Tooling Hero" class="h-12 lg:h-16" />
      <p class="text-xs text-center mt-2 text-[#f5f5f5]">
        <span class="block font-bold">Tooling</span>
        <span class="block">Hero</span>
        <span class="block text-[10px] text-yellow-400">a ZOLLER company</span>
      </p>
    </div>

    <!-- Nav Items -->
    <nav class="flex flex-col gap-6 w-full px-2" aria-label="Main Navigation">
      <NavItem
        v-for="item in filteredNavItems"
        :key="item.label"
        :icon="item.icon"
        :label="item.label"
        :to="item.to"
        :aria-label="item.label"
      />
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import NavItem from './NavItem.vue'
import useUserSession from '@/composables/useUserSession'

// Only show nav items the user is allowed to see
const { user } = useUserSession()
const navItems = computed(() => [
  { icon: '…', label: 'DANG', to: '/dang', roles: ['user', 'admin'] },
  { icon: '🧩', label: 'Modules', to: '/modules', roles: ['user', 'admin'] },
  { icon: '📚', label: 'Library', to: '/library', roles: ['user', 'admin'] },
  { icon: '💼', label: 'Jobs', to: '/jobs', roles: ['user', 'admin'] },
  { icon: '📅', label: 'Schedule', to: '/schedule', roles: ['user', 'admin'] },
  // Example admin-only item:
  // { icon: '🔒', label: 'Admin', to: '/admin', roles: ['admin'] },
])
const filteredNavItems = computed(() => navItems.value.filter(item => !item.roles || item.roles.includes(user.value?.role)))
</script>
