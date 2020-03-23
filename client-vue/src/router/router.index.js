import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import axios from 'axios'
import { store } from '../store/auth.store'

Vue.use(VueRouter)

const routes = [
  { path: '/signin', component: SignIn },
  { path: '/dashboard', component: Dashboard },
]

export const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentToken = store.getters.currentToken
  if (!currentToken && to.path != '/signin' ) {
    next('/signin')
  } else {
    axios.defaults.headers.common.authorization = `Bearer ${currentToken}`
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      next('/signin')
      return Promise.reject(error);
    });
    next()
  }
})
