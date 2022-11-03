<template>
    <section class="main-section">
        <div class="wrapper-inner">
            <div class="wrapper-title">
                <h3 class="title">Продовжимо</h3>
                <img src="@/assets/img/eyes.png" alt="eyes-image">
            </div>
            <p class="main-subtitle">Тепер оберіть ваш курс, факультет та групу</p>
        </div>
        <div class="wrapper-select">
            <select v-model.number="selectFaculty" class="my-select">
                <option value="0" selected disabled hidden>Факультет</option>
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id" class="my-option">
                    {{ faculty.name }}
                </option>
            </select>
            <div class="horizontal-line"></div>
            <select v-model.number="selectCourse" class="my-select" :disabled="selectFaculty === 0">
                <option value="0" selected disabled hidden>Курс</option>
                <option v-for="option in arrCourses" :key="option.id" :value="option.id" class="my-option">
                    {{ option.id }}
                </option>
            </select>
            <div class="horizontal-line"></div>
            <select v-model.number="selectGroup" class="my-select" :disabled="selectCourse === 0">
                <option value="0" selected disabled hidden>Група</option>
                <option v-for="option in groups" :key="option.id" :value="option.id" class="my-option">
                    {{ option.name }}
                </option>
            </select>
        </div>
    </section>
</template> 
  
<script setup>
import { useStore } from "vuex";
import { ref, reactive, computed, onMounted } from 'vue';
import { UNIVERSITY_ID } from '../../constant';
import MyButton from '../components/UI/MyButton.vue';

const store = useStore();

const universityID = ref(UNIVERSITY_ID);

const selectFaculty = ref(0);
const selectCourse = ref(0);
const selectGroup = ref(0);

let groups = ref({});

const payload = reactive({
  faculty_id: selectFaculty.value,
  num_course: selectCourse.value,
});

const arrCourses = reactive([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);

const faculties = computed(() => store.state.timeTable.faculties);
const getFaculties = (universityID) => store.dispatch('timeTable/getFaculties', universityID);
const getGroupsWhereFacultyAndCourse = (payload) => store.dispatch('timeTable/getGroupsWhereFacultyAndCourse', payload);

async function setGroup() {
  try {
    const response = await getGroupsWhereFacultyAndCourse(payload);

    groups.value = response.data.result;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
    getFaculties(universityID.value);
});
</script>
  
<style lang="scss">

</style>
  