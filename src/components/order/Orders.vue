<template>
  <div class="vuetable-wrapper" :class="loading">
    <filter-bar :status="status"></filter-bar>
    <settings :fields="fields"></settings>
    <div class="panel panel-default">
      <div class="panel-heading">{{ $route.name }} </div>
      <div class="panel-body">
        <vuetable ref="vuetable"
          :api-url="this.apiUrl+'fulfillment-order'"
          :fields="fields"
          data-path="newData"
          pagination-path="pagination"
          :css="css.table"
          :sort-order="sortOrder"
          :multi-sort="false"
          detail-row-component="detail-row"
          :append-params="moreParams"
          :load-on-start="false"
          :track-by="'order_no'"
          :per-page="Number(perPage)"
          loading-class="loading"
          @vuetable:cell-clicked="onCellClicked"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onVuetableLoading"
          @vuetable:load-success="onVuetableloadSuccess"
          @vuetable:load-error="onLoadError"
        ></vuetable>
        <div class="vuetable-pagination">
          <vuetable-pagination-info ref="paginationInfo"
            info-class="pagination-info"
          ></vuetable-pagination-info>
          <vuetable-pagination ref="pagination"
            :css="css.pagination"
            :icons="css.icons"
            @vuetable-pagination:change-page="onChangePage"
          ></vuetable-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import Vue from 'vue'
import sweetAlert from 'sweetalert'
import $ from 'jquery'
import FilterBar from './FilterBar'
import Settings from './Settings'
import DetailRow from './DetailRow'

Vue.component('detail-row', DetailRow)

let API_URL = process.env.API_URL

