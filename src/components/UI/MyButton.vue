<template>
  <button class="btn btn-primary" :class="{
    'btn-gray': color === 'gray',
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
@import "@/style";

.btn {
  // font-family: 'Open Sans', sans-serif;
  // font-weight: 400;
  // font-size: 14px;
  background-color: var(--tg-theme-button-color);
  padding: 6px 16px;
  border-radius: 5px;
  border: none;

  &:hover {
    background-color: $btn-blue-hover;
  }

  &:active {
    background-color: $btn-blue-active;
  }
}

.btn-gray {
  &.btn {
    background-color: $btn-gray;

    &:hover {
      background: $btn-gray-hover;
    }

    &:active {
      background: $btn-gray-active;
    }
  }

  &.btn-primary {
    border-color: $translucent-gray !important;
  }
}
</style>
