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
                <select v-model.number="selectFaculty" class="my-select" @change="changeSelect('Faculty')">
                    <option value="0" selected disabled hidden>Факультет</option>
                    <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id" class="my-option">
                        {{ faculty.name }}
                    </option>
                </select>
                <div class="horizontal-line"></div>
                <select v-model.number="selectCourse" class="my-select" :disabled="selectFaculty === 0"
                    @change="changeSelect('Course')">
                    <option value="0" selected disabled hidden>Курс</option>
                    <option v-for="option in arrCourses" :key="option.id" :value="option.id" class="my-option">
                        {{ option.id }}
                    </option>
                </select>
                <div class="horizontal-line"></div>
                <select v-model.number="selectGroup" class="my-select" :disabled="selectCourse === 0" @click="setGroup">
                    <option value="0" selected disabled hidden>Група</option>
                    <option v-for="option in groups" :key="option.id" :value="option.id" class="my-option">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="wrapper-buttons">
                <MyButton :disabled="selectGroup === 0" @click="router.push({ name: 'main' })"
                    :class="{ disabled: selectGroup === 0 }">Зберегти</MyButton>
                <MyButton color="transp" @click="router.push({ name: 'main' })">Назад</MyButton>
            </div>
        </div>
    </section>
</template> 
  
<script setup>
import { useStore } from "vuex";
import { ref, reactive, computed, onMounted } from 'vue';
import { UNIVERSITY_ID } from '../../constant';
import MyButton from '../components/UI/MyButton.vue';
import router from "../router/router";

const store = useStore();

const universityID = ref(UNIVERSITY_ID);

let selectFaculty = ref(0);
let selectCourse = ref(0);
let selectGroup = ref(0);

let groups = ref({});

const arrCourses = reactive([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);

const faculties = computed(() => store.state.timeTable.faculties);
const getFaculties = (universityID) => store.dispatch('timeTable/getFaculties', universityID);
const getGroupsWhereFacultyAndCourse = (payload) => store.dispatch('timeTable/getGroupsWhereFacultyAndCourse', payload);

async function setGroup() {
    try {
        const response = await getGroupsWhereFacultyAndCourse({ faculty_id: selectFaculty.value, num_course: selectCourse.value });

        groups.value = response.data.result;
    } catch (error) {
        console.log(error);
    }
};

function changeSelect(type) {
    if (type === 'Faculty') {
        selectCourse.value = 0;
        selectGroup.value = 0;
    } else if (type === 'Course') {
        selectGroup.value = 0;
    }
};

onMounted(() => {
    getFaculties(universityID.value);
});
</script>
  
<style lang="scss">
.wrapper-buttons {
    display: flex;

    margin-top: 16px;

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
  