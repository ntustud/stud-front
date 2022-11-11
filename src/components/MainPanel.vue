<template>
    <div class="wrapper-navigation mobile-nav">
        <div class="wrapper-panel-name">
            <p class="title-sub-head">{{ titleName }}</p>
            <router-link :to="{ name: 'group' }" class="img-edit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.896 0.183396C12.0418 0.197238 12.1047 0.374027 12.0011 0.477444L4.76005 7.70637C4.67804 7.78824 4.61937 7.89044 4.59006 8.00246L3.71974 11.3288C3.66118 11.5526 3.72588 11.7907 3.88974 11.9543C4.0536 12.1178 4.29204 12.1824 4.51625 12.124L7.84818 11.2551C7.96039 11.2259 8.06277 11.1673 8.14478 11.0854L15.4884 3.7541C15.5915 3.65124 15.7676 3.71278 15.7828 3.85745C16.0888 6.76738 16.0715 9.70265 15.7309 12.6097C15.537 14.2649 14.2044 15.5645 12.5522 15.7489C9.55121 16.0837 6.4488 16.0837 3.44785 15.7489C1.79565 15.5645 0.463028 14.2649 0.269111 12.6097C-0.0897035 9.54701 -0.0897035 6.45299 0.26911 3.39029C0.463028 1.73508 1.79565 0.435475 3.44785 0.251127C6.23058 -0.0593614 9.10056 -0.0819386 11.896 0.183396Z"
                        fill="currentColor" />
                    <path
                        d="M13.0681 1.25535C13.1531 1.17069 13.2907 1.17069 13.3756 1.25535L14.6065 2.48422C14.6915 2.56905 14.6915 2.70658 14.6065 2.7914L7.38865 9.99715C7.36145 10.0243 7.32696 10.0439 7.28978 10.0537L5.62364 10.4882C5.46295 10.53 5.3166 10.3835 5.35831 10.2231L5.79347 8.55992C5.80324 8.52259 5.82281 8.48851 5.85014 8.46122L13.0681 1.25535Z"
                        fill="currentColor" />
                </svg>
            </router-link>
        </div>
        <div class="wrapper-even">
            <div class="wrapper-container-even">
                <div class="circle-even-big" :class="{ 'current-even-big': currentEven === even }">
                    <div class="circle-even-small"
                        :class="{ 'current-even-small': currentEven === even, 'disabled-even-small': currentEven !== even }">
                    </div>
                </div>
                <span class="week-even">{{ titleEven }}</span>
            </div>
            <div class="wrapper-arrow" @click="emitChangeEven">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.38615 1.32775C3.68849 1.02401 3.68849 0.531547 3.38615 0.227806C3.08381 -0.0759353 2.59361 -0.0759353 2.29127 0.227806L0.226756 2.30188C-0.0755854 2.60562 -0.0755854 3.09808 0.226756 3.40182L2.29127 5.4759C2.59361 5.77964 3.08381 5.77964 3.38615 5.4759C3.68849 5.17216 3.68849 4.67969 3.38615 4.37595L2.64326 3.62963H13.1613C13.5889 3.62963 13.9355 3.28141 13.9355 2.85185C13.9355 2.4223 13.5889 2.07407 13.1613 2.07407H2.64326L3.38615 1.32775Z"
                        fill="currentColor" />
                    <path
                        d="M12.6139 8.5241C12.3115 8.82784 12.3115 9.3203 12.6139 9.62405L13.3567 10.3704H2.83871C2.41113 10.3704 2.06452 10.7186 2.06452 11.1481C2.06452 11.5777 2.41113 11.9259 2.83871 11.9259H13.3567L12.6139 12.6722C12.3115 12.976 12.3115 13.4685 12.6139 13.7722C12.9162 14.0759 13.4064 14.0759 13.7087 13.7722L15.7732 11.6981C16.0756 11.3944 16.0756 10.9019 15.7732 10.5982L13.7087 8.5241C13.4064 8.22036 12.9162 8.22036 12.6139 8.5241Z"
                        fill="currentColor" />
                </svg>
            </div>
        </div>
        <div class="wrapper-week overflow-week">
            <div class="wrapper-days" v-for="day in days" :key="day.id">
                <input type="radio" :id="day.id" :value="day.id" v-model="selectDay"
                    @change="emitChangeDay($event.target.value)" class="my-radio" />
                <label :for="day.id" class="my-label"
                    :class="{ 'currentDayColor': (selectDay !== currentDay && day.id === currentDay) }">{{ day.name
                    }}</label>
            </div>
        </div>
    </div>
    <div class="wrapper-navigation desktop-nav">
        <div class="wrapper-even wrapper-content">
            <div class="wrapper-container-even">
                <div class="wrapper-arrow" @click="emitChangeEven">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.38615 1.32775C3.68849 1.02401 3.68849 0.531547 3.38615 0.227806C3.08381 -0.0759353 2.59361 -0.0759353 2.29127 0.227806L0.226756 2.30188C-0.0755854 2.60562 -0.0755854 3.09808 0.226756 3.40182L2.29127 5.4759C2.59361 5.77964 3.08381 5.77964 3.38615 5.4759C3.68849 5.17216 3.68849 4.67969 3.38615 4.37595L2.64326 3.62963H13.1613C13.5889 3.62963 13.9355 3.28141 13.9355 2.85185C13.9355 2.4223 13.5889 2.07407 13.1613 2.07407H2.64326L3.38615 1.32775Z"
                            fill="currentColor" />
                        <path
                            d="M12.6139 8.5241C12.3115 8.82784 12.3115 9.3203 12.6139 9.62405L13.3567 10.3704H2.83871C2.41113 10.3704 2.06452 10.7186 2.06452 11.1481C2.06452 11.5777 2.41113 11.9259 2.83871 11.9259H13.3567L12.6139 12.6722C12.3115 12.976 12.3115 13.4685 12.6139 13.7722C12.9162 14.0759 13.4064 14.0759 13.7087 13.7722L15.7732 11.6981C16.0756 11.3944 16.0756 10.9019 15.7732 10.5982L13.7087 8.5241C13.4064 8.22036 12.9162 8.22036 12.6139 8.5241Z"
                            fill="currentColor" />
                    </svg>
                </div>
                <div class="circle-even-big" :class="{ 'current-even-big': currentEven === even }">
                    <div class="circle-even-small"
                        :class="{ 'current-even-small': currentEven === even, 'disabled-even-small': currentEven !== even }">
                    </div>
                </div>
                <span class="week-even">{{ titleEven }}</span>
            </div>
            <div class="wrapper-panel-name">
                <p class="title-sub-head">{{ titleName }}</p>
                <router-link :to="{ name: 'group' }" class="img-edit">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.896 0.183396C12.0418 0.197238 12.1047 0.374027 12.0011 0.477444L4.76005 7.70637C4.67804 7.78824 4.61937 7.89044 4.59006 8.00246L3.71974 11.3288C3.66118 11.5526 3.72588 11.7907 3.88974 11.9543C4.0536 12.1178 4.29204 12.1824 4.51625 12.124L7.84818 11.2551C7.96039 11.2259 8.06277 11.1673 8.14478 11.0854L15.4884 3.7541C15.5915 3.65124 15.7676 3.71278 15.7828 3.85745C16.0888 6.76738 16.0715 9.70265 15.7309 12.6097C15.537 14.2649 14.2044 15.5645 12.5522 15.7489C9.55121 16.0837 6.4488 16.0837 3.44785 15.7489C1.79565 15.5645 0.463028 14.2649 0.269111 12.6097C-0.0897035 9.54701 -0.0897035 6.45299 0.26911 3.39029C0.463028 1.73508 1.79565 0.435475 3.44785 0.251127C6.23058 -0.0593614 9.10056 -0.0819386 11.896 0.183396Z"
                            fill="currentColor" />
                        <path
                            d="M13.0681 1.25535C13.1531 1.17069 13.2907 1.17069 13.3756 1.25535L14.6065 2.48422C14.6915 2.56905 14.6915 2.70658 14.6065 2.7914L7.38865 9.99715C7.36145 10.0243 7.32696 10.0439 7.28978 10.0537L5.62364 10.4882C5.46295 10.53 5.3166 10.3835 5.35831 10.2231L5.79347 8.55992C5.80324 8.52259 5.82281 8.48851 5.85014 8.46122L13.0681 1.25535Z"
                            fill="currentColor" />
                    </svg>
                </router-link>
            </div>
        </div>
    </div>
