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
    },
    // {
    //     path: '/group/:idGroup/schedule',
    //     name: 'schedule',
    //     component: () => import('../pages/SchedulePage.vue'),
    // },
    // {
    //     path: '/lecturer/:idLecturer/schedule',
    //     name: 'schedule-lecturer',
    //     component: () => import('../pages/ScheduleLecturerPage.vue'),
    // }
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
    // if (to.matched.some((record) => record.meta.roles)) {
    //   const { roles } = to.meta;
    //   const userRoles = localStore.user.authorities;
    //   const hasAccess = roles.reduce((found, item) => found || userRoles.includes(item), false);

    //   if (hasAccess) {
    //     next();
    //   } else {
    //     next({
    //       name: 'home',
    //     });
    //   }
    //   return;
    // }

    next();

});

export default router;