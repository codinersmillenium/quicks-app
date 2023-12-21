import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import App from './App.vue';
import './assets/sass/_init.scss';

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.axios = axios;
pinia.use(({ store }) => {
    store.axios = app.config.globalProperties.axios;
});
app.use(pinia);
app.mount('#app');
