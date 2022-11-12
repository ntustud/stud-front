import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'schedule',
        component: () => import('../pages/SchedulePage.vue'),
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../pages/MainPage.vue'),
    },
    {
        path: '/group',
        name: 'group',
        component: () => import('../pages/GroupPage.vue'),
    },
    {
        path: '/lecturer',
        name: 'lecturer',
        component: () => import('../pages/LecturerPage.vue'),
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
    const typeSchedule = localStorage.getItem('typeSchedule');
    if (!typeSchedule && to.name === 'schedule') {
        next({
            name: 'main',
        });
        return;
    }
    next();
});

export default router;