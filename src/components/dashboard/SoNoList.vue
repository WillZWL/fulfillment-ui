<template>
  <div class="modal fade" id="soNoList" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">Picklist No: {{ pick_list_no }} </h4>
        </div>
        <div class="modal-body">
          <loading :status="loading_status"></loading>
          <error :status="error_status" :message="error_msg"></error>
          <div class="panel panel-default" v-if="!loading_status">
            <div class="panel-heading">
              <h4 class="panel-title">Total Orders ( {{ count }} )</h4>
            </div>
            <div class="panel-body">
              {{ so_no_list }}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Error from '../common/Error.vue'
  import Loading from '../common/Loading.vue'
  export default {
    components: {
      Error,
      Loading
    },
    props: {
      pick_list_no: {
        type: String
      },
      so_no_list: {
        type: String
      },
      count: {
        type: Number,
        default: 0
      },
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
      }
    }
  }
</script>