</template> 
  
<script setup>
import { ref, onMounted, watch } from 'vue';

const { currentEven, even, titleEven, selectDay, titleName, currentDay } = defineProps([
    'currentEven',
    'even',
    'titleEven',
    'selectDay',
    'titleName',
    'currentDay'
]);

const emit = defineEmits(['changeEven', 'changeDay'])

const days = [
    { id: 1, name: "Понеділок" },
    { id: 2, name: "Вівторок" },
    { id: 3, name: "Середа" },
    { id: 4, name: "Четвер" },
    { id: 5, name: "П'ятниця" },
    { id: 6, name: "Субота" },
];

function emitChangeDay(value) {
    emit('changeDay', value);
}

function emitChangeEven() {
    emit('changeEven');
}
</script>
  
<style scoped lang="scss">
.wrapper-navigation {
    padding: 10px 0px 6px 16px;

    user-select: none;

    background: rgba(var(--tg-theme-hint-color-rgb), 0.05);

    .wrapper-panel-name {
        display: flex;
        align-items: center;
        flex-direction: row;

        margin-bottom: 16px;

        padding-right: 16px;

        .title-sub-head {
            font-weight: 600;

            color: var(--tg-theme-text-color);

            opacity: 0.85;

            margin-right: 8px;
        }

        .img-edit {
            display: flex;
            align-items: center;

            color: var(--tg-theme-hint-color);

            &:hover {
                transform: scale(1.1);
            }

            &:active {
                transform: scale(0.9);
            }
        }
    }

    .wrapper-even {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-right: 16px;

        .wrapper-container-even {
            display: flex;
            align-items: center;

            .circle-even-big {
                display: flex;
                align-items: center;
                justify-content: center;

                width: 16px;
                height: 16px;

                border-radius: 50%;

                margin-right: 7px;

                .circle-even-small {
                    width: 10px;
                    height: 10px;

                    border-radius: inherit;
                }
            }

            .week-even {
                color: var(--tg-theme-hint-color);
            }
        }

        .wrapper-arrow {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 30px;
            height: 30px;

            border-radius: 8px;

            background: var(--tg-theme-button-color);
            color: var(--tg-theme-button-text-color);

            transition: 0.4s;

            &:active {
                animation: rotation-arrows 0.3s;
            }
        }
    }
}

