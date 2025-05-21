import { ref, shallowRef, provide } from 'vue';
const modalComponent = shallowRef(null);
const modalProps = ref({});
const modalVisible = ref(false);
export function provideModalManager() {
    const openModal = async (name, props = {}) => {
        const module = await import(`../modals/modals/${name}.vue`);
        modalComponent.value = module.default;
        modalProps.value = props;
        modalVisible.value = true;
    };
    const closeModal = () => {
        modalVisible.value = false;
        modalComponent.value = null;
        modalProps.value = {};
    };
    provide('openModal', openModal);
    provide('closeModal', closeModal);
    provide('modalVisible', modalVisible);
    provide('modalComponent', modalComponent);
    provide('modalProps', modalProps);
}
