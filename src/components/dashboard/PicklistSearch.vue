<template>
  <div class="col-md-6">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Pick List No" v-model="pick_list_no">
      <span class="input-group-btn">
        <button class="btn btn-primary" type="button" @click="getPickListSoNoList" data-toggle="modal" data-target="#soNoList">Get So No List</button>
      </span>
    </div>
    <so-no-list
      :loading_status="loading_status"
      :error_status="error_status"
      :pick_list_no="pick_list_no"
      :so_no_list="so_no_list"
      :count="count">
    </so-no-list>
  </div>
</template>
<script>
  let API_URL = process.env.API_URL
  import SoNoList from './SoNoList.vue'
  export default {
    components: {
      SoNoList
    },
    data () {
      return {
        loading_status: true,
        error_status: false,
        pick_list_no: '',
        count: 0,
        so_no_list: ''
      }
    },
    methods: {
      getPickListSoNoList () {
        if (this.pick_list_no) {
          this.loading_status = true
          this.$http.get(API_URL + 'fulfillment-order-picklist-count?pick_list_no=' + this.pick_list_no)
          .then(function (response) {
            console.log(response.data[0])
            this.count = response.data[0].count
            this.so_no_list = response.data[0].so_no_list
            this.loading_status = false
            this.error_status = false
          }).catch(function () {
            this.loading_status = false
            this.error_status = true
          })
        }
      }
    }
  }
</script>
