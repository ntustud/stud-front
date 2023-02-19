<template>
    <header class="header">
        <div class="wrapper-header wrapper-content">
            <div class="wrapper-logo">
                <router-link :to="{ name: 'main' }" class="logo-link">
                    <IconLogo />
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
                    <IconBurger />
                </div>
            </div>
        </div>
    </header>
</template> 

<script setup>
import IconLogo from './icons/IconLogo.vue';
import IconBurger from './icons/IconBurger.vue';
</script>

<style scoped lang="scss">
.wrapper-logo {
    svg {
        color: var(--tg-theme-button-color);
    }
}

.wrapper-burger {
    svg {
        color: var(--tg-theme-text-color);
    }
}

.header {
    background: rgba(var(--tg-theme-hint-color-rgb), 0.05);
    padding: 18px 16px 24px;

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
                font-family: 'Montserrat', sans-serif;
                font-size: 18px;

                color: var(--tg-theme-hint-color);
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
    .navbar {
        display: block !important;
    }

    .wrapper-burger {
        display: none;
    }
}
</style>
