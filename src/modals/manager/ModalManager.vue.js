import { inject } from 'vue';
// Inject modal state and actions with proper types
const visible = inject('modalVisible');
const component = inject('modalComponent');
const props = inject('modalProps');
const close = inject('closeModal');
// Safely handle confirm logic
const onConfirm = () => {
    const confirmFn = props?.value?.onConfirm;
    if (typeof confirmFn === 'function') {
        confirmFn();
    }
    close?.();
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.Teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
if (__VLS_ctx.visible && __VLS_ctx.component) {
    const __VLS_4 = ((__VLS_ctx.component));
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onClose': {} },
        ...{ 'onConfirm': {} },
        ...(__VLS_ctx.props ?? {}),
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClose': {} },
        ...{ 'onConfirm': {} },
        ...(__VLS_ctx.props ?? {}),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onClose: (__VLS_ctx.close)
    };
    const __VLS_12 = {
        onConfirm: (__VLS_ctx.onConfirm)
    };
    var __VLS_13 = {};
    var __VLS_7;
}
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            visible: visible,
            component: component,
            props: props,
            close: close,
            onConfirm: onConfirm,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
