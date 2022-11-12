<template>
  <MainPanel
    v-bind="{ currentEven: currentEven, even: even, titleEven: titleEven, selectDay: selectDay, titleName: lecturerFullName, currentDay: currentDay }"
    @changeEven="changeEven" @changeDay="changeDay" />
  <section class="main-section" v-loading.fullscreen.lock="loading" element-loading-background="transparent">
    <div class="wrapper-main-section wrapper-content">
      <div class="wrapper-week desktop-nav">
        <div class="wrapper-days" v-for="day in days" :key="day.id">
          <input type="radio" :id="day.id" :value="day.id" v-model="selectDay" @change="changeDay" class="my-radio" />
          <label :for="day.id" class="my-label"
            :class="{ 'currentDayColor': (selectDay !== currentDay && day.id === currentDay) }">{{ day.name
            }}
          </label>
        </div>
      </div>
      <div class="vertical-line"></div>
      <div class="wrapper-main">
        <div class="wrapper-schedule" v-for="schedule in newSchedule" :key="schedule.id">
          <template v-if="schedule.isWindow">
            <div class="wrapper-pair">
              {{ schedule.label }}
            </div>
            <div class="wrapper-window">
              <div class="wrapper-svg">
                <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M20.0678 0L2.99203 16.0723L3.97769 17L6.90988 14.2401H16.7273C20.1916 14.2401 23 11.5968 23 8.33603C23 5.83771 21.3514 3.70181 19.0222 2.83958L21.0534 0.927739L20.0678 0ZM17.9156 3.88114L8.30382 12.9281H16.7273C19.4218 12.9281 21.6061 10.8722 21.6061 8.33603C21.6061 6.1857 20.0358 4.38058 17.9156 3.88114ZM1.39394 8.33603C1.39394 10.4316 2.88523 12.1993 4.9234 12.7502L3.83272 13.7768C1.58048 12.8809 0 10.7822 0 8.33603C0 5.07529 2.8084 2.43193 6.27273 2.43193H15.8859L14.492 3.74395H6.27273C3.57825 3.74395 1.39394 5.79989 1.39394 8.33603Z"
                    fill="currentColor" fill-opacity="0.85" />
                </svg>
              </div>
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
              <span class="type-lesson">{{ typeLesson[schedule.type_lesson - 1] }}</span>
              {{ schedule.subject_name }}
            </div>
            <div class="wrapper-lecturer">
              <svg class="wrapper-svg-lecturer" width="20" height="12" viewBox="0 0 20 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 0.5C8.61778 0.5 7.49724 1.62071 7.49724 3.00318C7.49724 4.38564 8.61778 5.50636 10 5.50636C11.3823 5.50636 12.5028 4.38564 12.5028 3.00318C12.5028 1.62071 11.3823 0.5 10 0.5Z"
                  fill="currentColor" />
                <path
                  d="M7.33039 6.84138C5.94814 6.84138 4.8276 7.96209 4.8276 9.34456V10.1378C4.8276 10.6405 5.19193 11.0692 5.68807 11.1503C8.54381 11.6166 11.4563 11.6166 14.312 11.1503C14.8081 11.0692 15.1725 10.6405 15.1725 10.1378V9.34456C15.1725 7.96209 14.0519 6.84138 12.6697 6.84138H12.4422C12.319 6.84138 12.1967 6.86086 12.0796 6.89908L11.502 7.08773C10.526 7.40646 9.47402 7.40646 8.49808 7.08773L7.92043 6.89908C7.80338 6.86086 7.68102 6.84138 7.55789 6.84138H7.33039Z"
                  fill="currentColor" />
                <path
                  d="M16.5517 10.1219V9.34456C16.5517 8.44758 16.2464 7.62051 15.7333 6.96262C16.2597 7.03512 16.7982 6.98618 17.3083 6.8158L17.7319 6.67431C17.8178 6.64564 17.9075 6.63104 17.9978 6.63104H18.1646C19.1783 6.63104 20 7.47157 20 8.50842V9.10332C20 9.48041 19.7328 9.80194 19.369 9.8627C18.4357 10.0186 17.4942 10.105 16.5517 10.1219Z"
                  fill="currentColor" />
                <path
                  d="M14.3715 3.75238C14.3715 2.71553 15.1932 1.875 16.2069 1.875C17.2205 1.875 18.0423 2.71553 18.0423 3.75238C18.0423 4.78923 17.2205 5.62977 16.2069 5.62977C15.1932 5.62977 14.3715 4.78923 14.3715 3.75238Z"
                  fill="currentColor" />
                <path
                  d="M4.26668 6.96262C3.75358 7.62051 3.44829 8.44758 3.44829 9.34456V10.1219C2.50584 10.105 1.5643 10.0186 0.631014 9.8627C0.267174 9.80194 0 9.48041 0 9.10332V8.50842C0 7.47157 0.821727 6.63104 1.83538 6.63104H2.00221C2.09251 6.63104 2.18224 6.64564 2.26807 6.67431L2.69169 6.8158C3.20181 6.98618 3.74027 7.03512 4.26668 6.96262Z"
                  fill="currentColor" />
                <path
                  d="M1.95774 3.75238C1.95774 2.71553 2.77946 1.875 3.79311 1.875C4.80677 1.875 5.62849 2.71553 5.62849 3.75238C5.62849 4.78923 4.80677 5.62977 3.79311 5.62977C2.77946 5.62977 1.95774 4.78923 1.95774 3.75238Z"
                  fill="currentColor" />
              </svg>
              <span>{{ schedule.group_name }}</span>
            </div>
            <div class="wrapper-bottom">
              <div class="wrapper-number" :style="{ background: schedule.building_color }">
                {{ schedule.cabinet_number }}
              </div>
              <div class="wrapper-building">
                {{ schedule.building_street }}
              </div>
            </div>
            <div class="line" :style="{ display: (newSchedule.at(-1).id === schedule.id ? 'none' : 'block') }">
            </div>
          </template>
        </div>
        <PlaceholderHoliday v-if="!loading && !newSchedule.length" />
      </div>
    </div>
  </section>
