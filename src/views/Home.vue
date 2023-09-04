<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Card from '@/components/Card.vue';
import { User } from '@/stories/user/state';
import { constants } from '@/stories/user/constants';
import { socketConnection } from '@/services/socket-io';

import Header from '@/components/Header.vue';

const router = useRouter();
const store = useStore();

const isTabActive = ref();

const users = computed(() => store.state.users as User[]);
const usersOnline = computed(() => store.state.usersOnline as string[]);
const currentUser = computed(() => JSON.parse(localStorage.getItem('@user-manager:current-user')!));

const socket = socketConnection();

function handleVisibilityChange() {
  isTabActive.value = !document.hidden;

  if (isTabActive.value) {
    socket.emit('users-online', currentUser.value.email);
  } else {
    setTimeout(() => socket.emit('users-offline', currentUser.value.email), 10000);
  }
}

onMounted(() => {
  socket.on('update-users', () => {
    store.dispatch(constants.LOAD_USERS);
  });

  socket.on('remove-users', async () => {
    store.dispatch(constants.LOAD_USERS_ONLINE);
  });

  socket.on('add-users', () => {
    store.dispatch(constants.LOAD_USERS_ONLINE);
  });

  store.dispatch(constants.LOAD_USERS);
  store.dispatch(constants.LOAD_USERS_ONLINE);
  socket.emit('users-online', currentUser.value.email);

  document.addEventListener('visibilitychange', handleVisibilityChange);
  isTabActive.value = !document.hidden;
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

    <div class="grid w-full grid-cols-1 gap-6 pb-10 grid-flow-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div :key="user.id" v-for="user in users" class="flex flex-col justify-center w-full max-w-xs mx-auto">
        <Card :handleEditUser="handleEditUser" :user="user" :usersOnline="usersOnline" />
      </div>
    </div>
  </div>
</template>
