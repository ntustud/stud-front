<template>
  <button class="btn" :class="{
    'btn-transp': color === 'transp',
  }" type="submit">
    <slot></slot>
  </button>
</template> 

<script setup>
const { color } = defineProps({
  color: String,
});
</script>

<style scoped lang="scss">
.btn {
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;

  background-color: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);

  padding: 14px 16px;

  border-radius: 8px;
  border: none;

  &:hover,
  &:active {
    opacity: 0.7;
  }
}

.btn-transp {
  border: 2px solid var(--tg-theme-button-color);
  background-color: transparent;

  color: var(--tg-theme-button-color);
}
</style>
