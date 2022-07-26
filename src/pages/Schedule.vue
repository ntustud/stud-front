<template>
  <section class="faculty-section">
    <div class="wrapper-faculty">
      <h4 class="faculty-title">Розклад</h4>
      <p class="fucylty-subtitle">{{ group.name }}</p>
      <div class="mb-3">
        <input
          type="radio"
          id="one"
          class="input-radio"
          :value="true"
          v-model="even"
          @change="getSchedule"
        />
        <label for="one" style="margin-right: 16px">Парна</label>

        <input
          type="radio"
          id="two"
          class="input-radio"
          :value="false"
          v-model="even"
          @change="getSchedule"
        />
        <label for="two" style="margin-right: 16px">Не парна</label>
      </div>
      <label for="one" style="color: white; margin-top: 15px"
        >Оберіть день тижня</label
      >
      <select
        v-model="selectDay"
        class="my-select"
        style="margin-top: 20px"
        @change="getSchedule"
      >
        <option
          v-for="day in days"
          :key="day.id"
          :value="day.id"
          class="my-option"
        >
          {{ day.name }}
        </option>
      </select>

      <div
        class="wrapper-schedule"
        v-for="schedule in newSchedule"
        :key="schedule.id"
      >
        <div class="wrapper-pair">
          {{ arrLabels[schedule.index].label }}
        </div>
        <div class="wrapper-lesson">
          {{ schedule.subject_name }}
        </div>
        <div class="wrapper-lecturer">
          <img
            src="../assets/img/lecturer.png"
            alt="icon"
            class="img-lecturer"
          />
          {{ schedule.lecturer_name }}
        </div>
        <div class="wrapper-bottom">
          <div class="wrapper-number">
            {{ schedule.cabinet_number }}
          </div>
          <div class="wrapper-building">
            {{ schedule.building_name }}
          </div>
        </div>

        <div class="line"></div>
      </div>
    </div>
  </section>
</template> 

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      group_id: parseInt(this.$route.params.idGroup),
      group: {},
      even: false,
      selectDay: "",
      days: [
        { id: 1, name: "Понеділок" },
        { id: 2, name: "Вівторок" },
        { id: 3, name: "Середа" },
        { id: 4, name: "Четвер" },
        { id: 5, name: "П'ятниця" },
        { id: 6, name: "Субота" },
      ],
      newSchedule: [],
      currentSemester: "",
      lessonSchedules: "",
      lessonPlan: {},
      lecturer: {},
      cabinet: {},
      subject: {},
      arrLabels: [
        { label: "8:30 — 9:50", index: 1 },
        { label: "10:00 — 11:20", index: 2 },
        { label: "11:30 — 12:50", index: 3 },
        { label: "13:10 — 14:30", index: 4 },
        { label: "14:40 — 16:00", index: 5 },
        { label: "16:10 — 17:30", index: 6 },
        { label: "17:40 — 19:00", index: 7 },
      ],
    };
  },

  methods: {
    ...mapActions("timeTable", ["getGroup"]),
    ...mapActions("timeTable", ["getCurrentSemester"]),
    ...mapActions("timeTable", ["getLessonSchedulesForDayWhereGroup"]),
    ...mapActions("timeTable", ["getLessonPlan"]),
    ...mapActions("timeTable", ["getLecturer"]),
    ...mapActions("timeTable", ["getCabinet"]),
    ...mapActions("timeTable", ["getSubject"]),
    ...mapActions("timeTable", ["getBuilding"]),

    async getNameGroup() {
      try {
        const response = await this.getGroup(this.group_id);

        this.group = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },

    async getSchedule() {
      try {
        this.newSchedule = [];

        if (this.selectDay == "") {
          return;
        }

        const resp_semester = await this.getCurrentSemester();
        this.currentSemester = resp_semester.data.result;

        const payload = {
          semester_id: this.currentSemester.id,
          group_id: this.group_id,
          even: this.even,
          day_of_week: this.selectDay,
        };

        const response = await this.getLessonSchedulesForDayWhereGroup(payload);

        this.lessonSchedules = response.data.result;

        this.getPairs();
      } catch (error) {
        console.log(error);
      }
    },

    async getPairs() {
      try {
        for (const schedule of this.lessonSchedules) {
          const res_lesson_plan = await this.getLessonPlan(
            schedule.lesson_plan_id
          );
          const res_subj = await this.getSubject(
            res_lesson_plan.data.result.subject_id
          );
          const res_lecturer = await this.getLecturer(schedule.lecturer_id);
          const res_cab = await this.getCabinet(schedule.cabinet_id);
          const res_building = await this.getBuilding(
            res_cab.data.result.building_id
          );

          schedule.lecturer_name =
            res_lecturer.data.result.first_name +
            " " +
            res_lecturer.data.result.last_name +
            " " +
            res_lecturer.data.result.second_name;
          schedule.subject_name = res_subj.data.result.name;
          schedule.cabinet_number = res_cab.data.result.number;
          schedule.building_name = res_building.data.result.name;
          this.newSchedule.push(schedule);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getNameGroup();
  },
};
</script>


<style scoped lang="scss">
@import "@/style";
.wrapper-bottom {
    display: flex;
    align-items: center;
}

.line {
    margin-top: 20px;
    max-width: 288px;
    width: 100%;
    height: 1px;
    background: #3D3D41;
}
.wrapper-number {
    margin-right: 8px;
    padding: 4px 8px;
    background: #5FB7D1;
    border-radius: 5px;
}

.faculty-section {
    font-family: 'Open Sans', sans-serif;
}
.img-lecturer {
  margin-right: 10px;
}

.wrapper-lecturer {
    margin-bottom: 12px;
}
.wrapper-schedule {
  display: flex;
  flex-direction: column;
  color: white;
  margin-top: 15px;
}

.wrapper-lesson {
  margin: 15px 0px 12px 0px;
  font-weight: 400;
}
.mb-3 {
  display: flex;
  color: white;
}
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