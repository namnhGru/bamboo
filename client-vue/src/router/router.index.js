import VueRouter from 'vue-router'
import Vue from 'vue'
import { store } from '../store/index.store'
// import { routerRefreshToken } from '../utils/refresh.token'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'Root',
    redirect: '/dashboard'
  },
  { 
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
    meta: {
      layout: 'only-content'
    },
    beforeEnter: (to, from, next) => {
      if (store.getters.getAuthInfo.token && from.path != '/signin') {
        next(from.path)
      } else {
        next();
      }
    }
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  { 
    path: '/setting', 
    name: 'Setting',
    component: () => import('../views/Setting.vue') 
  },
  { 
    path: '/setting/drawer', 
    name: 'Drawer',
    component: () => import('../views/SettingDrawer.vue') 
  },
]

export const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.path != '/signin' || from.path != '/signin') {
    // await routerRefreshToken()
  }
  const { token } = store.getters.getAuthInfo
  if (!token && to.path != '/signin' ) {
    next('/signin')
  } else {
    next()
  }
})
