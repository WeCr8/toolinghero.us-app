<template>
  <Teleport to="body">
    <component
      v-if="visible && component"
      :is="component"
      v-bind="props ?? {}"
      @close="close"
      @confirm="onConfirm"
    />
  </Teleport>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { inject, Ref } from 'vue'

// Define a shape for modal props (flexible yet typed)
interface ModalProps {
  onConfirm?: () => void
  [key: string]: unknown
}

// Inject modal state and actions with proper types
const visible = inject<Ref<boolean>>('modalVisible')
const component = inject<Ref<Component | null>>('modalComponent')
const props = inject<Ref<ModalProps>>('modalProps')
const close = inject<() => void>('closeModal')

// Safely handle confirm logic
const onConfirm = () => {
  const confirmFn = props?.value?.onConfirm
  if (typeof confirmFn === 'function') {
    confirmFn()
  }
  close?.()
}
</script>
