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

async function verifyToken() {
  const token = localStorage.getItem('@user-manager:token');

  if (token) {
    try {
      const response = await axios.get('http://localhost:3000/session/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return !!response.data;
    } catch (error) {
      return false;
    }
  }

  return false;
}

router.beforeResolve(async (to, _, next) => {
  if (to.meta.auth) {
    if (await verifyToken()) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
