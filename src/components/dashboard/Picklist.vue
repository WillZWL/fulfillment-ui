<style>
  .picklist .panel-body .list-group-item {
    height: 55px;
  }
  .pick_list_no {
    line-height: 35px;
  }
</style>
<template>
  <div class="panel panel-primary picklist collapse-panel">
    <div class="panel-heading">Picklict No Count
      <chevron :download_url="download_url"></chevron>
    </div>
    <div class="panel-body collapse-body" style="display:none;">
      <loading :status="loading_status"></loading>
      <error :status="error_status"></error>
      <ul class="list-group">
        <li class="list-group-item" v-for="item in itemList">
          <span class="pick_list_no">{{ item.pick_list_no }}</span>
          <span class="badge">{{ item.count }}</span>
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
        itemList: [],
        download_url: API_URL + 'fulfillment-order-picklist-count?download=1'
      }
    },
    created () {
      this.getPickListCount()
    },
    methods: {
      getPickListCount () {
        this.$http.get(API_URL + 'fulfillment-order-picklist-count')
        .then(function (response) {
          this.itemList = response.data
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
