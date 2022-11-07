<template>
  <div class="wrapper-navigation mobile-nav">
    <div class="wrapper-group-name">
      <p class="title-sub-head">{{ group.name }}</p>
      <router-link :to="{ name: 'group' }" class="img-edit">
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
      <div class="wrapper-container-even">
        <div class="circle-even-big" :class="{ 'current-even-big': currentEven === even }">
          <div class="circle-even-small"
            :class="{ 'current-even-small': currentEven === even, 'disabled-even-small': currentEven !== even }"></div>
        </div>
        <span class="week-even">{{ weekEven }}</span>
      </div>
      <div class="wrapper-arrow" @click="changeEven">
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.38615 1.32775C3.68849 1.02401 3.68849 0.531547 3.38615 0.227806C3.08381 -0.0759353 2.59361 -0.0759353 2.29127 0.227806L0.226756 2.30188C-0.0755854 2.60562 -0.0755854 3.09808 0.226756 3.40182L2.29127 5.4759C2.59361 5.77964 3.08381 5.77964 3.38615 5.4759C3.68849 5.17216 3.68849 4.67969 3.38615 4.37595L2.64326 3.62963H13.1613C13.5889 3.62963 13.9355 3.28141 13.9355 2.85185C13.9355 2.4223 13.5889 2.07407 13.1613 2.07407H2.64326L3.38615 1.32775Z"
            fill="white" />
          <path
            d="M12.6139 8.5241C12.3115 8.82784 12.3115 9.3203 12.6139 9.62405L13.3567 10.3704H2.83871C2.41113 10.3704 2.06452 10.7186 2.06452 11.1481C2.06452 11.5777 2.41113 11.9259 2.83871 11.9259H13.3567L12.6139 12.6722C12.3115 12.976 12.3115 13.4685 12.6139 13.7722C12.9162 14.0759 13.4064 14.0759 13.7087 13.7722L15.7732 11.6981C16.0756 11.3944 16.0756 10.9019 15.7732 10.5982L13.7087 8.5241C13.4064 8.22036 12.9162 8.22036 12.6139 8.5241Z"
            fill="white" />
        </svg>
      </div>
    </div>
    <div class="wrapper-week overflow-week">
      <div class="wrapper-days" v-for="day in days" :key="day.id">
        <input type="radio" :id="day.id" :value="day.id" v-model="selectDay" @change="getSchedule" class="my-radio" />
        <label :for="day.id" class="my-label"
          :class="{ 'currentDayColor': (selectDay !== currentDay && day.id === currentDay) }">{{ day.name }}</label>
      </div>
    </div>
  </div>
  <div class="wrapper-navigation desktop-nav">
    <div class="wrapper-even wrapper-content">
      <div class="wrapper-container-even">
        <div class="wrapper-arrow" @click="changeEven">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.38615 1.32775C3.68849 1.02401 3.68849 0.531547 3.38615 0.227806C3.08381 -0.0759353 2.59361 -0.0759353 2.29127 0.227806L0.226756 2.30188C-0.0755854 2.60562 -0.0755854 3.09808 0.226756 3.40182L2.29127 5.4759C2.59361 5.77964 3.08381 5.77964 3.38615 5.4759C3.68849 5.17216 3.68849 4.67969 3.38615 4.37595L2.64326 3.62963H13.1613C13.5889 3.62963 13.9355 3.28141 13.9355 2.85185C13.9355 2.4223 13.5889 2.07407 13.1613 2.07407H2.64326L3.38615 1.32775Z"
              fill="white" />
            <path
              d="M12.6139 8.5241C12.3115 8.82784 12.3115 9.3203 12.6139 9.62405L13.3567 10.3704H2.83871C2.41113 10.3704 2.06452 10.7186 2.06452 11.1481C2.06452 11.5777 2.41113 11.9259 2.83871 11.9259H13.3567L12.6139 12.6722C12.3115 12.976 12.3115 13.4685 12.6139 13.7722C12.9162 14.0759 13.4064 14.0759 13.7087 13.7722L15.7732 11.6981C16.0756 11.3944 16.0756 10.9019 15.7732 10.5982L13.7087 8.5241C13.4064 8.22036 12.9162 8.22036 12.6139 8.5241Z"
              fill="white" />
          </svg>
        </div>
        <div class="circle-even-big" :class="{ 'current-even-big': currentEven === even }">
          <div class="circle-even-small"
            :class="{ 'current-even-small': currentEven === even, 'disabled-even-small': currentEven !== even }"></div>
        </div>
        <span class="week-even">{{ weekEven }}</span>
      </div>
      <div class="wrapper-group-name">
        <p class="title-sub-head">{{ group.name }}</p>
        <router-link :to="{ name: 'group' }" class="img-edit">
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
    </div>
  </div>
  <section class="main-section wrapper-content">
    <div class="wrapper-week desktop-nav">
      <div class="wrapper-days" v-for="day in days" :key="day.id">
        <input type="radio" :id="day.id" :value="day.id" v-model="selectDay" @change="getSchedule" class="my-radio" />
        <label :for="day.id" class="my-label"
          :class="{ 'currentDayColor': (selectDay !== currentDay && day.id === currentDay) }">{{ day.name }}</label>
      </div>
    </div>
    <div class="vertical-line"></div>
    <div class="wrapper-main">
      <div class="wrapper-schedule" v-for="schedule in newSchedule" :key="schedule.id" :id="schedule.id">
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
            <svg class="wrapper-svg-lecturer" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12.3553 3.30176C12.1119 3.23267 11.8551 3.23273 11.6116 3.30203C11.0931 3.44957 10.5697 3.58623 10.0445 3.72335C7.70087 4.33527 5.12037 5.00904 2.91292 6.81037L1.87215 7.65967C1.04221 8.33693 1.04264 9.66327 1.8733 10.3398L2.89724 11.1738C3.65371 11.79 4.44208 12.2719 5.25 12.665V17.2939C5.25 18.4272 5.94522 19.4444 7.0011 19.8561L11.0011 21.4156C11.6435 21.666 12.3565 21.666 12.9989 21.4156L16.9989 19.8561C18.0548 19.4444 18.75 18.4272 18.75 17.2939V12.6733C19.5526 12.2823 20.3357 11.8028 21.0871 11.1896L21.25 11.0567V16C21.25 16.4142 21.5858 16.75 22 16.75C22.4142 16.75 22.75 16.4142 22.75 16V9C22.7498 8.49918 22.542 7.99845 22.1267 7.66016L21.1028 6.82618C18.8793 5.01516 16.1903 4.31386 13.9192 3.72153C13.3952 3.58485 12.8729 3.44863 12.3553 3.30176ZM8.29914 12.8122C7.9193 12.647 7.47745 12.821 7.31224 13.2009C7.14704 13.5807 7.32103 14.0226 7.70087 14.1878C8.97872 14.7435 10.3015 15.1983 11.6571 15.5462C11.8933 15.6068 12.1411 15.6068 12.3773 15.5459C13.7292 15.198 15.0481 14.7432 16.3219 14.1874C16.7015 14.0217 16.875 13.5797 16.7093 13.2C16.5436 12.8204 16.1016 12.6469 15.7219 12.8126C14.5253 13.3348 13.2865 13.7623 12.0167 14.0899C10.743 13.7622 9.50004 13.3346 8.29914 12.8122Z"
                fill="currentColor" />
            </svg>
            <span>{{ schedule.lecturer_name }}</span>
          </div>
          <div class="wrapper-bottom">
            <div class="wrapper-number" :style="{ background: schedule.building_color }">
              {{ schedule.cabinet_number }}
            </div>
            <div class="wrapper-building">
              {{ schedule.building_street }}
            </div>
          </div>
          <div class="line" :style="{display: (newSchedule.at(-1).id === schedule.id ? 'none' : 'block')}"></div>
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

