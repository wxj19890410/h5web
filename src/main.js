import Vue from 'vue'
import App from './App'
import router from './router'

import store from './vuex/index.js'
import service from './service/index.js'
import VueResource from 'vue-resource'


import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.prototype.$service = service
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  // request.url = window.GLOBLE.apiUrl + request.url
  request.params.userid =  store.state.userid
  console.log(request.params)
  next(response => {
    let result = {
      ok: true
    }
    if (response.status === 200) {
      result.data = response.body
    } else {
      if (response.body.message === 'NotLogedInException') {
        this.$message({
          type: 'false',
          message: '请登录用户'
        })
        store.commit('setUserInfo')
        router.push('/login')
      } else if (response.body.message) {
        result.error = response.body.error
        result.message = response.body.message
      }
    }
    result.response = response
    return result
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
