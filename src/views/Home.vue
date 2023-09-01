<script setup lang="ts">
import { Pencil } from 'lucide-vue-next'

function handleEditUser() {
  console.log('Edit')
}
</script>

<template>
  <div class="bg-white w-full max-w-6xl flex flex-col items-center lg:p-12 p-8 space-y-16 mx-auto pb-40">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-zinc-800 mb-6">Our users</h1>
      <p class="text-center text-xl text-zinc-600">Here is the list of all registered users.</p>
    </div>

    <div class="w-full flex flex-wrap justify-center gap-12">


      <div class="flex flex-col justify-center">
        <div class="flex relative group">
          <button @click="handleEditUser"
            class="absolute z-10 group-hover:opacity-100 transition-opacity right-4 top-4 text-zinc-50 opacity-30">
            <Pencil :size="22" />
          </button>
          <img class="h-52 w-80 object-cover rounded-3xl mb-4" src="https://github.com/evandersondev.png" />
        </div>
        <span class="font-medium text-lg leading-6">Diego Fernandes</span>
        <div class="flex justify-between items-baseline">
          <span class="text-zinc-400 text-sm">diego3g@gmail.com</span>
          <span class="text-zinc-950 font-medium text-sm uppercase">owner</span>
        </div>
      </div>

    </div>
  </div>
</template>