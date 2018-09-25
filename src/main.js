// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'  //应用element组件
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './store/store'   //引入store文件
import BaiduMap from 'vue-baidu-map'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

Vue.component('ImgInputer', ImgInputer)
Vue.use(BaiduMap, {
  ak: 'GB5Rujx4fNSne1beGB9ylRBDtlkcDZzr'
})

Vue.use(Vuex)
Vue.prototype.$ajax = axios   //使用axios
Vue.use(ElementUI)    //使用element
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


//全局路由守卫  功能：当用户未登陆时，防止用户跳转一些页面
