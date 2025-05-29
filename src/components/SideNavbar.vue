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
      <NavItem icon="…" label="DANG" to="/dang" aria-label="DANG" />
      <NavItem icon="🧩" label="Modules" to="/modules" aria-label="Modules" />
      <NavItem icon="📚" label="Library" to="/library" aria-label="Library" />
      <NavItem icon="💼" label="Jobs" to="/jobs" aria-label="Jobs" />
      <NavItem icon="📅" label="Schedule" to="/schedule" aria-label="Schedule" />
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import NavItem from './NavItem.vue'
import useUserSession from '@/composables/useUserSession'

// Example: Only show admin links if user is admin
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

<!-- Add this for global registration if you want to use <SideNavbar /> in App.vue -->
<!-- Or, import SideNavbar in App.vue directly and register it there -->
