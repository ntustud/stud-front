<template>
    <section class="main-section">
        <div class="wrapper-main">
            <h4 class="main-title">Оберіть викладача</h4>
            <p class="main-subtitle">ПІБ викладача</p>
            <v-select label="name" :filterable="false" :options="optionsLecturer" class="v-select" @search="onSearch"
                @option:selected="selectOptionLecturer" />
            <div class="wrapper-btn">
                <router-link :to="{ name: 'schedule-lecturer', params: { idLecturer: selectedLecturer.id } }"
                    :class="{ disabled: selectedLecturer.id === 0 }">
                    <MyButton class="btn-blue">Зберегти</MyButton>
                </router-link>
                <router-link :to="{ name: 'faculty' }">
                    <MyButton color="gray">Назад</MyButton>
                </router-link>
            </div>
        </div>
    </section>
</template> 

<script setup>
import { ref, reactive, onMounted } from 'vue';
import MyButton from '../components/UI/MyButton.vue';
import vSelect from "vue-select";
import { useStore } from "vuex";

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
@import "@/style";

.v-select {
    border: 1px solid $border-gray;
    border-radius: 5px;

    margin: 12px 0px 24px;

    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    width: 100%;
    background: transparent;
    color: $white !important;


}

.vs__dropdown-menu {
    background: $border-gray !important;
}

.vs__search {
    color: white !important;
}
</style>
