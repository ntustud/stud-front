<template>
    <div class="wrapper-head">
        <div class="wrapper-naming-group">
            <p class="main-title">{{ lecturer.last_name }} {{ lecturer.first_name }} {{ lecturer.second_name }}</p>
            <router-link :to="{ name: 'lecturer' }">
                <img src="../assets/img/edit-group.png" alt="edit-lecturer" class="img-edit">
            </router-link>
        </div>
        <div class="wrapper-even">
            <span class="title-even">{{ titleEven }}</span>
            <div class="wrapper-arrow">
                <img src="../assets/img/arrows-change.png" alt="change-even-icon" @click="changeEven">
            </div>
        </div>
        <div class="wrapper-radio-section">
            <div class="wrapper-radio" v-for="day in days" :key="day.id">
                <input type="radio" :id="day.id" :value="day.id" v-model="selectDay" @change="getSchedule"
                    class="my-radio" />
                <label :for="day.id" class="my-label">{{ day.name }}</label>
            </div>
        </div>
    </div>
    <section class="main-section">
        <div class="wrapper-main">
            <div class="wrapper-schedule" v-for="schedule in newSchedule" :key="schedule.id">
                <template v-if="schedule.isWindow">
                    <div class="wrapper-pair">
                        {{ schedule.label }}
                    </div>
                    <div class="wrapper-window">
                        <img src="../assets/img/union.png" alt="icon">
                        <p class="text-window">
                            Вікно
                        </p>
                    </div>
                    <div class="line"></div>
                </template>

                <template v-else>
                    <div class="wrapper-pair">
                        {{ arrLabels[schedule.index - 1].label }}
                    </div>
                    <div class="wrapper-lesson">
                        {{ schedule.subject_name }}
                        <span class="type-lesson">({{ typeLesson[schedule.type_lesson - 1].name }})</span>
                    </div>
                    <div class="wrapper-lecturer">
                        <img src="../assets/img/groups.png" alt="icon" class="img-lecturer" />
                        <span>{{ schedule.group_name }}</span>
                    </div>
                    <div class="wrapper-bottom">
                        <div class="wrapper-number">
                            {{ schedule.cabinet_number }}
                        </div>
                        <div class="wrapper-building">
                            <span>вул.</span>
                            {{ schedule.building_street }}
                        </div>
                    </div>
                    <div class="line"></div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            group_id: parseInt(this.$route.params.idGroup),
            lecturer_id: parseInt(this.$route.params.idLecturer),
            lecturer: {},
            even: true,
            titleEven: "Парний тиждень",
            selectDay: "",
            days: [
                { id: 1, name: "Понеділок" },
                { id: 2, name: "Вівторок" },
                { id: 3, name: "Середа" },
                { id: 4, name: "Четвер" },
                { id: 5, name: "П'ятниця" },
                { id: 6, name: "Субота" },
            ],
            typeLesson: [
                { id: 1, name: 'Лекція' },
                { id: 2, name: 'Практична' },
                { id: 3, name: 'Лабораторна' },
            ],
            newSchedule: [],
            currentSemester: "",
            lessonSchedules: "",
            lessonPlan: {},
            cabinet: {},
            subject: {},
            arrLabels: [
                { label: "8:30 - 9:50", index: 1 },
                { label: "10:00 - 11:20", index: 2 },
                { label: "11:30 - 12:50", index: 3 },
                { label: "13:10 - 14:30", index: 4 },
                { label: "14:40 - 16:00", index: 5 },
                { label: "16:10 - 17:30", index: 6 },
                { label: "17:40 - 19:00", index: 7 },
            ],
        };
    },

    methods: {
        ...mapActions("timeTable", ["getGroup"]),
        ...mapActions("timeTable", ["getCurrentSemester"]),
        ...mapActions("timeTable", ["getLessonSchedulesForDayWhereLecturer"]),
        ...mapActions("timeTable", ["getLessonPlan"]),
        ...mapActions("timeTable", ["getLecturer"]),
        ...mapActions("timeTable", ["getCabinet"]),
        ...mapActions("timeTable", ["getSubject"]),
        ...mapActions("timeTable", ["getBuilding"]),

        async getNameLecturer() {
            try {
                const response = await this.getLecturer(this.lecturer_id);

                this.lecturer = response.data.result;
            } catch (error) {
                console.log(error);
            }
        },

        async getSchedule() {
            try {
                console.log('клац');
                this.newSchedule = [];

                if (this.selectDay == "") {
                    return;
                }

                const resp_semester = await this.getCurrentSemester();
                this.currentSemester = resp_semester.data.result;

                const payload = {
                    semester_id: this.currentSemester.id,
                    lecturer_id: this.lecturer_id,
                    even: this.even,
                    day_of_week: this.selectDay,
                };

                const response = await this.getLessonSchedulesForDayWhereLecturer(payload);

                if (response.data.result == null) {
                    console.log('Error! Array of result is empty!');
                    return;
                }

                this.lessonSchedules = response.data.result;

                this.getPairs();
            } catch (error) {
                console.log(error);
            }
        },

        async changeEven() {
            try {
                this.even = this.even === true ? false : true;
                this.titleEven = this.even === true ? 'Парний тиждень' : 'Непарний тиждень';

                await this.getSchedule();
            } catch (error) {
                console.log(error);
            }
        },

        async getPairs() {
            try {
                for (const schedule of this.lessonSchedules) {
                    const res_lesson_plan = await this.getLessonPlan(
                        schedule.lesson_plan_id
                    );
                    const res_subj = await this.getSubject(
                        res_lesson_plan.data.result.subject_id
                    );
                    const res_group = await this.getGroup(schedule.group_id);
                    const res_cab = await this.getCabinet(schedule.cabinet_id);
                    const res_building = await this.getBuilding(
                        res_cab.data.result.building_id
                    );

                    schedule.group_name = res_group.data.result.name;
                    schedule.subject_name = res_subj.data.result.name;
                    schedule.cabinet_number = res_cab.data.result.number;
                    schedule.building_street = res_building.data.result.street;

                    let isPush = true;

                    // merging groups in one card
                    if (this.newSchedule.length > 0) {
                        if (this.newSchedule.at(-1).index === schedule.index) {
                            this.newSchedule.at(-1).group_name += ', ' + schedule.group_name;
                            isPush = false;
                        }

                        if (schedule.index - 2 === this.newSchedule.at(-1).index) {
                            console.log('schedule index:', schedule.index);
                            console.log('newSchedule index:', this.newSchedule.at(-1).index);

                            this.newSchedule.push({
                                isWindow: true,
                                label: this.arrLabels[schedule.index - 2].label,
                            });
                        }
                    }

                    if (isPush) {
                        this.newSchedule.push(schedule);
                    }

                    // merging groups in one card
                }
            } catch (error) {
                console.log(error);
            }
        },
    },

    mounted() {
        this.getNameLecturer();
    },
};
</script>


