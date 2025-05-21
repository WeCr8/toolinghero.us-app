<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible && component" class="modal-overlay">
        <component :is="component" v-bind="props ?? {}" @close="close" @confirm="onConfirm" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { inject, type Ref, type Component } from 'vue'

// Props structure passed to modals
interface ModalProps {
  onConfirm?: () => void
  [key: string]: unknown
}

// Inject modal state and actions from the modal provider
const visible = inject<Ref<boolean>>('modalVisible')
const component = inject<Ref<Component | null>>('modalComponent')
const props = inject<Ref<ModalProps>>('modalProps')
const close = inject<() => void>('closeModal')

// Handles confirm logic and closes the modal if needed
const onConfirm = () => {
  const confirmFn = props?.value?.onConfirm
  if (typeof confirmFn === 'function') confirmFn()
  close?.()
}
</script>
