import { ref } from 'vue'

const logs = ref<any[]>([])

export function useDarnLogger() {
  const addLog = (entry: any) => {
    logs.value.push({
      timestamp: new Date().toISOString(),
      ...entry
    })
  }

  const getLogs = () => logs.value

  return { addLog, getLogs }
}