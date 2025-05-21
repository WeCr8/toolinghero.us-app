import { computed, ref, provide } from 'vue';
import { useRoute } from 'vue-router';
// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
// Components
import LoginRegisterModal from '@/components/LoginRegisterModal.vue';
import Toast from '@/components/Toast.vue';
const route = useRoute();
const loginModalRef = ref(null);
const toastRef = ref(null);
// Provide both to children
provide('loginModalRef', loginModalRef);
provide('toastRef', toastRef);
// Dynamically select layout
const layoutComponent = computed(() => {
    const layout = route.meta.layout;
    return layout === 'AuthLayout'
        ? AuthLayout
        : layout === 'MarketingLayout'
            ? MarketingLayout
            : DefaultLayout;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
/** @type {[typeof Toast, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Toast, new Toast({
    ref: "toastRef",
}));
const __VLS_1 = __VLS_0({
    ref: "toastRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {typeof __VLS_ctx.toastRef} */ ;
var __VLS_3 = {};
var __VLS_2;
/** @type {[typeof LoginRegisterModal, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(LoginRegisterModal, new LoginRegisterModal({
    ref: "loginModalRef",
}));
const __VLS_6 = __VLS_5({
    ref: "loginModalRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {typeof __VLS_ctx.loginModalRef} */ ;
var __VLS_8 = {};
var __VLS_7;
const __VLS_10 = ((__VLS_ctx.layoutComponent));
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({}));
const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
const __VLS_14 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
var __VLS_13;
// @ts-ignore
var __VLS_4 = __VLS_3, __VLS_9 = __VLS_8;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LoginRegisterModal: LoginRegisterModal,
            Toast: Toast,
            loginModalRef: loginModalRef,
            toastRef: toastRef,
            layoutComponent: layoutComponent,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
