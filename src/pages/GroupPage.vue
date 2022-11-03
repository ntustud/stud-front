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
            <select v-model.number="selectFaculty" class="my-select">
                <option value="0" selected disabled hidden>Курс</option>
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id" class="my-option">
                    {{ faculty.name }}
                </option>
            </select>
            <div class="horizontal-line"></div>
            <select v-model.number="selectFaculty" class="my-select">
                <option value="0" selected disabled hidden>Група</option>
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id" class="my-option">
                    {{ faculty.name }}
                </option>
            </select>
        </div>
    </section>
</template> 
  
<script setup>
import { useStore } from "vuex";
import { ref, computed, onMounted } from 'vue';
import { UNIVERSITY_ID } from '../../constant';
import MyButton from '../components/UI/MyButton.vue';

const store = useStore();

const selectFaculty = ref(0);
const universityID = ref(UNIVERSITY_ID);

const faculties = computed(() => store.state.timeTable.faculties);
const getFaculties = (universityID) => store.dispatch('timeTable/getFaculties', universityID);

onMounted(() => {
    getFaculties(universityID.value);
});
</script>
  
<style lang="scss">

</style>
  