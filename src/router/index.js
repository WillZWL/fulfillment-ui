import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'
import Fulfillment from 'components/Fulfillment'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/',
      name: 'ESG Order Fulfillment',
      component: Fulfillment
    }
  ]
})
