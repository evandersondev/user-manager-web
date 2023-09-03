import axios from 'axios';
import { createStore } from 'vuex';

export interface User {
  id: string
  name: string
  email: string
  photoUrl: string
  role: string
}

export interface Online {
  id: string
  userEmail: string
}

interface State {
  users?: User[]
  user: User
  usersOnline: string[]
}

export const store = createStore<State>({
  state: {
    users: [],
    user: {
      id: '',
      name: 'edeced',
      email: '',
      photoUrl: '',
      role: '',
    },
    usersOnline: [],
  },
  mutations: {
    loadUsers(state, users: User[]) {
      state.users = users;
    },
    loadUser(state, user) {
      state.user = user;
    },
    editUser(state, user: User) {
      state.users = state.users?.map((item) => {
        if (item.id === user.id) {
          return user;
        }

        return item;
      });
    },
    deleteUser(state, id: string) {
      state.users = state.users?.filter((user) => user.id !== id);
    },
    loadUsersOnline(state, emails: string[]) {
      state.usersOnline = emails;
    },
  },
  actions: {
    async loadUsers({ commit }) {
      const token = localStorage.getItem('@user-manager:token');

      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit('loadUsers', response.data);
    },
    async loadUser({ commit }, id?: string) {
      const token = localStorage.getItem('@user-manager:token');

      const response = await axios.get(`http://localhost:3000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit('loadUser', response.data);
    },
    async editUser({ commit }, user: User) {
      const token = localStorage.getItem('@user-manager:token');

      await axios.put(`http://localhost:3000/users/${user.id}`, { ...user }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit('editUser', user);
    },
    async deleteUser({ commit }, id: string) {
      const token = localStorage.getItem('@user-manager:token');

      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit('deleteUser', id);
    },
    async loadUsersOnline({ commit }) {
      const response = await axios.get<Online[]>('http://localhost:3000/events');
      const emails = response.data.map((item) => item.userEmail) as string[];

      commit('loadUsersOnline', emails);
    },
  },
});
