<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  handleLogout: {
    type: Function,
  },
});

const currentUser = computed(() => JSON.parse(localStorage.getItem('@user-manager:current-user')!));
</script>

<template>
  <header class="flex items-center justify-between h-20 px-12 border-b shadow-lg border-b-zinc-700/30">
    <h3 class="text-2xl font-medium">User manager</h3>
    <div class="flex items-center gap-6">
      <span><strong class="mr-1 text-lg font-semibold">Hello,</strong> {{ currentUser.name }}</span>
      <button @click="props.handleLogout"
        class="w-24 h-10 text-sm font-bold transition-colors border rounded-lg text-zinc-500 border-zinc-500 hover:bg-zinc-500/10 hover:text-zinc-50"
        type="button">Logout</button>
    </div>
  </header>
</template>
