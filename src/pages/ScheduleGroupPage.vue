<template>
  <section class="main-section">
    <div class="wrapper-inner">
      <div class="wrapper-title">
        <h3 class="title">Продовжимо</h3>
        <img src="@/assets/img/eyes.png" alt="eyes-image">
      </div>
      <p class="main-subtitle">Тепер оберіть ваш курс, факультет та групу</p>
    </div>
    <div class="wrapper-main-content">
      <div class="wrapper-select">
        <el-select 
          v-model.number="selectFaculty"
          class="custom-select"
          clearable placeholder="Факультет"
          size="large"
          loading-text="Завантаження..."
          no-data-text="Нічого не знайдено"
          @change="changeSelect('Faculty')"
        >
          <el-option 
            v-for="faculty in faculties"
            :key="faculty.id"
            :value="faculty.id"
            :label="faculty.name"
          />
        </el-select>
        <div class="horizontal-line"></div>
        <el-select 
          v-model.number="selectCourse"
          class="custom-select"
          :disabled="selectFaculty === ''"
          clearable
          placeholder="Курс"
          size="large"
          loading-text="Завантаження..."
          no-data-text="Нічого не знайдено"
          @change="changeSelect('Course')"
        >
          <el-option v-for="option in arrCourses" :key="option.id" :value="option.id" :label="option.id" />
        </el-select>
        <div class="horizontal-line"></div>
        <el-select 
          v-model.number="selectGroup"
          class="custom-select"
          :disabled="selectCourse === ''"
          empty="Групи відсутні"
          clearable
          placeholder="Група"
          size="large"
          loading-text="Завантаження..."
          no-data-text="Нічого не знайдено"
        >
          <el-option v-for="group in groups" :key="group.id" :value="group.id" :label="group.name" />
        </el-select>
      </div>
      <div class="wrapper-buttons">
        <MyButton color="transp" @click="router.push({ name: 'main' })">
          Назад
        </MyButton>
        <MyButton :disabled="selectGroup === ''" @click="goSchedule" :class="{ disabled: selectGroup === '' }">
          Зберегти
        </MyButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import MyButton from '../components/UI/MyButton.vue';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

let selectFaculty = ref('');
let selectCourse = ref('');
let selectGroup = ref('');

let groups = ref({});

const arrCourses = reactive([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);

const faculties = computed(() => store.state.timeTable.faculties);

const getFaculties = () => store.dispatch('timeTable/getFaculties');
const getGroupsWhereFacultyAndCourse = (payload) => store.dispatch('timeTable/getGroupsWhereFacultyAndCourse', payload);

async function setGroup() {
  try {
    const response = await getGroupsWhereFacultyAndCourse({ faculty_id: selectFaculty.value, num_course: selectCourse.value });

    groups.value = response.data.result;
  } catch (error) {
    console.log(error);
  }
}

async function changeSelect(type) {
  try {
    if (type === 'Faculty') {
      selectCourse.value = '';

    }

    selectGroup.value = '';
    groups.value = {};

    if (type === 'Course') {
      await setGroup();
    }
  } catch (error) {
    console.log(error);
  }
}

async function goSchedule() {
  store.dispatch('auth/selectSchedule', {
    typeSchedule: 'group',
    select_id: selectGroup.value
  });

  router.push({ name: 'schedule' });
}

onMounted(async () => {
  await getFaculties();
});
</script>

<style lang="scss">
.wrapper-buttons {
  display: flex;

  margin-top: 16px;
  margin-bottom: 50px;

  max-width: inherit;
  width: 100%;

  .btn {
    margin-right: 16px;
    width: 100%;

    &:last-child {
      margin-right: 0;
    }
  }
}

.disabled {
  opacity: 0.5;
}
</style>
  