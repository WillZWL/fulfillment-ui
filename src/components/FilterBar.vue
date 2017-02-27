<template>
  <div class="row">
    <div class="col-md-8 filter-bar">
      <form class="form-inline">
        <div class="form-group">
          <label>Merchant :</label>
          <select class="form-control select2" style="width:150px" v-model="merchantId">
            <option value=""></option>
            <option v-for="merchant in merchants" :value="merchant.merchant_short_id">{{merchant.merchant_id}}</option>
          </select>&nbsp;&nbsp;
          <label>Courier :</label>
          <select class="form-control select2" style="width:150px" v-model="courierId">
            <option value=""></option>
            <option v-for="courier in couriers" :value="courier.courier_id">{{courier.courier_name}}</option>
          </select>&nbsp;&nbsp;
          <label> Search for :</label>
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
export default {
  data () {
    return {
      apiUrl: API_URL,
      filterText: '',
      merchantId: '',
      courierId: '',
      merchants: {},
      couriers: {},
      params: {}
    }
  },
  created () {
    this.getMerchantList()
    this.getCouriersList()
  },
  methods: {
    doFilter () {
      this.params.merchantId = this.merchantId
      this.params.courierId = this.courierId
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
    },
    getCouriersList () {
      this.$events.fire('show-loding')
      this.$http.get(this.apiUrl + 'couriers')
        .then(function (response) {
          this.couriers = response.data.data
          this.$events.fire('hide-loading')
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
