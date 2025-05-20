import { ref, shallowRef, provide, type Component, type ShallowRef, type Ref } from 'vue'

interface ModalProps {
  onConfirm?: () => void
  [key: string]: unknown
}

const modalComponent: ShallowRef<Component | null> = shallowRef(null)
const modalProps: Ref<ModalProps> = ref({})
const modalVisible: Ref<boolean> = ref(false)

export function provideModalManager() {
  const openModal = async (name: string, props: ModalProps = {}) => {
    const module = await import(`../modals/modals/${name}.vue`)
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
