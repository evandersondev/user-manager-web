import { MutationTree } from 'vuex';
import { Online, State, User } from './state';
import { constants } from './constants';

export const mutations: MutationTree<State> = {
  [constants.LOAD_USERS](state, users: User[]) {
    state.users = users;
  },
  [constants.LOAD_USER](state, user) {
    state.user = user;
  },
  [constants.EDIT_USER](state, user: User) {
    state.users = state.users?.map((item) => {
      if (item.id === user.id) {
        return user;
      }

      return item;
    });
  },
  [constants.DELETE_USER](state, id: string) {
    state.users = state.users?.filter((user) => user.id !== id);
  },
  [constants.LOAD_USERS_ONLINE](state, users: Online[]) {
    state.usersOnline = users;
  },
};
