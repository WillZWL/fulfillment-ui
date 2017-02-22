<template>
  <div class="vuetable-wrapper" :class="loading">
    <allocation></allocation>
    <filter-bar></filter-bar>
    <div class="modal fade" id="settingsModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
            <h4 class="modal-title">Settings</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Per Page:</label>
              <select class="form-control" v-model="perPage">
                <option value='10'>10</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
                <option value='200'>200</option>
                <option value='500'>500</option>
              </select>
            </div>
            <div class="form-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">Visible fields</h4>
                </div>
                <div class="panel-body">
                  <div class="checkbox" v-for="field in fields">
                    <label>
                      <input type="checkbox" v-model="field.visible">
                      {{ field.title == '' ? field.name.replace('__', '') : field.title}}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <vuetable ref="vuetable"
      :api-url="apiUrl"
      :fields="fields"
      data-path="newData"
      pagination-path="pagination"
      :css="css.table"
      :sort-order="sortOrder"
      :multi-sort="false"
      detail-row-component="detail-row"
      :append-params="moreParams"
      :load-on-start="false"
      :track-by="fields.order_no"
      :per-page="perPage"
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
</template>

<script>
import accounting from 'accounting'
import moment from 'moment'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import Vue from 'vue'
import VueEvents from 'vue-events'
import sweetAlert from 'sweetalert'
import CustomActions from './CustomActions.vue'
import DetailRow from './DetailRow.vue'
import FilterBar from './FilterBar.vue'
import Allocation from './Allocation.vue'

Vue.use(VueEvents)

// let API_URL = 'http://vanguard/api/fulfillment-order?status=3&access_token=DjL48nS0ZbMPLzmW8uKIb9d9XiVfIRu6QzqYrNcQ'
let API_URL = 'http://admincentre.eservicesgroup.com:7890/api/fulfillment-order?status=3&access_token=iLhHtBRyZ4VcoIfKnp3q8quJ2cVnlmgiSwuKdrB9'

Vue.component('custom-actions', CustomActions)

export default {
  components: {
    DetailRow,
    FilterBar,
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    Allocation
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
        {
          name: '__checkbox',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'order_no',
          sortField: 'order_no'
        },
        {
          name: 'platform_id',
          sortField: 'platform_id'
        },
        {
          name: 'order_create_date',
          sortField: 'order_create_date',
          titleClass: 'text-center',
          dataClass: 'text-center',
          callback: 'formatDate|YYYY-MM-DD'
        },
        {
          name: 'recommend_courier_id',
          titleClass: 'text-center',
          dataClass: 'text-center'
        },
        {
          name: 'order_type',
          sortField: 'order_type'
        },
        {
          name: 'delivery_info.name',
          sortField: 'delivery_info.name',
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
          dataClass: 'text-right',
          callback: 'formatNumber'
        },
        {
          name: 'items',
          titleClass: 'text-center',
          dataClass: 'text-left',
          callback: 'formatItems'
        },
        {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'text-center',
          dataClass: 'text-center'
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
      moreParams: {}
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
    allcap (value) {
      return value.toUpperCase()
    },
    formatItems (value) {
      var newValue = ''
      for (var i = 0; i < value.length; i++) {
        newValue += 'SKU :' + value[i].sku + '&nbsp;&nbsp;&nbsp;&nbsp;Qty: ' + value[i].quantity + '<br />'
      }
      return newValue
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'DD MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
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
      // console.log(newData)
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
    }
  },
  events: {
    'filter-set' (filterText) {
      this.moreParams = {
        filter: filterText
      }
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    'filter-reset' () {
      this.moreParams = {}
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    }
  }
}
</script>
<style>
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
</style>
