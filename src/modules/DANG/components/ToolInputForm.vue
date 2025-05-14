<template>
  <div class="space-y-4">
    <div v-for="field in fields" :key="field">
      <label class="block text-sm font-medium mb-1">
        {{ field }}
        <span class="text-gray-400 text-xs">{{ unit === 'imperial' ? '(in)' : '(mm)' }}</span>
      </label>
      <input v-model="model[field]" class="input" :placeholder="`Enter ${field}`" />
    </div>
  </div>
</template>

<script setup>
defineProps(['fields', 'unit', 'model'])
</script>
