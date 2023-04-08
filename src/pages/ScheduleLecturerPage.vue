<template>
  <section class="main-section">
    <div class="wrapper-inner">
      <div class="wrapper-title">
        <h3 class="title">Продовжимо</h3>
        <img src="@/assets/img/eyes.png" alt="eyes-image">
      </div>
      <p class="main-subtitle">Введіть ПІБ, щоб знайти викладача</p>
    </div>
    <div class="wrapper-main-content">
      <el-select 
        class="custom-select-lecturer"
        v-model="selectedLecturer"
        clearable filterable remote reserve-keyword
        placeholder="ПІБ"
        remote-show-suffix loading-text="Завантаження..."
        no-data-text="Нічого не знайдено"
        :remote-method="onSearch"
        :loading="loading"
      >
        <el-option 
          v-for="lecturer in optionsLecturer"
          :key="lecturer.id"
          :label="lecturer.name"
          :value="lecturer.id"
        />
      </el-select>
      <div class="wrapper-buttons">
        <MyButton color="transp" @click="router.push({ name: 'main' })">Назад</MyButton>
        <MyButton :disabled="selectedLecturer === ''" @click="goSchedule" :class="{ disabled: selectedLecturer === '' }">
          Зберегти
        </MyButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import MyButton from '../components/UI/MyButton.vue';
import { ref } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

let optionsLecturer = ref([]);
let selectedLecturer = ref('');
let loading = ref(false)

const searchLecturers = (searchInfo) => store.dispatch('timeTable/searchLecturers', searchInfo);

async function search(loading, searchInfo) {
  try {
    const response = await searchLecturers(searchInfo);
    if (response.data.result == null) {
      return;
    }

    let arrLecturers = response.data.result;
    for (const lecturer in arrLecturers) {
      arrLecturers[lecturer]['name'] = arrLecturers[lecturer].first_name + ' ' + arrLecturers[lecturer].last_name + ' ' + arrLecturers[lecturer].second_name;
    }
    optionsLecturer.value = arrLecturers;
  } catch (error) {
    console.log(error);
  }
}

async function onSearch(searchInfo) {
  try {
    if (searchInfo.length) {
      loading.value = true;
      await search(this.loading, searchInfo);
      loading.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}

async function goSchedule() {
  await store.dispatch('auth/selectSchedule', {
    typeSchedule: 'lecturer',
    select_id: selectedLecturer.value
  });

  await router.push({ name: 'schedule' })
}
</script>

<style lang="scss">
.wrapper-buttons {
  display: flex;

  margin-top: 16px;

  max-width: inherit;
  width: 100%;

  .btn {
    margin-right: 16px;
    width: 100%;

    &:last-child {
      margin-right: 0;
    }
  }
}

.custom-select-lecturer {
  min-width: 100% !important;
  width: 100% !important;

  .el-input__wrapper {
    border: 1px solid rgba(var(--tg-theme-hint-color-rgb), 0.5);
    border-radius: 8px;
    background: none !important;
    box-shadow: none !important;
    padding: 24px 24px !important;

    .el-input__inner {
      font-family: "Open Sans", serif;
      font-weight: 600;
      font-size: 16px;

      color: var(--tg-theme-text-color);

      text-align: left;

      user-select: none !important;
      box-shadow: none !important;
    }
  }
}

.disabled {
  opacity: 0.5;
}
</style>
  