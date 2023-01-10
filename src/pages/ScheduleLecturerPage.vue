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
                @option:selected="selectOptionLecturer" placeholder="ПІБ">
                <template #no-options>
                    Введіть ПІБ викладача
                </template>
            </v-select>
            <div class="wrapper-buttons">
                <MyButton color="transp" @click="router.push({ name: 'main' })">Назад</MyButton>
                <MyButton 
                    :disabled="selectedLecturer.id === 0" 
                    @click="goSchedule"
                    :class="{ disabled: selectedLecturer.id === 0 }"
                >
                Зберегти
                </MyButton>
            </div>
        </div>
    </section>
</template> 
  
<script setup>
import { UNIVERSITY_ID } from '../../constant';
import MyButton from '../components/UI/MyButton.vue';
import vSelect from "vue-select";
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

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
}

async function onSearch(searchInfo, loading) {
    try {
        if (searchInfo.length) {
            loading(true);
            await search(loading, searchInfo);
        }
    } catch (error) {
        console.log(error);
    }
}

function selectOptionLecturer(val) {
    selectedLecturer.id = val.id;
}

async function goSchedule() {
    store.dispatch('auth/selectSchedule', {
        typeSchedule: 'lecturer',
        select_id: selectedLecturer.id
    });

    router.push({ name: 'schedule' })
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

.disabled {
    opacity: 0.5;
}

.vs__selected {
    color: var(--tg-theme-text-color);
}

.vs__search {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 16px;

    color: var(--tg-theme-text-color);
}

.vs__dropdown-toggle {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 16px;

    border: 1px solid rgba(var(--tg-theme-hint-color-rgb), 0.5);

    padding: 20px;
}

.vs__dropdown-menu {
    background: var(--tg-theme-bg-color);
}

.vs__dropdown-option {
    color: var(--tg-theme-text-color);
}
</style>
  