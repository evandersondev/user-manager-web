<script setup lang="ts">
import { Pencil, Trash } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { User } from '@/stories/user';
import { socketConnection } from '@/services/socket-io';

import Header from '../components/Header.vue';

const router = useRouter();
const store = useStore();

const users = computed(() => store.state.users as User[]);
const currentUser = computed(() => JSON.parse(localStorage.getItem('@user-manager:current-user')!));

const socket = socketConnection();

onMounted(() => {
  store.dispatch('loadUsers');

  socket.on('update-users', () => {
    store.dispatch('loadUsers');
  });
});

function handleEditUser(id: string) {
  router.push({ path: `/edit/${id}`, state: { socket: socket.value } });
}
</script>

<template>
  <Header />

  <div class="flex flex-col items-center w-full max-w-6xl p-8 pb-40 mx-auto space-y-16 bg-white lg:p-12">
    <div class="text-center">
      <h1 class="mb-6 text-4xl font-bold tracking-tight text-zinc-800">Our users</h1>
      <p class="text-xl text-center text-zinc-600">Here is the list of all registered users.</p>
    </div>

    <div class="flex flex-wrap justify-center w-full gap-12">

      <div :key="user.id" v-for="user in users" class="flex flex-col justify-center">
        <div class="relative flex group">
          <button v-if="currentUser.id !== user.id && currentUser.role !== 'employee' && user.role !== 'owner'"
            @click="handleEditUser(user.id)"
            class="absolute z-10 transition-opacity group-hover:opacity-100 right-4 top-14 hover:text-rose-500 text-zinc-50 opacity-30">
            <Trash :size="22" />
          </button>

          <button
            v-if="currentUser.role === 'owner' || ((currentUser.role === 'employee' && user.id === currentUser.id) || (currentUser.role !== 'employee' && user.role !== 'owner'))"
            @click="handleEditUser(user.id)"
            class="absolute z-10 transition-opacity group-hover:opacity-100 right-4 top-4 hover:text-emerald-500 text-zinc-50 opacity-30">
            <Pencil :size="22" />
          </button>
          <img class="object-cover mb-4 h-52 w-80 rounded-3xl"
            :src="user.photoUrl || 'https://fakeimg.pl/600x400?text=No+photo+URL&font=bebas'" :alt="user.name" />
        </div>
        <span class="text-lg font-medium leading-6">{{ user.name }}</span>
        <div class="flex items-baseline justify-between">
          <span class="text-sm text-zinc-400">{{ user.email }}</span>
          <span class="text-sm font-medium uppercase text-zinc-950">{{ user.role }}</span>
        </div>
      </div>

    </div>
  </div>
</template>
