import { ref, computed } from 'vue'
import { useUserSession } from '@/composables/useUserSession'

const requiredModulesByFeature: Record<string, string[]> = {
  DANG: ['DANG'],
  DARN: ['DARN'],
  TeamDashboard: ['TeamDashboard'],
  LifecycleReports: ['LifecycleReports'],
  BlockchainExport: ['BlockchainExport'],
  AuditReports: ['AuditReports'],
  GPS: ['GPS'],
  CurriculumMode: ['CurriculumMode'],
  AuditAccess: ['AuditAccess'],
  MultiOrgToggle: ['MultiOrgToggle']
}

export function useModuleAccess() {
  const { user, isLoading } = useUserSession()

  const activeModules = computed(() => user.value?.modules || [])

  const canAccess = (feature: string): boolean => {
    const required = requiredModulesByFeature[feature] || []
    return required.every(mod => activeModules.value.includes(mod))
  }

  return {
    isLoading,
    activeModules,
    canAccess
  }
}