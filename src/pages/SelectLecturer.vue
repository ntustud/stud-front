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


<script>
import { mapActions } from "vuex";
import vSelect from "vue-select";

export default {
    data() {
        return {
            optionsLecturer: [],
            selectedLecturer: {id: 0},
        };
    },

    components: {
        "v-select": vSelect,
    },

    methods: {
        ...mapActions("timeTable", ["searchLecturers"]),

        async search(loading, search, vm) {
            try {
                const response = await this.searchLecturers(search);

                if (response.data.result == null) {
                    return;
                }

                let arrLecturers = response.data.result;

                for (const lecturer in arrLecturers) {
                    arrLecturers[lecturer]['name'] = arrLecturers[lecturer].first_name + ' ' + arrLecturers[lecturer].last_name + ' ' + arrLecturers[lecturer].second_name;
                }

                vm.optionsLecturer = arrLecturers;
                loading(false);
            } catch (error) {
                console.log(error);
            }
        },

        onSearch(search, loading) {
            if (search.length) {
                loading(true);
                this.search(loading, search, this);
            }
        },

        selectOptionLecturer(val) {
            this.selectedLecturer.id = val.id;
        },
    },

    mounted() {

    },
};
</script>


<style scoped lang="scss">
@import "@/style";

.v-select {
    margin: 12px 0px 24px;
    width: 100%;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: $black  !important;
    border: 1px solid $black;
    border-radius: 4px;
    background: $white;
}
</style>
