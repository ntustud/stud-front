<template>
    <div class="wrapper-head">
        <div class="wrapper-naming-group">
            <p class="main-title">{{ lecturer.last_name }} {{ lecturer.first_name }} {{ lecturer.second_name }}</p>
            <router-link :to="{ name: 'lecturer' }" class="img-edit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.896 0.183396C12.0418 0.197238 12.1047 0.374027 12.0011 0.477444L4.76005 7.70637C4.67804 7.78824 4.61937 7.89044 4.59006 8.00246L3.71974 11.3288C3.66118 11.5526 3.72588 11.7907 3.88974 11.9543C4.0536 12.1178 4.29204 12.1824 4.51625 12.124L7.84818 11.2551C7.96039 11.2259 8.06277 11.1673 8.14478 11.0854L15.4884 3.7541C15.5915 3.65124 15.7676 3.71278 15.7828 3.85745C16.0888 6.76738 16.0715 9.70265 15.7309 12.6097C15.537 14.2649 14.2044 15.5645 12.5522 15.7489C9.55121 16.0837 6.4488 16.0837 3.44785 15.7489C1.79565 15.5645 0.463028 14.2649 0.269111 12.6097C-0.0897035 9.54701 -0.0897035 6.45299 0.26911 3.39029C0.463028 1.73508 1.79565 0.435475 3.44785 0.251127C6.23058 -0.0593614 9.10056 -0.0819386 11.896 0.183396Z"
                        fill="currentColor" />
                    <path
                        d="M13.0681 1.25535C13.1531 1.17069 13.2907 1.17069 13.3756 1.25535L14.6065 2.48422C14.6915 2.56905 14.6915 2.70658 14.6065 2.7914L7.38865 9.99715C7.36145 10.0243 7.32696 10.0439 7.28978 10.0537L5.62364 10.4882C5.46295 10.53 5.3166 10.3835 5.35831 10.2231L5.79347 8.55992C5.80324 8.52259 5.82281 8.48851 5.85014 8.46122L13.0681 1.25535Z"
                        fill="currentColor" />
                </svg>
            </router-link>
        </div>
        <div class="wrapper-even">
            <span class="title-even">{{ titleEven }}</span>
            <div class="wrapper-arrow" @click="changeEven">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.38615 1.32775C3.68849 1.02401 3.68849 0.531547 3.38615 0.227806C3.08381 -0.0759353 2.59361 -0.0759353 2.29127 0.227806L0.226756 2.30188C-0.0755854 2.60562 -0.0755854 3.09808 0.226756 3.40182L2.29127 5.4759C2.59361 5.77964 3.08381 5.77964 3.38615 5.4759C3.68849 5.17216 3.68849 4.6797 3.38615 4.37595L2.64326 3.62963H13.1613C13.5889 3.62963 13.9355 3.28141 13.9355 2.85185C13.9355 2.4223 13.5889 2.07407 13.1613 2.07407H2.64326L3.38615 1.32775Z"
                        fill="currentColor" />
                    <path
                        d="M12.6139 8.5241C12.3115 8.82784 12.3115 9.3203 12.6139 9.62405L13.3567 10.3704H2.83871C2.41113 10.3704 2.06452 10.7186 2.06452 11.1481C2.06452 11.5777 2.41113 11.9259 2.83871 11.9259H13.3567L12.6139 12.6722C12.3115 12.976 12.3115 13.4685 12.6139 13.7722C12.9162 14.0759 13.4064 14.0759 13.7087 13.7722L15.7732 11.6981C16.0756 11.3944 16.0756 10.9019 15.7732 10.5982L13.7087 8.5241C13.4064 8.22036 12.9162 8.22036 12.6139 8.5241Z"
                        fill="currentColor" />
                </svg>
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

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const SUNDAY = 7;
const MONDAY = 1;

const lecturer_id = ref(parseInt(route.params.idLecturer));
const lecturer = ref({});
const even = ref(true);
const titleEven = ref("Парний тиждень");
const selectDay = ref("");
const newSchedule = ref([]);
const currentSemester = ref("");
const lessonSchedules = ref("");
const days = [
    { id: 1, name: "Понеділок" },
    { id: 2, name: "Вівторок" },
    { id: 3, name: "Середа" },
    { id: 4, name: "Четвер" },
    { id: 5, name: "П'ятниця" },
    { id: 6, name: "Субота" },
];
const typeLesson = [
    { id: 1, name: 'Лекція' },
    { id: 2, name: 'Практична' },
    { id: 3, name: 'Лабораторна' }
];
const arrLabels = [
    { label: "8:30 - 9:50", index: 1 },
    { label: "10:00 - 11:20", index: 2 },
    { label: "11:30 - 12:50", index: 3 },
    { label: "13:10 - 14:30", index: 4 },
    { label: "14:40 - 16:00", index: 5 },
    { label: "16:10 - 17:30", index: 6 },
    { label: "17:40 - 19:00", index: 7 }
];

