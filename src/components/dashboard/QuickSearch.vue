<template>
  <div class="input-group col-md-6 col-sm-12">
    <input type="text" name="so_no" required="required" class="form-control" :placeholder="placeholder" v-model="so_no" @keyup.enter="quickSearch">
    <div class="input-group-btn">
      <button type="button" class="btn btn-primary" @click="quickSearch" data-toggle="modal" data-target="#settingsModal">
        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
        Quick Search!
      </button>
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-right">
        <li><a href="#" @click="oldQuickSearch">Open Old Order Quick Search</a></li>
      </ul>
    </div>
    <order-view
      :loading_status="loading_status"
      :error_status="error_status"
      :error_msg="error_msg"
      :so_no="so_no"
      :order_detail="order_detail"
      :merchant_balance="merchant_balance">
    </order-view>
  </div>
</template>
<script>
  let API_URL = process.env.API_URL
  let ORDER_VIEW_URL = process.env.ORDER_VIEW_URL
  import OrderView from './OrderView.vue'
  export default {
    components: {
      OrderView
    },
    data () {
      return {
        loading_status: true,
        error_status: false,
        error_msg: '',
        so_no: '',
        placeholder: 'so no',
        order_detail: {},
        merchant_id: '',
        merchant_balance: {}
      }
    },
    methods: {
      quickSearch () {
        if (this.so_no) {
          this.error_msg = ''
          this.error_status = false
          this.loading_status = true
          this.$http.get(API_URL + 'fulfillment-order?filter=' + this.so_no)
          .then(function (response) {
            this.order_detail = response.data.data[0]
            this.merchant_id = response.data.data[0].sub_merchant_id
          }).then(function () {
            this.$http.get(API_URL + 'merchant-balance?merchant_id=' + this.merchant_id)
              .then(function (response) {
                this.merchant_balance.balance = response.data.data[0].balance
                this.merchant_balance.currency_id = response.data.data[0].currency_id
                this.loading_status = false
                this.error_status = false
              }).catch(function () {
                this.loading_status = false
                this.error_msg = 'Get Merchant Balance Failed'
                this.error_status = true
              })
          }).catch(function () {
            this.loading_status = false
            this.error_msg = 'Get Order Detail Failed'
            this.error_status = true
          })
        } else {
          this.placeholder = 'Please input correct so_no'
          this.loading_status = false
          this.error_status = true
          this.error_msg = 'Please input correct so_no'
        }
      },
      oldQuickSearch () {
        if (this.so_no) {
          var url = ORDER_VIEW_URL + this.so_no
          window.open(url)
        } else {
          this.placeholder = 'Please input correct so_no'
        }
      }
    }
  }
</script>
