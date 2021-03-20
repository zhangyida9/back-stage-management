import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import axios from './network/axios'
import './plugins/element.js'
import './assets/fonts/iconfont.css'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
