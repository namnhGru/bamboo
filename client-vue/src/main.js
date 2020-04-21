import Vue from 'vue'
import vuetify from './plugins/vuetify';
import { router } from './router/router.index'
import { store } from './store/index.store'
import App from './App.vue'
import Default from './layouts/Default.vue'
import OnlyContent from './layouts/OnlyContent.vue'
import { watchMutationMixins } from './components/component.mixins'

Vue.component('default-layout', Default)
Vue.component('only-content-layout', OnlyContent)
Vue.config.productionTip = false
Vue.mixin(watchMutationMixins)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
