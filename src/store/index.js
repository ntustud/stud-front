import { createStore } from "vuex";
import { TimeTableModule } from "./TimeTableModule";

export default createStore ({
    modules: {
        timeTable: TimeTableModule
    }
})