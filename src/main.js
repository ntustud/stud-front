import { createApp } from 'vue'
import App from './App'
import router from './router/router';
import store from './store';
import "vue-select/src/scss/vue-select.scss";

const app = createApp(App);

app
    .use(router)
    .use(store)
    .mount('#app');