</template>

<script setup>
import MainPanel from '../components/MainPanel.vue';
import PlaceholderHoliday from './UI/PlaceholderHoliday.vue';
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from "vuex";

const store = useStore();

const SUNDAY = 7;
const MONDAY = 1;

const loading = ref(false);

const currentEven = ref('');
const currentDay = ref('');

const lecturer_id = computed(() => store.state.auth.select_id);
const lecturerFullName = ref('');
const even = ref(true);
const titleEven = ref("Парний тиждень");
const selectDay = ref("");
const newSchedule = ref([]);
const currentSemester = ref("");
const lessonSchedules = ref("");

const typeLesson = ['лек', 'пр', 'лаб'];
const days = [
  { id: 1, name: "Понеділок" },
  { id: 2, name: "Вівторок" },
  { id: 3, name: "Середа" },
  { id: 4, name: "Четвер" },
  { id: 5, name: "П'ятниця" },
  { id: 6, name: "Субота" },
];
const arrLabels = [
  { label: "8:30 - 9:50", index: 1 },
  { label: "10:00 - 11:20", index: 2 },
  { label: "11:30 - 12:50", index: 3 },
  { label: "13:10 - 14:30", index: 4 },
  { label: "14:40 - 16:00", index: 5 },
  { label: "16:10 - 17:30", index: 6 },
  { label: "17:40 - 19:00", index: 7 },
  { label: "19:10 - 20:30", index: 8 },
  { label: "20:40 - 22:00", index: 9 },
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

async function getSchedule() {
  try {
    newSchedule.value = [];
    lessonSchedules.value = '';
    loading.value = true;

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
      loading.value = false;
      return;
    }

    lessonSchedules.value = response.data.result;

    await getPairs();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}

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
      schedule.building_color = res_building.data.result.color;

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

    loading.value = false;
  } catch (error) {
    console.log(error);
  }
}

async function changeEven() {
  try {
    even.value = !even.value;
    titleEven.value = even.value ? 'Парний тиждень' : 'Непарний тиждень';

    await getSchedule();
  } catch (error) {
    console.log(error);
  }
}

async function changeDay(newDay) {
  try {
    selectDay.value = parseInt(newDay);

    await getSchedule();
  } catch (error) {
    console.log(error);
  }
}

async function getLecturerName() {
  try {
    let response = await getLecturer(lecturer_id.value);

    response = response.data.result;
    lecturerFullName.value = response.last_name + ' ' + response.first_name.charAt(0) + '. ' + response.second_name.charAt(0) + '.';
    console.log('lecturerFullName.value', lecturerFullName.value);
  } catch (error) {
    console.log(error);
  }
}

