<template>
  <div class="burger-menu" :class="{ 'burder-menu-open': props.open }">
    <div class="burder-menu__content">
      <a href="https://t.me/ntustud">Канал</a>
      <a href="https://t.me/ntustud_bot">Допомога</a>
    </div>
  </div>
</template> 
  
<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  }
})
</script>
  
<style scoped lang="scss">
.burger-menu {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 80px;
  transform: translateY(-120%);
  height: calc(100vh - 80px);
  width: 100%;
  z-index: 1000;
  background-color: #1F1F1F;
  transition: ease 0.2s;
  overflow: hidden;

  .burder-menu__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 130px;

    a {
      font-family: 'Montserrat';
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 16px;
    }
  }
}

.burder-menu-open {
  transform: translateY(0);
}

@media screen and (min-width: 576px) {
  .burger-menu {
    display: none;
  }
}
</style>
  