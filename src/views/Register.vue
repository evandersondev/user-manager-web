<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Image } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { socketConnection } from '@/services/socket-io';

const router = useRouter();
const socket = ref();

const user = reactive({
  name: '',
  email: '',
  password: '',
  photoUrl: '',
  role: 'employee',
});

onMounted(() => {
  socket.value = socketConnection();
});

async function hanldeRegisterSubmit() {
  const response = await axios.post('http://localhost:3000/users', { ...user });

  if (response.status === 201) {
    socket.value.emit('users');
    router.push({ path: '/' });
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="mb-4 text-5xl font-bold tracking-tight text-zinc-800">Sign up</h1>
      <div class="flex items-center justify-center w-20 h-20 overflow-hidden rounded-full shadow-sm bg-zinc-100">
        <img v-if="user.photoUrl" class="object-cover w-full h-full" :src="user.photoUrl" :alt="user.name" />
        <Image v-else class="text-xl text-zinc-400" />
      </div>

    </div>
    <form @submit.prevent="hanldeRegisterSubmit()" class="flex flex-col w-full max-w-sm gap-4">

      <input v-model="user.name" placeholder="Name"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="user.email" type="email" placeholder="E-mail"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="user.password" type="password" placeholder="Password"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="user.photoUrl" placeholder="Photo URl"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <select v-model="user.role" placeholder="Role"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500">
        <option value="employee">EMPLOYEE</option>
        <option value="admin">ADMIN</option>
        <option value="owner">OWNER</option>
      </select>

      <button
        class="w-full h-12 font-semibold rounded bg-emerald-500 text-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500"
        type="submit">REGISTER</button>
    </form>
    <div class="flex gap-1 mt-8 text-sm">
      <p>You have an account?</p>
      <router-link class="font-medium text-emerald-500" to="/">Sign in here.</router-link>
    </div>
  </div>
</template>
