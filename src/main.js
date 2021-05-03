import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import axios from './network/axios'
import './plugins/element.js'
import './assets/fonts/iconfont.css'

import 'lib-flexible'

// 引入 table-tree插件
import TreeTable from 'vue-table-with-tree-grid'
// 注册全局组件
Vue.component('tree-table',TreeTable)

Vue.prototype.$http = axios

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
