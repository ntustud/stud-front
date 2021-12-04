<template>
    <button class="btn">
        <slot></slot>
    </button>
</template> 


<script>
export default {
    name: 'button-gray'
};
</script>


<style scoped lang="scss">
    @import "@/assets/variables.scss";

.btn {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
    background-color: $btn-gray;
    color: $white;
    padding: 6px 16px;
    border-radius: 5px;
    border: none;

    &:hover {
        background: $btn-gray-hover;
    }

    &:active {
        background: $btn-gray-active;
    }
}

</style>