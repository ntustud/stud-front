<template>
  <MainPanel
    v-bind="{ 
      currentEven: currentEven,
      even: even,
      titleEven: titleEven, 
      selectDay: selectDay, 
      titleName: group.name, 
      currentDay: currentDay 
    }"
    @changeEven="changeEven"
    @changeDay="changeDay" 
  />
  <section class="main-section" v-loading.fullscreen.lock="loading" element-loading-background="transparent">
    <div class="wrapper-main-section wrapper-content">
      <div class="wrapper-week desktop-nav">
        <div class="wrapper-days" v-for="(day, key) in nameDays" :key="key">
          <input type="radio" :id="key" :value="key" v-model="selectDay" @change="changeDay" />
          <label :for="key" class="my-label"
            :class="{ 'currentDayColor': (selectDay !== currentDay && key == currentDay && currentEven === even) }">{{ day }}</label>
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
              <span>
                {{ typesLecturerAbbrev[schedule.type_lecturer] }}&nbsp;{{ schedule.lecturer_name }}
              </span>
            </div>
            <template v-if="schedule.additional_lecturers">
              <div class="wrapper-lecturer" v-for="lecturer in schedule.additional_lecturers">
                <IconLecturer />
                {{ typesLecturerAbbrev[schedule.type_lecturer] }}&nbsp;{{ lecturer.lecturer_name }}
              </div>
            </template>
            <div class="wrapper-bottom">
              <div class="wrapper-number" :style="{ background: schedule.building_color }">
                {{ schedule.cabinet_number }}
              </div>
              <div class="wrapper-building">
                {{ schedule.building_street }}
              </div>
            </div>
            <div class="line" :style="{ display: (newSchedule.at(-1).id === schedule.id ? 'none' : 'block') }"></div>
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
import { TYPES_LECTURER_ABBREVIATION, NAME_DAYS, LABELS, TYPES_LESSON } from '../../constant';

const store = useStore();

const SUNDAY = 7;
const MONDAY = 1;

const typesLecturerAbbrev = TYPES_LECTURER_ABBREVIATION;

const loading = ref(false);
const error = ref(false);

const currentEven = ref('');
const currentDay = ref('');

let group_id = computed(() => store.state.auth.select_id);
let group = ref({});
let even = ref(true);
let titleEven = ref("Парний тиждень");
let selectDay = ref("");
let newSchedule = ref([]);
let currentSemester = ref("");
let lessonSchedules = ref("");

const typesLesson = TYPES_LESSON;
const nameDays = NAME_DAYS;
const labels = LABELS;

const getGroup = (group_id) => store.dispatch('timeTable/getGroup', group_id.value);
const getCurrentSemester = () => store.dispatch('timeTable/getCurrentSemester');
const getLessonSchedulesForDayWhereGroup = (info) => store.dispatch('timeTable/getLessonSchedulesForDayWhereGroup', info);
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
      group_id: group_id.value,
      even: even.value,
      day_of_week: selectDay.value,
    });

    const response = await getLessonSchedulesForDayWhereGroup(payload);

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
      const res_lecturer = await getLecturer(schedule.lecturer_id);
      const res_cab = await getCabinet(schedule.cabinet_id);
      const res_building = await getBuilding(
        res_cab.data.result.building_id
      );

      if (Object.keys(schedule.additional_lecturers).length !== 0) {
        schedule.additional_lecturers.forEach(async (e) => {
          const res = await getLecturer(e.id);
          e.lecturer_name = res.data.result.first_name + " " + res.data.result.last_name + " " + res.data.result.second_name;
        });
      }

      schedule.lecturer_name =
        res_lecturer.data.result.first_name +
        " " +
        res_lecturer.data.result.last_name +
        " " +
        res_lecturer.data.result.second_name;
      schedule.type_lecturer = res_lecturer.data.result.type_lecturer;
      schedule.subject_name = res_subj.data.result.name;
      schedule.cabinet_number = res_cab.data.result.number;
      schedule.building_street = res_building.data.result.street;
      schedule.building_color = res_building.data.result.color;

      if (newSchedule.value.length > 0) {
        if (schedule.index - 2 === newSchedule.value.at(-1).index) {
          newSchedule.value.push({
            isWindow: true,
            label: labels[schedule.index - 1],
            day_of_week: schedule.day_of_week,
            even: schedule.even
          });
        }
      }

      newSchedule.value.push(schedule);
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

async function getGroupName() {
  try {
    const response = await getGroup(group_id);

    group.value = response.data.result;
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

  await getGroupName();
  await updateCurrentWeek();
})
</script>

<style scoped lang="scss">
@import "@/style/schedule.scss";
</style>
