import { createRouter, createWebHistory } from 'vue-router'

// Lazy load the main modules container view
const ModulesContainerView = () => import('@/components/dashboard/ModulesContainerView.vue')

const routes = [
  {
    path: '/',
    name: 'Modules',
    component: ModulesContainerView,
    meta: { title: 'Modules' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ModulesContainerView, // Optionally use a NotFoundView if you want a 404 page
    meta: { title: 'Modules' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta?.title || 'Tooling Hero'
})

export default router
export { routes }
