import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import Info from './info'


//配置后台接口的地址
axios.defaults.baseURL= 'http://localhost:8081/stu'

//把各种组件都挂载到vue实例上
Vue.prototype.$ajax = axios //发送异步请求的组件
Vue.prototype.$qs = qs //转换参数

Vue.config.productionTip = false
Vue.prototype.$info = Info.install;

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
