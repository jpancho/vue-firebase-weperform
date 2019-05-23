import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { auth } from './firebase';
import { db } from './firebase';

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {
    user: localStorage.getItem('user') || null,
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
          // alert('Successfully signed up!');
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);
          const image = '/assets/img/logos/person_logo.png';
          db.collection("users")
            .doc(response.user.uid)
            .set({
              uid: response.user.uid,
              email: payload.email,
              fullname: payload.fullname,
              imageUrl: image,
              isPerformer: false
            })
            .then(function() {
              // eslint-disable-next-line no-console
              console.log("Sign up successful!")
            })
        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        })
    },
    signInAction ({ commit }, payload) {
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          // alert('Successfully signed in!');
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
          // alert('Signed out!');
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

export default store