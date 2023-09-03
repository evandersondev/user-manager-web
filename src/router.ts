import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Edit from './views/Edit.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        auth: true,
      },
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
      meta: {
        auth: true,
      },
    },
  ],
});

async function verifyToken(token: string) {
  if (token) {
    const response = await axios.get('http://localhost:3000/session/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return !!response.data;
  }

  return false;
}

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('@user-manager:token');

  if (to.meta.auth && token) {
    if (await verifyToken(token)) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export { router };
