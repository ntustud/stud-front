<template>
  <component :is="tabs[currentTab]"></component>
</template>
  
<script setup>
import ScheduleGroup from "../components/ScheduleGroup.vue";
import ScheduleLecturer from "../components/ScheduleLecturer.vue";
import { computed } from 'vue'
import { useStore } from "vuex";

const store = useStore();

const typeSchedule = computed(() => store.state.auth.typeSchedule);
const currentTab = typeSchedule.value === 'group' ? 'ScheduleGroup' : 'ScheduleLecturer';

const tabs = {
  ScheduleGroup,
  ScheduleLecturer,
}
</script>
  
<style scoped lang="scss"></style>
  