async function updateCurrentWeek() {
  try {
    const res = await getToday();

    const today = res.data.result;

    currentDay.value = today.day_of_week;
    currentEven.value = today.even;
    selectDay.value = today.day_of_week !== SUNDAY ? today.day_of_week : MONDAY;
    even.value = today.day_of_week !== SUNDAY ? today.even : !today.even;
    titleEven.value = even.value === true ? 'Парний тиждень' : 'Непарний тиждень';

    await getSchedule();
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  loading.value = true;

  getLecturerName();
  updateCurrentWeek();
})
</script>

<style scoped lang="scss">
.wrapper-main-section {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.wrapper-bottom {
  display: flex;
  align-items: center;
}

.current-even-big {
  background: rgba(100, 208, 166, 0.25);
}

.current-even-small {
  background: #64D0A6;
}

.disabled-even-small {
  background: var(--tg-theme-hint-color);
}

.currentDayColor {
  color: var(--tg-theme-link-color) !important;
}

.line {
  margin-top: 20px;

  width: 100%;
  height: 1px;

  background: rgba(var(--tg-theme-hint-color-rgb), 0.5);
}

.vertical-line {
  width: 1px;

  margin-right: 24px;
  margin-bottom: 24px;

  background: rgba(var(--tg-theme-hint-color-rgb), 0.5);
}

.wrapper-number {
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;

  margin-right: 8px;

  padding: 4px 8px;

  border-radius: 5px;

  color: #FFF;
}

.main-section {
  width: 100%;
  align-items: flex-start;

  margin-top: 24px;

  .wrapper-main {
    width: 100%;
  }
}

.wrapper-svg-lecturer {
  margin-right: 10px;

  width: 24px;
  height: 24px;

  color: var(--tg-theme-hint-color);
}

.wrapper-schedule {
  display: flex;
  flex-direction: column;

  align-items: flex-start;

  color: var(--tg-theme-text-color);

  margin-top: 15px;

  width: 100%;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 24px;
  }
}

.wrapper-lesson {
  display: flex;
  align-items: center;

  margin: 15px 0px 12px 0px;

  font-weight: 600;
}

.wrapper-pair {
  font-weight: 700;

  color: var(--tg-theme-hint-color);
}

.wrapper-window {
  display: flex;

  font-weight: 600;
  font-size: 14px;

  padding: 6px 8px;
  margin-top: 8px;

  border-radius: 8px;

  background: var(--tg-theme-secondary-bg-color);
}

.wrapper-svg {
  display: flex;
  align-items: center;

  margin-right: 8px;

  color: var(--tg-theme-text-color);
}

.wrapper-lecturer {
  display: flex;
  align-items: center;

  margin-bottom: 12px;

  font-size: 14px;

  opacity: 0.85;
}

.wrapper-building {
  font-size: 14px;

  line-height: 19px;

  color: var(--tg-theme-hint-color);
}

.wrapper-week {
  display: flex;
  max-width: 100%;

  margin: 16px 0px 0px;
  padding-bottom: 10px;

  .wrapper-days {
    padding: 6px 0px;
    margin-right: 12px;

    .my-label {
      font-weight: 600;

      border-radius: 8px;

      padding: 6px 16px;

      color: var(--tg-theme-hint-color);

      &:hover {
        background: var(--tg-theme-button-color) !important;
        color: var(--tg-theme-button-text-color) !important;
        opacity: 0.9;
      }
    }
  }
}

input[type=radio] {
  display: none;
}

.wrapper-days input[type="radio"]:checked+label {
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color) !important;
}

.type-lesson {
  padding: 4px 8px;

  font-size: 14px;
  line-height: 19px;

  margin-right: 12px;

  color: #31C68C;

  border: 1px solid #64D0A6;

  border-radius: 5px;
}

@media only screen and (max-width: 991px) {
  .desktop-nav {
    display: none !important;
  }

  .vertical-line {
    display: none !important;
  }
}

@media only screen and (min-width: 992px) {
  .main-section {
    flex-direction: row !important;
  }

  .wrapper-week {
    flex-direction: column !important;

    margin-right: 24px;
    margin-top: 0 !important;

    .wrapper-days {
      margin-right: 0 !important;
      margin-bottom: 12px;
    }
  }
}

@keyframes rotation-arrows {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: scale(3);
    transform: rotate(180deg);
  }
}
</style>
