<template>
    <section class="main-section">
        <div class="wrapper-inner">
            <div class="wrapper-title">
                <h3 class="title">Вітаю!</h3>
                <img src="@/assets/img/img-hi.png" alt="welcome-image">
            </div>
            <p class="main-subtitle">Для початку оберіть для кого бажаєте переглянути розклад занять</p>
        </div>
        <div class="wrapper-select">
            <div class="wrapper-select-btn">
                <router-link :to="{ name: 'group' }">Для групи</router-link>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div class="horizontal-line"></div>
            <div class="wrapper-select-btn">
                <router-link :to="{ name: 'lecturer' }">Для викладача</router-link>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </section>
</template> 

<script setup>
import MyButton from '../components/UI/MyButton.vue';
</script>

<style scoped lang="scss">
@import "@/style";

.main-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 100px 16px 16px;

    .wrapper-inner {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 30px;

        max-width: 500px;
        width: 100%;

        .wrapper-title {
            display: flex;
            flex-direction: row;

            align-items: center;

            margin-bottom: 12px;

            .title {
                font-size: 24px;
                margin-right: 12px;
            }
        }

        img {
            width: 32px;
            height: 32px;
        }

        .main-subtitle {
            font-size: 14px;

            line-height: 19px;
            text-align: center;

            opacity: 0.8;
        }
    }

    .wrapper-select {
        display: flex;
        flex-direction: column;
        text-align: center;

        border: 1px solid currentColor;
        border-radius: 8px;

        max-width: 358px;
        width: 100%;

        opacity: 0.8;

        .wrapper-select-btn {
            position: relative;

            padding: 24px 21px;

            cursor: pointer;

            svg {
                position: absolute;

                right: 21px;
                top: 30px;

                transition: 0.1s;
            }

            &:hover {
                svg {
                    right: 15px;
                }
            }
        }

        .horizontal-line {
            height: 1px;

            margin: 0px 16px;

            background: currentColor;
        }
    }
}
</style>
