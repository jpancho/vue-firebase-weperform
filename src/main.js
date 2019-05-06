import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as firebase from "firebase/app";

Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app');
let app = '';

firebase.auth().onAuthStateChanged(()=> {
  if (!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
    }
});