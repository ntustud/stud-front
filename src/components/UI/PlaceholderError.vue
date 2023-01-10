<template>
    <div class="wrapper-placeholder">
        <!-- <img src="../../assets/img/chill.png" alt="chill-image"> -->
        <h5>Помилка</h5>
        <p>Можливе погане з'єднання з інтернетом</p>
    </div>
</template>
  
<script setup>

</script>
  
<style scoped lang="scss">
.wrapper-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;

    h5 {
        font-size: 21px;
        color: var(--tg-theme-text-color);

        margin: 24px 0 12px;
    }

    p {
        color: var(--tg-theme-hint-color);

        margin-bottom: 80px;
    }
}

@media only screen and (min-width: 992px) {
    .wrapper-placeholder {
        margin-top: 10px !important;
    }
}
</style>
  