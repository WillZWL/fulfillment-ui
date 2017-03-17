<template>
  <div>
    <nav-bar></nav-bar>
    <orders :fields="fields" :status="status"></orders>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
  import NavBar from './common/NavBar.vue'
  import FooterBar from './common/FooterBar.vue'
  import Orders from './order/Orders.vue'
  export default {
    components: {
      NavBar,
      FooterBar,
      Orders
    },
    data () {
      return {
        status: 5,
        fields: [
          {
            name: '__sequence',
            title: '#',
            titleClass: 'text-right',
            dataClass: 'text-right'
          },
          {
            name: 'order_no',
            title: 'So No',
            sortField: 'order_no'
          },
          {
            name: 'marketplace_platform_id',
            title: 'platform_id',
            visible: false
          },
          {
            name: 'sub_merchant_id',
            title: 'Merchant'
          },
          {
            name: 'order_create_date',
            title: 'create_date',
            titleClass: 'text-center',
            dataClass: 'text-center',
            visible: false
          },
          {
            name: 'courier_name',
            title: 'courier_name',
            titleClass: 'text-center',
            dataClass: 'text-center'
          },
          {
            name: 'order_type',
            visible: false
          },
          {
            name: 'country',
            title: 'Country',
            titleClass: 'text-center',
            dataClass: 'text-center'
          },
          {
            name: 'currency'
          },
          {
            name: 'amount',
            titleClass: 'text-center',
            dataClass: 'text-right'
          },
          {
            name: 'pick_list_no',
            titleClass: 'text-center',
            dataClass: 'text-right'
          },
          {
            name: 'hold_status',
            callback: 'getStatus'
          },
          {
            name: 'refund_status',
            callback: 'getStatus'
          },
          {
            name: 'merchant_hold_status',
            callback: 'getStatus'
          },
          {
            name: 'items',
            titleClass: 'text-center',
            dataClass: 'text-left',
            callback: 'formatItems',
            visible: false
          }
        ]
      }
    }
  }
</script>
