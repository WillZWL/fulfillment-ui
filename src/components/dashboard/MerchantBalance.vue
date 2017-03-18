<template>
  <div class="panel panel-primary collapse-panel">
    <div class="panel-heading">Merchants Balance
      <chevron :glyphicon_class="'glyphicon-chevron-up'"></chevron>
    </div>
    <div class="panel-body collapse-body" style="display:none;">
      <loading :status="loading_status"></loading>
      <error :status="error_status"></error>
      <ul class="list-group">
        <li class="list-group-item" v-for="item in itemList">
          <span class="badge" v-if="item.balance > 0" v-bind:style="{ 'background-color': '#5cb85c' }">
          {{ item.currency_id }} {{ item.balance}}
          </span>
          <span class="badge" v-else v-bind:style="{ 'background-color': '#f0ad4e' }">
          {{ item.currency_id }} {{ item.balance}}
          </span>
          {{ item.merchant_id }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  let API_URL = process.env.API_URL
  import Chevron from '../common/Chevron.vue'
  import Error from '../common/Error.vue'
  import Loading from '../common/Loading.vue'
  export default {
    components: {
      Chevron,
      Error,
      Loading
    },
    data () {
      return {
        loading_status: true,
        error_status: false,
        itemList: []
      }
    },
    created () {
      this.getMerchantBalanceList()
    },
    methods: {
      getMerchantBalanceList () {
        this.$http.get(API_URL + 'merchant-balance')
          .then(function (response) {
            this.itemList = response.data.data
            this.loading_status = false
          })
          .catch(function () {
            this.loading_status = false
            this.error_status = true
          })
      }
    }
  }
</script>
