import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'

// --- Augment RouteMeta type properly ---
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresAdmin?: boolean
    title?: string
  }
}

// --- Import Views ---
// Eager
import HomeView from '@/views/core/HomeView.vue'

// Lazy
const DangView = () => import('@/views/DangView/DangView.vue')
const AboutView = () => import('@/views/core/AboutView.vue')
const SupportView = () => import('@/views/core/SupportView.vue')
const PersonalDashboard = () => import('@/views/DashboardView/PersonalDashboard.vue')
const TeamDashboard = () => import('@/views/DashboardView/TeamDashboardView.vue')
const NotFoundView = () => import('@/views/core/NotFoundView.vue')
const ModulesContainerView = () => import('@/components/dashboard/ModulesContainerView.vue')

// --- Define Routes ---
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Modules',
    component: ModulesContainerView,
    meta: {
      title: 'Modules',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home',
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

// --- Create Router ---
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// --- Auth/Admin Guard ---
router.beforeEach((to, _from, next) => {
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('authUser') || 'null')
  } catch (error) {
    console.error('Error parsing user data:', error)
    localStorage.removeItem('authUser')
  }

  if (to.meta.requiresAdmin) {
    if (!user) {
      return next({ name: 'About', query: { redirect: to.fullPath } })
    }
    if (user.role !== 'admin') {
      return next({ name: 'PersonalDashboard' })
    }
  } else if (to.meta.requiresAuth && !user) {
    return next({ name: 'About', query: { redirect: to.fullPath } })
  }
  next()
})

// --- Document Title Sync ---
router.afterEach((to) => {
  document.title = to.meta?.title || 'Tooling Hero'
})

export default router
export { routes }

// --- Optional Exports ---
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
