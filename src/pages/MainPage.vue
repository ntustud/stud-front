<template>
    <section class="main-section wrapper-content">
        <div class="wrapper-inner">
            <div class="wrapper-title">
                <h3 class="title">Вітаю!</h3>
                <img src="@/assets/img/img-hi.png" alt="welcome-image">
            </div>
            <p class="main-subtitle">Для початку оберіть для кого бажаєте переглянути розклад занять</p>
        </div>
        <div class="wrapper-select">
            <router-link :to="{ name: 'group' }" class="wrapper-select-btn">
                <span>Для групи</span>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </router-link>
            <div class="horizontal-line"></div>
            <router-link :to="{ name: 'lecturer' }" class="wrapper-select-btn">
                <span>Для викладача</span>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </router-link>
        </div>
    </section>
</template> 

<script setup>
import MyButton from '../components/UI/MyButton.vue';
</script>

<style scoped lang="scss">
.wrapper-select-btn {
    position: relative;

    padding: 24px;

    cursor: pointer;

    svg {
        position: absolute;

        right: 10px;
        top: 30px;

        transition: 0.1s;
    }

    &:hover {
        svg {
            right: 5px;
        }
    }
}
</style>
