<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

function hanldeLoginSubmit() {
  router.push({ path: '/home' })
}
</script>

<template>
  <div class="h-screen w-full flex flex-col space-y-8 justify-center items-center">
    <div class="flex flex-col items-center gap-2">
      <h1 class="text-5xl font-bold tracking-tight text-zinc-800">Sign in</h1>
      <h3 class="text-zinc-500 text-xl">Hello, Welcome back!</h3>
    </div>
    <form @submit.prevent="hanldeLoginSubmit" class="flex flex-col gap-4 w-full max-w-sm">
      <input placeholder="E-mail"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />
      <input placeholder="Password"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />
      <button
        class="h-12 w-full rounded bg-emerald-500 text-zinc-50 font-semibold outline-0 focus:ring-2 focus:ring-emerald-500"
        type="submit">ENTER</button>
    </form>
  </div>
</template>