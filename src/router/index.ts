import { createRouter, createWebHistory } from 'vue-router'

// Core app views
import HomeView from '@/views/HomeView.vue'

// Lazy load non-critical views
const DangView = () => import('@/views/DangView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const PersonalDashboard = () => import('@/views/dashboard/PersonalDashboard.vue')
const TeamDashboard = () => import('@/views/dashboard/TeamDashboard.vue')
const NotFoundView = () => import('@/views/NotFound.vue')

// Authenticated app routes
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

// Scroll to top on navigation
router.afterEach(() => {
  window.scrollTo(0, 0)
})

// Auth guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('authUser') || 'null')

  if (to.meta.requiresAuth && !user) {
    return next('/about') // Redirect unauthenticated users to info
  }

  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/dashboard') // Redirect unauthorized to personal dash
  }

  next()
})

export default router
export { routes } // Export routes for use in other parts of the app
export type { RouteRecordRaw } from 'vue-router'
export type { RouteLocationNormalized } from 'vue-router'
export type { RouteRecordName } from 'vue-router'
export type { RouteLocationRaw } from 'vue-router'
export type { RouteLocation } from 'vue-router'
export type { RouteRecord } from 'vue-router'
export type { RouteRecordRedirect } from 'vue-router'
export type { RouteRecordRedirectOption } from 'vue-router'
