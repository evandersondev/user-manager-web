<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

function hanldeLoginSubmit() {
  router.push({ path: '/home' })
}
</script>

<template>
  <div class="h-full w-full flex flex-col space-y-8 justify-center items-center">
    <div class="flex flex-col items-center">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-700 sm:text-4xl">lOGIN</h1>
      <h3 class="text-zinc-400">Hello, Welcome back!</h3>
    </div>
    <form @submit.prevent="hanldeLoginSubmit" class="flex flex-col gap-4 w-full max-w-md">
      <input placeholder="E-mail" class="h-12 w-full rounded px-6 text-zinc-700 placeholder:text-zinc-300" />
      <input placeholder="Password" class="h-12 w-full rounded px-6 text-zinc-700 placeholder:text-zinc-300" />
      <button class="h-12 w-full rounded bg-emerald-500 text-zinc-50 font-semibold" type="submit">ENTER</button>
    </form>
  </div>
</template>