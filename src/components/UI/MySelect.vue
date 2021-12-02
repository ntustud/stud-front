<template>
    <select v-model="modelValue" @change="changeOption" class="my-select">
        <option disabled value="" class="first-select"> {{ nameSelect }} </option>
        <option v-for="option in options" :key="option.value" :value="option.value" class="my-option"> {{ option.name }} </option>
    </select>
</template> 


<script>
    export default {
        name: 'my-select',
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            },
            nameSelect: {
                type: String
            }
        },

        methods: {
            changeOption(event) {
                this.$emit('update:modelValue', event.target.value);
            }
        }
    };
</script>


<style scoped lang="scss">
@import "@/assets/variables.scss";

    .my-select {
        border: 1px solid $border-gray;
        box-sizing: border-box;
        border-radius: 5px;

        padding: 12px 0px 12px 12px;

        width: 100%;

        background: transparent;

        color: $white;

        .first-select {
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;

            opacity: 50%;
            background: $black;
        }
        .my-option {
            color: $white;
            background-color: $black;
        }
    }

    option {
        background: transparent;
    }
</style>