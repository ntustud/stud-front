import { createStore } from "vuex";
import { ScheduleModule } from "./ScheduleModule";

export default createStore ({
    modules: {
        timeTable: ScheduleModule
    }
})