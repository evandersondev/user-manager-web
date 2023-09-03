<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import { Image, Trash } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { User } from '@/stories/user';
import { socketConnection } from '@/services/socket-io';

const router = useRouter();
const route = useRoute();
const store = useStore();
const { id } = route.params;

const socket = ref();

const user = computed(() => store.state.user as User);
const usersOnline = computed(() => store.state.usersOnline as string[]);
const currentUser = computed(() => JSON.parse(localStorage.getItem('@user-manager:current-user')!));

onMounted(() => {
  store.dispatch('loadUser', id);
  store.dispatch('loadUsersOnline');
  socket.value = socketConnection();
});

async function hanldeUpdateUserSubmit() {
  socket.value.emit('users');
  localStorage.setItem('@user-manager:current-user', JSON.stringify({ ...user.value, id }));
  await store.dispatch('editUser', { ...user.value, id });

  router.push({ path: '/home' });
}

async function hanldeDeleteUserSubmit() {
  socket.value.emit('users');
  await store.dispatch('deleteUser', id);

  router.push({ path: '/home' });
}
</script>

<template>
  <div v-if="user" class="flex flex-col items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="mb-4 text-5xl font-bold tracking-tight">Edit User</h1>
      <div class="relative flex items-center justify-center w-40 h-40 rounded-full bg-zinc-800">

        <div :data-online="usersOnline.includes(user.email)"
          class="absolute z-10 flex items-center justify-center w-8 h-8 border-8 rounded-full right-1 bottom-1 data-[online=true]:bg-emerald-500 bg-rose-500 border-zinc-900">
          <div :data-online="usersOnline.includes(user.email)"
            class="absolute inline-flex rounded-full opacity-70 w-full h-full data-[online=true]:animate-ping data-[online=true]:bg-emerald-600 bg-rose-400">
          </div>
        </div>

        <img v-if="user.photoUrl" class="object-cover rounded-full" :src="user.photoUrl" :alt="user.name" />
        <Image v-else class=" text-zinc-400" :size="32" />

      </div>

    </div>
    <form class="flex flex-col w-full max-w-sm gap-4">

      <input
        :data-disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
        :disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
        v-model="user.name"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input disabled v-model="user.email"
        class="w-full h-12 px-6 rounded opacity-50 cursor-not-allowed text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input
        :data-disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
        :disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
        v-model="user.photoUrl" placeholder="Photo URl"
        class="w-full h-12 px-6 rounded text-zinc-50 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <select
        :data-disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
        :disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
        v-model="user.role" placeholder="Role"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed">
        <option v-if="currentUser.role !== 'employee'" value="admin">ADMIN</option>
        <option v-if="currentUser.role !== 'employee'" value="owner">OWNER</option>
        <option value="employee">EMPLOYEE</option>
      </select>

      <div class="flex items-center gap-4">
        <button
          :data-disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
          :disabled="user.role === 'owner' && currentUser.role !== 'owner' || currentUser.email !== user.email && currentUser.role === 'employee'"
          @click="hanldeUpdateUserSubmit"
          class="flex-1 h-12 font-semibold transition-colors rounded bg-emerald-500 enabled:hover:bg-emerald-600 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed text-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500"
          type="button">UPDATE</button>

        <button
          :data-disabled="currentUser.email === user.email || usersOnline.includes(user.email) || currentUser.role === 'employee'"
          :disabled="currentUser.email === user.email || usersOnline.includes(user.email) || currentUser.role === 'employee'"
          @click="hanldeDeleteUserSubmit" type="button"
          class="flex items-center justify-center data-[disabled=true]:opacity-20 data-[disabled=true]:cursor-not-allowed w-12 h-12 transition-colors rounded bg-rose-700 text-zinc-50 enabled:hover:bg-rose-600">
          <Trash :size="22" />
        </button>
      </div>
    </form>

    <router-link class="flex mt-12 text-sm font-medium text-rose-500" to="/home">Cancel</router-link>
  </div>
</template>
