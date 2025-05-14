// Vue Router setup with tier guards
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DangToolGeneratorView from '@/modules/DANG/views/DangToolGeneratorView.vue'
import NotFound from '@/views/NotFoundView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/dang',
    name: 'DANG',
    component: DangToolGeneratorView,
    meta: { layout: 'DefaultLayout', requiresAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: 'MarketingLayout' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
