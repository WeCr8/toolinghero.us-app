import { createRouter, createWebHistory } from 'vue-router'

// Direct imports for primary views
import HomeView from '@/views/core/HomeView.vue'

// Lazy loaded views
const DangView = () => import('@/views/DangView/DangView.vue')
const AboutView = () => import('@/views/core/AboutView.vue')
const PersonalDashboard = () => import('@/views/DashboardView/PersonalDashboard.vue')
const TeamDashboard = () => import('@/views/DashboardView/TeamDashboard.vue')
const SupportView = () => import('@/views/SupportView.vue')
const NotFoundView = () => import('@/views/NotFound.vue')

// 🔒 Route config
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true,
      title: 'Tooling Hero – Modules',
    },
  },
  {
    path: '/dang',
    name: 'DangGenerator',
    component: DangView,
    meta: {
      requiresAuth: true,
      title: 'DANG Tool Assembly Generator',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: {
      title: 'About Tooling Hero',
    },
  },
  {
    path: '/support',
    name: 'Support',
    component: SupportView,
    meta: {
      title: 'Support',
    },
  },
  {
    path: '/dashboard',
    name: 'PersonalDashboard',
    component: PersonalDashboard,
    meta: {
      requiresAuth: true,
      title: 'Your Dashboard',
    },
  },
  {
    path: '/team-dashboard',
    name: 'TeamDashboard',
    component: TeamDashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: 'Team Admin Dashboard',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      title: 'Page Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ⬆️ Scroll to top on every route
router.afterEach(() => {
  window.scrollTo(0, 0)
})

// 🔐 Auth Guards
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('authUser') || 'null')

  if (to.meta.requiresAuth && !user) {
    return next('/about')
  }

  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/dashboard')
  }

  next()
})

export default router
export { routes }

// Optional typings
export type {
  RouteRecordRaw,
  RouteLocationNormalized,
  RouteRecordName,
  RouteLocationRaw,
  RouteLocation,
  RouteRecord,
  RouteRecordRedirect,
  RouteRecordRedirectOption,
} from 'vue-router'
