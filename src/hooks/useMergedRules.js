import globalRules from '@/config/rules/validation_rules.json'

export async function useMergedRules(moduleName = '') {
  let moduleRules = {}

  if (moduleName) {
    try {
      moduleRules = await import(`@/modules/${moduleName}/rules/validation_rules.json`)
    } catch (e) {
      console.warn(`No custom rules found for ${moduleName}`)
    }
  }

  return {
    ...globalRules,
    ...moduleRules.default || {}
  }
}
