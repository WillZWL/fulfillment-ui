<template>
  <div>
    <nav-bar></nav-bar>
    <orders :status="status"></orders>
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
        status: 3
      }
    }
  }
</script>
