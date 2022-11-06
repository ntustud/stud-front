import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
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
    },
    {
        path: '/group/:idGroup/schedule',
        name: 'schedule',
        component: () => import('../pages/SchedulePage.vue'),
    },
    {
        path: '/lecturer/:idLecturer/schedule',
        name: 'schedule-lecturer',
        component: () => import('../pages/ScheduleLecturerPage.vue'),
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;