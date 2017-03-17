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
          <div class="panel panel-primary">
            <div class="panel-heading">Orders Count</div>
            <div class="panel-body">
              <div class="alert alert-danger" role="alert">
                <strong>Pending Paid Orders {{ pending_paid_orders_count }} </strong> Those orders need to do allocation
              </div>
              <div class="alert alert-success" role="alert">
                <strong>All Paid Orders {{ all_paid_orders_count }} </strong> Those orders has been paid
              </div>
              <div class="alert alert-info" role="alert">
                <strong>Allocated Orders {{ allocated_orders_count }} </strong> Those orders has been allocated.
              </div>
            </div>
          </div>
          <div class="panel panel-primary">
            <div class="panel-heading">Merchant Orders Count</div>
            <div class="panel-body">
              <list :heading="'Pending Paid Orders'"
                    :itemList="merchant_pending_orders_count"
                    :loading="loading"
                    :panelClass="'panel-danger'">
              </list>
              <list :heading="'All Paid Orders'"
                    :itemList="merchant_all_paid_orders_count"
                    :loading="loading"
                    :panelClass="'panel-success'">
              </list>
              <list :heading="'Allocated Orders'"
                    :itemList="merchant_allocated_orders_count"
                    :loading="loading"
                    :panelClass="'panel-info'">
              </list>
            </div>
          </div>
        </div>
        <merchant-balance :loading="loading" :itemList="merchantBalanceList"></merchant-balance>
      </div>
    </div>
  </div>
</template>
<script>
  let API_URL = process.env.API_URL
  import NavBar from './common/NavBar.vue'
  import FooterBar from './common/FooterBar.vue'
  import List from './dashboard/List.vue'
  import MerchantBalance from './dashboard/MerchantBalance.vue'
  export default {
    components: {
      NavBar,
      FooterBar,
      List,
      MerchantBalance
    },
    data () {
      return {
        loading: 'Loading, Please wait a moment',
        all_paid_orders_count: '',
        pending_paid_orders_count: '',
        allocated_orders_count: '',
        merchant_pending_orders_count: [],
        merchant_all_paid_orders_count: [],
        merchant_allocated_orders_count: [],
        merchantBalanceList: []
      }
    },
    created () {
      this.getMerchantBalanceList()
      this.getDashBoardData()
    },
    methods: {
      getMerchantBalanceList () {
        this.$http.get(API_URL + 'merchant-balance')
          .then(function (response) {
            this.merchantBalanceList = response.data.data
            this.loading = ''
          })
          .catch(function () {
            this.loading = 'Load Error, You can refresh later'
          })
      },
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
