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
        <router-link :to="{ name: 'main' }">
          <MyButton>Перейти</MyButton>
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
