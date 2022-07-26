<template>
    <header class="header">
        <div class="wrapper-header">
            <div class="wrapper-logo">
                <a class="logo-link" href="#">
                    <img src="@/assets/img/logo.png" alt="logo-img">
                </a>
                <div class="verical-line"></div>
                <p class="logo-text"><slot></slot></p>
            </div>
            <div class="wrapper-burger">
                <img src="@/assets/img/burger.png" alt="gurger-image">
            </div>
        </div>
    </header>
</template> 


<script>
    export default {
        
    };
</script>


<style scoped lang="scss">
@import "@/style";

    .header {
        background-color: $header-bcg;
        padding: 20px 16px;

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
                    background-color: $header-color;

                    margin: 0px 8px 0px 8px;
                }

                .logo-text {
                    color: $header-color;
                    font-family: 'Montserrat', sans-serif;
                }
            }
            
            .wrapper-burger {
                user-select: none;  
                cursor: pointer;
            }
        }
    }
</style>