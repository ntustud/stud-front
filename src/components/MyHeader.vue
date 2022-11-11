<template>
    <header class="header">
        <div class="wrapper-header wrapper-content">
            <div class="wrapper-logo">
                <router-link :to="{ name: 'main' }" class="logo-link">
                    <svg width="50" height="32" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8694 0H39.1295V4.94807H28.8673V32H21.0415V4.94807H10.8694V0Z"
                            fill="currentColor" />
                        <path
                            d="M18.0865 31.9152V6.18504H10.8693V15.0092H7.21722V6.18504H0V31.9152H7.21722V21.6066H10.8693V31.9152H18.0865Z"
                            fill="currentColor" />
                        <path
                            d="M39.1307 15.0092V6.18504H31.8265V17.2358L35.8264 21.6066H42.6958V26.3073H39.2177V24.5755H31.9134V28.2041L35.9134 31.9977H46.174L50 28.2041V6.18504H42.6958V15.0092H39.1307Z"
                            fill="currentColor" />
                    </svg>
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
