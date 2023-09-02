<script setup lang="ts">
import {
  computed,
  onMounted,
} from 'vue';
import { Image } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { User } from '@/stories/users';

const router = useRouter();
const route = useRoute();
const store = useStore();
const { id } = route.params;

const user = computed(() => store.state.user as User);
const currentUser = computed(() => JSON.parse(localStorage.getItem('@user-manager:current-user')!));

onMounted(() => {
  store.dispatch('loadUser', id);
});

async function hanldeUpdateUserSubmit() {
  await store.dispatch('editUser', { ...user.value, id });

  router.push({ path: '/home' });
}
</script>

<template>
  <div v-if="user" class="flex flex-col items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="mb-4 text-5xl font-bold tracking-tight text-zinc-800">Edit User</h1>
      <div class="flex items-center justify-center w-40 h-40 overflow-hidden rounded-full shadow-sm bg-zinc-100">

        <img v-if="user.photoUrl" class="object-cover w-full h-full" :src="user.photoUrl" :alt="user.name" />
        <Image v-else class="text-zinc-400" :size="32" />
      </div>

    </div>
    <form @submit.prevent="hanldeUpdateUserSubmit" class="flex flex-col w-full max-w-sm gap-4">

      <input v-model="user.name"
        class="w-full h-12 px-6 rounded text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input disabled v-model="user.email"
        class="w-full h-12 px-6 rounded cursor-not-allowed opacity-60 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="user.photoUrl" placeholder="Photo URl"
        class="w-full h-12 px-6 rounded text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <select :data-isDisabled="currentUser.role === 'employee'" :disabled="currentUser.role === 'employee'"
        v-model="user.role" placeholder="Role"
        class="w-full h-12 px-6 rounded text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500 data-[isDisabled=true]:opacity-60 data-[isDisabled=true]:cursor-not-allowed">
        <option value="employee">EMPLOYEE</option>
        <option value="admin">ADMIN</option>
        <option v-if="user.role === 'owner'" value="owner">OWNER</option>
      </select>

      <button
        class="w-full h-12 font-semibold rounded bg-emerald-500 text-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500"
        type="submit">UPDATE</button>
    </form>

    <router-link class="flex mt-4 text-sm font-medium text-rose-500" to="/home">Cancel</router-link>
  </div>
</template>
