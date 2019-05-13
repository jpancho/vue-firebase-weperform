import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
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
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
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
      firebase.auth().signOut()
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
  }
});