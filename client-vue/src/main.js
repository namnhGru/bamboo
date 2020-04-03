import Vue from 'vue'
import vuetify from './plugins/vuetify';
import { router } from './router/router.index'
import { store } from './store/index.store'
import App from './App.vue'
import Default from './layouts/Default.vue'
import OnlyContent from './layouts/OnlyContent.vue'
import { axiosRefreshToken } from './utils/refresh.token'

Vue.component('default-layout', Default)
Vue.component('only-content-layout', OnlyContent)
Vue.config.productionTip = false

axiosRefreshToken()
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
