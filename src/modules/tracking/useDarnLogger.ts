import { ref } from 'vue'

interface DarnLogEntry {
  timestamp: string
  level?: 'info' | 'warn' | 'error' | 'debug'
  message?: string
  [key: string]: unknown
}

const logs = ref<DarnLogEntry[]>([])

export function useDarnLogger() {
  const addLog = (entry: Omit<DarnLogEntry, 'timestamp'>) => {
    logs.value.push({
      timestamp: new Date().toISOString(),
      ...entry,
    })
  }

  const getLogs = () => logs.value

  const clearLogs = () => {
    logs.value = []
  }

  const logInfo = (message: string, extra?: Record<string, unknown>) => {
    addLog({ level: 'info', message, ...extra })
  }
  const logWarn = (message: string, extra?: Record<string, unknown>) => {
    addLog({ level: 'warn', message, ...extra })
  }
  const logError = (message: string, extra?: Record<string, unknown>) => {
    addLog({ level: 'error', message, ...extra })
  }
  const logDebug = (message: string, extra?: Record<string, unknown>) => {
    addLog({ level: 'debug', message, ...extra })
  }

  return { addLog, getLogs, clearLogs, logInfo, logWarn, logError, logDebug, logs }
}
