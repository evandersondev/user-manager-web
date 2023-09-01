<script setup lang="ts">
import { reactive } from 'vue'
import { Image } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({
  name: 'Evanderson Vasconcelos',
  email: 'evandersondev@gmail.com',
  photoUrl: 'https://github.com/evandersondev.png',
  role: 'owner'
})

function hanldeUpdateUserSubmit() {
  console.log(user)
  router.push({ path: '/home' })
}
</script>

<template>
  <div class="h-screen w-full flex flex-col items-center justify-center">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="text-5xl font-bold tracking-tight text-zinc-800 mb-4">Edit User</h1>
      <div class="h-40 w-40 rounded-full shadow-sm overflow-hidden bg-zinc-100 flex items-center justify-center">
        <img v-if="user.photoUrl" class="h-full w-full object-cover" :src="user.photoUrl" />
        <Image v-else class="text-zinc-400" size="32" />
      </div>

    </div>
    <form @submit.prevent="hanldeUpdateUserSubmit" class="flex flex-col gap-4 w-full max-w-sm">

      <input disabled v-model="user.name"
        class="h-12 w-full opacity-60 cursor-not-allowed rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input disabled v-model="user.email"
        class="h-12 w-full opacity-60 cursor-not-allowed rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="user.photoUrl" placeholder="Photo URl"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <select v-model="user.role" placeholder="Role"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500">
        <option value="employee">EMPLOYEE</option>
        <option value="admin">ADMIN</option>
        <option value="owner">OWNER</option>
      </select>

      <button
        class="h-12 w-full rounded bg-emerald-500 text-zinc-50 font-semibold outline-0 focus:ring-2 focus:ring-emerald-500"
        type="submit">UPDATE</button>
    </form>

    <router-link class="mt-4 flex text-sm text-rose-500 font-medium" to="/home">Cancel</router-link>
  </div>
</template>