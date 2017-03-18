<style>
.dashboard {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:60px 0;
}
.progress span {
  padding-left: 50px;
}
.alert strong {
  padding-right: 50px;
}
.title {
  padding: 0 15px;
}
</style>
<template>
  <div>
    <nav-bar></nav-bar>
    <div class="dashboard col-md-12 col-sm-12">
      <div class="title">
        <a class="btn btn-primary pull-right" href="http://admincentre.eservicesgroup.com/order/integrated_order_fulfillment/iwms_allocation_plan">Allocation Plan</a>
        <h1>Dashboard</h1>
      </div>
      <div>
        <div class="col-md-8 col-sm-12">
          <div class="panel panel-primary collapse-panel">
            <div class="panel-heading">Orders Count
              <chevron :glyphicon_class="'glyphicon-chevron-down'"></chevron>
              <span class="pull-right">Click the child title, you can get orders list detail</span>
            </div>
            <div class="panel-body collapse-body">
              <div class="panel-group" id="accordion" role="tablist">
                <p>{{ loading }}</p>
                <!-- Pending Paid Orders -->
                <orders :panelClass="'panel-danger'"
                        :panelId="'headingOne'"
                        :collapseId="'collapseOne'"
                        :heading="'Pending Paid Orders'"
                        :heading_desc="'Those orders need to do allocation'"
                        :orders_count="pending_paid_orders_count"
                        :itemList="merchant_pending_orders_count"
                        :loading="loading">
                </orders>
                <!-- All Paid Orders -->
                <orders :panelClass="'panel-success'"
                        :panelId="'headingTwo'"
                        :collapseId="'collapseTwo'"
                        :heading="'All Paid Orders'"
                        :heading_desc="'Those orders has been paid'"
                        :orders_count="all_paid_orders_count"
                        :itemList="merchant_all_paid_orders_count"
                        :loading="loading">
                </orders>
                <!-- Allocated Orders -->
                <orders :panelClass="'panel-info'"
                        :panelId="'headingThree'"
                        :collapseId="'collapseThree'"
                        :heading="'Allocated Orders'"
                        :heading_desc="'Those orders has been allocated.'"
                        :orders_count="allocated_orders_count"
                        :itemList="merchant_allocated_orders_count"
                        :loading="loading">
                </orders>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <picklist></picklist>
          <merchant-balance></merchant-balance>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let API_URL = process.env.API_URL
  import NavBar from './common/NavBar.vue'
  import FooterBar from './common/FooterBar.vue'
  import Chevron from './common/Chevron.vue'
  import Orders from './dashboard/Orders.vue'
  import MerchantBalance from './dashboard/MerchantBalance.vue'
  import Picklist from './dashboard/Picklist.vue'
  export default {
    components: {
      NavBar,
      FooterBar,
      Chevron,
      Orders,
      MerchantBalance,
      Picklist
    },
    data () {
      return {
        loading: 'Loading, Please wait a moment',
        all_paid_orders_count: '',
        pending_paid_orders_count: '',
        allocated_orders_count: '',
        merchant_pending_orders_count: [],
        merchant_all_paid_orders_count: [],
        merchant_allocated_orders_count: []
      }
    },
    created () {
      this.getDashBoardData()
    },
    methods: {
      getDashBoardData () {
        this.$http.get(API_URL + 'fulfillment-order-dashboard')
          .then(function (response) {
            this.all_paid_orders_count = response.data.all_paid_orders_count
            this.pending_paid_orders_count = response.data.pending_paid_orders_count
            this.allocated_orders_count = response.data.allocated_orders_count
            this.merchant_pending_orders_count = response.data.merchant_pending_orders_count
            this.merchant_all_paid_orders_count = response.data.merchant_all_paid_orders_count
            this.merchant_allocated_orders_count = response.data.merchant_allocated_orders_count
            this.loading = ''
          })
          .catch(function () {
            this.loading = 'Load Error, You can refresh later'
          })
      }
    }
  }
</script>
