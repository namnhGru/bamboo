import Vuex from 'vuex'
import Vue from 'vue'
import { auth } from './auth.store'
import { drawer } from './drawer.store'
import { snakeBar } from './snakebar.store'
import { mutationPlugins } from './plugins.store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    drawer,
    snakeBar
  },
  plugins: [ mutationPlugins ]
})