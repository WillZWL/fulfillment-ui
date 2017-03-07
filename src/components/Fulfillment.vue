<template>
  <div class="vuetable-wrapper" :class="loading">
    <filter-bar :status="moreParams.status"></filter-bar>
    <settings :fields="fields"></settings>
    <div>
      <ul class="nav nav-pills" role="tablist">
        <li role="presentation">
          <button type="button" class="btn btn-info" @click='changeStatus(3)'>Paied</button>
        </li>
        <li role="presentation">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Allocated
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#" @click="changeStatus(5, '')">All</li>
              <li><a href="#" @click='changeStatus(5, 2)'>Feed Generated</a></li>
              <li><a href="#" @click='changeStatus(5, 0)'>Not Generated</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading"><b>{{ statusText }}</b>  Order List</div>
      <div class="panel-body">
        <vuetable ref="vuetable"
          :api-url="apiUrl+'fulfillment-order'"
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
          @vuetable:cell-clicked=""
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
import FilterBar from './FilterBar.vue'
import Settings from './Settings.vue'

let API_URL = process.env.API_URL

export default {
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
      fields: [
        {
          name: '__sequence',
          title: '#',
          titleClass: 'text-right',
          dataClass: 'text-right'
        },
        // {
        //   name: '__checkbox',
        //   titleClass: 'text-center',
        //   dataClass: 'text-center'
        // },
        {
          name: 'order_no',
          title: 'So No',
          sortField: 'order_no'
        },
        {
          name: 'marketplace_platform_id',
          title: 'platform_id'
        },
        {
          name: 'sub_merchant_id',
          title: 'Merchant'
        },
        {
          name: 'order_create_date',
          title: 'create_date',
          sortField: 'order_create_date',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'courier_name',
          title: 'courier_name',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'order_type',
          sortField: 'order_type'
        },
        {
          name: 'country',
          title: 'Country',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'currency',
          sortField: 'currency'
        },
        {
          name: 'amount',
          sortField: 'amount',
          titleClass: 'text-center',
          dataClass: 'text-right'
        },
        {
          name: 'items',
          titleClass: 'text-center',
          dataClass: 'text-left',
          callback: 'formatItems'
        // },
        // {
        //   name: '__component:custom-actions',
        //   title: 'Actions',
        //   titleClass: 'text-center',
        //   dataClass: 'text-center'
        }
      ],
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
      perPage: 100,
      loading: '',
      statusText: 'Paid',
      moreParams: {
        status: 3
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
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (newData, field, event) {
      console.log('cellClicked: ', field.name)
      this.$refs.vuetable.toggleDetailRow(newData.order_no)
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
    },
    changeStatus (status = 3, feedStatus = '') {
      if (status === 5) {
        this.statusText = 'Allocated'
      } else {
        this.statusText = 'Paid'
      }
      this.moreParams.status = status
      if (feedStatus !== '') {
        this.moreParams.dnote_invoice_status = feedStatus
      } else {
        delete this.moreParams.dnote_invoice_status
      }
      this.$nextTick(function () {
        this.$refs.vuetable.refresh()
      })
    }
  },
  events: {
    'filter-set' (params) {
      var status = this.moreParams.status
      this.moreParams = params
      this.moreParams.status = status
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    'filter-reset' () {
      this.moreParams = {}
      Vue.nextTick(() => this.$refs.vuetable.refresh())
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
