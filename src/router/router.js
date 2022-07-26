import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main";
import SelectFaculty from "../pages/SelectFaculty";
import SelectCourse from "../pages/SelectCourse";
import SelectGroup from "../pages/SelectGroup";
import Schedule from "../pages/Schedule";

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: '/faculty',
        name: 'faculty',
        component: SelectFaculty
    },
    {
        path: '/faculty/:idFaculty/course',
        name: 'course',
        component: SelectCourse
    },
    {
        path: '/faculty/:idFaculty/course/:numCourse/group',
        name: 'group',
        component: SelectGroup
    },
    {
        path: '/faculty/:idFaculty/course/:numCourse/group/:idGroup/schedule',
        name: 'schedule',
        component: Schedule
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;