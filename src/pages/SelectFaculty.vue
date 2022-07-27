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
        <router-link :to="{ name: 'course', params: { idFaculty: selectFaculty } }" :class="{ disabled: selectFaculty === 0}">
          <MyButton class="btn-blue">Далі</MyButton>
        </router-link>
        <router-link :to="{ name: 'main' }">
          <MyButton color="gray">Назад</MyButton>
        </router-link>
      </div>
    </div>
  </section>
</template> 


<script>
import { mapActions, mapState } from "vuex";
import { UNIVERSITY_ID } from '../../constant';

export default {
  data() {
    return {
      selectFaculty: 0,
      university_id: UNIVERSITY_ID,
    };
  },

  computed: {
    ...mapState({
      faculties: (state) => state.timeTable.faculties,
    }),
  },

  methods: {
    ...mapActions("timeTable", ["getFaculties"]),
  },

  mounted() {
    this.getFaculties(this.university_id);
  },
};
</script>


<style scoped lang="scss">
@import "@/style";
</style>
