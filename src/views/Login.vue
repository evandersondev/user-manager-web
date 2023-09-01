<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const login = reactive({
  email: '',
  password: ''
})

async function hanldeLoginSubmit() {
  const response = await axios.post('http://localhost:3000/session', { ...login })

  if (response.status === 201) {
    console.log(response.data.access_token)
    localStorage.setItem('@user-manager:token', response.data.access_token)
    router.push({ path: '/home' })
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="text-5xl font-bold tracking-tight text-zinc-800">Sign in</h1>
      <h3 class="text-xl text-zinc-500">Hello, Welcome back!</h3>
    </div>
    <form @submit.prevent="hanldeLoginSubmit" class="flex flex-col w-full max-w-sm gap-4">
      <input v-model="login.email" type="email" placeholder="E-mail"
        class="w-full h-12 px-6 rounded text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />
      <input v-model="login.password" type="password" placeholder="Password"
        class="w-full h-12 px-6 rounded text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />
      <button
        class="w-full h-12 font-semibold rounded bg-emerald-500 text-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500"
        type="submit">ENTER</button>
    </form>
    <div class="flex gap-1 text-sm">
      <p>Don't have an account?</p>
      <router-link class="font-medium text-emerald-500" to="/register">Register here.</router-link>
    </div>
  </div>
</template>