const isDisabledButton = ref(false);

const currentEven = ref('');
const currentDay = ref('');

let group_id = ref(parseInt(route.params.idGroup));
let group = ref({});
let even = ref(true);
let weekEven = ref("Парний тиждень");
let selectDay = ref("");
let newSchedule = ref([]);
let currentSemester = ref("");
let lessonSchedules = ref("");
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

const getGroup = (group_id) => store.dispatch('timeTable/getGroup', group_id.value);
const getCurrentSemester = () => store.dispatch('timeTable/getCurrentSemester');
const getLessonSchedulesForDayWhereGroup = (info) => store.dispatch('timeTable/getLessonSchedulesForDayWhereGroup', info);
const getLessonPlan = (lesson_plan_id) => store.dispatch('timeTable/getLessonPlan', lesson_plan_id);
const getLecturer = (lecturer_id) => store.dispatch('timeTable/getLecturer', lecturer_id);
const getCabinet = (cabinet_id) => store.dispatch('timeTable/getCabinet', cabinet_id);
const getSubject = (subject_id) => store.dispatch('timeTable/getSubject', subject_id);
const getBuilding = (building_id) => store.dispatch('timeTable/getBuilding', building_id);
const getToday = () => store.dispatch('timeTable/getToday');

async function getNameGroup() {
  try {
    const response = await getGroup(group_id);

    group.value = response.data.result;
  } catch (error) {
    console.log(error);
  }
};

