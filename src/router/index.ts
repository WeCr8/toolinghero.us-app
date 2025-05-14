// src/router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DangToolGeneratorView from '@/modules/DANG/views/DangToolGeneratorView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

// Optional: Lazy load more routes in modules
// import DarnDashboard from '@/modules/DARN/views/DarnDashboardView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { layout: 'DefaultLayout', requiresAuth: false },
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
    component: NotFoundView,
    meta: { layout: 'MarketingLayout' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

// 🔐 Optional route guards (auth/tiered features)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken') // or use Firebase/Auth store
  const userTier = localStorage.getItem('userTier') || 'free' // free, pro, enterprise

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Home' }) // or redirect to Login
  }

  // Optional: Route restriction by tier
  if (to.meta.requiredTier && to.meta.requiredTier !== userTier) {
    return next({ name: 'Home' }) // or to upgrade page
  }

  next()
})

export default router
