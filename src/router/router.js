import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main";
import SelectFaculty from "../pages/SelectFaculty";
import SelectCourse from "../pages/SelectCourse";
import SelectGroup from "../pages/SelectGroup";
import SelectLecturer from "../pages/SelectLecturer";
import Schedule from "../pages/Schedule";
import ScheduleLecturer from "../pages/ScheduleLecturer";

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
        path: '/lecturer',
        name: 'lecturer',
        component: SelectLecturer
    },
    {
        path: '/faculty/:idFaculty/course/:numCourse/group/:idGroup/schedule',
        name: 'schedule',
        component: Schedule
    },
    {
        path: '/lecturer/:idLecturer/schedule',
        name: 'schedule-lecturer',
        component: ScheduleLecturer
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;