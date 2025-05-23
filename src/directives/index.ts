import type { App } from 'vue'

export function registerGlobalDirectives(app: App) {
  app.directive('click-outside', {
    beforeMount(el, binding) {
      el.__ClickOutsideHandler__ = (e: MouseEvent) => {
        if (!(el === e.target || el.contains(e.target))) {
          binding.value(e)
        }
      }
      document.body.addEventListener('click', el.__ClickOutsideHandler__)
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.__ClickOutsideHandler__)
    }
  })
}