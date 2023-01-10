import { createStore } from "vuex";
import { ScheduleModule } from "./modules/ScheduleModule";
import { auth } from "./modules/auth";

export default createStore({
    modules: {
        timeTable: ScheduleModule,
        auth: auth
    },

    actions: {
        initialiseStore(context) {
            const typeSchedule = localStorage.getItem('typeSchedule');
            const select_id = localStorage.getItem('select_id');

            if (typeSchedule && select_id) {
                context.commit('auth/SCHEDULE_UPDATE', {
                    typeSchedule,
                    select_id,
                });
            }
        },
    },
})