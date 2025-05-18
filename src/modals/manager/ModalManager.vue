<template>
  <Teleport to="body">
    <component
      v-if="visible && component"
      :is="component"
      v-bind="props"
      @close="close"
      @confirm="onConfirm"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const visible = inject('modalVisible')!
const component = inject('modalComponent')!
const props = inject('modalProps')!
const close = inject('closeModal')!

const onConfirm = () => {
  if (props.onConfirm && typeof props.onConfirm === 'function') {
    props.onConfirm()
  }
  close()
}
</script>
