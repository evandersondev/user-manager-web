<script setup lang="ts">
import { PropType, defineProps } from 'vue';
import { User } from '@/stories/user/state';

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  usersOnline: {
    type: Object as PropType<string[]>,
    required: true,
  },
  handleEditUser: {
    type: Function as PropType<(id: string) => void>,
    required: true,
  },
});
</script>

<template>
  <button @click="props.handleEditUser(props.user.id)"
    class="relative flex flex-col items-center w-full py-8 transition-shadow border shadow-lg border-zinc-950/20 shadow-zinc-950/20 bg-zinc-900 hover:shadow-inner h-80 rounded-3xl">

    <div :data-online="props.usersOnline.includes(props.user.email)"
      class="absolute flex items-center justify-center w-10 h-6 text-xs rounded left-4 top-4 data-[online=true]:bg-emerald-600 bg-rose-600 text-zinc-50">
      <span v-if="!usersOnline.includes(props.user.email)" class="text-xs font-medium uppercase">off</span>
      <span v-else class="text-xs font-medium uppercase">on</span>
    </div>

    <img class="object-cover mb-12 overflow-hidden rounded-full w-28 h-28"
      :src="user.photoUrl || 'https://fakeimg.pl/600x400?text=No+photo+URL&font=bebas'" :alt="user.name" />

    <span class="mb-2 text-lg font-medium leading-6 text-white">{{ user.name }}</span>

    <span class="text-xs text-zinc-400">{{ user.email }}</span>
    <span class="mt-auto font-bold uppercase text-zinc-400">{{ user.role }}</span>
  </button>
</template>
