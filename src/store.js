import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { auth } from './firebase';

Vue.use(Vuex);
const vuexLocal = new VuexPersist({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('vuex'))['user'],
    status: null,
    error: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    removeUser (state) {
      state.user = null
    },
    setStatus (state, payload) {
      state.status = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },

  actions: {
    signUpAction ({ commit }, payload) {
      commit('setStatus', 'loading');
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('Successfully signed up!');
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);
        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        })
    },
    signInAction ({ commit }, payload) {
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('Successfully signed in!');
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);
        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        })
    },
    signOutAction ({ commit }) {
      auth.signOut()
      // eslint-disable-next-line no-unused-vars
        .then((response) => {
          alert('Signed out!');
          commit('setUser', null);
          commit('setStatus', 'success');
          commit('setError', null);
        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        })
    }
  },

  getters: {
    status (state) {
      return state.status;
    },
    user (state) {
      return state.user;
    },
    error (state) {
      return state.error;
    }
  },

  plugins:
    [vuexLocal.plugin]
});