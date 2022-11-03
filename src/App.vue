<template>
  <MyHeader> Студ </MyHeader>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import MyHeader from "./components/MyHeader.vue";
</script>

<style lang="scss">
@import "@/style/global.scss";

#app {
  width: 100%;
  height: 100%;
}
</style>
