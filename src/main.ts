import { createApp } from 'vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue';
import router from './router';
import userStore from './stories/user';

import 'vue3-toastify/dist/index.css';
import './global.css';

createApp(App).use(userStore).use(router)
  .use(Vue3Toastify, {
    autoClose: 1000,
    theme: 'dark',
    hideProgressBar: true,
    clearOnUrlChange: false,
    toastStyle: {
      color: '#fafafa',
    },
  } as ToastContainerOptions)
  .mount('#app');
