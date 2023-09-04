import axios from 'axios';
import { ActionTree } from 'vuex';
import { Online, State, User } from './state';
import { constants } from './constants';

export const actions: ActionTree<State, State> = {
  async [constants.LOAD_USERS]({ commit }) {
    const token = localStorage.getItem('@user-manager:token');

    const response = await axios.get('http://localhost:3000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit(constants.LOAD_USERS, response.data);
  },
  async [constants.LOAD_USER]({ commit }, id?: string) {
    const token = localStorage.getItem('@user-manager:token');

    const response = await axios.get(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit(constants.LOAD_USER, response.data);
  },
  async [constants.EDIT_USER]({ commit }, user: User) {
    const token = localStorage.getItem('@user-manager:token');

    await axios.put(`http://localhost:3000/users/${user.id}`, { ...user }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit(constants.EDIT_USER, user);
  },
  async [constants.DELETE_USER]({ commit }, id: string) {
    const token = localStorage.getItem('@user-manager:token');

    await axios.delete(`http://localhost:3000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit(constants.DELETE_USER, id);
  },
  async [constants.LOAD_USERS_ONLINE]({ commit }) {
    const response = await axios.get<Online[]>('http://localhost:3000/events');
    const emails = response.data.map((item) => item.userEmail) as string[];

    commit(constants.LOAD_USERS_ONLINE, emails);
  },
};