.wrapper-week {
    display: flex;
    max-width: 100%;

    margin: 16px 0px 0px;
    padding-bottom: 10px;

    .wrapper-days {
        padding: 6px 0px;
        margin-right: 12px;

        .my-label {
            font-weight: 600;

            border-radius: 8px;

            padding: 6px 16px;

            color: var(--tg-theme-hint-color);

            &:hover {
                background: var(--tg-theme-button-color) !important;
                color: var(--tg-theme-button-text-color) !important;
                opacity: 0.9;
            }
        }
    }
}

.current-even-big {
    background: rgba(100, 208, 166, 0.25);
}

.current-even-small {
    background: #64D0A6;
}

.disabled-even-small {
    background: var(--tg-theme-hint-color);
}

.currentDayColor {
    color: var(--tg-theme-link-color) !important;
}

.overflow-week {
    overflow: hidden;
    overflow-x: auto;
}

input[type=radio] {
    display: none;
}

.wrapper-days input[type="radio"]:checked+label {
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color) !important;
}

@media only screen and (max-width: 991px) {
    .desktop-nav {
        display: none !important;
    }
}

@media only screen and (min-width: 992px) {
    .mobile-nav {
        display: none !important;
    }

    .wrapper-navigation {
        padding-left: 16px !important;
        padding-right: 16px !important;
    }

    .desktop-nav {
        .wrapper-arrow {
            margin-right: 12px;
        }

        .wrapper-panel-name {
            margin-bottom: 0;
        }

        .wrapper-even {
            padding-right: 0 !important;
        }
    }

    .wrapper-week {
        flex-direction: column !important;

        margin-right: 24px;
        margin-top: 0 !important;

        .wrapper-days {
            margin-right: 0 !important;
            margin-bottom: 12px;
        }
    }

    .wrapper-panel-name {
        padding-right: 0 !important;
    }
}

@keyframes rotation-arrows {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: scale(3);
        transform: rotate(180deg);
    }
}
</style>
  