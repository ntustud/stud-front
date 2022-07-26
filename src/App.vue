<template>
  <my-header> Студ </my-header>
  <div class="app">
    <router-view></router-view>
  </div>
</template>


<script>
import MyHeader from "./components/MyHeader.vue";

export default {
  components: { MyHeader },
  methods: {},
};
</script>


<style lang="scss">
@import '@/style/global.scss';
@import "@/style";

#app {
  width: 100%;
  height: 100%;
  background-color: $main-backg;
}
</style>
