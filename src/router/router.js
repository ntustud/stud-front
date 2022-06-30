import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main";
import ChooseFaculty from "../pages/ChooseFaculty";
import ChooseCourse from "../pages/ChooseCourse";
import ChooseGroup from "../pages/ChooseGroup";
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
        component: ChooseFaculty
    },
    {
        path: '/faculty/:idFaculty/course',
        name: 'course',
        component: ChooseCourse
    },
    {
        path: '/faculty/:idFaculty/course/:numCourse/group',
        name: 'group',
        component: ChooseGroup
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