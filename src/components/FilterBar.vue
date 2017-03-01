<template>
  <div class="row">
    <div class="col-md-8 filter-bar">
      <form class="form-inline">
        <div class="form-group">
          <label>Merchant :</label>
          <vue-select multiple v-model="selectedMerchants" label="merchant_id" :options="merchants"></vue-select>
          <label>Courier :</label>
          <vue-select multiple v-model="selectedCouriers" label="courier_name" :options="couriers"></vue-select>
          <label> Search for :</label><br/>
          <input type="text" v-model="filterText" class="form-control" @keyup.enter="doFilter" placeholder="so no, platform_id">
          <button class="btn btn-primary" @click.prevent="doFilter">Search</button>
          <button class="btn" @click.prevent="resetFilter">Reset</button>
        </div>
      </form>
    </div>
    <div class="col-md-4 filter-bar">
      <div class="form-inline form-group pull-right">
        <button class="btn btn-default" data-toggle="modal" data-target="#settingsModal">
          <span class="glyphicon glyphicon-cog"></span> Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script>
let API_URL = process.env.API_URL
import VueSelect from 'vue-select'
export default {
  components: {
    VueSelect
  },
  data () {
    return {
      apiUrl: API_URL,
      filterText: '',
      selectedMerchants: [],
      selectedCouriers: [],
      merchants: [],
      couriers: [],
      params: {}
    }
  },
  created () {
    this.getMerchantList()
    this.getCouriersList()
  },
  computed: {
    selectedMerchantIds () {
      var result = []
      for (var i in this.selectedMerchants) {
        result.push(this.selectedMerchants[i].merchant_id)
      }
      return result
    },
    selectedCourierIds () {
      var result = []
      for (var i in this.selectedCouriers) {
        result.push(this.selectedCouriers[i].courier_id)
      }
      return result
    }
  },
  methods: {
    doFilter () {
      this.params.merchantId = this.selectedMerchantIds
      this.params.courierId = this.selectedCourierIds
      this.params.filterText = this.filterText
      this.$events.fire('filter-set', this.params)
    },
    resetFilter () {
      this.filterText = ''
      this.$events.fire('filter-reset')
    },
    getMerchantList () {
      this.$events.fire('show-loding')
      this.$http.get(this.apiUrl + 'merchant')
        .then(function (response) {
          this.merchants = response.data.data
          this.$events.fire('hide-loading')
        })
        .catch(function () {
          this.$events.fire('load-error')
        })
    },
    getCouriersList () {
      this.$events.fire('show-loding')
      this.$http.get(this.apiUrl + 'couriers')
        .then(function (response) {
          this.couriers = response.data.data
          this.$events.fire('hide-loading')
        })
        .catch(function () {
          this.$events.fire('load-error')
        })
    }
  }
}
</script>
<style>
.filter-bar {
  padding: 10px;
}
</style>
