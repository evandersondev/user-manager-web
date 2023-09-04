<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

const router = useRouter();

const login = reactive({
  email: '',
  password: '',
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(3) },
};

const v$ = useVuelidate(rules, login);

async function hanldeLoginSubmit() {
  try {
    const response = await axios.post('http://localhost:3000/session', { ...login });

    localStorage.setItem('@user-manager:token', response.data.access_token);
    localStorage.setItem('@user-manager:current-user', JSON.stringify({ ...response.data.user }));
    router.push({ path: '/home' });
  } catch (error) {
    toast('Login failed, please check your infos.', {
      toastStyle: {
        backgroundColor: '#be123c',
      },
    });
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="text-5xl font-bold tracking-tight">Sign in</h1>
      <h3 class="text-xl text-zinc-300">Hello, Welcome back!</h3>
    </div>
    <form @submit.prevent="hanldeLoginSubmit" class="flex flex-col w-full max-w-sm gap-4">
      <input :data-error="v$.email.$error" v-model="v$.email.$model" type="email" placeholder="E-mail"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 data-[error=true]:focus:ring-rose-500 focus:ring-2 focus:ring-emerald-500" />
      <input :data-error="v$.password.$error" v-model="v$.password.$model" type="password" placeholder="Password"
        class="w-full h-12 px-6 rounded data-[error=true]:focus:ring-rose-500 text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />
      <button
        class="w-full h-12 font-semibold rounded bg-emerald-500 hover:bg-emerald-600 text-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500"
        type="submit">ENTER</button>
    </form>
    <div class="flex gap-1 mt-8 text-sm">
      <p>Don't have an account?</p>
      <router-link class="font-medium transition-colors text-emerald-700 hover:text-emerald-500" to="/register">Register
        here.</router-link>
    </div>
  </div>
</template>
