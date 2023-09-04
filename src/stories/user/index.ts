import { createStore } from 'vuex';
import { State } from './state';
import { actions } from './actions';
import { mutations } from './mutations';

export default createStore<State>({
  state: {
    users: [],
    user: {
      id: '',
      name: '',
      email: '',
      photoUrl: '',
      role: '',
    },
    usersOnline: [],
  },
  mutations,
  actions,
});
