<template>
  <div class="wrapper-navigation mobile-nav">
    <div class="wrapper-panel-name">
      <p class="title-sub-head">{{ titleName }}</p>
      <router-link :to="{ name: typeSchedule }" class="img-edit">
        <IconEditGroup />
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
        <IconArrows />
      </div>
    </div>
    <div class="wrapper-week overflow-week" ref="tabs">
      <div class="wrapper-days" v-for="(day, key) in nameDays" :key="key">
        <input type="radio" :id="key" :value="key" v-model="selectDayLocal"
          @change="emitChangeDay($event.target.value)" />
        <label :for="key" class="my-label"
          :class="{ 'currentDayColor': (selectDay !== currentDay && key == currentDay && currentEven === even) }">
          {{ day }}
        </label>
      </div>
    </div>
  </div>
  <div class="wrapper-navigation desktop-nav">
    <div class="wrapper-even wrapper-content">
      <div class="wrapper-container-even">
        <div class="wrapper-arrow" @click="emitChangeEven">
          <IconArrows />
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
        <router-link :to="{ name: typeSchedule }" class="img-edit">
          <IconEditGroup />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useStore } from "vuex";
import IconEditGroup from './icons/IconEditGroup.vue';
import IconArrows from './icons/IconArrows.vue';
import { NAME_DAYS } from '../../constant';

const props = defineProps({
  currentEven: Boolean,
  even: Boolean,
  titleEven: String,
  selectDay: Number,
  titleName: String,
  currentDay: Number
});

const emit = defineEmits([
  'changeEven',
  'changeDay'
]);

const selectDayLocal = ref(props.selectDay)

const store = useStore();
const typeSchedule = computed(() => store.state.auth.typeSchedule);
const tabs = ref(null);

const nameDays = NAME_DAYS;

async function emitChangeDay(value) {
  emit('changeDay', value);
  await nextTick();
  scrollToActive();
}

async function emitChangeEven() {
  emit('changeEven');
  await nextTick();
  scrollToActive();
}

function scrollToActive() {
  const activeEl = tabs.value?.querySelector(".wrapper-days input[type='radio']:checked+label");
  activeEl?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

onMounted(() => {
  setTimeout(() => scrollToActive(), 500)
})

watch(() => props.selectDay, (newValue) => {
  selectDayLocal.value = newValue
})
</script>

<style scoped lang="scss">
.wrapper-navigation {
  padding: 8px 0 24px 16px;

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
      cursor: pointer;

      &:active {
        animation: rotation-arrows 0.3s;
      }
    }
  }
}

.wrapper-week {
  display: flex;
  max-width: 100%;

  margin: 16px 0 0;
  padding-bottom: 10px;

  .wrapper-days {
    padding: 6px 0;
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

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
