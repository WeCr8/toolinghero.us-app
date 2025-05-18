// src/modals/manager/useModalManager.ts
import { ref, shallowRef, provide } from 'vue'

// Track modal state
const modalComponent = shallowRef<any>(null)
const modalProps = ref<any>({})
const modalVisible = ref(false)

// Provide modal controller
export function provideModalManager() {
  const openModal = async (name: string, props: Record<string, any> = {}) => {
    // Lazy-load modal from modals/modals/
    const module = await import(`../modals/${name}.vue`)
    modalComponent.value = module.default
    modalProps.value = props
    modalVisible.value = true
  }

  const closeModal = () => {
    modalVisible.value = false
    modalComponent.value = null
    modalProps.value = {}
  }

  provide('openModal', openModal)
  provide('closeModal', closeModal)
  provide('modalVisible', modalVisible)
  provide('modalComponent', modalComponent)
  provide('modalProps', modalProps)
}
