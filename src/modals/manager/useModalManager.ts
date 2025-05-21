// src/composables/useModalManager.ts
import { ref, shallowRef, provide, inject, type Component, type Ref, type ShallowRef } from 'vue'

interface ModalProps {
  onConfirm?: () => void
  [key: string]: unknown
}

// Use import.meta.glob for Vite compatibility
const modalModules = import.meta.glob('../modals/modals/*.vue')

const modalComponent: ShallowRef<Component | null> = shallowRef(null)
const modalProps: Ref<ModalProps> = ref({})
const modalVisible: Ref<boolean> = ref(false)

const openModal = async (name: string, props: ModalProps = {}) => {
  const path = `../modals/modals/${name}.vue`
  const moduleLoader = modalModules[path]

  if (!moduleLoader) {
    console.warn(`Modal "${name}" not found at ${path}`)
    return
  }

  try {
    const mod = (await moduleLoader()) as { default: Component }
    modalComponent.value = mod.default
    modalProps.value = props
    modalVisible.value = true
  } catch (err) {
    console.error(`Failed to load modal: ${name}`, err)
  }
}

const closeModal = () => {
  modalVisible.value = false
  modalComponent.value = null
  modalProps.value = {}
}

// Optional: Provide/inject pattern
export function provideModalManager() {
  provide('openModal', openModal)
  provide('closeModal', closeModal)
  provide('modalVisible', modalVisible)
  provide('modalComponent', modalComponent)
  provide('modalProps', modalProps)
}

export function useModalManager() {
  return {
    openModal: inject('openModal') as typeof openModal,
    closeModal: inject('closeModal') as typeof closeModal,
    modalVisible: inject('modalVisible') as Ref<boolean>,
    modalComponent: inject('modalComponent') as ShallowRef<Component | null>,
    modalProps: inject('modalProps') as Ref<ModalProps>,
  }
}
