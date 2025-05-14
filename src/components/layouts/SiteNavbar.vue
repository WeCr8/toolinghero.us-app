<template>
  <nav class="bg-white border-b px-6 py-4 shadow">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold text-blue-600">ToolingHero</router-link>
      <div class="space-x-4">
        <router-link to="/dang" class="text-gray-700 hover:text-blue-600">Launch DANG</router-link>
        <router-link to="/pricing" class="text-gray-700 hover:text-blue-600">Pricing</router-link>
        <router-link to="/docs" class="text-gray-700 hover:text-blue-600">Docs</router-link>
      </div>
    </div>
  </nav>
</template>