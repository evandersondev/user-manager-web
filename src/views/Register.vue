<script setup lang="ts">
import { reactive } from 'vue'
import { Image } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const newUser = reactive({
  photoUrl: '',
  role: 'employee'
})

function hanldeRegisterSubmit() {
  console.log(newUser)
  router.push({ path: '/home' })
}
</script>

<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="text-5xl font-bold tracking-tight text-zinc-800 mb-4">Sign up</h1>
      <div class="h-20 w-20 rounded-full shadow-sm overflow-hidden bg-zinc-100 flex items-center justify-center">
        <img v-if="newUser.photoUrl" class="h-full w-full object-cover" :src="newUser.photoUrl" />
        <Image v-else class="text-zinc-400 text-xl" />
      </div>

    </div>
    <form @submit.prevent="hanldeRegisterSubmit" class="flex flex-col gap-4 w-full max-w-sm">

      <input v-model="newUser.name" placeholder="Name"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="newUser.email" type="email" placeholder="E-mail"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="newUser.password" type="password" placeholder="Password"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input v-model="newUser.photoUrl" placeholder="Photo URl"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <select v-model="newUser.role" placeholder="Role"
        class="h-12 w-full rounded px-6 text-zinc-800 placeholder:text-zinc-400 bg-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500">
        <option selected="employee" value="employee">EMPLOYEE</option>
        <option value="admin">ADMIN</option>
        <option value="owner">OWNER</option>
      </select>

      <button
        class="h-12 w-full rounded bg-emerald-500 text-zinc-50 font-semibold outline-0 focus:ring-2 focus:ring-emerald-500"
        type="submit">REGISTER</button>
    </form>
    <div class="flex gap-1 text-sm">
      <p>You have an account?</p>
      <router-link class="text-emerald-500 font-medium" to="/">Sign in here.</router-link>
    </div>
  </div>
</template>