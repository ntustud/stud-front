import { createStore } from "vuex";
import { ScheduleModule } from "./ScheduleModule";
import { auth } from "./auth";

export default createStore ({
    modules: {
        timeTable: ScheduleModule,
        //auth:      auth
    }
})