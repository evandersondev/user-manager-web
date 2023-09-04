<script setup lang="ts">
import {
  computed,
  onMounted,
  onUpdated,
  ref,
} from 'vue';
import { Image, Trash } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core';
import { required, url, minLength } from '@vuelidate/validators';
import { User } from '@/stories/user/state';
import { constants } from '@/stories/user/constants';
import { socketConnection } from '@/services/socket-io';

const router = useRouter();
const route = useRoute();
const store = useStore();
const { id } = route.params;

const socket = ref();

const user = computed(() => store.state.user as User);
const usersOnline = computed(() => store.state.usersOnline as string[]);
const currentUser = computed(() => JSON.parse(localStorage.getItem('@user-manager:current-user')!));
const isValidImage = ref(true);

const hasPermissionEditName = ref(true);
const hasPermissionEditPhotoUrl = ref(true);
const hasPermissionEditRole = ref(true);
const isUpdateButtonDisabled = ref(true);
const isDeleteButtonDisabled = ref(true);

const rules = {
  name: { required, minLength: minLength(3) },
  photoUrl: { url },
};

const v$ = useVuelidate(rules, user);

onMounted(() => {
  store.dispatch(constants.LOAD_USER, id);
  store.dispatch(constants.LOAD_USERS_ONLINE);
  socket.value = socketConnection();
  console.log('create');
});

onUpdated(() => {
  hasPermissionEditName.value = user.value.role === 'owner' && currentUser.value.role !== 'owner' || currentUser.value.email !== user.value.email && currentUser.value.role === 'employee';
  hasPermissionEditPhotoUrl.value = user.value.role === 'owner' && currentUser.value.role !== 'owner' || currentUser.value.email !== user.value.email && currentUser.value.role === 'employee';
  hasPermissionEditRole.value = user.value.role === 'owner' && currentUser.value.role !== 'owner' || currentUser.value.email !== user.value.email && currentUser.value.role === 'employee';
  isUpdateButtonDisabled.value = user.value.role === 'owner' && currentUser.value.role !== 'owner' || currentUser.value.email !== user.value.email && currentUser.value.role === 'employee';
  isDeleteButtonDisabled.value = currentUser.value.email === user.value.email || usersOnline.value.includes(user.value.email) || currentUser.value.role === 'employee';
});

async function hanldeUpdateUserSubmit() {
  if (v$.value.name.$error || v$.value.photoUrl.$error) {
    toast('Some field with error, Please check again!', {
      toastStyle: {
        backgroundColor: '#be123c',
      },
    });
    return;
  }

  try {
    await store.dispatch(constants.EDIT_USER, { ...user.value, id });
    socket.value.emit('users');

    if (currentUser.value.id === id) {
      localStorage.setItem('@user-manager:current-user', JSON.stringify({ ...user.value, id }));
    }

    router.push({ path: '/home' });

    toast('User updated with success!', {
      toastStyle: {
        backgroundColor: '#059669',
      },
    });
  } catch (error) {
    toast('Update user failed!', {
      toastStyle: {
        backgroundColor: '#be123c',
      },
    });
  }
}

async function hanldeDeleteUserSubmit() {
  try {
    await store.dispatch(constants.DELETE_USER, id);
    socket.value.emit('users');

    router.push({ path: '/home' });

    toast('User deleted with success!', {
      toastStyle: {
        backgroundColor: '#059669',
      },
    });
  } catch (error) {
    toast('Delete user failed!', {
      toastStyle: {
        backgroundColor: '#be123c',
      },
    });
  }
}

function updateImage(event: Event) {
  const img = document.createElement('img');
  img.src = (event.target as HTMLInputElement).value;
  img.onload = () => {
    isValidImage.value = true;
  };
  img.onerror = () => {
    isValidImage.value = false;
  };
}

function backHome() {
  store.replaceState({
    ...store.state,
    user: {
      id: '',
      name: '',
      email: '',
      photoUrl: '',
      role: '',
    },
  });
  router.push({ path: '/home' });
}

</script>

<template>
  <div v-if="user" class="flex flex-col items-center justify-center w-full h-screen">
    <div class="flex flex-col items-center gap-2 mb-8">
      <h1 class="mb-4 text-5xl font-bold tracking-tight">Edit User</h1>
      <div class="relative flex items-center justify-center w-40 h-40 rounded-full z bg-zinc-800">

        <div :data-online="usersOnline.includes(user.email)"
          class="absolute z-10 flex items-center justify-center w-8 h-8 border-8 rounded-full right-1 bottom-1 data-[online=true]:bg-emerald-500 bg-rose-500 border-zinc-900">
          <div :data-online="usersOnline.includes(user.email)"
            class="absolute inline-flex rounded-full opacity-70 w-full h-full data-[online=true]:animate-ping data-[online=true]:bg-emerald-600 bg-rose-400">
          </div>
        </div>

        <img v-if="isValidImage" class="object-cover w-40 h-40 rounded-full" :src="user.photoUrl" alt="" />
        <Image v-else class=" text-zinc-400" :size="32" />

      </div>

    </div>
    <form class="flex flex-col w-full max-w-sm gap-4">

      <input :data-error="v$.name.$error" :data-disabled="hasPermissionEditName" :disabled="hasPermissionEditName"
        v-model="v$.name.$model"
        class="w-full h-12 px-6 rounded data-[error=true]:focus:ring-rose-500 text-zinc-50 placeholder:text-zinc-100 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input disabled v-model="user.email"
        class="w-full h-12 px-6 rounded opacity-50 cursor-not-allowed text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <input @input="updateImage" :data-error="v$.photoUrl.$error" :data-disabled="hasPermissionEditPhotoUrl"
        :disabled="hasPermissionEditPhotoUrl" v-model="v$.photoUrl.$model" placeholder="Photo URl"
        class="w-full h-12 px-6 data-[error=true]:focus:ring-rose-500 rounded text-zinc-50 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500" />

      <select :data-disabled="hasPermissionEditRole" :disabled="hasPermissionEditRole" v-model="user.role"
        placeholder="Role"
        class="w-full h-12 px-6 rounded text-zinc-50 placeholder:text-zinc-100 bg-zinc-800 outline-0 focus:ring-2 focus:ring-emerald-500 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed">
        <option v-if="currentUser.role !== 'employee'" value="admin">ADMIN</option>
        <option v-if="currentUser.role !== 'employee'" value="owner">OWNER</option>
        <option value="employee">EMPLOYEE</option>
      </select>

      <div class="flex items-center gap-4">
        <button :data-disabled="isUpdateButtonDisabled" :disabled="isUpdateButtonDisabled" @click="hanldeUpdateUserSubmit"
          class="flex-1 h-12 font-semibold transition-colors rounded bg-emerald-500 enabled:hover:bg-emerald-600 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed text-zinc-50 outline-0 focus:ring-2 focus:ring-emerald-500"
          type="button">UPDATE</button>

        <button :data-disabled="isDeleteButtonDisabled" :disabled="isDeleteButtonDisabled" @click="hanldeDeleteUserSubmit"
          type="button"
          class="flex items-center justify-center data-[disabled=true]:opacity-20 data-[disabled=true]:cursor-not-allowed w-12 h-12 transition-colors rounded bg-rose-700 text-zinc-50 enabled:hover:bg-rose-600">
          <Trash :size="22" />
        </button>
      </div>
    </form>

    <button class="flex mt-12 text-sm font-medium text-rose-500" @click="backHome">Cancel</button>
  </div>
</template>
