// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/default.css'
import '@/assets/css/reset.css'                      // 引入初始化样式
import '@/assets/css/iconfont.css'    // 引入字体图标样式

Vue.use(VueHighlightJS)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
