import axios from 'axios';
import { store } from '../store/index.store'


export function axiosRefreshToken() {
  console.log('refresh fired')
  axios.interceptors.request.use(async function (config) {
    console.log('interceptors fired')
    const currentTokenExpiry = store.getters.currentTokenExpiry
    if (currentTokenExpiry 
      && (new Date() - new Date(currentTokenExpiry) >= 0) 
      && (config.url != `${process.env.VUE_APP_EXPRESS_API}/refresh_token`)) {
      await silentRefresh()
      config.headers.authorization = `Bearer ${store.getters.currentToken}`
      console.log('refresh complete')
      return config
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  })
}

export async function routerRefreshToken() {
  const currentTokenExpiry = store.getters.currentTokenExpiry
  if (!currentTokenExpiry || (new Date() - new Date(currentTokenExpiry) >= 0)) {
    await silentRefresh()
    axios.defaults.headers.common.authorization = `Bearer ${store.getters.currentToken}`
  }
}

async function silentRefresh() {
  console.log('active token refresh')
  store.commit('changeInMemoryToken', '')
  store.commit('changeInMemoryTokenExpiry', new Date())
  store.commit('changeUser', {})
  await getNewToken()
}

async function getNewToken() {
  try {
    axios.defaults.withCredentials = true
    const { data: {token, tokenExpiry, user} } = await axios.post(`${process.env.VUE_APP_EXPRESS_API}/refresh_token`)
    store.commit('changeInMemoryToken', token)
    store.commit('changeInMemoryTokenExpiry', tokenExpiry)
    store.commit('changeUser', { email: user })
    console.log('token get')
  } catch (err) {
    console.error(err)
  }
}