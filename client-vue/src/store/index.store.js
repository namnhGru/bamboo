import Vuex from 'vuex'
import Vue from 'vue'
import { auth } from './auth.store'
import { drawer } from './drawer.store'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    auth,
    drawer
  }
})