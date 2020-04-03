export const auth = {
  state: {
    inMemoryToken: '',
    inMemoryTokenExpiry: new Date(),
    user: {}
  },
  mutations: {
    changeInMemoryToken(state, newToken) {
      state.inMemoryToken = newToken
    },
    changeInMemoryTokenExpiry(state, newTokenExpiry) {
      state.inMemoryTokenExpiry = newTokenExpiry
    },
    changeUser(state, newUser) {
      state.user = newUser
    }
  },
  getters: {
    currentToken: state => state.inMemoryToken,
    currentTokenExpiry: state => state.inMemoryTokenExpiry,
    currentUser: state => state.user
  }
}
