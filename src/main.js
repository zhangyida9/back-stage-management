import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import axios from './network/axios'
import './plugins/element.js'
import './assets/fonts/iconfont.css'

// 引入 table-tree插件
import TreeTable from 'vue-table-with-tree-grid'
// 注册全局组件
Vue.component('tree-table',TreeTable)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
