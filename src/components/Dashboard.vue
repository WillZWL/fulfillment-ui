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
</style>
<template>
  <div>
    <nav-bar></nav-bar>
    <div class="dashboard">
      <a class="btn btn-primary pull-right" href="http://admincentre.eservicesgroup.com/order/integrated_order_fulfillment/iwms_allocation_plan">Allocation Plan</a>
      <h1>Dashboard</h1>
      <div>
        <div class="col-md-8 col-sm-12">
          <div class="panel panel-info">
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
              <div class="col-md-4 col-sm-12">
                <div class="panel panel-danger">
                  <div class="panel-heading">Pending Paid Orders</div>
                  <div class="panel-body">
                     <p>{{ loading }}</p>
                    <ul class="list-group">
                      <li class="list-group-item" v-for="merchant_pending in merchant_pending_orders_count">
                         <span class="badge">{{ merchant_pending.count }}</span>
                         {{ merchant_pending.merchant_id }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
                <div class="panel panel-success">
                  <div class="panel-heading">All Paid Orders</div>
                  <div class="panel-body">
                    <p>{{ loading }}</p>
                    <ul class="list-group">
                      <li class="list-group-item" v-for="merchant_all_paid in merchant_all_paid_orders_count">
                         <span class="badge">{{ merchant_all_paid.count }}</span>
                         {{ merchant_all_paid.merchant_id }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12">
                <div class="panel panel-info">
                  <div class="panel-heading">Allocated Orders</div>
                  <div class="panel-body">
                    <p>{{ loading }}</p>
                    <ul class="list-group">
                      <li class="list-group-item" v-for="merchant_allocated in merchant_allocated_orders_count">
                         <span class="badge">{{ merchant_allocated.count }}</span>
                         {{ merchant_allocated.merchant_id }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <div class="panel panel-primary">
            <div class="panel-heading">Merchant Balance</div>
            <div class="panel-body">
              <p>{{ loading }}</p>
              <ul class="list-group">
                <li class="list-group-item" v-for="merchantBalance in merchantBalanceList">
                  <span class="badge" v-if="merchantBalance.balance > 0" v-bind:style="{ 'background-color': '#5cb85c' }">
                  {{ merchantBalance.currency_id }} {{ merchantBalance.balance}}
                  </span>
                  <span class="badge" v-else="merchantBalance.balance < 0" v-bind:style="{ 'background-color': '#f0ad4e' }">
                  {{ merchantBalance.currency_id }} {{ merchantBalance.balance}}
                  </span>
                  {{ merchantBalance.merchant_id }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let API_URL = process.env.API_URL
  import NavBar from './common/NavBar.vue'
  import FooterBar from './common/FooterBar.vue'
  export default {
    components: {
      NavBar,
      FooterBar
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
