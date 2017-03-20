<template>
  <div class="modal fade" id="orderView" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">Order Quick Search</h4>
        </div>
        <div class="modal-body">
          <loading :status="loading_status"></loading>
          <error :status="error_status" :message="error_msg"></error>
          <div class="panel panel-default" v-if="!loading_status && error_msg == ''">
            <div class="panel-heading">So No: {{ so_no }}</div>
            <ul class="list-group">
              <li class="list-group-item" v-if="order_detail.pick_list_no">
                <strong>Picklist No:</strong> {{ order_detail.pick_list_no }}
              </li>
              <li class="list-group-item" v-if="order_detail.courier_name">
                <strong>Courier Name:</strong> {{ order_detail.courier_name }}
              </li>
              <li class="list-group-item">
                <strong>Platform Id:</strong> {{ order_detail.marketplace_platform_id }} &nbsp;&nbsp;&nbsp;&nbsp;
                <strong>Platform Order Id:</strong> {{ order_detail.marketplace_reference_no }}
              </li>
              <li class="list-group-item">
                <strong>Merchant:</strong> {{ order_detail.sub_merchant_id }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>Merchant Balance:</strong> {{ merchant_balance.currency_id }} {{ merchant_balance.balance }}
              </li>
              <li class="list-group-item">
                <strong>Amount:</strong> {{ order_detail.currency }}  {{ order_detail.amount }}
              </li>
              <li class="list-group-item">
                <strong>Country:</strong> {{ order_detail.country }}
              </li>
              <li class="list-group-item">
                <strong>Status:</strong> {{ order_status }}  ( {{ order_detail.status }} )
              </li>
              <li class="list-group-item">
                <strong>Refund Status:</strong> {{ refund_status }} ( {{ order_detail.refund_status }} )
              </li>
              <li class="list-group-item">
                <strong>Hold Status:</strong> {{ hold_status }} ( {{ order_detail.hold_status }} )
              </li>
              <li class="list-group-item">
                <strong>Merchant Hold Status:</strong> {{ merchant_hold_status }}  ( {{ order_detail.merchant_hold_status }} )
              </li>
              <li class="list-group-item">
                <strong>Prepay Hold Status:</strong> {{ prepay_hold_status }} ( {{ order_detail.prepay_hold_status }} )
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <a class="btn btn-primary" target="_blank" v-if="so_no" :href="order_view_url + so_no">Look For More Detail</a>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let ORDER_VIEW_URL = process.env.ORDER_VIEW_URL
  import Error from '../common/Error.vue'
  import Loading from '../common/Loading.vue'
  export default {
    props: {
      loading_status: {
        type: Boolean,
        default: true
      },
      error_status: {
        type: Boolean,
        default: false
      },
      error_msg: {
        type: String
      },
      so_no: {
        type: String,
        default: ''
      },
      order_detail: {
        type: Object,
        default: () => {}
      },
      merchant_balance: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        order_view_url: ORDER_VIEW_URL
      }
    },
    components: {
      Error,
      Loading
    },
    computed: {
      order_status: function () {
        if (this.order_detail.status === 3) {
          return 'Paid'
        } else if (this.order_detail.status === 5) {
          return 'Allocated'
        } else if (this.order_detail.status === 6) {
          return 'Shipped'
        }
        return ''
      },
      refund_status: function () {
        if (this.order_detail.refund_status > 0) {
          return 'Yes'
        } else {
          return 'No'
        }
      },
      hold_status: function () {
        if (this.order_detail.hold_status > 0) {
          return 'Yes'
        } else {
          return 'No'
        }
      },
      merchant_hold_status: function () {
        if (this.order_detail.merchant_hold_status > 0) {
          return 'Yes'
        } else {
          return 'No'
        }
      },
      prepay_hold_status: function () {
        if (this.order_detail.prepay_hold_status > 0) {
          return 'Yes'
        } else {
          return 'No'
        }
      }
    }
  }
</script>
