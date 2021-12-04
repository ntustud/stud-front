<template>
    <section class="faculty-section">
      <div class="wrapper-faculty">
        <h4 class="faculty-title">Оберіть групу</h4>
        <p class="fucylty-subtitle">Кодова назва вашої групи</p>
        <my-select :model-value="selectedGroup" @update:model-value="setsSelectedGroup" :options="groupOptions" :nameSelect="'Група'"></my-select>
        <div class="wrapper-btn">
          <button-blue class="btn-blue" @click="addOptions(); $router.push('');" :disabled="!selectedGroup" :class="{'btn-disabled': !selectedGroup}">Зберегти</button-blue>
          <button-gray @click="$router.push('/course');">Назад</button-gray>
        </div>
      </div>
    </section>
</template> 


<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations({
        setsSelectedGroup: "timeTable/setsSelectedGroup",
    }),

    ...mapActions({
    //   loadMorePosts: "post/loadMorePosts",
    }),

    changeHeaderTitle(text) {
      this.$emit('update:modelValue', text);
    },
  },
  computed: {
      ...mapState({
        // posts: state => state.post.posts,
        selectedGroup: state => state.timeTable.selectedGroup,
        groupOptions: state => state.timeTable.groupOptions,
        selectedOptions: state => state.timeTable.selectedOptions
      }),

     ...mapGetters({
        // sortedPost: 'post/sortedPost',
      }),
  },

  beforeMount(){
    this.changeHeaderTitle('Розклад');
 },

  beforeUnmount(){
    this.changeHeaderTitle('Студ');
 },
};
</script>


<style scoped lang="scss">
@import "@/assets/variables.scss";
.faculty-section {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 70px 16px 16px;

  .wrapper-faculty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    max-width: 300px;
    width: 100%;
    
    .faculty-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 18px;

      margin-bottom: 8px;

      color: $white;
    }
    
    .fucylty-subtitle {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      color: $white;
      opacity: 50%;

      margin-bottom: 16px;
    }
    
    .wrapper-btn {
      display: flex;
      margin-top: 16px;

      .btn-blue {
        margin-right: 12px;
      }
    }
  }
}

.btn-disabled {
  background-color: $d_btn-blue;
}
</style>