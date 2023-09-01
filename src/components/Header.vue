<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
  router.push({ path: '/' })
}
</script>

<template>
  <header class="h-20 px-12 flex items-center justify-between border-b border-b-zinc-300/20">
    <h3 class="text-2xl font-medium">User manager</h3>
    <button @click="handleLogout" class="text-sm font-medium text-rose-500" type="button">Logout</button>
  </header>
</template>