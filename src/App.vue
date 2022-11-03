<template>
  <MyHeader v-if="!IS_TG_APP"> Студ </MyHeader>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import MyHeader from "./components/MyHeader.vue";
import { ref, reactive, computed, onMounted } from 'vue';
const IS_TG_APP = window.__IS_TG_WEB_APP__;

onMounted(() => {
    console.log('test', IS_TG_APP);
});
</script>

<style lang="scss">
@import "@/style/global.scss";

#app {
  width: 100%;
  height: 100%;
}
</style>