const getGroup = (group_id) => store.dispatch('timeTable/getGroup', group_id);
const getCurrentSemester = () => store.dispatch('timeTable/getCurrentSemester');
const getLessonSchedulesForDayWhereLecturer = (info) => store.dispatch('timeTable/getLessonSchedulesForDayWhereLecturer', info);
const getLessonPlan = (lesson_plan_id) => store.dispatch('timeTable/getLessonPlan', lesson_plan_id);
const getLecturer = (lecturer_id) => store.dispatch('timeTable/getLecturer', lecturer_id);
const getCabinet = (cabinet_id) => store.dispatch('timeTable/getCabinet', cabinet_id);
const getSubject = (subject_id) => store.dispatch('timeTable/getSubject', subject_id);
const getBuilding = (building_id) => store.dispatch('timeTable/getBuilding', building_id);
const getToday = () => store.dispatch('timeTable/getToday');

async function getNameLecturer() {
    try {
        const response = await getLecturer(lecturer_id.value);

        lecturer.value = response.data.result;
    } catch (error) {
        console.log(error);
    }
};

async function getSchedule() {
    try {
        newSchedule.value = [];

        if (selectDay.value == "") {
            return;
        }

        const resp_semester = await getCurrentSemester();

        currentSemester.value = resp_semester.data.result;

        const payload = reactive({
            semester_id: currentSemester.value.id,
            lecturer_id: lecturer_id.value,
            even: even.value,
            day_of_week: selectDay.value,
        });

        const response = await getLessonSchedulesForDayWhereLecturer(payload);

        if (response.data.result == null) {
            console.log('Error! Array of result is empty!');
            return;
        }

        lessonSchedules.value = response.data.result;

        getPairs();
    } catch (error) {
        console.log(error);
    }
};

async function changeEven() {
    try {
        even.value = even.value === true ? false : true;
        titleEven.value = even.value === true ? 'Парний тиждень' : 'Непарний тиждень';

        await getSchedule();
    } catch (error) {
        console.log(error);
    }
};

async function getPairs() {
    try {
        for (const schedule of lessonSchedules.value) {
            const res_lesson_plan = await getLessonPlan(
                schedule.lesson_plan_id
            );
            const res_subj = await getSubject(
                res_lesson_plan.data.result.subject_id
            );

            const res_group = await getGroup(schedule.group_id);
            const res_cab = await getCabinet(schedule.cabinet_id);
            const res_building = await getBuilding(
                res_cab.data.result.building_id
            );

            schedule.group_name = res_group.data.result.name;
            schedule.subject_name = res_subj.data.result.name;
            schedule.cabinet_number = res_cab.data.result.number;
            schedule.building_street = res_building.data.result.street;

            let isPush = true;

            // merging groups in one card
            if (newSchedule.value.length > 0) {
                if (newSchedule.value.at(-1).index === schedule.index) {
                    newSchedule.value.at(-1).group_name += ', ' + schedule.group_name;
                    isPush = false;
                }

                if (schedule.index - 2 === newSchedule.value.at(-1).index) {
                    newSchedule.value.push({
                        isWindow: true,
                        label: arrLabels[schedule.index - 2].label,
                    });
                }
            }

            if (isPush) {
                newSchedule.value.push(schedule);
            }

            // merging groups in one card
        }
    } catch (error) {
        console.log(error);
    }
};

async function updateCurrentWeek() {
    try {
        const res = await getToday();

        const today = res.data.result;

        selectDay.value = today.day_of_week !== SUNDAY ? today.day_of_week : MONDAY;
        even.value = today.day_of_week !== SUNDAY ? today.even : !today.even;
        titleEven.value = even.value === true ? 'Парний тиждень' : 'Непарний тиждень';

        await getSchedule();
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    getNameLecturer();
    updateCurrentWeek();
});
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
        }
    }

    .wrapper-radio-section {
        color: wheat;
        overflow: hidden;
        overflow-x: auto;
        display: flex;
        max-width: 100%;
        margin: 16px 0px 0px;
        padding-bottom: 10px;

        .wrapper-radio {
            padding: 6px 0px;
            margin-right: 12px;

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
