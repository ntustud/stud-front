<template>
    <ScheduleGroup v-if="typeSchedule === 'group'" />
    <ScheduleLecturer v-else-if="typeSchedule === 'lecturer'" />
</template>
  
<script setup>
import ScheduleGroup from "../components/ScheduleGroup.vue";
import ScheduleLecturer from "../components/ScheduleLecturer.vue";
import { computed } from 'vue'
import { useStore } from "vuex";

const store = useStore();

const typeSchedule = computed(() => store.state.auth.typeSchedule);
</script>
  
<style scoped lang="scss">

</style>
  