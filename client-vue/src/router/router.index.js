import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'
import axios from 'axios'
import { store } from '../store/auth.store'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/dashboard'},
  { path: '/signin', component: SignIn, beforeEnter: (to, from, next) => {
    if (store.getters.currentToken && from.path != '/signin') {
      next(from.path)
    } else {
      next();
    }
  }},
  { path: '/dashboard', component: Dashboard },
]

export const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  silentRefresh().then(() => {
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
  }).catch(console.error)
})

export async function silentRefresh() {
  if (subMinute(new Date(store.getters.currentTokenExpiry), 1) <= new Date()) {
    store.commit('changeInMemoryToken', '')
    try {
      axios.defaults.withCredentials = true
      const { data: {token, tokenExpiry} } = await axios.post('http://localhost:2000/refresh_token', store.getters.currentUser )
      // const { data: {token, tokenExpiry} } = await axios.post('http://localhost:2000/signin', store.getters.currentUser)
      store.commit('changeInMemoryToken', token)
      store.commit('changeInMemoryTokenExpiry', tokenExpiry)
    } catch (err) {
      console.error(err)
    }
  }
}

function subMinute(date, minute) {
  return new Date(date.getTime() - minute * 60 * 1000)
}