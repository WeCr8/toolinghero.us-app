import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Lazy-loaded views
const HomeView = () => import('@/views/HomeView.vue')
//const AboutView = () => import('@/views/AboutView.vue')
//const ContactView = () => import('@/views/ContactView.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      layout: 'DefaultLayout',
      showNavbar: true,
      showFooter: true,
    },
  },
  //{
  //  path: '/about',
  //  name: 'About',
  //  component: AboutView,
  //  meta: {
  //    layout: 'DefaultLayout',
  //     showNavbar: true,
  //     showFooter: true,
  //   },
  // },
  //{
  //  path: '/contact',
  //  name: 'Contact',
  //  component: ContactView,
  //  meta: {
  //    layout: 'AuthLayout',
  //    showNavbar: false,
  //    showFooter: false,
  //  },
  //},
  //{
  //   path: '/:pathMatch(.*)*',
  //  redirect: '/',
  // // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
