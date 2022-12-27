<template>
  <MainPanel
    v-bind="{ currentEven: currentEven, 
      even: even, 
      titleEven: titleEven, 
      selectDay: selectDay, 
      titleName: lecturerFullName, 
      currentDay: currentDay 
    }"
    @changeEven="changeEven" 
    @changeDay="changeDay" 
  />
  <section class="main-section" v-loading.fullscreen.lock="loading" element-loading-background="transparent">
    <div class="wrapper-main-section wrapper-content">
      <div class="wrapper-week desktop-nav">
        <div class="wrapper-days" v-for="(day, key) in nameDays" :key="key">
          <input type="radio" :id="key" :value="key" v-model="selectDay" @change="changeDay" class="my-radio" />
          <label :for="key" class="my-label"
            :class="{ 'currentDayColor': (selectDay !== currentDay && key === currentDay) }">
            {{ day }}
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
              <IconWindowBetweenPairs />
              <p class="text-window">
                Вікно
              </p>
            </div>
            <div class="line"></div>
          </template>
          <template v-else>
            <div class="wrapper-pair">
              {{ labels[schedule.index] }}
            </div>
            <div class="wrapper-lesson">
              <span class="type-lesson">{{ typesLesson[schedule.type_lesson] }}</span>
              {{ schedule.subject_name }}
            </div>
            <div class="wrapper-lecturer">
              <IconLecturer />
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
        <PlaceholderHoliday v-if="!loading && !newSchedule.length && !error" />
        <PlaceholderError v-if="error" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from "vuex";
import MainPanel from '../components/MainPanel.vue';
import PlaceholderHoliday from './UI/PlaceholderHoliday.vue';
import PlaceholderError from './UI/PlaceholderError.vue';
import IconWindowBetweenPairs from './icons/IconWindowBetweenPairs.vue';
import IconLecturer from './icons/IconLecturer.vue'
import { NAME_DAYS, LABELS, TYPES_LESSON } from '../../constant';
import { useLecturerFullName } from '../uses/uses';

const store = useStore();

const SUNDAY = 7;
const MONDAY = 1;

const loading = ref(false);
const error = ref(false);

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

const typesLesson = TYPES_LESSON;
const nameDays = NAME_DAYS;
const labels = LABELS;

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

    error.value = true;
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
            label: labels[schedule.index - 1],
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
    lecturerFullName.value = useLecturerFullName(response);
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

onMounted(async () => {
  loading.value = true;

  await getLecturerName();
  await updateCurrentWeek();
})
</script>

<style scoped lang="scss">
@import "@/style/schedule.scss";
</style>
