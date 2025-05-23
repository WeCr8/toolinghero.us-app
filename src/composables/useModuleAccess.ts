import { computed } from 'vue'
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
  MultiOrgToggle: ['MultiOrgToggle'],
}

export function useModuleAccess() {
  const { userProfile, isLoading } = useUserSession()

  const activeModules = computed(() => {
    return Array.isArray(userProfile.value?.modules) ? (userProfile.value.modules as string[]) : []
  })

  const canAccess = (feature: string): boolean => {
    const required = requiredModulesByFeature[feature] || []
    return required.every((mod) => activeModules.value.includes(mod))
  }

  return {
    isLoading,
    activeModules,
    canAccess,
  }
}
