<template>
  <section class="main-section">
    <div class="wrapper-main">
      <h4 class="main-title">Оберіть курс</h4>
      <p class="main-subtitle">Номер вашого курсу на факультеті</p>
      <select v-model.number="numCourse" class="my-select">
        <option v-for="option in arrCourse" :key="option.id" :value="option.id" class="my-option">
          {{ option.id }}
        </option>
      </select>
      <div class="wrapper-btn">
        <router-link :to="{
          name: 'group',
          params: { idFaculty: facultyID, numCourse: numCourse },
        }">
          <MyButton class="btn-blue">Далі</MyButton>
        </router-link>
        <router-link :to="{ name: 'faculty' }">
          <MyButton color="gray">Назад</MyButton>
        </router-link>
      </div>
    </div>
  </section>
</template> 

<script setup>
import MyButton from '../components/UI/MyButton.vue';
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const faculties = computed(() => store.state.timeTable.faculties);

const arrCourse = reactive([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
const facultyID = ref(route.params.idFaculty);
const selectCourse = ref(0);
const numCourse = ref(1);
</script>

<style scoped lang="scss">
@import "@/style";
</style>
