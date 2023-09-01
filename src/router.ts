import {createRouter, createWebHistory} from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Login
      }
    },
    {
      path: '/home',
      components: {
        default: Home
      }
    }
  ]
})