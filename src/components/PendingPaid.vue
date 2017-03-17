<template>
  <div>
    <nav-bar></nav-bar>
    <orders
      :status="status"
      :refund_status="refund_status"
      :hold_status="hold_status"
      :prepay_hold_status="prepay_hold_status"
      :merchant_hold_status="merchant_hold_status"
      :exclude_lack_balance="exclude_lack_balance">
      </orders>
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
        status: 3,
        refund_status: 0,
        hold_status: 0,
        prepay_hold_status: 0,
        merchant_hold_status: 0,
        exclude_lack_balance: 1
      }
    }
  }
</script>
