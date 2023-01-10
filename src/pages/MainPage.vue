<template>
    <section class="main-section wrapper-content">
        <div class="wrapper-inner">
            <div class="wrapper-title">
                <h3 class="title">Вітаю!</h3>
                <img src="@/assets/img/img-hi.png" alt="welcome-image">
            </div>
            <p class="main-subtitle">Для початку оберіть для кого бажаєте переглянути розклад занять</p>
        </div>
        <div class="wrapper-main-content">
            <div class="wrapper-select">
                <router-link :to="{ name: 'group' }" class="wrapper-select-btn">
                    <span>Для групи</span>
                    <IconRightArrow />
                </router-link>
                <div class="horizontal-line"></div>
                <router-link :to="{ name: 'lecturer' }" class="wrapper-select-btn">
                    <span>Для викладача</span>
                    <IconRightArrow />
                </router-link>
            </div>
        </div>
    </section>
</template> 

<script setup>
import IconRightArrow from '../components/icons/IconRightArrow.vue';
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

        color: rgba(var(--tg-theme-hint-color-rgb), 0.5);
    }

    &:hover {
        svg {
            right: 5px;
        }
    }
}
</style>
