import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import echarts from 'echarts'

//  配置后台接口的地址
axios.defaults.baseURL = 'http://localhost:8088/stu'

// 把各种组件 都挂载到vue实例上
Vue.prototype.$ajax = axios //发送异步请求的组件
Vue.prototype.$qs = qs //转化参数的
Vue.prototype.$charts = echarts //图标组件

Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