export default {
  props: {
    fields: {
      type: Array,
      default: () => [
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
    },
    status: {
      type: Number,
      default: 3
    },
    refund_status: {
      type: Number
    },
    hold_status: {
      type: Number
    },
    prepay_hold_status: {
      type: Number
    },
    merchant_hold_status: {
      type: Number
    },
    exclude_lack_balance: {
      type: Number
    }
  },
  components: {
    FilterBar,
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    Settings
  },
  data () {
    return {
      apiUrl: API_URL,
      css: {
        table: {
          tableClass: 'table table-bordered table-striped table-hover',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down'
        },
        pagination: {
          wrapperClass: 'pagination',
          activeClass: 'active',
          disabledClass: 'disabled',
          pageClass: 'page',
          linkClass: 'link'
        },
        icons: {
          first: 'glyphicon glyphicon-step-backward',
          prev: 'glyphicon glyphicon-chevron-left',
          next: 'glyphicon glyphicon-chevron-right',
          last: 'glyphicon glyphicon-step-forward'
        }
      },
      sortOrder: [
        {field: 'order_no', sortField: 'order_no', direction: 'asc'}
      ],
      perPage: 10,
      loading: '',
      moreParams: {
        status: this.status,
        refund_status: this.refund_status,
        hold_status: this.hold_status,
        prepay_hold_status: this.prepay_hold_status,
        merchant_hold_status: this.merchant_hold_status,
        exclude_lack_balance: this.exclude_lack_balance
      }
    }
  },
  methods: {
    transform: function (data) {
      var transformed = {}
      var prevPageUrl
      transformed.pagination = {
        total: data.meta.pagination.total,
        per_page: data.meta.pagination.per_page,
        current_page: data.meta.pagination.current_page,
        last_page: data.meta.pagination.total_pages,
        next_page_url: data.meta.pagination.links.next,
        prev_page_url: prevPageUrl,
        from: (1 + (data.meta.pagination.current_page - 1) * (data.meta.pagination.per_page)),
        to: data.meta.pagination.current_page * data.meta.pagination.per_page
      }
      transformed.newData = []
      transformed.newData = data.data
      return transformed
    },
    showLoader: function () {
      this.loading = 'loading'
    },
    hideLoader: function () {
      this.loading = ''
    },
    showDetailRow: function (value) {
      let icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'down' : 'right'
      return [
        '<a class="show-detail-row">',
        '<i class="chevron circle ' + icon + ' icon"></i>',
        '</a>'
      ].join('')
    },
    setFilter: function () {
      this.moreParams = {
        'filter': this.searchFor
      }
      this.$nextTick(function () {
        this.$refs.vuetable.refresh()
      })
    },
    resetFilter: function () {
      this.searchFor = ''
      this.setFilter()
    },
    formatItems (value) {
      var newValue = ''
      for (var i = 0; i < value.length; i++) {
        newValue += 'SKU :' + value[i].sku + '&nbsp;&nbsp;&nbsp;&nbsp;Qty: ' + value[i].quantity + '<br />'
      }
      return newValue
    },
    getStatus (value) {
      var status = 'No'
      if (value > 0) {
        value = 'Yes'
      }
      return status
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (rowData, field, event) {
      this.$events.fire('show-loding')
      this.$http.get(this.apiUrl + 'merchant-balance?merchant_id=' + rowData.sub_merchant_id)
          .then(function (response) {
            rowData.balance = response.data.data[0].balance
            rowData.currency_id = response.data.data[0].currency_id
            this.$refs.vuetable.toggleDetailRow(rowData.order_no)
            this.$events.fire('hide-loading')
          })
          .catch(function () {
            this.$events.fire('load-error')
          })
    },
    onVuetableLoading () {
      this.showLoader()
    },
    onVuetableloadSuccess () {
      this.hideLoader()
    },
    onLoadError () {
      sweetAlert('Oops', 'Error communicating with the server', 'error')
      this.hideLoader()
    }
  },
  events: {
    'filter-set' (params) {
      this.moreParams.merchant_id = params.merchantId
      this.moreParams.courier_id = params.courierId
      this.moreParams.filter = params.filter
      this.moreParams.picklist_no = params.picklistNo
      this.moreParams.export = params.export
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    'filter-reset' () {
      this.moreParams = {}
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    'download' (params) {
      this.moreParams.merchant_id = params.merchantId
      this.moreParams.courier_id = params.courierId
      this.moreParams.filter = params.filter
      this.moreParams.picklist_no = params.picklistNo
      this.moreParams.export = params.export
      this.moreParams.access_token = params.access_token
      var downloadUrl = API_URL + 'fulfillment-order?' + $.param(this.moreParams)
      window.open(downloadUrl)
    },
    'show-loding' () {
      this.loading = 'loading'
    },
    'hide-loading' () {
      this.loading = ''
    },
    'per-page-set' (num) {
      this.perPage = num
    },
    'load-error' () {
      Vue.nextTick(() => this.onLoadError())
      this.onLoadError()
    }
  }
}
</script>
<style>
.vuetable-th-courier_name {
  width: 80px;
}
.vuetable-th-sub_merchant_id {
  width: 100px;
}
.pagination {
  margin: 0;
  float: right;
}
.pagination a.page {
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 2px;
  cursor: pointer;
}
.pagination a.page.active {
  color: white;
  background-color: #337ab7;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 2px;
}
.pagination a.btn-nav {
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 7px;
  margin-right: 2px;
}
.pagination a.btn-nav.disabled {
  color: lightgray;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 7px;
  margin-right: 2px;
  cursor: not-allowed;
}
.pagination-info {
  float: left;
}

/* Loading Animation: */
.vuetable-wrapper {
  margin-top: 60px;
  opacity: 1;
  position: relative;
  filter: alpha(opacity=100); /* IE8 and earlier */
}
.vuetable-wrapper.loading {
  opacity:0.4;
   transition: opacity .3s ease-in-out;
   -moz-transition: opacity .3s ease-in-out;
   -webkit-transition: opacity .3s ease-in-out;
}
.vuetable-wrapper.loading:after {
  position: absolute;
  content: '';
  top: 40%;
  left: 50%;
  margin: -30px 0 0 -30px;
  border-radius: 100%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  border: 4px solid #000;
  height: 60px;
  width: 60px;
  background: transparent !important;
  display: inline-block;
  -webkit-animation: pulse 1s 0s ease-in-out infinite;
  animation: pulse 1s 0s ease-in-out infinite;
}
@keyframes pulse {
  0% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6); }
  50% {
    -webkit-transform: scale(1);
            transform: scale(1);
         border-width: 12px; }
  100% {
    -webkit-transform: scale(0.6);
            transform: scale(0.6); }
}
.panel-default {
  margin-top: 10px;
}
</style>
