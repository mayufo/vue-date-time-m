import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const dateTime = r => require.ensure([], () => r(require('src/example/dateTime')), 'dateTime')
const dateTime = r => require.ensure([], () => r(require('@/example/dateTime')), 'dateTime')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dateTime',
      component: dateTime
    }
  ]
})
