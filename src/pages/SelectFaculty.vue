<template>
  <section class="main-section">
    <div class="wrapper-main">
      <h4 class="main-title">Оберіть факультет</h4>
      <p class="main-subtitle">Кодова назва вашого факультету</p>
      <select v-model.number="selectFaculty" class="my-select">
        <option v-for="option in faculties" :key="option.id" :value="option.id" class="my-option">
          {{ option.name }}
        </option>
      </select>
      <div class="wrapper-btn">
        <router-link :to="{ name: 'course', params: { idFaculty: selectFaculty } }"
          :class="{ disabled: selectFaculty === 0 }">
          <MyButton class="btn-blue">Далі</MyButton>
        </router-link>
        <router-link :to="{ name: 'main' }">
          <MyButton color="gray">Назад</MyButton>
        </router-link>
      </div>
      <div class="wrapper-bottom">
        <div class="line"></div>
        <p class="bottom-title">Розклад для викладачів</p>
        <router-link :to="{ name: 'lecturer' }">
          <MyButton>Перейти</MyButton>
        </router-link>
      </div>
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
  // computed(() => {
  //   mapState({
  //     faculties: () => store.timeTable.faculties,
  //   })
  // });

  // mapActions("timeTable", ["getFaculties"]),

  onMounted(() => {
    getFaculties(universityID.value);
  });

</script>


<style scoped lang="scss">
@import "@/style";

.wrapper-bottom {
  width: 100%;

  .line {
    margin: 20px 0px;
    max-width: 288px;
    width: 100%;
    height: 1px;
    background: #3D3D41;
  }


  .bottom-title {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    color: $white;
    opacity: 0.75;
    margin-bottom: 16px;
  }
}
</style>
