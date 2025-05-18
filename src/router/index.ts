import { createRouter, createWebHistory } from 'vue-router'

// 📄 Page Components
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  // 🧱 Add more routes here as your app grows
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(), // Uses browser history API
  routes,
})

export default router
