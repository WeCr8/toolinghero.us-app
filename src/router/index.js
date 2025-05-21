import { createRouter, createWebHistory } from 'vue-router';
// Direct import for core route (critical path)
import HomeView from '@/views/HomeView.vue';
// Lazy loaded views (scales better)
const DangView = () => import('@/views/DangView.vue');
const PersonalDashboard = () => import('@/views/dashboard/PersonalDashboard.vue');
const TeamDashboard = () => import('@/views/dashboard/TeamDashboard.vue');
const NotFoundView = () => import('@/views/NotFound.vue'); // Create if not yet
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
            title: 'DANG Tool Assembly Generator',
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
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// Optional: Scroll to top after navigation
router.afterEach(() => {
    window.scrollTo(0, 0);
});
// Optional: Guard logic (extend as needed)
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('authUser') || 'null'); // or Firebase check
    if (to.meta.requiresAuth && !user) {
        return next('/'); // redirect unauthenticated
    }
    if (to.meta.requiresAdmin && user?.role !== 'admin') {
        return next('/dashboard'); // redirect non-admins
    }
    next();
});
export default router;
