import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import './assets/css/fonts/iconfont.css';                   // 引入字体图标样式
import './assets/css/reset.css';                   // 引入字体图标样式



new Vue({
    render: (h) => h(App),
}).$mount('#app');
