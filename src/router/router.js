import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main";
import ChooseFaculty from "../pages/ChooseFaculty";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/faculty',
        component: ChooseFaculty
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;