<style scoped lang="scss">
@import "@/style";

.wrapper-bottom {
    display: flex;
    align-items: center;
}

.line {
    margin-top: 20px;
    max-width: 288px;
    width: 100%;
    height: 1px;
    background: #3D3D41;
}

.wrapper-number {
    margin-right: 8px;
    padding: 4px 8px;
    background: #5FB7D1;
    border-radius: 5px;
}

.main-section {
    padding-top: 10px;
    font-family: 'Open Sans', sans-serif;
    max-height: 680px;
    overflow-y: scroll;
}

.img-lecturer {
    height: 24px;
    width: 24px;
    margin-right: 10px;
}

.wrapper-lecturer {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.wrapper-schedule {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    margin-top: 15px;
    width: 100%;
}

.wrapper-lesson {
    margin: 15px 0px 12px 0px;
    font-weight: 400;
}

.mb-3 {
    display: flex;
    color: white;
}

.wrapper-pair {
    font-size: 14px;
    line-height: 19px;
}

.wrapper-lesson {
    font-weight: 600;
    line-height: 22px;
}

.wrapper-lecturer {
    font-size: 14px;
    line-height: 19px;
    opacity: 0.85;
}

.wrapper-building {
    font-size: 14px;
    line-height: 19px;
    opacity: 0.5;
}

.wrapper-number {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
}

.wrapper-head {
    padding: 10px 16px 20px 16px;
    font-family: "Open Sans", sans-serif;
    max-width: 100%;
    background: $main-gray;

    .wrapper-naming-group {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-bottom: 16px;

        .main-title {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            color: $white;
            opacity: 0.85;
            margin-right: 8px;
        }

        .img-edit {
            &:hover {
                transform: scale(1.1);
            }

            &:active {
                transform: scale(0.9);
            }
        }
    }

    .wrapper-even {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: $white;

        .wrapper-arrow {
            padding: 5px;
            background: $btn-arrows;
            border-radius: 5px;
            transition: 0.4s;

            &:active {
                animation: rotation-arrows 0.3s;
            }

            &:hover {
                transform: scale(1.05);
                transform: rotate(180deg);
            }
        }
    }

    .wrapper-radio-section {
        color: wheat;
        overflow: hidden;
        overflow-x: auto;
        display: flex;
        max-width: 100%;
        margin: 16px 0px 0px;

        .wrapper-radio {
            padding: 6px 0px;
            margin-right: 12px;

            .my-radio {}

            .my-label {
                font-weight: 600;
                font-size: 14px;
                line-height: 19px;
                border-radius: 5px;
                padding: 6px 16px;
                color: $white;

                &:hover {
                    background: $btn-green-hover;
                }

                &:active {
                    background: $btn-green-active ;
                }
            }
        }
    }
}

input[type=radio] {
    display: none;
}

.wrapper-radio input[type="radio"]:checked+label {
    background: $btn-green;
}

.title-even::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: $btn-green;
    margin-right: 8px;
}

.type-lesson {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    opacity: 0.5;
}

@media only screen and (max-width: 414px) {
    .main-section {
        overflow: scroll;
    }

    .wrapper-schedule {
        width: 100%;
    }

    .wrapper-main {
        max-width: 100%;

        .line {
            max-width: 100%;
        }
    }
}

@media only screen and (max-height: 896px) {
    .main-section {
        max-height: 70vh !important;
    }
}

@media only screen and (max-height: 667px) {
    .main-section {
        max-height: 60vh !important;
    }
}

@keyframes rotation-arrows {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: scale(3);
        transform: rotate(160deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
