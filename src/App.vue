<template>
  <my-header> {{ headerText }} </my-header>
  <div class="app">
    <router-view @update:model-value="setHeaderText"></router-view>
  </div>
</template>


<script>
import MyHeader from './components/MyHeader.vue'
import { mapState, mapMutations } from "vuex"

    export default {
      components: { MyHeader },
      methods: {
      ...mapMutations({
          // setPage: 'post/setPage',
          // setSearchQuery: 'post/setSearchQuery',
          setHeaderText: 'timeTable/setHeaderText'
      }),

      // createPost(post) {
      //   this.posts.push(post);
      //   this.dialogVisible = false;
      // },
    },

    computed: {
        ...mapState({
          headerText: state => state.timeTable.headerText,
        }),
      },
    };
</script>


<style lang="scss">
  @import "@/assets/variables.scss";
  #app {
    width: 100%;
    height: 100%;
    background-color: $main-backg;
  }
</style>
