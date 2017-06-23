// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import $ from 'jquery'
import request from 'superagent'
import 'iview/dist/styles/iview.css'
import App from './App'
import router from './router'
Vue.use(iView)
Vue.use(Router)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }//而我们的 index.html 只需要保留 <div id="app"></div> 即可，我们的Vue在实例化时设置了 el : '#app' 所以会替换这标签，为我们 App 组件的内容
})
