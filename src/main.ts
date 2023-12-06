import { createApp } from 'vue'; // Import createApp from the Vue package
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router/router';
import store from './store';
import 'element-plus/dist/index.css';

const app = createApp(App);

app
  .use(ElementPlus)
  .use(router)
  .use(store)
  .mount('#app');
