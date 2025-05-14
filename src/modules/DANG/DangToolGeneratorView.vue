<template>
  <div class="max-w-4xl mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded shadow space-y-6">
    <h1 class="text-3xl font-extrabold text-center text-[#1B2A41] dark:text-white">
      Create New <span class="text-[#0077B6]">DANG</span> Tool Naming 🔧
    </h1>

    <div class="text-center mb-6">
      <label class="block font-semibold text-lg mb-2">Naming Mode</label>
      <select v-model="namingMode" class="input">
        <option value="single">Single Component</option>
        <option value="assembly">Assembly</option>
      </select>
    </div>

    <!-- Manufacturer + EDP for Single Component -->
    <div v-if="namingMode === 'single'" class="space-y-4">
      <div>
        <label class="block font-semibold mb-1">Manufacturer</label>
        <select v-model="manufacturer" class="input">
          <option v-for="mfg in manufacturers" :key="mfg.name" :value="mfg.name">
            {{ mfg.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block font-semibold mb-1">Manufacturer EDP</label>
        <input v-model="edp" class="input" placeholder="Enter EDP #" />
      </div>

      <div>
        <label class="block font-semibold mb-1">Tool Type</label>
        <input v-model="toolType" class="input" placeholder="e.g. End Mill, Tap" />
      </div>

      <div>
        <label class="block font-semibold mb-1">Custom Description</label>
        <input v-model="customString" class="input" placeholder="e.g. 4FL 0.250 ALTiN" />
      </div>
    </div>

    <!-- Assembly Mode Fields -->
    <div v-if="namingMode === 'assembly'" class="space-y-4">
      <div>
        <label class="block font-semibold mb-1">Use Existing Single Component</label>
        <select v-model="baseComponent" class="input">
          <option v-for="tool in availableComponents" :key="tool.id" :value="tool">
            {{ tool.id }} - {{ tool.description }}
          </option>
        </select>
      </div>

      <div>
        <label class="block font-semibold mb-1">Holder Info</label>
        <input v-model="holder" class="input" placeholder="e.g. CAT40" />
      </div>

      <div>
        <label class="block font-semibold mb-1">Projection Length</label>
        <input v-model="projection" class="input" placeholder="e.g. 2.500" />
      </div>

      <div>
        <label class="block font-semibold mb-1">Grade</label>
        <input v-model="grade" class="input" placeholder="e.g. ALTiN" />
      </div>
    </div>

    <!-- Preview Results -->
    <div v-if="generatedID && generatedDescription" class="mt-6">
      <div class="bg-blue-50 dark:bg-gray-700 p-4 rounded border-l-4 border-blue-400">
        <p class="font-bold">Generated Tool ID:</p>
        <p class="font-mono">{{ generatedID }}</p>
      </div>

      <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded border-l-4 border-blue-600 mt-4">
        <p class="font-bold">Generated Description:</p>
        <p class="font-mono">{{ generatedDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import manufacturerJson from '@/modules/manufacturer-mgmt/manufacuturers.json'
import componentLibrary from '@/modules/DANG/json/SingleComponent.json'
import cncToolAssembly from '@/modules/DANG/json/cncToolAssembly.json'

const namingMode = ref('single')
const manufacturers = ref(manufacturerJson)
const manufacturer = ref('')
const edp = ref('')
const toolType = ref('')
const customString = ref('')

const baseComponent = ref(null)
const holder = ref('')
const projection = ref('')
const grade = ref('')

const availableComponents = ref([])

onMounted(() => {
  availableComponents.value = componentLibrary
})

const generatedID = computed(() => {
  if (namingMode.value === 'single') {
    const prefix = manufacturer.value.substring(0, 3).toUpperCase()
    return `${prefix}-${edp.value}`
  }
  if (namingMode.value === 'assembly' && baseComponent.value) {
    return `${baseComponent.value.id}-${holder.value}-${projection.value}`
  }
  return ''
})

const generatedDescription = computed(() => {
  if (namingMode.value === 'single') {
    return `${toolType.value} ${customString.value}`
  }
  if (namingMode.value === 'assembly' && baseComponent.value) {
    return `${baseComponent.value.description} - ${grade.value} ${holder.value} ${projection.value}PL`
  }
  return ''
})
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
