<template>
    <section class="main-section">
        <div class="wrapper-top">
            <div class="wrapper-h1">
                <h3 class="main-title">Вітаю!</h3>
                <img src="@/assets/img/img-hi.png" alt="">
            </div>
            <p class="main-text-top">Сервіс «НТУ Студ» наразі
                працює у бета-режимі та надає можливості
                по перегляду розкладу занять університету
            </p>
        </div>
        <div class="wrapper-bottom">
            <div class="wrapper-title2">
                <h4 class="main-title2">Розклад </h4>
                <p class="main-title2 main-symbol">β</p>
            </div>
            <p class="main-text-bottom">Переглядайте актуальний розклад своєї групи</p>
            <button-blue class="main-btn">Перейти</button-blue>
        </div>
    </section>
</template> 


<script> 
export default {

}
</script>


<style scoped lang="scss">
    @import "@/assets/variables.scss";

    .main-section {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 70px 16px 16px;

        .wrapper-top {
            display: flex;
            flex-direction: column;
            align-items: center;

            margin-bottom: 30px;

            max-width: 500px;
            width: 100%;

            .wrapper-h1 {
                display: flex;
                flex-direction: row;

                align-items: center;

                margin-bottom: 12px;

                .main-title {
                    color: $white;

                    font-family: 'Montserrat', sans-serif;
                    font-weight: 500;
                    font-size: 24px;

                    margin-right: 12px;
                }
            }

            img {
                width: 32px;
                height: 32px;
            }

            .main-text-top {
                color: $txt-gray;

                font-family: 'Open Sans', sans-serif;
                font-weight: 400;
                font-size: 14px;

                line-height: 19px;
                text-align: center;
            }

        }

        .wrapper-bottom {
            display: flex;
            flex-direction: column;
            align-items: center;

            max-width: 500px;
            width: 100%;

            background-color: $bg-gray;
            border-radius: 5px;
            line-height: 19px;

            .wrapper-title2 {
                display: flex;

                font-family: 'Montserrat', sans-serif;
                font-style: normal;
                font-weight: 500;
                font-size: 18px;

                margin: 16px 0 8px;

                color: $white;

                .main-symbol {
                    font-family: 'Open Sans', sans-serif;
                    font-weight: 400;

                    opacity: 0.5;

                    padding-left: 6px;
                }
            }

            .main-text-bottom {
                max-width: 500px;
                    
                font-family: 'Open Sans', sans-serif;
                font-weight: 400;
                font-size: 14px;

                text-align: center;
                letter-spacing: -0.02em;

                color: $txt-gray;

                margin-bottom: 20px;
            }

            .main-btn {
                margin-bottom: 16px;
            }
        }
    }
</style>

