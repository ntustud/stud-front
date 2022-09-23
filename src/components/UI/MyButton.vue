<template>
  <button class="btn btn-primary" :class="{
    'btn-red': props.color === 'red',
    'btn-gray': props.color === 'gray',
    'btn-white': props.color === 'white',
  }" type="submit">
    <slot></slot>
  </button>
</template> 

<script setup>
const props = defineProps(['color']);
</script>

<style scoped lang="scss">
@import "@/style";

.btn {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  background-color: $btn-blue;
  color: $white;
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

.btn-red {
  &.btn {
    background-color: $white;
    border: 1px solid $red;
    color: $red;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;

    &:hover {
      border: 3px solid $red;
    }

    &:active {
      border: 2px solid $red;
    }
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

.btn-white {
  color: $main-color;

  &.btn {
    background-color: $white;

    &:hover {
      background: $btn-white-hover;
    }

    &:active {
      background: $btn-white-active;
    }
  }
}
</style>
