<template>
  <MyHeader v-if="!IS_TG_APP"> Студ </MyHeader>
  <router-view></router-view>
</template>

<script setup lang="ts">
import MyHeader from "./components/MyHeader.vue";
import { onBeforeMount } from 'vue'
import { useStore } from "vuex";

const store = useStore();

onBeforeMount(() => {
  store.dispatch('initialiseStore');
})
const IS_TG_APP = window.__IS_TG_WEB_APP__;
</script>

<style lang="scss">
@import "@/style/global.scss";

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: var(--tg-viewport-height);
}
</style>
