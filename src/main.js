import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import App from './App.vue';
import './assets/sass/_init.scss';
const setHeaders = {    
    headers: {
        'app-id': Env.API_KEY
    }
};

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.axios = axios;
app.config.globalProperties.axiosHeader = setHeaders;
pinia.use(({ store }) => {
    store.axios = app.config.globalProperties.axios;
    store.axiosHeader = app.config.globalProperties.axiosHeader;
});
app.use(pinia);
app.mount('#app');
