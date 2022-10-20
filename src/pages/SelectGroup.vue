<template>
  <section class="main-section">
    <div class="wrapper-main">
      <h4 class="main-title">Оберіть групу</h4>
      <p class="main-subtitle">Кодова назва вашої групи</p>
      <select v-model.number="selectGroup" class="my-select">
        <option v-for="option in groups" :key="option.id" :value="option.id" class="my-option">
          {{ option.name }}
        </option>
      </select>
      <div class="wrapper-btn">
        <router-link :to="{
          name: 'schedule',
          params: {
            idFaculty: payload.faculty_id,
            numCourse: payload.num_course,
            idGroup: selectGroup,
          },
        }" :class="{ disabled: selectGroup === 0}">
          <MyButton class="btn-blue">Зберегти</MyButton>
        </router-link>
        <router-link :to="{ name: 'course', params: { idFaculty: payload.faculty_id } }">
          <MyButton color="gray">Назад</MyButton>
        </router-link>
      </div>
    </div>
  </section>
</template> 

<script setup>
import MyButton from '../components/UI/MyButton.vue';
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

let selectGroup = ref(0);
let groups = ref({});

const payload = reactive({
  faculty_id: route.params.idFaculty,
  num_course: route.params.numCourse,
});

const faculties = computed(() => store.state.timeTable.faculties);

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
  setGroup();
});

</script>

<style scoped lang="scss">
@import "@/style";
</style>
