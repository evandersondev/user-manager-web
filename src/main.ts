import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { userStore } from './stories/users';

import './global.css';

createApp(App).use(userStore).use(router).mount('#app');
