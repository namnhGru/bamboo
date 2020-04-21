import { AxiosInstance } from '../services/api'
import { router } from '../router/router.index'

export const auth = {
  namespace: true,
  state: {
    appStart: 0,
    authInfo: {}
  },
  mutations: {
    changeAuthInfo(state, newAuthInfo) {
      state.authInfo = newAuthInfo
    },
    changeAppStart(state) {
      state.appStart++
    },
  },
  actions: {
    async signin({ commit, dispatch }, userInfo) {
      try {
        const { data } = await AxiosInstance.post('/signin', userInfo)
        commit('changeAuthInfo', {
          token: data.token || '',
          tokenExpiry: data.tokenExpiry || new Date(),
          userInfo: userInfo.email || '' 
        })
        router.push({ name: 'Root'})
        dispatch('addInterceptor')
      } catch (err) {
        console.error(err)
      }
    },

    async signout({ commit }) {
      try {
        commit('changeAuthInfo', {})
        await AxiosInstance.post(`${process.env.VUE_APP_EXPRESS_API}/delete_refresh`)
        router.push({ name: 'SignIn'})
      } catch (err) {
        console.error(err)
      }
    },

    addInterceptor({ commit, dispatch, getters }) {
      // request interceptor
      AxiosInstance.interceptors.request.use(async function (config) {
        const { token, tokenExpiry } = getters.getAuthInfo
        if (tokenExpiry
          && (new Date() - new Date(tokenExpiry) >= 0) 
          && (config.url != `${process.env.VUE_APP_EXPRESS_API}/refresh_token`)) {
          await dispatch('silentRefresh')
        }
        config.headers.authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        router.push({ name: 'SignIn' })
        return Promise.reject(error);
      })

      // response interceptor
      AxiosInstance.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if (!error.response) {
          commit('changeText', 'There are some network issues. Please try again later.' , { root: true })
        } else {
          commit('changeText', error.response, { root: true }) 
        }
        commit('changeColor', 'error')
        commit('changeShowState', true, { root: true })
        return Promise.reject(error);
      })
    },

    removeInterceptor() {
      AxiosInstance.interceptors.request.eject()
      AxiosInstance.interceptors.response.eject()
    },

    async silentRefresh({ commit, dispatch }) {
      console.log('run silent refresh')
      commit('changeAuthInfo', {})
      try {
        AxiosInstance.defaults.withCredentials = true
        const { data: {token, tokenExpiry, userInfo} } = await AxiosInstance.post(`${process.env.VUE_APP_EXPRESS_API}/refresh_token`)
        commit( 'changeAuthInfo', {
          token,
          tokenExpiry,
          userInfo 
        })
        dispatch('removeInterceptor')
        dispatch('addInterceptor')
        router.push({ name: 'Root'})
      } catch (err) {
        console.error(err)
      }
    }
  },
  getters: {
    getAuthInfo: state => state.authInfo,
    getAppStart: state => state.appStart
  }
}


// async function routerRefreshToken() {
//   console.log('router refresh')
//   const currentTokenExpiry = store.getters.currentTokenExpiry
//   if (!currentTokenExpiry || (new Date() - new Date(currentTokenExpiry) >= 0)) {
//     await silentRefresh()
//     axios.defaults.headers.common.authorization = `Bearer ${store.getters.currentToken}`
//   }
// }
