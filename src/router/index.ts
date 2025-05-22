import { createRouter, createWebHistory } from 'vue-router'

// Direct import for critical home route
import HomeView from '@/views/HomeView.vue'

// Lazy loaded routes for optimized build
const DangView = () => import('@/views/DangView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const PersonalDashboard = () => import('@/views/dashboard/PersonalDashboard.vue')
const TeamDashboard = () => import('@/views/dashboard/TeamDashboard.vue')
const NotFoundView = () => import('@/views/NotFound.vue')

// All app routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Tooling Hero – Home',
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

// Initialize Vue Router
const router = createRouter({
  history: createWebHistory(), // works with custom domains like app.toolinghero.us
  routes,
})

// Optional: Scroll to top on route change
router.afterEach(() => {
  window.scrollTo(0, 0)
})

// Auth Guard Logic
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('authUser') || 'null')

  if (to.meta.requiresAuth && !user) {
    return next('/') // Unauthenticated – send to home
  }

  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/dashboard') // Not admin – fallback
  }

  next()
})

export default router
