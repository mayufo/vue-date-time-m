// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueHighlightJS from 'vue-highlightjs'


/*
 * Use Vue Highlight.js
 */
Vue.use(VueHighlightJS);

import VueDateTimeM from './dateTime/dDateTime.vue'
Vue.component('date-time', VueDateTimeM);


Vue.config.productionTip = false

Vue.config.ignoredElements = [
  'date-time'
];

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
