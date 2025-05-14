<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseSection from '@/components/BaseSection.vue'
</script>

<template>
  <BaseSection variant="light" align="center" padding="xl">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-5xl font-extrabold text-heading mb-6">404 – Page Not Found</h1>
      <p class="text-lg text-muted mb-6">
        Oops! The page you're looking for doesn't exist, was moved, or never existed at all.
      </p>
      <RouterLink to="/" class="cta inline-block"> Return to Homepage </RouterLink>
    </div>
  </BaseSection>
</template>

<style scoped>
.cta {
  background: var(--color-accent);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.cta:hover {
  background-color: #d9481f;
}
</style>
