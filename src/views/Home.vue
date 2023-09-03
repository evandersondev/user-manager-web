<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { User } from '@/stories/user';
import { socketConnection } from '@/services/socket-io';

import Header from '@/components/Header.vue';

const router = useRouter();
const store = useStore();

const users = computed(() => store.state.users as User[]);
const usersOnline = computed(() => store.state.usersOnline as string[]);
const currentUser = computed(() => JSON.parse(localStorage.getItem('@user-manager:current-user')!));

const socket = socketConnection();

onMounted(() => {
  socket.on('update-users', () => {
    store.dispatch('loadUsers');
  });

  socket.on('remove-users', async () => {
    await store.dispatch('loadUsersOnline');
  });

  socket.on('add-users', () => {
    store.dispatch('loadUsersOnline');
  });

  store.dispatch('loadUsers');
  store.dispatch('loadUsersOnline');
  socket.emit('users-online', currentUser.value.email);
});

function handleEditUser(id: string) {
  router.push({ path: `/edit/${id}` });
}

function handleLogout() {
  localStorage.removeItem('@user-manager:token');
  localStorage.removeItem('@user-manager:current-user');
  socket.emit('users-offline', currentUser.value.email);
  router.push({ path: '/' });
}
</script>

<template>
  <Header :handleLogout="handleLogout" />

  <div class="flex flex-col items-center w-full h-full px-10 py-20 mx-auto space-y-16 max-w-7xl bg-zinc-900 sm:p-12">
    <div class="text-center">
      <h1 class="mb-6 text-4xl font-bold tracking-tight">Our users</h1>
      <p class="text-xl text-center text-zinc-400">Here is the list of all registered users.</p>
    </div>

    <div class="grid w-full grid-cols-1 gap-6 grid-flow-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

      <div :key="user.id" v-for="user in users" class="flex flex-col justify-center w-full max-w-xs mx-auto">
        <button @click="handleEditUser(user.id)"
          class="relative flex flex-col items-center w-full py-8 transition-shadow border shadow-lg border-zinc-950/20 shadow-zinc-950/20 bg-zinc-900 hover:shadow-inner h-80 rounded-3xl">

          <div :data-online="usersOnline.includes(user.email)"
            class="absolute flex items-center justify-center w-10 h-6 text-xs rounded left-4 top-4 data-[online=true]:bg-emerald-600 bg-rose-600 text-zinc-50">
            <span v-if="!usersOnline.includes(user.email)" class="text-xs font-medium uppercase">off</span>
            <span v-else class="text-xs font-medium uppercase">on</span>
          </div>

          <img class="object-cover mb-12 rounded-full w-28 h-28"
            :src="user.photoUrl || 'https://fakeimg.pl/600x400?text=No+photo+URL&font=bebas'" :alt="user.name" />

          <span class="mb-2 text-lg font-medium leading-6 text-white">{{ user.name }}</span>

          <span class="text-xs text-zinc-400">{{ user.email }}</span>
          <span class="mt-auto font-bold uppercase text-zinc-400">{{ user.role }}</span>
        </button>
      </div>

    </div>
  </div>
</template>
