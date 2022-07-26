<template>
  <section class="main-section">
    <div class="wrapper-main">
      <h4 class="main-title">Оберіть курс</h4>
      <p class="main-subtitle">Номер вашого курсу на факультеті</p>
      <select v-model.number="num_course" class="my-select">
        <option
          v-for="option in arrCourse"
          :key="option.id"
          :value="option.id"
          class="my-option"
        >
          {{ option.id }}
        </option>
      </select>
      <div class="wrapper-btn">
        <router-link
          :to="{
            name: 'group',
            params: { idFaculty: faculty_id, numCourse: num_course },
          }"
        >
          <button-blue class="btn-blue">Далі</button-blue>
        </router-link>
        <router-link :to="{ name: 'faculty' }">
          <button-gray>Назад</button-gray>
        </router-link>
      </div>
    </div>
  </section>
</template> 


<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectCourse: 0,

      faculty_id: this.$route.params.idFaculty,
      num_course: 1,

      arrCourse: [{id: 1}, {id: 2}, {id: 3}, {id:4}, {id:5}],
    };
  },

  computed: {
    ...mapState({
      faculties: (state) => state.timeTable.faculties,
    }),
  },

  methods: {
  },
};
</script>


<style scoped lang="scss">
@import "@/style";
</style>