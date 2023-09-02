import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Edit from './views/Edit.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Login,
      },
    },
    {
      path: '/register',
      components: {
        default: Register,
      },
    },
    {
      path: '/home',
      components: {
        default: Home,
      },
    },
    {
      path: '/edit/:id',
      components: {
        default: Edit,
      },
    },
  ],
});
