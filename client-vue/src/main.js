import Vue from 'vue'
import vuetify from './plugins/vuetify';
import { router } from './router/router.index'
import { store } from './store/auth.store'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
