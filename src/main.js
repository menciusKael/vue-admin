// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'
import qs from 'qs'
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
import Amap from 'vue-baidu-map'
import echarts from 'echarts'
import store from './store/store'
import axios from 'axios'
import md5 from 'js-md5'
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
//富文本2
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

import 'echarts/map/js/china';
Vue.prototype.$echarts = echarts
Vue.prototype.$md5 = md5
Vue.use(Amap,{
  ak: 'YOUR_APP_KEY'
})
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://mps.essocial.com.cn/backend'
axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  })
Vue.use(function(Vue){
  Vue.prototype.$axios = axios
})
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  store,
  components: { App },
  template: '<App/>'
})
