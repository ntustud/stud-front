<template>
    <button class="btn">
        <slot></slot>
    </button>
</template> 


<script>
export default {
    name: 'button-blue'
};
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

</style>