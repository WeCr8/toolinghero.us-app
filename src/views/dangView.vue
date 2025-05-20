<template>
  <div class="max-w-4xl mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded shadow space-y-6">
    <h1 class="text-3xl font-extrabold text-center text-[#1B2A41] dark:text-white">
      DANG – <span class="text-[#0077B6]">Tool Assembly</span> Generator 🔧
    </h1>

    <p class="text-sm text-gray-500 dark:text-gray-300 text-center">
      Generate standardized Tool ID & Description using Tool Assembly format.
    </p>

    <!-- Tool Type Dropdown -->
    <div>
      <label class="block font-semibold mb-1">Tool Type</label>
      <select v-model="selectedToolName" class="input">
        <option value="" disabled>Select a tool</option>
        <option v-for="tool in toolDefinitions" :key="tool.tool_name" :value="tool.tool_name">
          [{{ tool.abbreviation }}] {{ tool.tool_name }}
        </option>
      </select>
    </div>

    <!-- Unit Toggle + Abbreviation -->
    <div v-if="activeTool" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block font-semibold mb-1">Tool Abbreviation</label>
        <input :value="activeTool.abbreviation" class="input bg-gray-100" disabled />
      </div>
      <div>
        <label class="block font-semibold mb-1">Unit System</label>
        <div class="flex gap-2">
          <button :class="unit === 'imperial' ? activeBtn : inactiveBtn" @click="unit = 'imperial'">
            Inch (in)
          </button>
          <button :class="unit === 'metric' ? activeBtn : inactiveBtn" @click="unit = 'metric'">
            Metric (mm)
          </button>
        </div>
      </div>
    </div>

    <!-- Dynamic Fields -->
    <div v-if="activeTool" class="space-y-4 mt-4">
      <div v-for="field in activeTool.fields" :key="field">
        <label class="block text-sm font-medium mb-1">
          {{ field }}
          <span class="text-gray-400 text-xs">{{ unit === 'imperial' ? '(in)' : '(mm)' }}</span>
        </label>
        <input v-model="fieldValues[field]" class="input" :placeholder="`Enter ${field}`" />
      </div>
    </div>

    <!-- ID + Description Output -->
    <div v-if="generatedDescription" class="preview-box">
      <p class="label">Generated Description:</p>
      <p class="value">{{ generatedDescription }}</p>
    </div>

    <div v-if="generatedToolID" class="preview-box-alt">
      <p class="label">Generated Tool ID:</p>
      <p class="value">{{ generatedToolID }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import toolDefinitionsJson from '@/modules/DANG/json/cncToolAssembly.json'

interface ToolDefinition {
  tool_name: string
  abbreviation: string
  description_formula: string
  fields: string[]
  unit: 'imperial' | 'metric'
  enabled: boolean
}

const toolDefinitions = ref<ToolDefinition[]>(
  toolDefinitionsJson.tool_definitions.map((tool: unknown) => {
    const t = tool as {
      tool_name: string
      abbreviation: string
      description_formula: string
      fields: string[]
      unit: string
      enabled: boolean
    }
    return {
      ...t,
      unit: t.unit === 'imperial' ? 'imperial' : 'metric',
    }
  }),
)
const selectedToolName = ref('')
const fieldValues = ref<Record<string, string>>({})
const unit = ref<'imperial' | 'metric'>('imperial')

// UI classes
const activeBtn = 'bg-blue-600 text-white px-2 py-1'
const inactiveBtn = 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-2 py-1'

// Active Tool Selection
const activeTool = computed(() => {
  return toolDefinitions.value.find((tool) => tool.tool_name === selectedToolName.value)
})

// Dynamic Description
const generatedDescription = computed(() => {
  if (!activeTool.value) return ''
  let desc = activeTool.value.description_formula
  desc = desc.replaceAll('{Tool Type Abbreviation}', activeTool.value.abbreviation)

  for (const field of activeTool.value.fields) {
    let value = fieldValues.value[field] || ''
    if (field.toLowerCase().includes('length') || field.toLowerCase().includes('diameter')) {
      const num = parseFloat(value)
      value = isNaN(num) ? value : num.toFixed(3)
    }
    desc = desc.replaceAll(`{${field}}`, value)
  }

  return desc
})

// Basic Tool ID format: ABBR-FIELD1-FIELD2 (customize later)
const generatedToolID = computed(() => {
  if (!activeTool.value) return ''
  const cutDia = fieldValues.value['Cut Diameter'] || '0.000'
  const oal = fieldValues.value['OAL'] || '0.000'
  return `${activeTool.value.abbreviation}-${cutDia}-${oal}`
})
</script>
