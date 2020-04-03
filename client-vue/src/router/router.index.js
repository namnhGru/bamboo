import VueRouter from 'vue-router'
import Vue from 'vue'
import { store } from '../store/index.store'
import { routerRefreshToken } from '../utils/refresh.token'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    redirect: '/dashboard'
  },
  { path: '/signin',
    component: () => import('../views/SignIn.vue'),
    meta: {
      layout: 'only-content'
    },
    beforeEnter: (to, from, next) => {
      if (store.getters.currentToken && from.path != '/signin') {
        next(from.path)
      } else {
        next();
      }
    }
  },
  { 
    path: '/dashboard', 
    component: () => import('../views/Dashboard.vue')
  },
  { 
    path: '/setting', 
    component: () => import('../views/Setting.vue') 
  },
  { 
    path: '/setting/drawer', 
    component: () => import('../views/SettingDrawer.vue') 
  },
]

export const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  await routerRefreshToken()
  const currentToken = store.getters.currentToken
  if (!currentToken && to.path != '/signin' ) {
    next('/signin')
  } else {
    next()
  }
})
