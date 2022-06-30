<template>
  <section class="faculty-section">
    <div class="wrapper-faculty">
      <h4 class="faculty-title">Оберіть курс</h4>
      <p class="fucylty-subtitle">Номер вашого курсу на факультеті</p>
      <select v-model.number="num_course" class="my-select">
        <option
          v-for="option in arrCourse"
          :key="option"
          :value="option"
          class="my-option"
        >
          {{ option }}
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
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      selectCourse: 0,

      faculty_id: this.$route.params.idFaculty,
      num_course: 1,

      arrCourse: [1, 2, 3, 4, 5],
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
@import "@/assets/variables.scss";
.faculty-section {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 70px 16px 16px;

  .wrapper-faculty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    max-width: 300px;
    width: 100%;

    .faculty-title {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      font-size: 18px;

      margin-bottom: 8px;

      color: $white;
    }

    .fucylty-subtitle {
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      color: $white;
      opacity: 50%;

      margin-bottom: 16px;
    }

    .wrapper-btn {
      display: flex;
      margin-top: 16px;

      .btn-blue {
        margin-right: 12px;
      }
    }
  }
}

.btn-disabled {
  background-color: $d_btn-blue;
}

.my-select {
  border: 1px solid $border-gray;
  box-sizing: border-box;
  border-radius: 5px;

  padding: 12px 0px 12px 12px;

  width: 100%;

  background: transparent;

  color: $white;

  .first-select {
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    background: $black;
  }
  .my-option {
    color: $white;
    background-color: $black;
  }
}

option {
  background: transparent;
}
</style>