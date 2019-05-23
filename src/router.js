import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/performers',
      name: 'performers',
      component: () => import('./views/Performers.vue'),
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: () => import('./views/Booking.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  let getUser = store.state.user;
  if (requiresAuth && getUser == null) {
    next('/')
  } else if (requiresAuth && getUser != null) {
    next()
  } else {
    next()
  }
});

export default router
