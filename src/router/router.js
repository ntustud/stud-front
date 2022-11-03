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
    // {
    //     path: '/faculty',
    //     name: 'faculty',
    //     component: SelectFaculty
    // },
    // {
    //     path: '/faculty/:idFaculty/course',
    //     name: 'course',
    //     component: SelectCourse
    // },
    // {
    //     path: '/faculty/:idFaculty/course/:numCourse/group',
    //     name: 'group',
    //     component: SelectGroup
    // },
    // {
    //     path: '/lecturer',
    //     name: 'lecturer',
    //     component: SelectLecturer
    // },
    // {
    //     path: '/faculty/:idFaculty/course/:numCourse/group/:idGroup/schedule',
    //     name: 'schedule',
    //     component: Schedule
    // },
    // {
    //     path: '/lecturer/:idLecturer/schedule',
    //     name: 'schedule-lecturer',
    //     component: ScheduleLecturer
    // }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;