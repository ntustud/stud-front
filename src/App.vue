<template>
  <MyHeader> Студ </MyHeader>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import MyHeader from "./components/MyHeader.vue";
</script>

<style lang="scss">
//@import '@/style/global.scss';
//@import "@/style";

#app {
  width: 100%;
  height: 100%;
}
</style>
