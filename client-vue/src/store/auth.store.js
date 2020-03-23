import Vuex from 'vuex'
import Vue from 'vue'



Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    inMemoryToken: '',
  },
  mutations: {
    changeInMemoryToken(state, newToken) {
      state.inMemoryToken = newToken
    }
  },
  getters: {
    currentToken: state => state.inMemoryToken
  }
})