async function getSchedule() {
  try {
    newSchedule.value = [];
    lessonSchedules.value = '';
    isDisabledButton.value = true;

    if (selectDay.value == "") {
      return;
    }

    const resp_semester = await getCurrentSemester();

    currentSemester.value = resp_semester.data.result;

    const payload = reactive({
      semester_id: currentSemester.value.id,
      group_id: group_id.value,
      even: even.value,
      day_of_week: selectDay.value,
    });

    const response = await getLessonSchedulesForDayWhereGroup(payload);

    if (response.data.result == null) {
      isDisabledButton.value = false;
      return;
    }

    lessonSchedules.value = response.data.result;

    await getPairs();
  } catch (error) {
    console.log(error);
  }
};

async function changeEven() {
  try {
    if (!isDisabledButton.value) {
      even.value = even.value === true ? false : true;
      weekEven.value = even.value === true ? 'Парний тиждень' : 'Непарний тиждень';

      await getSchedule();
    }
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
      const res_lecturer = await getLecturer(schedule.lecturer_id);
      const res_cab = await getCabinet(schedule.cabinet_id);
      const res_building = await getBuilding(
        res_cab.data.result.building_id
      );

      schedule.lecturer_name =
        res_lecturer.data.result.first_name +
        " " +
        res_lecturer.data.result.last_name +
        " " +
        res_lecturer.data.result.second_name;
      schedule.subject_name = res_subj.data.result.name;
      schedule.cabinet_number = res_cab.data.result.number;
      schedule.building_street = res_building.data.result.street;
      schedule.building_color = res_building.data.result.color;

      if (newSchedule.value.length > 0) {
        if (schedule.index - 2 === newSchedule.value.at(-1).index) {
          newSchedule.value.push({
            isWindow: true,
            label: arrLabels[schedule.index - 2].label,
          });
        }
      }

      newSchedule.value.push(schedule);

      isDisabledButton.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

async function updateCurrentWeek() {
  try {
    const res = await getToday();

    const today = res.data.result;

    currentDay.value = today.day_of_week;
    currentEven.value = today.even;
    selectDay.value = today.day_of_week !== SUNDAY ? today.day_of_week : MONDAY;
    even.value = today.day_of_week !== SUNDAY ? today.even : !today.even;
    weekEven.value = even.value === true ? 'Парний тиждень' : 'Непарний тиждень';

    await getSchedule();
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getNameGroup();
  updateCurrentWeek();
});
</script>

<style scoped lang="scss">
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
  color: var(--tg-theme-button-color) !important;
}

.line {
  margin-top: 20px;

  width: 100%;
  height: 1px;

  background: rgba(var(--tg-theme-hint-color-rgb), 0.5);
}

.vertical-line {
  width: 1px;
  height: 98%;

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

  color: var(--white-color);
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

  opacity: 0.5;
}

.wrapper-navigation {
  padding: 10px 0px 20px 16px;

  user-select: none;

  background: rgba(var(--tg-theme-hint-color-rgb), 0.05);

  .wrapper-group-name {
    display: flex;
    align-items: center;
    flex-direction: row;

    margin-bottom: 16px;

    padding-right: 16px;

    .title-sub-head {
      font-weight: 600;

      color: var(--tg-theme-text-color);

      opacity: 0.85;

      margin-right: 8px;
    }

    .img-edit {
      display: flex;
      align-items: center;

      color: var(--tg-theme-hint-color);

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

    padding-right: 16px;

    .wrapper-container-even {
      display: flex;
      align-items: center;

      .circle-even-big {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 16px;
        height: 16px;

        border-radius: 50%;

        margin-right: 7px;

        .circle-even-small {
          width: 10px;
          height: 10px;

          border-radius: inherit;
        }
      }

      .week-even {
        color: var(--tg-theme-hint-color);
      }
    }

    .wrapper-arrow {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 30px;
      height: 30px;

      border-radius: 8px;

      background: var(--tg-theme-hint-color);
      transition: 0.4s;

      &:active {
        animation: rotation-arrows 0.3s;
      }
    }
  }
}

.overflow-week {
  overflow: hidden;
  overflow-x: auto;
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

  color: var(--green-color);

  border: 1px solid var(--green-color);

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
  .mobile-nav {
    display: none !important;
  }

  .wrapper-navigation {
    padding-left: 0 !important;
  }

  .desktop-nav {

    .wrapper-arrow {
      margin-right: 12px;
    }

    .wrapper-group-name {
      margin-bottom: 0;
    }

    .wrapper-even {
      padding-right: 0 !important;
    }
  }

  .main-section {
    flex-direction: row !important;
    padding: 0 !important;
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

  .wrapper-group-name {
    padding-right: 0 !important;
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
