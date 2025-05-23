<template>
  <div class="max-w-4xl mx-auto py-10 space-y-6">
    <component :is="currentStepComponent" @next="nextStep" @back="prevStep" v-model="dangData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Import each step component
import DangStepSelectCondition from './DangStepSelectCondition.vue'
import DangStepUploadReceipt from './DangStepUploadReceipt.vue'
import DangStepPhotoAI from './DangStepPhotoAI.vue'
import DangStepPowerSource from './DangStepPowerSource.vue'
import DangStepSummary from './DangStepSummary.vue'
import DangConfirm from './DangConfirm.vue'

const steps = [
  DangStepSelectCondition,
  DangStepUploadReceipt,
  DangStepPhotoAI,
  DangStepPowerSource,
  DangStepSummary,
  DangConfirm,
]

const stepIndex = ref(0)
const dangData = ref({
  condition: null,
  receipt: null,
  photo: null,
  powerSource: null,
  summary: null,
})

const currentStepComponent = computed(() => steps[stepIndex.value])

function nextStep() {
  if (stepIndex.value < steps.length - 1) stepIndex.value++
}

function prevStep() {
  if (stepIndex.value > 0) stepIndex.value--
}
</script>
