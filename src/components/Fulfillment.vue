<template>
  <div>
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
              <div class="checkbox">
                <label>
                  <input type="checkbox" v-model="multiSort"> Multisort (use Alt+Click)
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Pagination:</label>
              <select class="form-control" v-model="paginationComponent">
                <option value="vuetable-pagination">vuetable-pagination</option>
                <option value="vuetable-pagination-dropdown">vuetable-pagination-dropdown</option>
              </select>
            </div>
            <div class="form-group">
              <label>Per Page:</label>
              <select class="form-control" v-model="perPage">
                <option value=10>10</option>
                <option value=15>15</option>
                <option value=20>20</option>
                <option value=25>25</option>
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
      api-url="http://vanguard/api/fulfillment-order?status=3"
      :fields="fields"
      pagination-path=""
      :css="css.table"
      :sort-order="sortOrder"
      :multi-sort="true"
      detail-row-component="my-detail-row"
      :append-params="moreParams"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
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
import CustomActions from './CustomActions.vue'
import DetailRow from './DetailRow.vue'
import FilterBar from './FilterBar.vue'
Vue.use(VueEvents)
Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)
Vue.component('filter-bar', FilterBar)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
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
          callback: 'formatDate|DD-MM-YYYY'
        },
        {
          name: 'biz_type',
          sortField: 'biz_type'
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
        {field: 'platform_id', sortField: 'platform_id', direction: 'asc'}
      ],
      moreParams: {}
    }
  },
  methods: {
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="label label-success"><i class="glyphicon glyphicon-star"></i> Male</span>'
        : '<span class="label label-danger"><i class="glyphicon glyphicon-heart"></i> Female</span>'
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'D MMM YYYY') {
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
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
      console.log(data)
      this.$refs.vuetable.toggleDetailRow(data.id)
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
</style>
