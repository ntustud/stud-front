import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main";
import ChooseFaculty from "../pages/ChooseFaculty";
import ChooseCourse from "../pages/ChooseCourse";
import ChooseGroup from "../pages/ChooseGroup";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/faculty',
        component: ChooseFaculty
    },
    {
        path: '/course',
        component: ChooseCourse
    },
    {
        path: '/group',
        component: ChooseGroup
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;