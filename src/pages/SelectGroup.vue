<template>
  <section class="main-section">
    <div class="wrapper-main">
      <h4 class="main-title">Оберіть групу</h4>
      <p class="main-subtitle">Кодова назва вашої групи</p>
      <select v-model.number="selectGroup" class="my-select">
        <option
          v-for="option in groups"
          :key="option.id"
          :value="option.id"
          class="my-option"
        >
          {{ option.name }}
        </option>
      </select>
      <div class="wrapper-btn">
        <router-link
          :to="{
            name: 'schedule',
            params: {
              idFaculty: payload.faculty_id,
              numCourse: payload.num_course,
              idGroup: selectGroup,
            },
          }"
          :class="{ disabled: selectGroup === 0}"
        >
          <MyButton class="btn-blue">Далі</MyButton>
        </router-link>
        <router-link
          :to="{ name: 'course', params: { idFaculty: payload.faculty_id } }"
        >
          <MyButton color="gray">Назад</MyButton>
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
      selectGroup: 0,
      payload: {
        faculty_id: this.$route.params.idFaculty,
        num_course: this.$route.params.numCourse,
      },
      groups: {},
    };
  },

  computed: {
    ...mapState({
      faculties: (state) => state.timeTable.faculties,
    }),
  },

  methods: {
    ...mapActions("timeTable", ["getGroupsWhereFacultyAndCourse"]),

    async setGroup() {
      try {
        const response = await this.getGroupsWhereFacultyAndCourse(
          this.payload
        );

        this.groups = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.setGroup();
  },
};
</script>


<style scoped lang="scss">
@import "@/style";
</style>