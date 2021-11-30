<template>
  <my-header></my-header>
  <div class="app">
    <router-view></router-view>
  </div>
</template>


<script>
import MyHeader from './components/MyHeader.vue'
    export default {
      components: { MyHeader },
    };
</script>


<style lang="scss">
  @import "@/assets/variables.scss";
  #app {
    width: 100%;
    height: 100%;
    background-color: $main-backg;
  }

  .app {
    height: 100%;
  }
</style>
