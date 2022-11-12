export const auth = {
    namespaced: true,

    state: {
        typeSchedule: null,
        select_id: null,
    },

    getters: {
    },

    mutations: {
        SCHEDULE_UPDATE(state, { typeSchedule, select_id }) {
            state.typeSchedule = typeSchedule;
            state.select_id = select_id;

            localStorage.setItem("typeSchedule", typeSchedule);
            localStorage.setItem("select_id", select_id);
        },
    },

    actions: {
        async selectSchedule(context, { typeSchedule, select_id }) {
            try {
                localStorage.setItem("typeSchedule", typeSchedule);
                localStorage.setItem("select_id", select_id);

                context.commit('SCHEDULE_UPDATE', {
                    typeSchedule,
                    select_id,
                });
            } catch (error) {
                throw error;
            }
        },

        async clearLocalStorage(context) {
            context.commit('SCHEDULE_UPDATE', {
                typeSchedule: null,
                select_id: null,
            });

            localStorage.removeItem('typeSchedule');
            localStorage.removeItem('select_id');
        },

        // async logout(context) {
        //     context.commit('TOKEN_UPDATE', {
        //         access_token: null,
        //         refresh_token: null,
        //     });

        //     localStorage.removeItem('access_token');
        //     localStorage.removeItem('refresh_token');

        //     if (router.currentRoute.value.name !== 'main') {
        //         router.push({
        //             name: 'main',
        //         });
        //     }
        // },
    },
}
