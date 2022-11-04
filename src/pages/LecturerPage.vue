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
            <v-select label="name" :filterable="false" :options="optionsLecturer" class="v-select" @search="onSearch"
                @option:selected="selectOptionLecturer" />
            <div class="wrapper-buttons">
                <MyButton :disabled="selectedLecturer.id === 0" @click="router.push({ name: 'main' })"
                    :class="{ disabled: selectedLecturer.id === 0 }">Зберегти</MyButton>
                <MyButton color="transp" @click="router.push({ name: 'main' })">Назад</MyButton>
            </div>
        </div>
    </section>
</template> 
  
<script setup>
import { useStore } from "vuex";
import { ref, reactive, computed, onMounted } from 'vue';
import { UNIVERSITY_ID } from '../../constant';
import MyButton from '../components/UI/MyButton.vue';
import router from "../router/router";
import vSelect from "vue-select";

const store = useStore();

let optionsLecturer = ref([]);
let selectedLecturer = reactive({ id: 0 });

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
        loading(false);
    } catch (error) {
        console.log(error);
    }
};

async function onSearch(searchInfo, loading) {
    if (searchInfo.length) {
        loading(true);
        await search(loading, searchInfo);
    }
};

function selectOptionLecturer(val) {
    selectedLecturer.id = val.id;
};

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

.disabled {
    opacity: 0.5;
}
</style>
  