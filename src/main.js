import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { auth } from './firebase';
import store from './store'

Vue.config.productionTip = false;
let app = '';

auth.onAuthStateChanged(()=> {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
    }
});