import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'
import Paid from 'components/Paid'
import PendingPaid from 'components/PendingPaid'
import Allocated from 'components/Allocated'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Paid Order List',
      component: Paid
    },
    {
      path: '/pending-paid-orders',
      name: 'Pending Paid Order List',
      component: PendingPaid
    },
    {
      path: '/allocated-orders',
      name: 'Allocated Order List',
      component: Allocated
    // },
    // {
    //   path: '/',
    //   name: 'ESG Order Fulfillment',
    //   component: Hello
    }
  ]
})
