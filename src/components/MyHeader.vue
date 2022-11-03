<template>
    <header class="header">
        <div class="wrapper-header wrapper-content">
            <div class="wrapper-logo">
                <router-link :to="{ name: 'main' }" class="logo-link">
                    <img src="@/assets/img/logo.png" alt="logo-img">
                </router-link>
                <div class="verical-line"></div>
                <p class="header-title">
                    <slot></slot>
                </p>
            </div>
            <div class="wrapper-navbar">
                <nav class="navbar">
                    <a href="https://t.me/ntustud" class="nav-link">Канал</a>
                    <a href="https://t.me/ntustud_bot">Допомога</a>
                </nav>
                <div class="wrapper-burger">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M15.75 6C15.75 5.58579 15.4142 5.25 15 5.25H1C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75H15C15.4142 6.75 15.75 6.41421 15.75 6Z"
                            fill="currentColor" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M15.75 1C15.75 0.585786 15.4142 0.25 15 0.25H1C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H15C15.4142 1.75 15.75 1.41421 15.75 1Z"
                            fill="currentColor" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M15.75 11C15.75 10.5858 15.4142 10.25 15 10.25H1C0.585786 10.25 0.25 10.5858 0.25 11C0.25 11.4142 0.585786 11.75 1 11.75H15C15.4142 11.75 15.75 11.4142 15.75 11Z"
                            fill="currentColor" />
                    </svg>
                </div>
            </div>
        </div>
    </header>
</template> 

<script setup>
</script>

<style scoped lang="scss">
@import "@/style";

.header {
    background-color: var(--secondary_bg_color);
    padding: 18px 16px;

    .wrapper-header {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
        align-items: center;

        .wrapper-logo {
            display: flex;
            flex-direction: row;
            align-items: center;

            user-select: none;

            .verical-line {
                width: 1px;
                height: 20px;
                background-color: var(--tg-theme-hint-color);

                margin: 0px 8px 0px 12px;
            }

            .header-title {
                color: var(--tg-theme-hint-color);
                font-family: 'Montserrat', sans-serif;
            }
        }

        .wrapper-navbar {

            .navbar {
                display: none;

                .nav-link {
                    margin-right: 24px;
                }
            }

            .wrapper-burger {
                user-select: none;
                cursor: pointer;
            }
        }
    }
}

@media screen and (min-width: 576px) {
    .navbar{
        display: block !important;
    }

    .wrapper-burger {
        display: none;
    }
}
</style>
